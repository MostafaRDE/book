import type { Locale } from "@/lib/i18n/messages"
import { pickLocalizedField } from "@/lib/content/localize-field"
import type { LocalizedString } from "@/lib/content/types"

export type AdPageType = "home" | "book" | "chapter"

/** Fixed slots on the book overview page (no markdown marker needed). */
export type BookOverviewSection =
  | "after-intro"
  | "after-foreword"
  | "before-contents"

export type AdPageContext = {
  page: AdPageType
  locale: Locale
  bookSlug?: string
  chapterSlug?: string
}

export type AdCreativeVariant = {
  title: LocalizedString
  description: LocalizedString
  href: string
  image: string | null
}

export type AdCreative = {
  type: "custom" | "adsense"
  label: LocalizedString
  desktop: AdCreativeVariant
  mobile: AdCreativeVariant
  adsenseClient?: string
  adsenseSlot?: string
}

export type AdPlacement = {
  id: string
  slot: "sidebar" | "in-content" | "book-section"
  creative: string
  enabled: boolean
  pages: AdPageType[]
  locales: Locale[]
  /** In-content marker in markdown: `<!-- ad:marker -->` */
  marker?: string
  /** Book overview slot when `slot` is `book-section` */
  section?: BookOverviewSection
}

export type AdsConfig = {
  creatives: Record<string, AdCreative>
  placements: AdPlacement[]
}

export type ResolvedAd = {
  placementId: string
  creative: AdCreative
  marker?: string
}

export type ResolvedContentSegment =
  | { type: "markdown"; content: string }
  | { type: "ad"; ad: ResolvedAd | null; marker: string }

export function localizeAdText(
  value: LocalizedString | undefined,
  locale: Locale
): string {
  return pickLocalizedField(value ?? "", locale)
}
