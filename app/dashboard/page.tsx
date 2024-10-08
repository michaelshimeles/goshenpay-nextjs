import { getChurch } from '@/utils/data/church/get-church';
import RenderChurch from './_components/home/render-church';
import { auth } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId } = auth();
  const church = await getChurch();

  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <RenderChurch church={church?.result?.[0]} userId={userId!} />
    </main>
  )
}