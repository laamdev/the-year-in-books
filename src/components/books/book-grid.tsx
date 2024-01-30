import { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface Props {
  size?: "sm" | "DEFAULT"
  children: ReactNode
}

export const BookGrid = ({ size = "DEFAULT", children }: Props) => {
  return (
    <div
      className={cn(
        "mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-5",
        size === "sm" && "grid-cols-7"
      )}
    >
      {children}
    </div>
  )
}
