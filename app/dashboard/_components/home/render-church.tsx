"use client"
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function RenderChurch({ church }: { church: any }) {

  return (
    <main className="flex flex-col gap-2 lg:gap-2">
      <Link href={`/dashboard/${church?.church_id}`}>
        <Card className="flex flex-col px-[1rem] justify-between py-[1rem] min-w-[350px] max-w-[350px] w-full">
          <div className='flex flex-col w-full justify-center items-startxw'>
            <h2 className="text-lg font-bold">{church?.org_name}</h2>
            <p className="dark:text-gray-400 text-gray-600 pt-1 text-sm">{church?.org_description}</p>
          </div>
          <div className="flex justify-between mt-2 items-center w-full">
            <p className='text-xs px-2 py-1 rounded-full border bg-zinc-900 text-white'>{church?.org_site}</p>
          </div>
        </Card>
      </Link>
    </main>
  )
}