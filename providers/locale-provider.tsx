"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { DirectionProvider } from "@/components/ui/direction"
import { useDirection } from "@/hooks/use-translations"
import { localeFromPathname } from "@/lib/i18n/routing"
import { useLocaleStore } from "@/stores/locale-store"

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const direction = useDirection()
  const locale = localeFromPathname(pathname)
  const setLocale = useLocaleStore((state) => state.setLocale)

  useEffect(() => {
    setLocale(locale)
    const root = document.documentElement
    root.lang = locale
    root.dir = direction
  }, [locale, direction, setLocale])

  return (
    <DirectionProvider direction={direction}>{children}</DirectionProvider>
  )
}
