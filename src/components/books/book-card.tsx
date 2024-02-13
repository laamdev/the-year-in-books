import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { BookActionMenu } from "@/components/books/book-action-menu"
import { Card } from "@/components/ui/card"
import { Book } from "@/db/schema"
import { cn } from "@/lib/utils"

interface Props {
  size?: "sm" | "DEFAULT"
  book: Book
}

export const BookCard = ({ size = "DEFAULT", book }: Props) => {
  return (
    <Card className="p-5">
      <Link href={`/library/${book.id}`}>
        <div className="relative aspect-[3/5] h-min overflow-hidden rounded-md shadow">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="bg-primary/10 tw-transition rounded-md object-cover object-center hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-1 flex items-start justify-between">
        <div className="mt-2.5">
          <p
            className={cn(
              "text-primary text-sm font-medium uppercase",
              size === "sm" && "text-[10px]"
            )}
          >
            {book.author}
          </p>
          <Balancer>
            <h3
              className={cn(
                "mt-0.5 font-serif text-lg font-semibold",
                size === "sm" && "text-base"
              )}
            >
              {book.title}
            </h3>
          </Balancer>
        </div>
        <BookActionMenu book={book} />
      </div>
    </Card>
  )
}
