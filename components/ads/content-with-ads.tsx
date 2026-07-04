import { getInContentAd } from "@/lib/ads/get-ads"
import { parseContentSegments } from "@/lib/ads/parse-content-segments"
import type { AdPageContext } from "@/lib/ads/types"

import { AdSlot } from "./ad-slot"
import { MarkdownContent } from "@/components/book/markdown-content"

type ContentWithAdsProps = {
  content: string
  context: AdPageContext
  skipFirstH1?: boolean
}

export function ContentWithAds({
  content,
  context,
  skipFirstH1,
}: ContentWithAdsProps) {
  const segments = parseContentSegments(content)
  let firstMarkdown = true

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "ad") {
          const ad = getInContentAd(segment.marker, context)
          if (!ad) return null
          return (
            <AdSlot
              key={`ad-${segment.marker}-${index}`}
              creative={ad.creative}
              placementId={ad.placementId}
              layout="inline"
            />
          )
        }

        const shouldSkipH1 = skipFirstH1 && firstMarkdown
        firstMarkdown = false

        return (
          <MarkdownContent
            key={`md-${index}`}
            content={segment.content}
            skipFirstH1={shouldSkipH1}
          />
        )
      })}
    </>
  )
}
