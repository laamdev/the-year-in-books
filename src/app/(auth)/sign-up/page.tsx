import { OAuthForm } from "@/components/auth/oauth-form"
import { SignUpForm } from "@/components/auth/sing-up-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { Divider } from "@/components/ui/divider"

export default function SignUpPage() {
  return (
    <div>
      <Heading>{`Sign Up`}</Heading>
      <MaxWidthWrapper className="bg-card mt-10 flex flex-col gap-y-10 rounded-md">
        <SignUpForm />
        <Divider label="or" />
        <OAuthForm label="Sign up" />
      </MaxWidthWrapper>
    </div>
  )
}
