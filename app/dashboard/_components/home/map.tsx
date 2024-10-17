'use client'

import { Skeleton } from "@/components/ui/skeleton"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { toast } from 'sonner'

const CustomIcon = L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-blue-500">
      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
  `,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function Map({ streetAddress }: { streetAddress: string }) {
  const [position, setPosition] = useState<[number, number]>([43.7128, -79.3452]); // Default to Toronto
  const [zoom, setZoom] = useState(13);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCoordinates = async () => {
      setIsLoading(true);
      try {
        // Split the address into components
        const [street, city, country, postalCode] = streetAddress.split(',').map(s => s.trim());

        // Construct the query string
        const queryString = `${street}, ${city}, ${country}`;

        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryString)}&countrycodes=ca`);
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
          setZoom(16);
        } else {
          // If not found, try without the street number
          const streetWithoutNumber = street.replace(/^\d+\s*/, '');
          const fallbackQuery = `${streetWithoutNumber}, ${city}, ${country}`;
          const fallbackResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQuery)}&countrycodes=ca`);
          const fallbackData = await fallbackResponse.json();

          if (fallbackData && fallbackData.length > 0) {
            const { lat, lon } = fallbackData[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
            setZoom(16);
          } else {
            console.error('Address not found. Please check the format and try again.')
          }
        }
      } catch (error) {
        console.error('Error searching for address:', error);
        toast.error('Error searching for address. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    if (streetAddress) {
      getCoordinates();
    }
  }, [streetAddress])

  if (isLoading) {
    return <div className='w-full mt-[1rem]'>
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>;
  }

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }} className='border rounded mt-3'>
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={CustomIcon}>
        <Popup>
          <div>
            <h3 className="font-bold">Searched Location</h3>
            <p>{streetAddress}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
