import Link from "next/link"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"

export const EmptyChallengeFeedback = ({
  errorMessage,
}: {
  errorMessage: string
}) => {
  return (
    <MaxWidthWrapper>
      <h1>{`${errorMessage}`}</h1>
      <Button asChild className="mt-5">
        <Link href="/challenge">{`Create Challenge`}</Link>
      </Button>
    </MaxWidthWrapper>
  )
}
