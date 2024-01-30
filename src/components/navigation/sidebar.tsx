"use client"

import {
  BookCheckIcon,
  BookCopyIcon,
  BookHeartIcon,
  BookIcon,
  BookOpenTextIcon,
  LibraryIcon,
  PlusIcon,
} from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { Nav } from "@/components/navigation/nav"
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
  readBooksCount,
  wantToReadBooksCount,
  nowReadingBooksCount,
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
              className={cn("font-serif font-bold")}
            >{`Reading Challenge`}</Link>
          )}

          {isCollapsed && (
            <Link href="/">
              <BookIcon className={cn(isCollapsed ? "h-[52px]" : "px-2")} />
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
              icon: LibraryIcon,
              variant: "ghost",
            },
            {
              title: "Add Books",
              href: "/add-books",
              label: "",
              icon: PlusIcon,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Library",
              href: "/library",
              label: booksCount,
              icon: BookCopyIcon,
              variant: "ghost",
            },
            {
              title: "Read",
              href: "/read",
              label: readBooksCount === 0 ? "0" : readBooksCount,
              icon: BookCheckIcon,
              variant: "ghost",
            },
            {
              title: "Now Reading",
              href: "/now-reading",
              label: nowReadingBooksCount === 0 ? "0" : nowReadingBooksCount,
              icon: BookOpenTextIcon,
              variant: "ghost",
            },
            {
              title: "Want to Read",
              href: "/want-to-read",
              label: wantToReadBooksCount === 0 ? "0" : wantToReadBooksCount,
              icon: BookHeartIcon,
              variant: "ghost",
            },
          ]}
        />

        <Separator />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={1440} minSize={30}>
        <div className="h-full overflow-y-auto">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
