import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAccount } from "@/utils/data/connect/get-account"
import Link from 'next/link';

export default async function ConnectSuccess({ searchParams }: { searchParams: { accountId: string } }) {
  const accountInfo = await getAccount(searchParams?.accountId);

  const account = accountInfo.account;
  const createdDate = new Date(account.created * 1000).toLocaleDateString();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="">
            Congratulations! Your finance account has been successfully registered.
          </p>
          <div className="  p-4 rounded-lg text-left">
            <h3 className="font-semibold  mb-2">Account Details</h3>
            <p className="text-sm dark:text-gray-400">Account ID: <span className="font-medium">{account.id}</span></p>
            <p className="text-sm dark:text-gray-400">Email: <span className="font-medium">{account.email}</span></p>
            <p className="text-sm dark:text-gray-400">Country: <span className="font-medium">{account.country}</span></p>
            <p className="text-sm dark:text-gray-400">Currency: <span className="font-medium">{account.default_currency.toUpperCase()}</span></p>
            <p className="text-sm dark:text-gray-400">Created: <span className="font-medium">{createdDate}</span></p>
            <p className="text-sm dark:text-gray-400">Charges Enabled: <span className="font-medium">{account.charges_enabled ? 'Yes' : 'No'}</span></p>
            <p className="text-sm dark:text-gray-400">Payouts Enabled: <span className="font-medium">{account.payouts_enabled ? 'Yes' : 'No'}</span></p>
          </div>
          <div className="  p-4 rounded-lg text-left">
            <h3 className="font-semibold  mb-2">Business Profile</h3>
            <p className="text-sm dark:text-gray-400">Name: <span className="font-medium">{account.business_profile.name || 'Not provided'}</span></p>
            <p className="text-sm dark:text-gray-400">URL: <span className="font-medium">{account.business_profile.url || 'Not provided'}</span></p>
            <p className="text-sm dark:text-gray-400">Support Phone: <span className="font-medium">{account.business_profile.support_phone || 'Not provided'}</span></p>
          </div>
          <p className="text-sm dark:text-gray-400">
            Please review your account details and ensure all information is correct.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/dashboard">
            <Button>
              Continue to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}