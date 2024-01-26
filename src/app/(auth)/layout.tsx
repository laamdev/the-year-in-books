import { ReactNode } from "react"

import { CoverImage } from "@/components/auth/cover-image"
import { Quote } from "@/components/auth/quote"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <CoverImage />

        <div className="text-branding-green relative z-20 mt-auto">
          <Quote />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
