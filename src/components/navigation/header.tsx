import { MoreHorizontalIcon, XIcon } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"

import { Logo } from "@/components/shared/logo"
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
import { createClient } from "@/lib/supabase/server"

export const Header = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  return (
    <div className="flex justify-between px-2.5 py-5 md:hidden">
      <Link href="/">
        <Logo className="stroke-primary size-8" />
      </Link>
      <Drawer direction="right">
        <DrawerTrigger>
          <MoreHorizontalIcon className="size-8" />
        </DrawerTrigger>
        <DrawerContent className="bg-muted size-full">
          <DrawerClose className="flex justify-end p-2.5">
            <XIcon className="size-8" />
          </DrawerClose>

          <div className="flex h-full items-center p-5">
            <nav>
              <ul className="text-foreground flex flex-col gap-y-10 font-serif text-5xl font-medium">
                {data.user && (
                  <>
                    <li>
                      <Link href="/challenge">
                        <DrawerClose>{`Challenge`}</DrawerClose>
                      </Link>
                    </li>
                    <li>
                      <Link href="/library">
                        <DrawerClose>{`Library`}</DrawerClose>
                      </Link>
                    </li>
                    <li>
                      <Link href="/add-books">
                        <DrawerClose>{`Add Book`}</DrawerClose>
                      </Link>
                    </li>
                  </>
                )}
                {!data.user && (
                  <>
                    <li>
                      <Link href="/sign-in">
                        <DrawerClose>{`Sign in`}</DrawerClose>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sign-up">
                        <DrawerClose>{`Sign up`}</DrawerClose>
                      </Link>
                    </li>
                  </>
                )}
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
