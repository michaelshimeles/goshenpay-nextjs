import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from "@/components/wrapper/page-wrapper";
import { VideoPlayer } from '@/components/video-player';

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  keywords: [''],
  title: 'Marketing page',
  openGraph: {
    description: 'Put description of the page.',
    images: ['']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing page',
    description: 'Put description of the page.',
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [''],
  },
}


export default async function MarketingPage() {

  return (
    <PageWrapper>
      <div className='flex flex-col min-h-screen items-center mt-[2.5rem] p-3 w-full'>
        <h1 className="scroll-m-20 max-w-[900px] text-3xl lg:text-5xl font-bold tracking-tight text-center">
          Setup Church Payments In 5 Minutes
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 text-sm md:text-lg text-center mt-2 dark:text-gray-400">
          Use this static page to have an explainer video with CTA and some copy. Great for marketing your product and getting sales.
        </p>
        <div className='flex flex-row gap-2 mt-2'>
          <Link href="/dashboard" className="mt-2">
            <Button>Get Started</Button>
          </Link>
          <Link href="/dashboard" className="mt-2">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
        <div className='mb-3 mt-[1.5rem] max-w-[900px] w-full'>
          <VideoPlayer videoSrc="https://utfs.io/f/08b0a37f-afd7-4623-b5cc-e85184528fce-1f02.mp4" />
        </div>

      </div>
    </PageWrapper>
  )
}
