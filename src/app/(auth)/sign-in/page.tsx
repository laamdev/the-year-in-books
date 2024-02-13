import { Metadata } from "next"

import { OAuthForm } from "@/components/auth/oauth-form"
import { SignInForm } from "@/components/auth/sign-in-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Card } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Sign In",
}

export default function SignInPage() {
  return (
    <MaxWidthWrapper>
      <Heading>{`Sign In`}</Heading>
      <Card className="mt-10 flex flex-col gap-y-10 p-5">
        <SignInForm />
        <Divider label="or" />
        <OAuthForm label="Sign in" />
      </Card>
    </MaxWidthWrapper>
  )
}
