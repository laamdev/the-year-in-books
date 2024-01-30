"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Subheading } from "@/components/shared/subheading"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Book } from "@/db/schema"
import { cn } from "@/lib/utils"

interface Props {
  book: Book
}

export const Modal = ({ book }: Props) => {
  const router = useRouter()
  const handleClose = () => router.back()

  console.log(book)

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col items-center justify-center text-center sm:max-w-[425px]">
        <div className="relative aspect-[3/5] h-min w-2/3 overflow-hidden rounded-md shadow ">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="bg-primary/10 tw-transition rounded-md object-cover object-center group-hover:scale-105"
          />

          {/* {book.status === "read" && (
            <Badge className="absolute right-1.5 top-1.5 z-50 size-8 fill-red-600 stroke-black">{`Read`}</Badge>
          )} */}
        </div>
        <div className="flex flex-col">
          <p className={cn("text-primary text-xs font-medium uppercase")}>
            {book.author}
          </p>
          <Subheading>{book.title}</Subheading>
        </div>
      </DialogContent>
    </Dialog>
  )
}
