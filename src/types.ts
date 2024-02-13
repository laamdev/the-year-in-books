import { ReactElement } from "react"

import { Book, Challenge } from "@/db/schema"

export interface ApiBook {
  title: string
  author_name: string
  first_publish_year: number
  _version_: number
  number_of_pages_median: number
  cover_i: string
}

export interface ApiBookFormated {
  id?: number
  title: string
  author: string
  version: number
  year: number
  pages: number
  cover: string
  status: string
  challenge_id?: number
}

export interface ChallengeWithBooks extends Challenge {
  books: Book[]
}

export interface IconProps {
  size?: number
  color?: string
}

export interface RatingProps {
  className?: string
  count: number
  value: number
  color?: string
  hoverColor?: string
  activeColor?: string
  size?: number
  edit?: boolean
  bookId: number
  isHalf?: boolean
  // // onChange?: (value: number) => void
  emptyIcon?: ReactElement
  halfIcon?: ReactElement
  fullIcon?: ReactElement
}
