import { Button } from '@/components/ui/button';
import { getChurches } from '@/utils/data/church/get-churches';
import Link from 'next/link';
import RenderChurch from './_components/home/render-church';

export default async function Dashboard() {
  const church = await getChurches();

  return (
    <main className="flex flex-wrap gap-2 lg:gap-2 w-full">
      {church?.result?.length > 0 ? church?.result?.map((church: any, index: number) =>
        <RenderChurch key={index} church={church} />)
        :
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              You have no donation page
            </h1>
            <p className="text-sm text-muted-foreground mb-3">
              To create a donation page, click the button below.
            </p>
            <Link href="/create">
              <Button>Create Donation Page</Button>
            </Link>
          </div>
        </div>}
    </main>
  )
}