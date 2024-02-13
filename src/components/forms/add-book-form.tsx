"use client"

import { ArrowPathIcon, CheckIcon, PlusIcon } from "@heroicons/react/16/solid"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { addBookToChallengeAction } from "@/app/actions/book-actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Book, Challenge } from "@/db/schema"
import { ApiBookFormated } from "@/types"

export const AddBookForm = ({
  selectedBook,
  challenge,
}: {
  selectedBook: ApiBookFormated
  challenge: Challenge
}) => {
  const bookToAdd = {
    title: selectedBook.title,
    version: selectedBook.version,
    cover: `https://covers.openlibrary.org/b/id/${selectedBook.cover}-L.jpg`,
    author: selectedBook?.author?.toString().split(",")[0],
    year: selectedBook.year,
    pages: selectedBook.pages,
    challenge_id: challenge.id,
    status: "want_to_read",
  }

  const addBookToChallengeWithSelectedBookAction =
    //@ts-expect-error
    addBookToChallengeAction.bind(null, bookToAdd)

  const [state, formAction] = useFormState(
    //@ts-expect-error
    addBookToChallengeWithSelectedBookAction,
    null
  )
  const { toast } = useToast()

  // @ts-expect-error
  const booksVersions = challenge?.books.map((book: Book) => book.version)

  useEffect(() => {
    if (state?.data) {
      toast({
        title: "Success!",
        description: `You have added ${state.data.title} to your challenge.`,
      })

      redirect("/library")
    }

    if (state?.error) {
      toast({
        title: "Error!",
        description: `${state?.error}`,
      })
    }
  }, [toast, state])

  return (
    <form action={formAction}>
      <SubmitButton booksVersions={booksVersions} selectedBook={selectedBook} />
    </form>
  )
}

const SubmitButton = ({
  booksVersions,
  selectedBook,
}: {
  booksVersions: number[]
  selectedBook: ApiBookFormated
}) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending || booksVersions.includes(selectedBook.version)}
      className="disabled:cursor-not-allowed"
      title="Already added to challenge."
    >
      {pending ? (
        <ArrowPathIcon className="size-4 animate-spin" />
      ) : (
        <>
          {booksVersions.includes(selectedBook.version) ? (
            <CheckIcon className="size-4" />
          ) : (
            <PlusIcon className="size-4" />
          )}
        </>
      )}
    </Button>
  )
}
