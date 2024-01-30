import { CheckCircle2Icon } from "lucide-react"
import Image from "next/image"

import { getBook } from "@/app/_actions"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Badge } from "@/components/ui/badge"

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
        <Heading>{book.success.title}</Heading>

        <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-5">
          <div className="relative aspect-[3/5] h-min overflow-hidden rounded-md shadow ">
            <Image
              src={book.success.cover}
              alt={book.success.title}
              fill
              className="bg-primary/10 tw-transition rounded-md object-cover object-center group-hover:scale-105"
            />

            {book.success.status === "read" && (
              <Badge className="absolute right-1.5 top-1.5 z-50 size-8 fill-red-600 stroke-black">{`Read`}</Badge>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="text-xs uppercase opacity-75">{`Author`}</p>
              <h3 className="text-xl font-medium">{`${book.success.author}`}</h3>
            </div>
            <div>
              <p className="text-xs uppercase opacity-75">{`First Published`}</p>
              <h3 className="text-xl font-medium">{`${book.success.year}`}</h3>
            </div>
            <div>
              <p className="text-xs uppercase opacity-75">{`Pages`}</p>
              <h3 className="text-xl font-medium">{`${book.success.pages}`}</h3>
            </div>
            <div>
              <p className="text-xs uppercase opacity-75">{`Status`}</p>
              <h3 className="text-xl font-medium">
                {book.success.status === "read" && <span>{`Read`}</span>}
                {book.success.status === "now_reading" && (
                  <span>{`Now Reading`}</span>
                )}
                {book.success.status === "want_to_read" && (
                  <span>{`Want to Read`}</span>
                )}
              </h3>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }
}
