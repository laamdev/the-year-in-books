import { Suspense } from "react"

import { BookCard } from "@/components/books/book-card"
import { Subheading } from "@/components/shared/subheading"
import { BookCardSkeleton } from "@/components/skeletons/book-card-skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Book } from "@/db/schema"

interface Props {
  title: string
  count: number
  books: Book[]
}

export const BookCarousel = ({ title, count, books }: Props) => {
  return (
    <div>
      <div className="flex items-start gap-x-2.5">
        <Subheading>{`${title}`}</Subheading>
        <Badge variant="outline" className="h-fit">
          {`${count}`}
        </Badge>
      </div>
      <Carousel className="mt-10">
        <CarouselPrevious />
        <CarouselContent className="-ml-2 md:-ml-4">
          {books.map((book) => (
            <Suspense fallback={<BookCardSkeleton />}>
              <CarouselItem className="relative basis-1/2 pl-4 md:basis-1/3 md:pl-4 lg:basis-1/5">
                <BookCard book={book} />
              </CarouselItem>
            </Suspense>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  )
}
