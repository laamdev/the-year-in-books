import Image from "next/image"

import { AddBookForm } from "@/components/forms/add-book-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Challenge } from "@/db/schema"
import { ApiBookFormated } from "@/types"

export const BooksTable = async ({
  challenge,
  books,
}: {
  challenge: Challenge
  books: ApiBookFormated[]
}) => {
  return (
    <div className="bg-card mt-10 max-h-64 overflow-auto rounded-md">
      <Table>
        <TableHeader>
          {books.length ? (
            <TableRow>
              <TableHead className="p-2">Cover</TableHead>
              <TableHead className="p-2">Title</TableHead>
              <TableHead className="p-2">Author</TableHead>
              <TableHead className="p-2">Year</TableHead>
              <TableHead className="p-2">Pages</TableHead>
              <TableHead className="p-2">Add</TableHead>
            </TableRow>
          ) : null}
        </TableHeader>
        <TableBody>
          {books.length ? (
            books.map((book: ApiBookFormated, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="relative aspect-[3/5] w-16">
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                      alt={book.title}
                      fill
                      className="bg-primary/10 w-12 rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="max-w-32">{book.title}</TableCell>
                <TableCell className="max-w-32">
                  {book?.author?.toString().split(",")[0]}
                </TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.pages ?? "-"}</TableCell>
                <TableCell>
                  <AddBookForm selectedBook={book} challenge={challenge} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
