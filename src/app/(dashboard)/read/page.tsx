import Image from "next/image"
import { Suspense } from "react"

import { getChallenge } from "@/app/_actions"
import { BookCard } from "@/components/book-card"
import { BookCarousel } from "@/components/book-carousel"
import { BookGrid } from "@/components/book-grid"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Badge } from "@/components/ui/badge"

export default async function ReadPage() {
  const challenge = await getChallenge()
  if (challenge?.error) return <h1>{challenge.error}</h1>
  if (challenge?.success) {
    const readBooks = challenge.success.books.filter((book) => book.is_read)
    const readBooksCount = readBooks.length

    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`${readBooksCount} books`}</Badge>
          </div>
          <Heading>{`Read`}</Heading>
        </div>

        <Suspense fallback={null}>
          {readBooksCount > 0 && <BookCarousel books={readBooks} />}
          {readBooksCount === 0 && (
            <div className="mt-10">
              <p>{`You haven't read any of the books in your library.`}</p>
            </div>
          )}
        </Suspense>
      </MaxWidthWrapper>
    )
  }
}
