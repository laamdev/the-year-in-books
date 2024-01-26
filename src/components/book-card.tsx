import { CheckCircle2Icon } from "lucide-react"
import Image from "next/image"

import { BookActionMenu } from "@/components/book-action-menu"
import { Book } from "@/db/schema"

import { Skeleton } from "./ui/skeleton"

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <div key={book.version} className="relative">
      <div className="relative aspect-[3/5] rounded-md shadow">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="rounded-md object-cover object-center"
        />
      </div>
      <div className="mt-1 flex items-start justify-between">
        <div className="mt-2.5">
          <p className="text-primary text-xs font-medium uppercase">
            {book.author.split(",")[0]}
          </p>
          <h3 className="mt-0.5 font-serif text-xl font-semibold">
            {book.title}
          </h3>
        </div>
        <BookActionMenu book={book} />
      </div>
      {book.is_read && (
        <CheckCircle2Icon className="absolute right-1.5 top-1.5 z-50 size-8 fill-red-600 stroke-black" />
      )}
    </div>
  )
}
