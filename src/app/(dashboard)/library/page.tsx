import { Suspense } from "react"

import { getChallenge } from "@/app/_actions"
import { BookCard } from "@/components/books/book-card"
import { BookGrid } from "@/components/books/book-grid"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { BookCardSkeleton } from "@/components/skeletons/book-card-skeleton"
import { Badge } from "@/components/ui/badge"

export default async function LibraryPage() {
  const challenge = await getChallenge()
  if (challenge?.error) return <h1>{challenge.error}</h1>
  if (challenge?.success) {
    const bookCount = challenge.success.books.length
    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`${bookCount} books`}</Badge>
          </div>
          <Heading>{`Library`}</Heading>
        </div>
        <BookGrid size="sm">
          {challenge.success.books.map((book) => (
            <Suspense fallback={<BookCardSkeleton />} key={book.version}>
              <BookCard size="sm" book={book} key={book.version} />
            </Suspense>
          ))}
        </BookGrid>
      </MaxWidthWrapper>
    )
  }
}
