import { ReactNode } from "react"

export const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="font-serif text-4xl font-bold md:text-5xl">{children}</h1>
  )
}
