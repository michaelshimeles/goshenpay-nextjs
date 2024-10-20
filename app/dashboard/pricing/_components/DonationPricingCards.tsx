"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { paymentFixed } from '@/utils/actions/connect/payment-fixed';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { paymentSubscription } from '@/utils/actions/connect/payment-subscription';

const DonationPricingCards = ({ donationConfig, church_id }: any) => {
  const { donationType, oneTimeAmounts, subscriptionAmounts, subscriptionFrequencies } = donationConfig;

  console.log('subscriptionFrequencies', subscriptionFrequencies)
  const router = useRouter();

  const handleOneTimePayment = async (amount: any) => {
    try {
      console.log('amount', amount)
      console.log('church_id', church_id)
      const result = await paymentFixed(amount, church_id);
      console.log('Payment result:', result?.session?.url);

      if (!result?.success) {
        toast(result?.message)
      }
      // Handle the result here (e.g., show a success message, redirect to a payment page, etc.)
      router.push(result?.session?.url);

      return result
    } catch (error: any) {
      console.error('Payment error:', error);
      // Handle the error here (e.g., show an error message)
      toast(error?.message)

      return error
    }
  };

  const handleSubscriptionPayment = async (amount: any, interval: string) => {
    try {
      const result = await paymentSubscription(amount, church_id, interval);

      if (!result?.success) {
        toast(result?.message)
      }
      // Handle the result here (e.g., show a success message, redirect to a payment page, etc.)
      router.push(result?.session?.url);

      return result
    } catch (error: any) {
      console.error('Payment error:', error);
      // Handle the error here (e.g., show an error message)
      toast(error?.message)

      return error
    }
  };

  const renderOneTimeCards = () => (
    oneTimeAmounts.map((amount: any, index: number) => (
      <Card key={`one-time-${index}`} className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>One-Time Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md font-medium">${amount.value}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleOneTimePayment(amount.value)}>
            Donate Now
          </Button>
        </CardFooter>
      </Card>
    ))
  );

  const renderSubscriptionCards = () => (
    subscriptionAmounts.map((amount: any, amountIndex: number) => (
      subscriptionFrequencies.map((frequency: any, freqIndex: number) => (
        <Card key={`sub-${amountIndex}-${freqIndex}`} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>{frequency.charAt(0).toUpperCase() + frequency.slice(1)} Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md font-medium">${amount.value}</p>
            <p className="text-sm text-gray-500">per {frequency}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleSubscriptionPayment(amount.value, frequency)}>Subscribe</Button>
          </CardFooter>
        </Card>
      ))
    )).flat()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {donationType === 'one-time' || donationType === 'both' ? renderOneTimeCards() : null}
      {donationType === 'subscription' || donationType === 'both' ? renderSubscriptionCards() : null}
      {donationConfig.allowCustomAmount && (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Custom Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md font-medium">$XX</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Enter Custom Amount</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DonationPricingCards;