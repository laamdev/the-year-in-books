import { ReactNode } from "react"

import { getChallenge } from "@/app/_actions"
import { Sidebar } from "@/components/navigation/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const challenge = await getChallenge()
  if (challenge?.error) return <h1>{challenge.error}</h1>
  if (challenge?.success) {
    console.log(challenge.success)
    const booksCount = challenge.success.books.length

    const readBooksCount = challenge.success.books.filter(
      (book) => book.status === "read"
    ).length

    const nowReadingBooksCount = challenge.success.books.filter(
      (book) => book.status === "now_reading"
    ).length

    const wantToReadBooksCount = challenge.success.books.filter(
      (book) => book.status === "want_to_read"
    ).length

    const booksInChallengeCount = challenge.success.books_in_challenge_count
    return (
      <>
        <div className="relative hidden h-screen md:block">
          <Sidebar
            booksCount={booksCount}
            booksInChallengeCount={booksInChallengeCount}
            readBooksCount={readBooksCount}
            nowReadingBooksCount={nowReadingBooksCount}
            wantToReadBooksCount={wantToReadBooksCount}
          >
            {children}
          </Sidebar>
        </div>

        <div className="md:hidden">{children}</div>
      </>
    )
  }
}
