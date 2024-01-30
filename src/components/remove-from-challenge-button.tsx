"use client"

import { TrashIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useTransition } from "react"

import { removeFromChallenge } from "@/app/_actions"
import { useToast } from "@/components/ui/use-toast"
import { Book } from "@/db/schema"

export const RemoveFromChallengeButton = ({ book }: { book: Book }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const triggerToastSuccess = () => {
    toast({
      title: "Success!",
      description: `You've removed ${book.title} from your challenge.`,
    })
  }

  const triggerToastError = () => {
    toast({
      title: "Error!",
      description: `Couldn't remove ${book.title} from your challenge. Try again.`,
    })
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          try {
            await removeFromChallenge(book.id)
            await triggerToastSuccess()
          } catch (error) {
            await triggerToastError()
          }
        })
      }
      className="flex items-center gap-x-1.5"
    >
      <TrashIcon className="size-4" />
      {`Remove`}
    </button>
  )
}
