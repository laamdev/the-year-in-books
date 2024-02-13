import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { Sidebar } from "@/components/navigation/sidebar"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  const challenge = await getChallengeAction(data.user.id)
  // if (challenge?.error) return <h1>{challenge.error}</h1>
  // if (challenge?.success) {
  const booksCount = challenge?.success?.books.length

  const readBooksCount = challenge?.success?.books.filter(
    (book) => book.status === "read"
  ).length

  const nowReadingBooksCount = challenge?.success?.books.filter(
    (book) => book.status === "now_reading"
  ).length

  const wantToReadBooksCount = challenge?.success?.books.filter(
    (book) => book.status === "want_to_read"
  ).length

  const booksInChallengeCount = challenge?.success?.books_in_challenge_count
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
