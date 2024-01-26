import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { forwardRef } from "react"

import { cn } from "@/lib/utils"

import { Input, InputProps } from "./input"

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>

const Search = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        {...props}
        type="search"
        ref={ref}
        // className="placeholder:text-muted-foreground w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    )
  }
)

Search.displayName = "Search"

export { Search }
