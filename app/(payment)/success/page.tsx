import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, DollarSign } from "lucide-react"
import Stripe from 'stripe'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function PaymentSuccessful({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const session = await stripe.checkout.sessions.retrieve(params?.session_id as string)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold ">Payment Successful</CardTitle>
          <CardDescription className="text-gray-300">
            Your payment has been processed successfully. Here are the details of your transaction:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Amount Paid</span>
              <span className="flex justify-center items-center text-2xl font-bold">
                <DollarSign className="inline h-6 w-6 text-green-600" />
                {(session.amount_total! / 100).toFixed(2)} {session.currency?.toUpperCase()}
              </span>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold ">Customer Details</h3>
              <p className="text-sm text-gray-300">Name: {session.customer_details?.name}</p>
              <p className="text-sm text-gray-300">Email: {session.customer_details?.email}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold ">Payment Information</h3>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Payment Status</span>
                <Badge variant={session.payment_status === 'paid' ? "default" : "secondary"}>
                  {session.payment_status}
                </Badge>
              </div>
              <p className="text-sm text-gray-300">Payment ID: {session.payment_intent as string}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold ">Session Details</h3>
              <p className="text-sm text-gray-300">Session ID: {session.id}</p>
              <p className="text-sm text-gray-300">Created: {new Date(session.created * 1000).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end w-full">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}