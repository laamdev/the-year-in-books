import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"

import { MarkAsReadButton } from "@/components/mark-as-read-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book } from "@/db/schema"

import { RemoveFromChallengeButton } from "./remove-from-challenge-button"

export const BookActionMenu = ({ book }: { book: Book }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="mt-2.5 size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`Book Actions`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MarkAsReadButton book={book} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RemoveFromChallengeButton book={book} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
