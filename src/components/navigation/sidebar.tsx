"use client"

import {
  ArrowRightStartOnRectangleIcon,
  PlusCircleIcon,
  TrophyIcon,
  ViewColumnsIcon,
} from "@heroicons/react/16/solid"
import Link from "next/link"
import { useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { Nav } from "@/components/navigation/nav"
import { Logo } from "@/components/shared/logo"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export const Sidebar = ({
  defaultCollapsed = false,
  children,
  booksCount,
  booksInChallengeCount,
}: any) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const leftPanelRef = useRef<ImperativePanelHandle>(null)

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        ref={leftPanelRef}
        defaultSize={265}
        collapsedSize={3}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          const panel = leftPanelRef.current
          if (panel?.isCollapsed()) {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }
        }}
        onExpand={() => {
          const panel = leftPanelRef.current
          if (!panel?.isCollapsed()) {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }
        }}
        className={cn(
          "bg-card",
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2"
          )}
        >
          {!isCollapsed && (
            <Link
              href="/"
              className={cn(
                "hover:text-primary tw-transition flex items-center gap-x-1 font-serif font-medium uppercase"
              )}
            >
              {`The Year in Books`}
            </Link>
          )}

          {isCollapsed && (
            <Link
              href="/"
              className={cn(
                "hover:text-primary tw-transition flex items-center gap-x-1 font-serif font-medium uppercase"
              )}
            >
              <Logo className="stroke-foreground hover:stroke-primary tw-transition size-8" />
            </Link>
          )}
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Challenge",
              href: "/challenge",
              label: booksInChallengeCount,
              icon: TrophyIcon,
              variant: "ghost",
            },
            {
              title: "Library",
              href: "/library",
              label: booksCount?.toString(),
              icon: ViewColumnsIcon,
              variant: "ghost",
            },
            {
              title: "Add Books",
              href: "/add-books",
              label: "",
              icon: PlusCircleIcon,
              variant: "ghost",
            },
            // // {
            // //   title: "Stats",
            // //   href: "/stats",
            // //   // // label: booksCount,
            // //   icon: ChartBarIcon,
            // //   variant: "ghost",
            // // },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            // // {
            // //   title: "Profile",
            // //   href: "/profile",
            // //   // // label: booksCount,
            // //   icon: UserCircleIcon,
            // //   variant: "ghost",
            // // },
            {
              title: "Log Out",
              href: "",
              // // label: booksInChallengeCount,
              icon: ArrowRightStartOnRectangleIcon,
              variant: "ghost",
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={1440} minSize={30}>
        <div className="h-full overflow-y-auto">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
