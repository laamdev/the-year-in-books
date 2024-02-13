import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { DeleteChallengeDialog } from "@/components/dialogs/delete-challenge-dialog"
import { EditChallengeDialog } from "@/components/dialogs/edit-challenge-dialog"
import { CreateChallengeForm } from "@/components/forms/create-challenge-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Book } from "@/db/schema"
import { createClient } from "@/lib/supabase/server"
import { currentYear, getBookSchedule, timeLeft } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Challenge",
}

export default async function ChallengePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/")
  }

  const challenge = await getChallengeAction(data.user.id)
  const { days, hours } = timeLeft()

  if (challenge?.error)
    return (
      <MaxWidthWrapper>
        <div className="max-w-md">
          <CreateChallengeForm />
        </div>
      </MaxWidthWrapper>
    )

  if (challenge?.success) {
    const booksPages = challenge.success.books.map((book) => book.pages)
    const booksPagesSum = booksPages.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    const booksRead = challenge.success.books.filter(
      (book: Book) => book.status === "read"
    )
    const booksReadCount = booksRead.length
    const booksReadPages = booksRead.map((book) => book.pages)
    const booksReadPagesSum = booksReadPages.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    const booksInLibraryCount = challenge.success.books.length
    const readPercentage = Math.floor(
      Number(
        (booksReadCount * 100) / challenge.success.books_in_challenge_count
      )
    )

    const bookReadingRate = getBookSchedule(
      challenge.success.books_in_challenge_count,
      booksReadCount
    )

    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2">
          {/* <div>
            <Badge variant="secondary">{`Hello, ${user.firstName} ${user.lastName}`}</Badge>
          </div> */}
          <Heading>{`${currentYear} Reading Challenge`}</Heading>
        </div>

        <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Card className="relative col-span-2">
            {challenge ? (
              <>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-x-4">
                    {/* <Image
                      src={user.imageUrl}
                      alt={user.firstName!}
                      width={1920}
                      height={1920}
                      className="bg-primary/10 size-24 rounded-md"
                    /> */}

                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-medium">
                            {`Hello, ${data.user.user_metadata.full_name}`}
                          </h2>
                          <h3 className="text-lg">
                            <span>{`You've read `}</span>
                            <span className="font-semibold">{`${booksReadCount}`}</span>
                            <span>{` of `}</span>
                            <span className="font-semibold">
                              {`${challenge.success.books_in_challenge_count}`}
                            </span>
                            <span>{` books`}</span>
                          </h3>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-y-1">
                        <p>
                          <span>{`${booksInLibraryCount}`}</span>
                          <span className="text-sm">{` books in library`}</span>
                        </p>

                        <div className="flex items-center justify-center gap-x-2">
                          <Progress value={readPercentage} />
                          <p className="text-sm">{`${readPercentage}%`}</p>
                        </div>

                        {bookReadingRate === 0 ? (
                          <p className="text-sm">
                            <span>{`You're right on schedule.`}</span>
                          </p>
                        ) : (
                          <p className="text-sm">
                            <span className="font-semibold">{`${Math.abs(bookReadingRate)}`}</span>
                            <span>{`${Math.abs(bookReadingRate) > 1 ? " books" : " book"}`}</span>
                            <span>
                              {bookReadingRate < 0 && " ahead of schedule"}
                              {bookReadingRate > 0 && " behind schedule"}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-x-4">
                  <Button variant="secondary" className="flex-1">
                    <Link href="/library" className="w-full">
                      {`View Library`}
                    </Link>
                  </Button>
                  <Button className="flex-1">
                    <Link href="/add-books" className="w-full">
                      {`Add Books`}
                    </Link>
                  </Button>
                </CardFooter>

                <div className="absolute right-2 top-2 flex gap-x-4">
                  <EditChallengeDialog
                    challengeId={challenge.success.id}
                    booksInChallengeCount={
                      challenge.success.books_in_challenge_count
                    }
                    booksInLibraryCount={booksInLibraryCount}
                  />
                  <DeleteChallengeDialog challengeId={challenge.success.id} />
                </div>
              </>
            ) : (
              <CreateChallengeForm />
            )}
          </Card>
          <Card className="col-span-1 h-fit">
            <CardHeader>{`Total Pages`}</CardHeader>
            <CardContent className="flex items-center font-serif text-3xl font-bold">
              {`${booksPagesSum}`}
            </CardContent>
          </Card>
          <Card className="col-span-1 h-fit">
            <CardHeader>{`Total Pages Read`}</CardHeader>
            <CardContent className="font-serif text-3xl font-bold">
              {`${booksReadPagesSum}`}
            </CardContent>
          </Card>
        </section>
      </MaxWidthWrapper>
    )
  }
}
