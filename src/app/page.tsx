import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { SignOutForm } from "@/components/auth/sign-out-form"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { currentYear, getTimestamp } from "@/lib/utils"

export default async function HomePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  return (
    <MaxWidthWrapper className="grid gap-y-20 md:h-screen md:grid-cols-2 md:place-content-center md:gap-x-10">
      <div className="">
        <div>
          <Badge variant="secondary">{`${currentYear} Reading Challenge`}</Badge>

          <h1 className="mt-2.5 flex flex-col font-serif text-6xl font-bold md:text-8xl">
            <span>{`The Year`}</span>
            <span>{`in Books`}</span>
          </h1>
          <p className="mt-2.5 max-w-lg text-lg md:mt-5 md:text-xl">{`Want to motivate yourself to read more in ${currentYear}? Join our annual reading challenge and fall back in love with reading — your new favourite book may still be in your backlog!`}</p>
        </div>

        {!data.user && (
          <div className="mt-5 flex gap-x-5 md:mt-10">
            <Link
              href="/sign-in"
              className={buttonVariants({
                className: "",
                variant: "default",
              })}
            >{`Sign In`}</Link>
            <Link
              href="/sign-up"
              className={buttonVariants({
                className: "",
                variant: "secondary",
              })}
            >{`Sign Up`}</Link>
          </div>
        )}
        {data.user && (
          <div className="mt-5 flex gap-x-5 md:mt-10">
            <Link
              href="/challenge"
              className={buttonVariants({
                className: "",
                variant: "default",
              })}
            >{`Your Challenge`}</Link>
            <SignOutForm />
          </div>
        )}
      </div>
      <div>
        <Image
          src={`/images/book-covers.webp`}
          alt="book covers"
          width={1024}
          height={768}
          className="rounded-md"
        />
      </div>
    </MaxWidthWrapper>
  )
}
