import { Metadata } from "next"
import { cookies } from "next/headers"

import { getChallengeAction } from "@/app/actions/challenge-actions"
import { EmptyChallengeFeedback } from "@/components/challenge/empty-challenge-feedback"
import { MonthBarChart } from "@/components/charts/month-bar-chart"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/shared/heading"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Stats",
}

export default async function StatsPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()

  const challenge = await getChallengeAction(data.user?.id)
  if (challenge?.error) {
    return <EmptyChallengeFeedback errorMessage={challenge.error} />
  }

  return (
    <MaxWidthWrapper>
      <Heading>{`Stats`}</Heading>

      <section className="mt-20 grid grid-cols-3 gap-x-10">
        <div className="aspect-square">
          <MonthBarChart />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
