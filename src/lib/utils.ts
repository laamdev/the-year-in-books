import { type ClassValue, clsx } from "clsx"
import { differenceInHours, endOfYear, getDayOfYear } from "date-fns"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export const currentYear = new Date().getFullYear()

export const timeLeft = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const from = new Date().toLocaleString("en-US", { timeZone: timezone })
  const to = endOfYear(from)
  const difference = differenceInHours(to, from)
  const days = Math.floor(difference / 24)
  const hours = Math.floor(difference % 24)

  return { days, hours }
}

export const getBookSchedule = (
  booksInChallenge: number,
  booksRead: number
) => {
  const daysInYear = 365
  const dayOfYearNumber = getDayOfYear(new Date())
  const readingRateInDays = Math.floor(daysInYear / booksInChallenge)

  const booksYouShouldHaveRead = Math.floor(dayOfYearNumber / readingRateInDays)

  const result = booksYouShouldHaveRead - booksRead

  return result
}

export const getTimestamp = () => {
  const date = format(new Date(), "MM/dd/yyyy kk:mm:ss")
  return date
}
