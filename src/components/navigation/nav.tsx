"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { signOutAction } from "@/app/actions/auth-actions"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    href: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
  }[]
}

export const Nav = ({ links, isCollapsed }: NavProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                {link.title !== "Log Out" ? (
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "size-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon
                      className={cn("size-4", {
                        "fill-primary": link.href === pathname,
                      })}
                    />
                    <span className="sr-only">{`${link.title}`}</span>
                  </Link>
                ) : (
                  <form action={signOutAction}>
                    <button
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "icon" }),
                        "size-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="size-4" />
                      <span className="sr-only">{`${link.title}`}</span>
                    </button>
                  </form>
                )}
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <Badge className="text-muted-foreground ml-auto">
                    {link.label}
                  </Badge>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              {link.title !== "Log Out" ? (
                <Link
                  key={index}
                  href={link.href ?? "/"}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    link.variant === "default" &&
                      "dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  <link.icon
                    className={cn("mr-2 size-4", {
                      "fill-primary": link.href === pathname,
                    })}
                  />{" "}
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
              ) : (
                <form action={signOutAction}>
                  <button
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "sm" }),
                      link.variant === "default" &&
                        "dark:bg-muted dark:hover:bg-muted dark:text-white dark:hover:text-white",
                      "w-full justify-start"
                    )}
                  >
                    <link.icon className="mr-2 size-4" />
                    {link.title}
                    {link.label && (
                      <span
                        className={cn(
                          "ml-auto",
                          link.variant === "default" &&
                            "text-background dark:text-white"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </button>
                </form>
              )}
            </>
          )
        )}
      </nav>
    </div>
  )
}
