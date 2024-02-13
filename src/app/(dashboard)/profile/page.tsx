import { Metadata } from "next"
import { cookies } from "next/headers"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { EmptyChallengeFeedback } from "@/components/challenge/empty-challenge-feedback"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ReadPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()
  const challenge = await getChallengeAction(data.user?.id)
  if (challenge?.error) {
    return <EmptyChallengeFeedback errorMessage={challenge.error} />
  }

  return <MaxWidthWrapper>xz </MaxWidthWrapper>
}
