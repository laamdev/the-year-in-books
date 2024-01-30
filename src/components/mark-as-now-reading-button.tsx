"use client"

import { BookCheckIcon, BookOpenTextIcon } from "lucide-react"
import { useTransition } from "react"

import { markAsNowReading, markAsRead } from "@/app/_actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"

export const MarkAsNowReadingButton = ({ book }: { book: Book }) => {
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
            await markAsNowReading(book.id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className="flex items-center gap-x-1.5"
    >
      <BookOpenTextIcon className="size-4" />

      <span>{`Mark as now reading`}</span>
    </button>
  )
}
