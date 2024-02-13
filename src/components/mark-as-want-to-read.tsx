"use client"

import { ArrowPathIcon, ClockIcon } from "@heroicons/react/16/solid"
import { useTransition } from "react"

import { markBookAsWantToReadAction } from "@/app/actions/book-actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"
import { cn } from "@/lib/utils"

export const MarkAsWantToReadButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = () => {
    toast({
      title: "Success!",
      description: `You've added ${book.title} to your backlog.`,
    })
  }

  const triggerToastError = () => {
    toast({
      title: "Error!",
      description: `Couldn't add ${book.title} to your backlog. Please try again.`,
    })
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await markBookAsWantToReadAction(book.id)
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
        <ClockIcon className={cn("mr-2 size-4")} />
      )}

      <span>{`Add to Backlog`}</span>
    </button>
  )
}
