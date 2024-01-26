import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access your reading challenge.",
}

export default function SignInPage() {
  return (
    <SignIn
      signUpUrl="/sing-up"
      // // redirectUrl={redirectUrl || '/dashboard'}
      redirectUrl={"/challenge"}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-branding-green hover:bg-branding-green-800 tw-transition",
          formFieldInput:
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-branding-green",
          footerActionLink:
            "text-branding-green font-bold hover:text-branding-green-800 tw-transition",
        },
        layout: {
          //   logoImageUrl: 'https://clerk.dev/logo.png',
          logoPlacement: "inside",
          showOptionalFields: true,
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          //   helpPageUrl: 'https://clerk.dev/support',
          //   privacyPageUrl: 'https://clerk.dev/privacy',
          //   termsPageUrl: 'https://clerk.dev/terms',
        },
      }}
    />
  )
}
