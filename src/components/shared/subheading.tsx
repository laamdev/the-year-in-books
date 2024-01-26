import { ReactNode } from "react"

export const Subheading = ({ children }: { children: ReactNode }) => {
  return <h2 className="font-serif text-3xl font-semibold">{children}</h2>
}
