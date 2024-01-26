import { ReactNode } from "react"

export const BookGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-10 grid grid-cols-5 gap-x-5 gap-y-10">{children}</div>
  )
}
