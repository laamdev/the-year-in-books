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
    const booksCount = challenge.success.books.length
    const readBooksCount = challenge.success.books.filter(
      (book) => book.is_read
    ).length
    const wantToReadBooksCount = challenge.success.books.filter(
      (book) => !book.is_read
    ).length
    const booksInChallengeCount = challenge.success.books_in_challenge_count
    return (
      <div className="relative h-screen">
        <Sidebar
          booksCount={booksCount}
          readBooksCount={readBooksCount}
          wantToReadBooksCount={wantToReadBooksCount}
          booksInChallengeCount={booksInChallengeCount}
        >
          {children}
        </Sidebar>
      </div>
    )
  }
}
