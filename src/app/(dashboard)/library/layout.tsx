import { ReactNode } from "react"

interface Props {
  children: ReactNode
  modal: ReactNode
}

export default function LibraryLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
