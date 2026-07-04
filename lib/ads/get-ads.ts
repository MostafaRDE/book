import fs from "node:fs"
import path from "node:path"

import type { Locale } from "@/lib/i18n/messages"
import type {
  AdPageContext,
  AdsConfig,
  BookOverviewSection,
  ResolvedAd,
} from "@/lib/ads/types"

const ADS_PATH = path.join(process.cwd(), "content", "ads.json")

function readAdsConfig(): AdsConfig {
  if (!fs.existsSync(ADS_PATH)) {
    return { creatives: {}, placements: [] }
  }
  return JSON.parse(fs.readFileSync(ADS_PATH, "utf8")) as AdsConfig
}

function matchesPage(
  placementPages: string[],
  context: AdPageContext
): boolean {
  return placementPages.includes(context.page)
}

export function getSidebarAd(context: AdPageContext): ResolvedAd | null {
  const config = readAdsConfig()

  const placement = config.placements.find(
    (item) =>
      item.enabled &&
      item.slot === "sidebar" &&
      item.pages.includes(context.page) &&
      item.locales.includes(context.locale) &&
      matchesPage(item.pages, context)
  )

  if (!placement) return null
  const creative = config.creatives[placement.creative]
  if (!creative) return null

  return {
    placementId: placement.id,
    creative,
  }
}

export function getInContentAd(
  marker: string,
  context: AdPageContext
): ResolvedAd | null {
  const config = readAdsConfig()

  const placement = config.placements.find(
    (item) =>
      item.enabled &&
      item.slot === "in-content" &&
      item.marker === marker &&
      item.pages.includes(context.page) &&
      item.locales.includes(context.locale)
  )

  if (!placement) return null
  const creative = config.creatives[placement.creative]
  if (!creative) return null

  return {
    placementId: placement.id,
    creative,
    marker,
  }
}

export function getBookSectionAd(
  section: BookOverviewSection,
  context: AdPageContext
): ResolvedAd | null {
  const config = readAdsConfig()

  const placement = config.placements.find(
    (item) =>
      item.enabled &&
      item.slot === "book-section" &&
      item.section === section &&
      item.pages.includes(context.page) &&
      item.locales.includes(context.locale)
  )

  if (!placement) return null
  const creative = config.creatives[placement.creative]
  if (!creative) return null

  return {
    placementId: placement.id,
    creative,
  }
}

export { parseContentSegments } from "./parse-content-segments"

export function getAdsConfigForLocale(_locale: Locale): AdsConfig {
  return readAdsConfig()
}
