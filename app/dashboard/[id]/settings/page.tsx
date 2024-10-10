import { getChurch } from "@/utils/data/church/get-church";
import ChurchFormSettings from "./_components/church-form-settings";

export default async function Settings({ params }: { params: { id: string } }) {

  const church = await getChurch();
  return (
    <div className="flex flex-col mb-[5rem] w-full p-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        Church Settings
      </h1>
      <p className="leading-7 text-sm dark:text-gray-400">
        Edit your church or organization settings.
      </p>
      <ChurchFormSettings church={church?.result?.[0]} id={params.id} />
    </div>
  )
}
