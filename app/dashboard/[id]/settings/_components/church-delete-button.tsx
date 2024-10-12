"use client"
import { Button } from "@/components/ui/button"
import { deleteChurch } from "@/utils/actions/delete-church"
import { useState } from "react"
import { toast } from "sonner"

export default function DeleteButton(info: any, userId: string) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Button variant="destructive" disabled={loading} onClick={async () => {
      setLoading(true)
      try {
        const result = await deleteChurch(info?.church_id, userId!)
        setLoading(false)
        return result
      } catch (error) {
        toast("Deleting failed")
        setLoading(false)
        return error
      }
    }}>{loading ? "Loading" : "Delete"}</Button>

  )
}