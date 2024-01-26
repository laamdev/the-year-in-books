"use client"

import { usePathname } from "next/navigation"

export const Quote = () => {
  const pathname = usePathname()
  const quote =
    pathname === "/sign-up"
      ? {
          body: `You can never get a cup of tea large enough or a book long enough to suit me.`,
          author: `C.S. Lewis`,
        }
      : {
          body: `If one cannot enjoy reading a book over and over again, there is no use in reading it at all.`,
          author: `Oscar Wilde`,
        }

  return (
    <blockquote className="space-y-2 rounded-md bg-black/75 p-5 shadow">
      <p className="text-lg font-semibold">{quote.body}</p>
      <footer className="text-sm">–{quote.author}</footer>
    </blockquote>
  )
}
