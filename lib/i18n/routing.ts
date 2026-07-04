import type { Locale } from "@/lib/i18n/messages"

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/fa" || pathname.startsWith("/fa/") ? "fa" : "en"
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/fa") return "/"
  if (pathname.startsWith("/fa/")) return pathname.slice(3) || "/"
  return pathname
}

export function withLocalePrefix(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (locale === "en") return normalized
  if (normalized === "/") return "/fa"
  return `/fa${normalized}`
}

export function swapLocalePath(pathname: string, locale: Locale): string {
  return withLocalePrefix(stripLocalePrefix(pathname), locale)
}
