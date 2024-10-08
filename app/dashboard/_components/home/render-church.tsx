"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getChurchSchema } from '@/utils/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import ChurchForm from './church-form';

export default function RenderChurch({ church, userId }: { church: z.infer<typeof getChurchSchema>, userId: string }) {
  const queryParams = useSearchParams();
  const search = queryParams.get('search') || '';


  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      {(search !== "create" && !church?.church_id) && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              You have no donation page
            </h1>
            <p className="text-sm text-muted-foreground mb-3">
              To create a donation page, click the button below.
            </p>
            <Link href="/dashboard?search=create">
              <Button>Create Donation Page</Button>
            </Link>
          </div>
        </div>
      )}
      {church?.church_id
        &&
        <Card className="flex flex-col px-[1rem] justify-between py-[1rem] max-w-[350px] w-full">
          <div className='flex flex-col w-full justify-center items-startxw'>
            <h2 className="text-lg font-bold">{church?.org_name}</h2>
            <p className="text-gray-400 pt-1 text-sm">{church?.org_description}</p>
          </div>
          <div className="flex justify-between mt-2 items-center w-full">
            <p className='text-xs px-2 py-1 rounded-full border bg-zinc-900 text-gray-300'>{church?.org_site}.{process.env.BASE_DOMAIN}</p>
          </div>
        </Card>
      }
      {(search === "create" && !church?.church_id) && (
        <ChurchForm userId={userId} />
      )}
    </main>
  )
}