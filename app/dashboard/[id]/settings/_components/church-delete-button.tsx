"use client"
import { Button } from "@/components/ui/button"
import { deleteChurch } from "@/utils/actions/delete-church"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function DeleteButton({ info, userId }: {
  info: any,
  userId: string
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  return (
    <Button variant="destructive" disabled={loading} onClick={async () => {
      setLoading(true)
      try {

        const result = await deleteChurch(info?.church_id, userId!)

        router.push("/dashboard")
        return result
      } catch (error) {
        toast("Deleting failed")
        setLoading(false)
        return error
      }
    }}>{loading ? "Deleting..." : "Delete"}</Button>

  )
}