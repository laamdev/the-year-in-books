import { SignedIn, SignedOut } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { currentYear } from "@/lib/utils"

export default function HomePage() {
  return (
    <div className="h-screen">
      <MaxWidthWrapper className="grid h-full grid-cols-2 place-content-center gap-x-10">
        <div className="">
          <div>
            <Badge variant="secondary">{`${currentYear} Reading Challenge`}</Badge>

            <h1 className="mt-2.5 flex flex-col font-serif text-8xl font-bold">
              <span>{`The Year`}</span>
              <span>{`in Books`}</span>
            </h1>
            <p className="mt-5 max-w-lg text-xl">{`Bolt powers frictionless experiences for retailers and customers at every step of the shopping journey—from login to checkout.`}</p>
          </div>
          <div className="mt-10 flex gap-x-5">
            <SignedIn>
              <Link
                href="/challenge"
                className={buttonVariants({ className: "" })}
              >{`Your Challenge`}</Link>
              <SignOutButton>
                <Button variant="secondary">{`Sign Out`}</Button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({ className: "" })}
              >{`Log In`}</Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  className: "",
                  variant: "secondary",
                })}
              >{`Sign Up`}</Link>
            </SignedOut>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
