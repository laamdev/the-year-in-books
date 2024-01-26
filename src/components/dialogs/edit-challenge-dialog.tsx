"use client"

import { PencilIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

import { EditChallengeForm } from "@/components/forms/edit-challenge-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  challengeId: number
  booksInChallengeCount: number
  booksInLibraryCount: number
}

export const EditChallengeDialog = ({
  challengeId,
  booksInChallengeCount,
  booksInLibraryCount,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilIcon className="tw-transition size-4 opacity-75 hover:opacity-100" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your challenge</DialogTitle>
          <DialogDescription>
            Modify the number of books you want to read this year.
          </DialogDescription>
        </DialogHeader>
        <EditChallengeForm
          setOpen={setOpen}
          challengeId={challengeId}
          booksInChallengeCount={booksInChallengeCount}
          booksInLibraryCount={booksInLibraryCount}
        />
      </DialogContent>
    </Dialog>
  )
}
