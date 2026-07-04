import type { Locale } from "@/lib/i18n/messages"
import { withLocalePrefix } from "@/lib/i18n/routing"

export function bookPath(bookSlug: string, locale: Locale = "en") {
  return withLocalePrefix(`/books/${bookSlug}`, locale)
}

export function chapterPath(
  bookSlug: string,
  chapterSlug: string,
  locale: Locale = "en"
) {
  return withLocalePrefix(`/books/${bookSlug}/${chapterSlug}`, locale)
}

export function homePath(locale: Locale = "en") {
  return withLocalePrefix("/", locale)
}
