"use client"

import { ArrowPathIcon, ClockIcon } from "@heroicons/react/16/solid"
import { useTransition } from "react"

import { markAsWantToRead } from "@/app/_actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface Props {
  id: number
  title: string
  status: "read" | "now_reading" | "want_to_read"
}

export const WantToReadButton = ({ id, title, status }: Props) => {
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
            await markAsWantToRead(id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className={cn(
        status === "want_to_read" && "pointer-events-none cursor-not-allowed",
        "justify-start"
      )}
    >
      {isPending ? (
        <ArrowPathIcon className={cn("mr-2 size-4 animate-spin")} />
      ) : (
        <ClockIcon
          className={cn(
            status === "want_to_read" && "fill-primary",
            "mr-2 size-4"
          )}
        />
      )}
      <span>
        {status === "want_to_read" ? "Want to Read" : "Add to Backlog"}
      </span>
    </Button>
  )
}
