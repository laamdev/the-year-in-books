"use client"

import { TrashIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

import { RemoveBookFromChallengeForm } from "@/components/forms/remove-book-from-challenge-form"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Props {
  id: number
  title: string
}

export const RemoveBookFromChallengeDialog = ({ id, title }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            className: "w-full justify-start",
            variant: "destructive",
          })
        )}
      >
        <TrashIcon className="mr-2 size-4" />
        <span>{`Remove`}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2.5">
          <DialogTitle>{`Are you absolutely sure?`}</DialogTitle>
          <DialogDescription>
            {`Do you want to remove ${title} from your challenge. This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <RemoveBookFromChallengeForm setOpen={setOpen} id={id} title={title} />
      </DialogContent>
    </Dialog>
  )
}
