"use client"
import { Button } from "@/components/ui/button";
import { paymentFixed } from "@/utils/actions/connect/payment-fixed";

export default function PaymentButton({ amount, church_id }: {
  amount: string,
  church_id: string
}) {
  return (
    <Button onClick={async () => paymentFixed(amount, church_id)}>
      Donate
    </Button>

  )
}