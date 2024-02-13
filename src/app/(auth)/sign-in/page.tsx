import { OAuthForm } from "@/components/auth/oauth-form"
import { SignInForm } from "@/components/auth/sign-in-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Divider } from "@/components/ui/divider"

export default function SignInPage() {
  return (
    <div>
      <Heading>{`Sign In`}</Heading>
      <MaxWidthWrapper className="bg-card mt-10 flex max-w-md flex-col gap-y-10 rounded-md">
        <SignInForm />
        <Divider label="or" />
        <OAuthForm label="Sign in" />
      </MaxWidthWrapper>
    </div>
  )
}
