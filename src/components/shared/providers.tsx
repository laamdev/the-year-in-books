import { ReactNode } from "react"
import { Provider } from "react-wrap-balancer"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Provider>{children}</Provider>
        <Toaster />
      </TooltipProvider>
    </>
  )
}
