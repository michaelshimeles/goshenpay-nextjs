import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getChurches } from '@/utils/data/church/get-churches';
import { Building2, Globe, Mail, Phone } from "lucide-react";
import Map from "./_components/home/map";
export default async function Dashboard() {
  const church = await getChurches();

  let churchInfo = church?.result?.[0]
  let address = `${churchInfo?.org_address}, ${churchInfo?.org_city}, ${churchInfo?.org_country}, ${churchInfo?.org_zip}`

  return (
    <main className="flex flex-wrap gap-2 lg:gap-2 w-full">
      <div className="p-6 w-full max-w-4xl">
        {churchInfo ? (
          <Card className="overflow-hidden w-full">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-semibold">{churchInfo?.org_name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{churchInfo?.org_address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{churchInfo?.org_phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-200">{churchInfo?.org_email}</span>
                  </div>
                  {churchInfo?.org_site && (
                    <div className="flex items-center space-x-3 text-sm">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <a href={churchInfo?.org_site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{churchInfo?.org_site}</a>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Location Map</h3>
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
      </div>    </main>
  )
}