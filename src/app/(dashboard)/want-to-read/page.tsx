import { Suspense } from "react"

import { getChallenge } from "@/app/_actions"
import { BookCarousel } from "@/components/book-carousel"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { BookGridSkeleton } from "@/components/skeletons/book-grid-skeleton"
import { Badge } from "@/components/ui/badge"

export default async function ReadPage() {
  const challenge = await getChallenge()
  if (challenge?.error) return <h1>{challenge.error}</h1>
  if (challenge?.success) {
    const wantToReadBooks = challenge.success.books.filter(
      (book) => !book.is_read
    )
    const wantToReadBooksCount = wantToReadBooks.length

    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`${wantToReadBooksCount} books`}</Badge>
          </div>
          <Heading>{`Want to Read`}</Heading>
        </div>

        <Suspense fallback={<BookGridSkeleton />}>
          {wantToReadBooksCount > 0 && <BookCarousel books={wantToReadBooks} />}
          {wantToReadBooksCount === 0 && (
            <div className="mt-10">
              <p>{`You haven't read any of the books in your library.`}</p>
            </div>
          )}
        </Suspense>
      </MaxWidthWrapper>
    )
  }
}
