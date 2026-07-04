import { getBookSectionAd } from "@/lib/ads/get-ads"
import type { AdPageContext, BookOverviewSection } from "@/lib/ads/types"

import { AdSlot } from "./ad-slot"

type BookSectionAdProps = {
  section: BookOverviewSection
  context: AdPageContext
}

export function BookSectionAd({ section, context }: BookSectionAdProps) {
  const ad = getBookSectionAd(section, context)
  if (!ad) return null

  return (
    <AdSlot
      creative={ad.creative}
      placementId={ad.placementId}
      layout="inline"
    />
  )
}
