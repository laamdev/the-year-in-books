import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"

export default async function StatsPage() {
  const user = await currentUser()

  return (
    <MaxWidthWrapper>
      <Heading>{`Stats`}</Heading>

      <Suspense fallback={null}></Suspense>
    </MaxWidthWrapper>
  )
  //   }
}
