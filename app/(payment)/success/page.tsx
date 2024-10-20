import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessful() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle className="text-xl font-semibold">Payment Successful</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-medium">$99.99</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Card
              </span>
              <span className="font-medium">****1234</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Date
              </span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/dashboard">View Order Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}