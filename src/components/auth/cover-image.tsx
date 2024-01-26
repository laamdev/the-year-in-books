"use client"

import { usePathname } from "next/navigation"

export const CoverImage = () => {
  const pathname = usePathname()

  const imageUrl =
    pathname === "/sign-up"
      ? "https://images.unsplash.com/photo-1550399105-05c4a7641b02?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      : "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div
      className="absolute inset-0 bg-cover"
      style={{
        backgroundImage: `url(${imageUrl}`,
      }}
    />
  )
}
