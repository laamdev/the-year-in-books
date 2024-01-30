import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access your reading challenge.",
}

export default function SignInPage() {
  return (
    <SignIn
      signUpUrl="/sign-up"
      // // redirectUrl={redirectUrl || '/dashboard'}
      redirectUrl={"/challenge"}
      appearance={{
        elements: {
          formFieldInput__identifier: "bg-input text-foreground",
          formFieldInputShowPasswordButton: "stroke-foreground",
          formFieldInputShowPasswordIcon: "stroke-foreground",
          headerTitle: "text-card-foreground font-serif",
          headerSubtitle: "text-card-foreground",
          formFieldLabel: "text-card-foreground",
          dividerLine: "bg-card-foreground",
          dividerText: "text-card-foreground",
          footerActionText: "text-card-foreground",
          socialButtonsIconButton:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          card: "bg-card border-border",
          formButtonPrimary:
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          formFieldInput:
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-branding-green",
          footerActionLink:
            "text-primary underline-offset-4 hover:underline hover:text-primary",
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
