import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getChurch } from "@/utils/data/church/get-church";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import Map from "./_components/map";
import RegisterPayment from "./_components/register-payments";

export default async function Dashboard({ params }: { params: { id: string } }) {
  const church = await getChurch(params?.id!)
  const info = church?.result?.[0]
  const address = `${info?.org_address}, ${info?.org_city}, ${info?.org_country}, ${info?.org_zip}`

  return (
    <div className="p-6">
      {church ? (
        <Card className="overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold">{info?.org_name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{info?.org_address}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{info?.org_phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{info?.org_email}</span>
                </div>
                {info?.org_site && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <a href={info?.org_site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{info?.org_site}</a>
                  </div>
                )}
                <RegisterPayment />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Location Map</h3>
                <div className="h-[300px] rounded-md overflow-hidden">
                  <Map streetAddress={address} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b">
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}