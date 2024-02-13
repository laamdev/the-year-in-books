"use client"

import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/16/solid"
import { useTransition } from "react"

import { markBookAsReadAction } from "@/app/actions/book-actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"
import { cn } from "@/lib/utils"

export const MarkAsReadButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = () => {
    toast({
      title: "Success!",
      description: `You've marked ${book.title} as read.`,
    })
  }

  const triggerToastError = () => {
    toast({
      title: "Error!",
      description: `Couldn't mark ${book.title} as read. Please try again.`,
    })
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await markBookAsReadAction(book.id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className="flex items-center"
    >
      {isPending ? (
        <ArrowPathIcon className={cn("mr-2 size-4 animate-spin")} />
      ) : (
        <CheckCircleIcon className={cn("mr-2 size-4")} />
      )}

      <span>{`Mark as Read`}</span>
    </button>
  )
}
