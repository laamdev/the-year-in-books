import Image from "next/image"
import { Suspense } from "react"

import { getChallenge } from "@/app/_actions"
import { BookCard } from "@/components/book-card"
import { BookGrid } from "@/components/book-grid"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { BookGridSkeleton } from "@/components/skeletons/book-grid-skeleton"
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
        <Suspense fallback={<BookGridSkeleton />}>
          <BookGrid>
            {challenge.success.books.map((book) => (
              <BookCard book={book} />
            ))}
          </BookGrid>
        </Suspense>
      </MaxWidthWrapper>
    )
  }
}
