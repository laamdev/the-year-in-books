import { CheckCircle2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { BookActionMenu } from "@/components/book-action-menu"
import { Book } from "@/db/schema"

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link href="/" key={book.version} className="group ">
      <div className="relative aspect-[3/5] h-min overflow-hidden rounded-md shadow ">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="tw-transition rounded-md object-cover object-center group-hover:scale-105"
        />

        {book.is_read && (
          <CheckCircle2Icon className="absolute right-1.5 top-1.5 z-50 size-8 fill-red-600 stroke-black" />
        )}
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
    </Link>
  )
}
