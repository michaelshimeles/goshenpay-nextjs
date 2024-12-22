import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import Link from "next/link"

export default function CancelledPayment() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            We're sorry, but your payment couldn't be processed. Don't worry, you haven't been charged.
          </p>
          <div className="rounded-lg overflow-hidden shadow-md">
            <VideoPlayer
              videoSrc="https://utfs.io/f/MD2AM9SEY8Gu4i6558XmIj1TPD8kwny9GdxKZfpRH5lvJcMb"
              // autoplay={true}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/dashboard/pricing">
            <Button size="lg" className="font-semibold">
              Try Again
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}