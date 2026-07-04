"use client"

import { useEffect, useState } from "react"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useDirection } from "@/hooks/use-translations"
import { LocaleProvider } from "@/providers/locale-provider"
import { QueryProvider } from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"

function AppToaster() {
  const direction = useDirection()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return (
    <Toaster
      richColors
      position={
        isMobile
          ? "top-center"
          : direction === "rtl"
            ? "bottom-left"
            : "bottom-right"
      }
    />
  )
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <AppToaster />
        </QueryProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
