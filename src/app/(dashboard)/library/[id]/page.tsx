import { differenceInDays, format, getMonth } from "date-fns"
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
    const daysAgoCreated = differenceInDays(new Date(), book.success.created_at)
    const daysAgoStarted = differenceInDays(
      new Date(),
      book.success.started_at!
    )
    const daysAgoRead = differenceInDays(new Date(), book.success.read_at!)

    return (
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:mt-10 md:grid-cols-7 md:gap-x-10">
          <div className="col-span-2 mx-auto w-full">
            <div className="flex flex-col items-center md:hidden">
              <Heading>{book.success.title}</Heading>

              {book?.success.status === "read" && (
                <div className="mt-2.5">
                  <Rating
                    bookId={book.success.id}
                    bookRating={book.success.rating}
                  />
                </div>
              )}
            </div>

            <div className="relative mx-auto mt-5 aspect-[3/5] h-min w-2/3 overflow-hidden rounded-md shadow md:mt-0 md:w-full ">
              <Image
                src={book.success.cover}
                alt={book.success.title}
                fill
                className="bg-primary/10 tw-transition rounded-md object-cover object-center group-hover:scale-105"
              />
            </div>
            <div className="mx-auto mt-5 flex w-2/3 flex-col gap-y-2.5 md:w-full">
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

          <div className="col-span-5">
            <div className="hidden md:flex md:flex-col">
              <Heading>{book.success.title}</Heading>

              {book?.success.status === "read" && (
                <div className="mt-2.5">
                  <Rating
                    bookId={book.success.id}
                    bookRating={book.success.rating}
                  />
                </div>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-10">
              <div className="grid grid-rows-3 gap-5">
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

              <div className="grid grid-rows-3 gap-5">
                {book.success.created_at && (
                  <div>
                    <p className="text-xs uppercase opacity-75">{`Added at`}</p>
                    <h3 className="text-lg font-medium">
                      <span>
                        {`${format(new Date(book.success.created_at!), "dd/MM/yyyy")}`}
                      </span>
                      <span className="ml-2 text-xs">
                        ({daysAgoCreated === 0 && "Today"}
                        {daysAgoCreated === 1 && `${daysAgoCreated} day ago`}
                        {daysAgoCreated > 1 && `${daysAgoCreated} days ago`})
                      </span>
                    </h3>
                  </div>
                )}
                {book.success.started_at && (
                  <div>
                    <p className="text-xs uppercase opacity-75">{`Started at`}</p>
                    <h3 className="text-lg font-medium">
                      <span>
                        {`${format(new Date(book.success.started_at!), "dd/MM/yyyy")}`}
                      </span>
                      <span className="ml-2 text-xs">
                        ({daysAgoCreated === 0 && "Today"}{" "}
                        {daysAgoCreated === 1 && `${daysAgoStarted} day ago`}
                        {daysAgoCreated > 1 && `${daysAgoStarted} days ago`})
                      </span>
                    </h3>
                  </div>
                )}
                {book.success.read_at && (
                  <div>
                    <p className="text-xs uppercase opacity-75">{`Read at`}</p>
                    <h3 className="text-lg font-medium">
                      <span>
                        {`${format(new Date(book.success.read_at!), "dd/MM/yyyy")}`}
                      </span>

                      <span className="ml-2 text-xs">
                        ({daysAgoCreated === 0 && "Today"}
                        {daysAgoCreated === 1 && `${daysAgoRead} day ago`}
                        {daysAgoCreated > 1 && `${daysAgoRead} days ago`})
                      </span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }
}
