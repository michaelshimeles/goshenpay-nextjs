import { getChurch } from "@/utils/data/church/get-church";
import Map from "./_components/map"


export default async function Dashboard({ params }: { params: { id: string } }) {
  const church = await getChurch(params?.id!)
  const info = church?.result?.[0]
  const address = `${info?.org_address}, ${info?.org_city}, ${info?.org_country}, ${info?.org_zip}`

  return (
    <div className="p-4">
      {church ? (
        <div className="bg-white dark:bg-zinc-950 border dark:border-zinc-900 rounded-lg shadow p-6 mt-3">
          <h2 className="text-xl font-semibold mb-2">{info?.org_name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Address: {info?.org_address}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Phone: {info?.org_phone}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Email: {info?.org_email}</p>
          {info?.org_site && (
            <p className="text-gray-600 dark:text-gray-300">
              <a href={info?.org_site} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{info?.org_site}</a>
            </p>
          )}
          <Map streetAddress={address} />
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Loading church data...</p>
      )}
    </div>
  );
}