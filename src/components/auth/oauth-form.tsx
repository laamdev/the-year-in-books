"use client"

import { createBrowserClient } from "@supabase/ssr"

import { Google } from "@/components/icons/google"
import { Button } from "@/components/ui/button"

interface Props {
  label: string
}

export const OAuthForm = ({ label }: Props) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
  }

  return (
    <Button
      variant="secondary"
      onClick={signInWithGoogle}
      className="flex w-full items-center"
    >
      <Google className="mr-2 size-4" />
      <span>{`${label} with Google`}</span>
    </Button>
  )
}
