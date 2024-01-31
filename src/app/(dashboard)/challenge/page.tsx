import { SignedIn, SignedOut } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

import { getChallenge } from "@/app/_actions"
import { DeleteChallengeDialog } from "@/components/dialogs/delete-challenge-dialog"
import { EditChallengeDialog } from "@/components/dialogs/edit-challenge-dialog"
import { CreateChallengeForm } from "@/components/forms/create-challenge-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Book } from "@/db/schema"
import { currentYear, timeLeft } from "@/lib/utils"

export default async function ChallengePage() {
  const user = await currentUser()

  if (!user) return <div>Not logged in</div>

  const { days, hours } = timeLeft()

  const challenge = await getChallenge()

  if (challenge?.error)
    return (
      <MaxWidthWrapper>
        <div className="max-w-md">
          <CreateChallengeForm />
          {/* <span>{challenge.error}</span> */}
        </div>
      </MaxWidthWrapper>
    )
  if (challenge?.success) {
    const booksRead = challenge.success.books.filter(
      (book: Book) => book.status === "read"
    )
    const booksReadCount = booksRead.length
    const booksReadPages = booksRead.map((book) => book.pages)
    const readBooksPagesSum = booksReadPages.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    const booksInLibraryCount = challenge.success.books.length
    const readPercentage = Math.floor(
      Number(
        (booksReadCount * 100) / challenge.success.books_in_challenge_count
      )
    )

    return (
      <MaxWidthWrapper>
        <div className="flex flex-col gap-y-2.5">
          <div>
            <Badge variant="secondary">{`Hello, ${user.firstName} ${user.lastName}`}</Badge>
          </div>
          <Heading>{`${currentYear} Reading Challenge`}</Heading>
        </div>

        <SignedIn>
          <section className="mt-12 grid grid-cols-5 gap-3">
            <Card className="relative col-span-2">
              {challenge ? (
                <>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-x-6">
                      <Image
                        src={user.imageUrl}
                        alt={user.firstName!}
                        width={1920}
                        height={1920}
                        className="bg-primary/10 size-24 rounded-md"
                      />

                      <div className="flex w-full flex-col gap-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-base">
                              <span>{`You've read `}</span>
                              <span className="font-semibold">{`${booksReadCount}`}</span>
                              <span>{` of `}</span>
                              <span className="font-semibold">
                                {`${challenge.success.books_in_challenge_count}`}
                              </span>
                              <span>{` books`}</span>
                            </p>
                            <p>
                              <span>{`${booksInLibraryCount}`}</span>
                              <span className="text-sm">{` books in library`}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-5">
                          <Progress value={readPercentage} />
                          <p>{readPercentage}%</p>
                        </div>

                        <p className="text-sm">
                          <span className="font-semibold">{`1`}</span>
                          <span>{` book ahead of schedule`}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-x-5">
                    <Button variant="secondary" className="flex-1">
                      <Link href="/library" className="w-full">
                        View Library
                      </Link>
                    </Button>
                    <Button className="flex-1">
                      <Link href="/add-books" className="w-full">
                        Add Books
                      </Link>
                    </Button>
                  </CardFooter>

                  <div className="absolute right-2.5 top-2.5 flex gap-x-2.5">
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
              <CardHeader>Total Pages Read</CardHeader>
              <CardContent className="font-serif text-3xl font-bold">
                {readBooksPagesSum}
              </CardContent>
            </Card>
            <Card className="col-span-1 h-fit">
              <CardHeader>Total Pages Read</CardHeader>
              <CardContent className="flex items-center font-serif text-3xl font-bold">
                {readBooksPagesSum}
              </CardContent>
            </Card>
          </section>
        </SignedIn>

        <SignedOut>
          {`Want to create/access your reading challenge? `}
          <Link href="sign-up">{`Sign up`}</Link>
          <span>{` or `}</span>
          <Link href="sign-in">{`Sign in`}</Link>
        </SignedOut>
      </MaxWidthWrapper>
    )
  }
}
