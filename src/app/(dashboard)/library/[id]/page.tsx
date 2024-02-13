import { format, getMonth } from "date-fns"
import Image from "next/image"

import { getBook } from "@/app/actions/book-actions"
import { Rating } from "@/components/books/rating"
import { RemoveBookFromChallengeDialog } from "@/components/books/remove-book-from-challenge-dialog"
import { NowReadingButton } from "@/components/library/now-reading-button"
import { ReadButton } from "@/components/library/read-button"
import { WantToReadButton } from "@/components/library/want-to-read-button"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"

export async function generateMetadata({ params }: { params: { id: number } }) {
  const book = await getBook(params.id)
  if (book?.error) return console.log(book.error)
  if (book?.success) {
    return { title: book.success.title }
  }
}

export default async function BookPage({
  params: { id },
}: {
  params: { id: number }
}) {
  const book = await getBook(id)

  if (book?.error) return <h1>{book.error}</h1>
  if (book?.success) {
    return (
      <MaxWidthWrapper>
        <div className="mt-10 grid grid-cols-5 gap-x-5">
          <div className="col-span-1">
            <div className="relative aspect-[3/5] h-min overflow-hidden rounded-md shadow ">
              <Image
                src={book.success.cover}
                alt={book.success.title}
                fill
                className="bg-primary/10 tw-transition rounded-md object-cover object-center group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex flex-col gap-y-2.5">
              <ReadButton
                id={book.success.id}
                title={book.success.title}
                status={book.success.status}
              />
              <NowReadingButton
                id={book.success.id}
                title={book.success.title}
                status={book.success.status}
              />
              <WantToReadButton
                id={book.success.id}
                title={book.success.title}
                status={book.success.status}
              />
              <RemoveBookFromChallengeDialog
                id={book.success.id}
                title={book.success.title}
              />
            </div>
          </div>

          <div className="col-span-4">
            <Heading>{book.success.title}</Heading>

            {book?.success.status === "read" && (
              <div className="mt-2.5">
                <Rating
                  bookId={book.success.id}
                  bookRating={book.success.rating}
                />
              </div>
            )}

            <div className="mt-10 flex flex-col gap-y-5">
              <div>
                <p className="text-xs uppercase opacity-75">{`Author`}</p>
                <h3 className="text-lg font-medium">{`${book.success.author}`}</h3>
              </div>
              <div>
                <p className="text-xs uppercase opacity-75">{`First Published`}</p>
                <h3 className="text-lg font-medium">{`${book.success.year}`}</h3>
              </div>
              <div>
                <p className="text-xs uppercase opacity-75">{`Pages`}</p>
                <h3 className="text-lg font-medium">{`${book.success.pages}`}</h3>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }
}
