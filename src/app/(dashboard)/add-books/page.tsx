import Link from "next/link"
import { Suspense } from "react"

import { getChallenge } from "@/app/_actions"
import { BooksTable } from "@/components/books-table"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import Pagination from "@/components/pagination"
import { SearchBar } from "@/components/search-bar"
import { Heading } from "@/components/shared/heading"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Book } from "@/db/schema"
import { fetchFilteredBooks, ITEMS_PER_PAGE } from "@/lib/data"
import { cn } from "@/lib/utils"

export default async function AddPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string }
}) {
  const challenge = await getChallenge()

  if (challenge?.error)
    return (
      <MaxWidthWrapper>
        <p>{challenge.error}</p>
        <Link
          href="/challenge"
          className={cn(buttonVariants({ className: "mt-5" }))}
        >
          Create a Challenge
        </Link>
      </MaxWidthWrapper>
    )

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
          <SearchBar />

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
