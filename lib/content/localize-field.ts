import type { Locale } from "@/lib/i18n/messages"

export type LocalizedString = string | Record<string, string>

export function pickLocalizedField(
  value: LocalizedString | undefined,
  locale: Locale,
  fallback = ""
): string {
  if (!value) return fallback
  if (typeof value === "string") return value
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? fallback
}
