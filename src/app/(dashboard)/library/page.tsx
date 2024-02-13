import { cookies } from "next/headers"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { BookCarousel } from "@/components/books/book-carousel"
import { EmptyChallengeFeedback } from "@/components/challenge/empty-challenge-feedback"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

export default async function LibraryPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()

  const challenge = await getChallengeAction(data.user?.id)
  if (challenge?.error) {
    return <EmptyChallengeFeedback errorMessage={challenge.error} />
  }
  if (challenge?.success) {
    const books = challenge.success.books
    const readBooks = books.filter((book) => book.status === "read")
    const wantToReadBooks = books.filter(
      (book) => book.status === "want_to_read"
    )
    const nowReadingBooks = books.filter(
      (book) => book.status === "now_reading"
    )
    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`${books.length} books`}</Badge>
          </div>
          <Heading>{`Library`}</Heading>
        </div>

        <div className="mt-20 flex flex-col gap-y-20">
          {readBooks && (
            <BookCarousel
              title="Read"
              emptyMsg="You've not read any books yet."
              count={readBooks.length}
              books={readBooks}
            />
          )}
          {nowReadingBooks && (
            <BookCarousel
              title="Now Reading"
              emptyMsg="You're not currently reading any books."
              count={nowReadingBooks.length}
              books={nowReadingBooks}
            />
          )}
          {wantToReadBooks && (
            <BookCarousel
              title="Want to Read"
              emptyMsg="You've not books in your backlog."
              count={wantToReadBooks.length}
              books={wantToReadBooks}
            />
          )}
        </div>
      </MaxWidthWrapper>
    )
  }
}
