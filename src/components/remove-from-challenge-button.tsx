"use client"

import { TrashIcon } from "lucide-react"
import { useTransition } from "react"

import { removeFromChallenge } from "@/app/_actions"
import { Button } from "@/components/ui/button"
import { Book } from "@/db/schema"

export const RemoveFromChallengeButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(() => {
          removeFromChallenge(book.id)
        })
      }
      className="flex items-center gap-x-1.5"
    >
      <TrashIcon className="size-4" />
      {`Remove`}
    </button>
  )
}
