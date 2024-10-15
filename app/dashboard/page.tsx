import { Button } from '@/components/ui/button';
import { getChurches } from '@/utils/data/church/get-churches';
import Link from 'next/link';
import RenderChurch from './_components/home/render-church';
import OnboardingSteps from './_components/onboarding-card';

export default async function Dashboard() {
  const church = await getChurches();

  return (
    <main className="flex flex-wrap gap-2 lg:gap-2 w-full">
      {church?.result?.map((church: any, index: number) =>
        <RenderChurch key={index} church={church} />)
      }
    </main>
  )
}