"use client"

import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/16/solid"
import { useTransition } from "react"

import { markAsRead } from "@/app/_actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface Props {
  id: number
  title: string
  status: "read" | "now_reading" | "want_to_read"
}

export const ReadButton = ({ id, title, status }: Props) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = () => {
    toast({
      title: "Success!",
      description: `You've marked ${title} as now reading.`,
    })
  }

  const triggerToastError = () => {
    toast({
      title: "Error!",
      description: `Couldn't mark ${title} as now reading. Please try again.`,
    })
  }

  return (
    <Button
      variant="secondary"
      onClick={() =>
        startTransition(async () => {
          try {
            await markAsRead(id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className={cn(
        status === "read" && "pointer-events-none cursor-not-allowed",
        "justify-start"
      )}
    >
      {isPending ? (
        <ArrowPathIcon className={cn("mr-2 size-4 animate-spin")} />
      ) : (
        <CheckCircleIcon
          className={cn(status === "read" && "fill-primary", "mr-2 size-4")}
        />
      )}

      <span>{status === "read" ? "Read" : "Mark as Read"}</span>
    </Button>
  )
}
