import { Metadata } from "next"

import { OAuthForm } from "@/components/auth/oauth-form"
import { SignUpForm } from "@/components/auth/sing-up-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Card } from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUpPage() {
  return (
    <MaxWidthWrapper>
      <Heading>{`Sign Up`}</Heading>
      <Card className="mt-10 flex flex-col gap-y-10 p-5">
        <SignUpForm />
        <Divider label="or" />
        <OAuthForm label="Sign up" />
      </Card>
    </MaxWidthWrapper>
  )
}
