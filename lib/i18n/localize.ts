import type { Locale } from "@/lib/i18n/messages"
import type { LocalizedSiteMeta, SiteMeta } from "@/lib/content/types"

function pickLocalized(
  value: Record<string, string> | string,
  locale: Locale
): string {
  if (typeof value === "string") return value
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? ""
}

export function localizeSiteMeta(
  meta: SiteMeta,
  locale: Locale = "en"
): LocalizedSiteMeta {
  return {
    title: pickLocalized(meta.title, locale),
    description: pickLocalized(meta.description, locale),
    author: meta.author,
    siteUrl: meta.siteUrl,
    language: locale,
  }
}
