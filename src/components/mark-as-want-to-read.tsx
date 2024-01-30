"use client"

import { BookCheckIcon, BookXIcon } from "lucide-react"
import { useTransition } from "react"

import { markAsWantToRead } from "@/app/_actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"

export const MarkAsWantToReadButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = () => {
    toast({
      title: "Success!",
      description: `You've marked ${book.title} as now reading.`,
    })
  }

  const triggerToastError = () => {
    toast({
      title: "Error!",
      description: `Couldn't mark ${book.title} as now reading. Please try again.`,
    })
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await markAsWantToRead(book.id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className="flex items-center gap-x-1.5"
    >
      <BookXIcon className="size-4" />

      <span>{`Mark as want to read`}</span>
    </button>
  )
}
