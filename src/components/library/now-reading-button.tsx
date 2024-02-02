"use client"

import { ArrowPathIcon, BookOpenIcon } from "@heroicons/react/16/solid"
import { useTransition } from "react"

import { markAsNowReading } from "@/app/_actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface Props {
  id: number
  title: string
  status: "read" | "now_reading" | "want_to_read"
}

export const NowReadingButton = ({ title, status, id }: Props) => {
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
            await markAsNowReading(id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className={cn(
        status === "now_reading" && "pointer-events-none cursor-not-allowed",
        "justify-start"
      )}
    >
      {isPending ? (
        <ArrowPathIcon className={cn("mr-2 size-4 animate-spin")} />
      ) : (
        <BookOpenIcon
          className={cn(
            status === "now_reading" && "fill-primary",
            "mr-2 size-4"
          )}
        />
      )}
      <span>
        {status === "now_reading" ? "Currently Reading" : "Mark as Reading"}
      </span>
    </Button>
  )
}
