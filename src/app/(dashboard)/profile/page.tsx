import { currentUser } from "@clerk/nextjs"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"

export default async function ReadPage() {
  //   const challenge = await getChallenge()
  //   if (challenge?.error) return <h1>{challenge.error}</h1>
  //   if (challenge?.success) {
  //     const readBooks = challenge.success.books.filter((book) => book.is_read)
  //     const readBooksCount = readBooks.length
  const user = await currentUser()

  return (
    <MaxWidthWrapper>
      <Heading>{`${user?.firstName} ${user?.lastName}'s Profile`}</Heading>
    </MaxWidthWrapper>
  )
  //   }
}
