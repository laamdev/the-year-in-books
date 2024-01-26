import { ReactNode } from "react"

export const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-serif text-5xl font-bold">{children}</h1>
}
