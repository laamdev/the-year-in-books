import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"

import { MarkAsNowReadingButton } from "@/components/mark-as-now-reading-button"
import { MarkAsReadButton } from "@/components/mark-as-read-button"
import { MarkAsWantToReadButton } from "@/components/mark-as-want-to-read"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book } from "@/db/schema"

export const BookActionMenu = ({ book }: { book: Book }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="mt-2.5 size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{`Book Actions`}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {book.status !== "read" && (
          <DropdownMenuItem>
            <MarkAsReadButton book={book} />
          </DropdownMenuItem>
        )}
        {book.status !== "now_reading" && (
          <DropdownMenuItem>
            <MarkAsNowReadingButton book={book} />
          </DropdownMenuItem>
        )}
        {book.status !== "want_to_read" && (
          <DropdownMenuItem>
            <MarkAsWantToReadButton book={book} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
