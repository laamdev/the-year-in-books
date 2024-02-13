import { ReactNode } from "react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

export const Heading = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <Balancer>
      <h1
        className={cn(className, "font-serif text-4xl font-bold md:text-5xl")}
      >
        {children}
      </h1>
    </Balancer>
  )
}
