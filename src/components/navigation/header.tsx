import { MoreHorizontalIcon, XIcon } from "lucide-react"
import Link from "next/link"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
export const Header = () => {
  return (
    <div className="flex justify-end px-2 py-4 md:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <MoreHorizontalIcon className="size-8" />
        </DrawerTrigger>
        <DrawerContent className="bg-primary h-full w-[400px] px-2 py-4">
          <DrawerClose className="flex justify-end">
            <XIcon className="size-8" />
          </DrawerClose>

          <div className="mt-8 flex h-full items-center">
            <nav>
              <ul className="flex flex-col gap-y-8 font-serif text-4xl font-medium text-black">
                <li>
                  <Link href="/challenge">
                    <DrawerClose>Challenge</DrawerClose>
                  </Link>
                </li>
                <Link href="/library">
                  <DrawerClose>Library</DrawerClose>
                </Link>
                <Link href="/read">
                  <DrawerClose>Read</DrawerClose>
                </Link>
                <Link href="/now-reading">
                  <DrawerClose>Now Reading</DrawerClose>
                </Link>
                <Link href="/want-to-read">
                  <DrawerClose>Want to Read</DrawerClose>
                </Link>
              </ul>
            </nav>
          </div>
          {/* <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
            <Button variant="outline">Cancel</Button>
            </DrawerClose>
        </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
