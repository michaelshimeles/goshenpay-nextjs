import { getChurches } from "@/utils/data/church/get-churches";
import { auth } from "@clerk/nextjs/server";
import DonationConfigComponent from "../../_components/donation-config";

export default async function DonationConfigPage() {
  const church = await getChurches();
  const { userId } = auth()

  let churchInfo = church?.result?.[0]



  return (
    <DonationConfigComponent churchInfo={churchInfo} userId={userId!} />
  )
}