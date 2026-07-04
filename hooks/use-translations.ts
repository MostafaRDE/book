"use client"

import { usePathname } from "next/navigation"

import { getMessages, type Locale, type Messages } from "@/lib/i18n/messages"
import { localeFromPathname } from "@/lib/i18n/routing"
import { bookPath, chapterPath, homePath } from "@/lib/content/paths"
import { useLocaleStore } from "@/stores/locale-store"

export function useLocale(): Locale {
  const pathname = usePathname()
  const stored = useLocaleStore((state) => state.locale)
  return localeFromPathname(pathname) ?? stored
}

export function useTranslations(): Messages {
  const locale = useLocale()
  return getMessages(locale)
}

export function useDirection(): "ltr" | "rtl" {
  const locale = useLocale()
  return locale === "fa" ? "rtl" : "ltr"
}

export function useLocalizedPaths() {
  const locale = useLocale()

  return {
    locale,
    homePath: () => homePath(locale),
    bookPath: (bookSlug: string) => bookPath(bookSlug, locale),
    chapterPath: (bookSlug: string, chapterSlug: string) =>
      chapterPath(bookSlug, chapterSlug, locale),
  }
}
