import { Metadata } from "next"
import { cookies } from "next/headers"
import { Suspense } from "react"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { BooksTable } from "@/components/books/books-table"
import { EmptyChallengeFeedback } from "@/components/challenge/empty-challenge-feedback"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Pagination } from "@/components/pagination"
import { SearchBar } from "@/components/search-bar"
import { Heading } from "@/components/shared/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { Book } from "@/db/schema"
import { fetchFilteredBooks, ITEMS_PER_PAGE } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Add a Book",
}

export default async function AddPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
  }

  if (data) {
    const challenge = await getChallengeAction(data.user?.id)

    if (challenge?.error)
      return <EmptyChallengeFeedback errorMessage={challenge.error} />

    if (challenge?.success) {
      const query = searchParams.query ?? ""
      const currentPage = Number(searchParams?.page) || 1

      let books: any[] = []

      const initialBooksData: Book[] = []

      const filteredBooks = await fetchFilteredBooks(query, currentPage)

      if (query.length > 0) {
        if (filteredBooks) {
          books = filteredBooks.books
        } else {
          books = []
        }
      } else {
        books = initialBooksData ?? []
      }

      const totalPages = Math.ceil(Number(filteredBooks.count) / ITEMS_PER_PAGE)

      return (
        <MaxWidthWrapper>
          <Heading>{`Add Books`}</Heading>

          <section className="mt-10">
            {challenge.success.books_in_challenge_count !==
              challenge.success.books.length && <SearchBar />}

            {challenge.success.books_in_challenge_count ===
              challenge.success.books.length && (
              <p className="max-w-prose">{`The amount of books in your library is the same as the books you want to read this year. If you want to add different books, please first remove one or more unwanted books from your challenge.`}</p>
            )}

            {query && (
              <>
                <Suspense
                  key={query + currentPage}
                  fallback={<Skeleton className="mt-10 h-64" />}
                >
                  <BooksTable
                    challenge={challenge.success}
                    books={filteredBooks.books}
                  />
                </Suspense>

                <div className="mt-5 flex w-full justify-center">
                  <Pagination totalPages={totalPages} />
                </div>
              </>
            )}
          </section>
        </MaxWidthWrapper>
      )
    }
  }
}
