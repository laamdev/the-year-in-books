"use client"

import { BookCheckIcon, BookXIcon } from "lucide-react"
import { useTransition } from "react"

import { markAsNotRead, markAsRead } from "@/app/_actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"

export const MarkAsReadButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = (isRead: boolean) => {
    toast({
      title: "Success!",
      description: isRead
        ? `You've marked ${book.title} as want to read.`
        : `You've marked ${book.title} as read.`,
    })
  }

  const triggerToastError = (isRead: boolean) => {
    toast({
      title: "Error!",
      description: isRead
        ? `Couldn't mark ${book.title} as want to read. Please try again.`
        : `Couldn't mark ${book.title} as read. Please try again.`,
    })
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            book.is_read
              ? await markAsNotRead(book.id)
              : await markAsRead(book.id)
            await triggerToastSuccess(book.is_read)
          } catch (error) {
            await triggerToastError(book.is_read)
          }
        })
      }
      className="flex items-center gap-x-1.5"
    >
      {book.is_read ? (
        <BookXIcon className="size-4" />
      ) : (
        <BookCheckIcon className="size-4" />
      )}

      {book.is_read ? `Mark as not  read` : `Mark as read`}
    </button>
  )
}
