import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"

import { MarkAsNowReadingButton } from "@/components/mark-as-now-reading-button"
import { MarkAsReadButton } from "@/components/mark-as-read-button"
import { RemoveFromChallengeButton } from "@/components/remove-from-challenge-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book } from "@/db/schema"

import { MarkAsWantToReadButton } from "../mark-as-want-to-read"

export const BookActionMenu = ({ book }: { book: Book }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="mt-2.5 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`Book Actions`}</DropdownMenuLabel>
        {book.status !== "read" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MarkAsReadButton book={book} />
            </DropdownMenuItem>
          </>
        )}
        {book.status !== "now_reading" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MarkAsNowReadingButton book={book} />
            </DropdownMenuItem>
          </>
        )}
        {book.status !== "want_to_read" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MarkAsWantToReadButton book={book} />
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RemoveFromChallengeButton book={book} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
