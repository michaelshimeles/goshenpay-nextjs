import React from 'react';
import { getChurches } from "@/utils/data/church/get-churches";
import { auth } from "@clerk/nextjs/server";
import { getDonationConfig } from "@/utils/data/church/get-donation-configuration";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import DonationConfigComponent from "../_components/donation-config";
import { Edit } from 'lucide-react';
import DonationPricingCards from './_components/DonationPricingCards';

export default async function DonationConfigPage() {
  const church = await getChurches();
  const { userId } = auth()

  let churchInfo = church?.result?.[0]
  const result = await getDonationConfig(churchInfo?.church_id)

  const donationConfig = result?.result;

  if (!donationConfig) {
    return (
      <DonationConfigComponent churchInfo={churchInfo} userId={userId!} />
    )
  }

  return (
    <main className='flex flex-col justify-center items-start'>
      <Card className="w-full max-w-2xl m-6">
        <CardHeader>
          <CardTitle className='flex justify-between w-full items-center'>
            Donation Configuration
            <Link href="/dashboard/pricing/edit">
              <Edit className='w-5 h-5 hover:cursor-pointer' />
            </Link>
          </CardTitle>
          <CardDescription>Current donation settings for your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Donation Type</h3>
            <p>{donationConfig.donationType === "both" ? "One-time donations & Subscriptions" : donationConfig.donationType.charAt(0).toUpperCase()
              + donationConfig.donationType.slice(1)}</p>
          </div>

          <div>
            <h3 className="font-semibold">One-Time Amounts</h3>
            <ul className="list-disc list-inside">
              {donationConfig.oneTimeAmounts.map((amount: any, index: number) => (
                <li key={index}>${amount.value}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Allow Custom Amount</h3>
            <p>{donationConfig.allowCustomAmount ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <h3 className="font-semibold">Subscription Amounts</h3>
            <ul className="list-disc list-inside">
              {donationConfig.subscriptionAmounts.map((amount: any, index: number) => (
                <li key={index}>${amount.value}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Subscription Frequencies:</h3>
            <ul className="list-disc list-inside">
              {donationConfig.subscriptionFrequencies.map((frequency: string, index: number) => (
                <li key={index}>{frequency.charAt(0).toUpperCase()
                  + frequency.slice(1)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/pricing/edit" className="w-full">
            <Button className="w-full">Edit Configuration</Button>
          </Link>
        </CardFooter>
      </Card>
      <DonationPricingCards donationConfig={donationConfig} church_id={churchInfo?.church_id} />
    </main>
  );
}