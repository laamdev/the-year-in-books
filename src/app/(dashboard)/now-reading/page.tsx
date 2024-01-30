import { getChallenge } from "@/app/_actions"
import { BookCarousel } from "@/components/books/book-carousel"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Badge } from "@/components/ui/badge"

export default async function NowReadingPage() {
  const challenge = await getChallenge()
  if (challenge?.error) return <h1>{challenge.error}</h1>
  if (challenge?.success) {
    const readBooks = challenge.success.books.filter(
      (book) => book.status === "now_reading"
    )
    const readBooksCount = readBooks.length

    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`${readBooksCount} books`}</Badge>
          </div>
          <Heading>{`Now Reading`}</Heading>
        </div>

        {readBooksCount > 0 && <BookCarousel books={readBooks} />}
        {readBooksCount === 0 && (
          <div className="mt-10">
            <p>{`You are not reading any books at the moment.`}</p>
          </div>
        )}
      </MaxWidthWrapper>
    )
  }
}