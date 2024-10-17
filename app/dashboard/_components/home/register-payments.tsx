"use client"
import { Button } from "@/components/ui/button"
import { registerLink } from "@/utils/actions/connect/register-link"
import { useRouter } from "next/navigation"

export default function RegisterPayment() {
  const router = useRouter()

  return (
    <Button
      onClick={async () => {
        try {
          const result = await registerLink()
          router.push(result?.url)
        } catch (error: any) {
          return error
        }
      }}>
      Register Payments
    </Button>

  )
}