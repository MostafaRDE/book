"use client"

import { AdSlot } from "@/components/ads/ad-slot"
import { MarkdownContent } from "@/components/book/markdown-content"
import type { ResolvedContentSegment } from "@/lib/ads/types"

type MarkdownWithResolvedAdsProps = {
  segments: ResolvedContentSegment[]
  className?: string
}

export function MarkdownWithResolvedAds({
  segments,
  className,
}: MarkdownWithResolvedAdsProps) {
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "ad") {
          if (!segment.ad) return null
          return (
            <AdSlot
              key={`ad-${segment.marker}-${index}`}
              creative={segment.ad.creative}
              placementId={segment.ad.placementId}
              layout="inline"
            />
          )
        }

        if (!segment.content.trim()) return null

        return (
          <MarkdownContent
            key={`md-${index}`}
            content={segment.content}
            className={className}
          />
        )
      })}
    </>
  )
}
