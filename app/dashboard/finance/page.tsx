import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getChurches } from "@/utils/data/church/get-churches";
import { accountStatus } from "@/utils/data/connect/account-status";
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';
import RegisterPayment from '../_components/home/register-payments';

export default async function Finance() {
  const church = await getChurches();

  let churchInfo = church?.result?.[0]

  const response = await accountStatus(churchInfo?.church_id);

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl">
      {response ? (
        <Card className="overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold">Stripe Account Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <StatusIcon status={response.is_stripe_connected ? 'active' : 'inactive'} />
                  <span className="text-gray-700 dark:text-gray-200">
                    Connection Status: {response.is_stripe_connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                {response?.is_stripe_connected && (
                  <>
                    <div className="flex items-center space-x-3 text-sm">
                      <StatusIcon status={response.stripe_account_status} />
                      <span className="text-gray-700 dark:text-gray-200">
                        Account Status: {response.stripe_account_status.charAt(0).toUpperCase()
                          + response.stripe_account_status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-5 w-5 text-gray-500 " />
                      <span className="text-gray-700 dark:text-gray-200">
                        Account Type: {response.stripe_account_type.charAt(0).toUpperCase()
                          + response.stripe_account_type.slice(1)}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {response?.is_stripe_connected && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Account Capabilities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(response.stripe_account_capabilities).map(([capability, status]) => (
                      <div key={capability} className="flex items-center space-x-2 text-sm">
                        <StatusIcon status={status as string} />
                        <span className="capitalize">{capability.replace(/_/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {response.stripe_account_requirements?.disabled_reason || response.stripe_account_requirements?.current_deadline && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Account Requirements</h3>
                {response.stripe_account_requirements.disabled_reason && (
                  <p className="text-sm text-yellow-600 mb-2">
                    Disabled Reason: {response.stripe_account_requirements.disabled_reason}
                  </p>
                )}
                {response.stripe_account_requirements.current_deadline && (
                  <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                    Deadline: {new Date(response.stripe_account_requirements.current_deadline * 1000).toLocaleDateString()}
                  </p>
                )}
                {['errors', 'past_due', 'currently_due', 'eventually_due', 'pending_verification'].map((requirement) => {
                  const items = response.stripe_account_requirements[requirement];
                  if (items && items.length > 0) {
                    return (
                      <div key={requirement} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200 capitalize mb-1">{requirement.replace(/_/g, ' ')}</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
                          {items.map((item: any, index: number) => (
                            <li key={index}>{typeof item === 'string' ? item : item.reason}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            <div className="mt-6">
              {!response?.is_stripe_connected ? (
                <RegisterPayment />
              ) : (
                <Link href="https://dashboard.stripe.com/test" target="_blank" rel="noopener noreferrer">
                  <Button>Access Stripe Dashboard</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b">
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}