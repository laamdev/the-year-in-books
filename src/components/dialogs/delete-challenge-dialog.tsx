"use client"

import { TrashIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DeleteChallengeForm } from "../forms/delete-challenge-form"

export const DeleteChallengeDialog = ({
  challengeId,
}: {
  challengeId: number
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="tw-transition size-4 opacity-75 hover:opacity-100" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2.5">
          <DialogTitle>{`Are you absolutely sure?`}</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete your challenge.`}
          </DialogDescription>
        </DialogHeader>
        <DeleteChallengeForm setOpen={setOpen} challengeId={challengeId} />
      </DialogContent>
    </Dialog>
  )
}
