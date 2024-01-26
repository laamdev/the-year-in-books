import { SignUp } from "@clerk/nextjs"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create your reading challenge.",
}
export default function SignUpPage() {
  return (
    <SignUp
      signInUrl="/sign-in"
      // // redirectUrl={redirectUrl || '/dashboard'}
      redirectUrl={"/"}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-branding-green hover:bg-branding-green-800 tw-transition",
          formFieldInput:
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-branding-green",
          footerActionLink:
            "text-branding-green font-bold hover:text-branding-green-800 tw-transition",
          headerTitle: "font-serif",
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
