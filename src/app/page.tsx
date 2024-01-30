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
    <MaxWidthWrapper className="grid gap-y-20 md:h-screen md:grid-cols-2 md:place-content-center md:gap-x-10">
      <div className="">
        <div>
          <Badge variant="secondary">{`${currentYear} Reading Challenge`}</Badge>

          <h1 className="mt-2.5 flex flex-col font-serif text-6xl font-bold md:text-8xl">
            <span>{`The Year`}</span>
            <span>{`in Books`}</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg md:text-xl">{`Want to motivate yourself to read more in ${currentYear}? Join our annual reading challenge and fall in love with reading again — your new favourite book may still be in your backlog!`}</p>
        </div>
        <div className="mt-5 flex gap-x-5 md:mt-10">
          <SignedIn>
            <Link
              href="/challenge"
              className={buttonVariants({ className: "" })}
            >{`Your Challenge`}</Link>
            <Button variant="secondary" className="min-w-[90px]">
              <SignOutButton>{`Sign Out`}</SignOutButton>
            </Button>
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
