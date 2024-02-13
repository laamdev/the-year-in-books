"use client"

import { StarIcon } from "@heroicons/react/24/solid"
import { useState, useTransition } from "react"

import { giveRating } from "@/app/actions/book-actions"
import { cn } from "@/lib/utils"

interface RatingProps {
  bookId: number
  bookRating: number
}

export const Rating = ({ bookId, bookRating }: RatingProps) => {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex gap-x-1">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await setRating(index + 1)
                    await giveRating(bookId, currentRating)
                  } catch (error) {}
                })
              }
              className="hidden"
            />
            <StarIcon
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              className={cn("hover:text-primary size-8 cursor-pointer", {
                "text-yellow-500":
                  bookRating! >= currentRating || hover! >= currentRating,
              })}
            />
          </label>
        )
      })}
    </div>
  )
}
