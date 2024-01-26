"use client"

import { BookCheckIcon, BookXIcon } from "lucide-react"
import { useTransition } from "react"

import { markAsNotRead, markAsRead } from "@/app/_actions"
import { Book } from "@/db/schema"

export const MarkAsReadButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(() => {
          book.is_read ? markAsNotRead(book.id) : markAsRead(book.id)
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
