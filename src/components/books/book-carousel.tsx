import { Suspense } from "react"

import { BookCard } from "@/components/books/book-card"
import { BookCardSkeleton } from "@/components/skeletons/book-card-skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Book } from "@/db/schema"

export const BookCarousel = ({ books }: { books: Book[] }) => {
  return (
    <Carousel className="mt-10">
      <CarouselPrevious />
      <CarouselContent className="-ml-2 md:-ml-4">
        {books.map((book) => (
          <CarouselItem className="pl-2 md:basis-1/3 md:pl-4 lg:basis-1/5">
            <Suspense fallback={<BookCardSkeleton />}>
              <BookCard book={book} />
            </Suspense>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}
