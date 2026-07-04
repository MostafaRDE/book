import type { AdPageContext, ResolvedContentSegment } from "@/lib/ads/types"

import { getInContentAd } from "./get-ads"
import { parseContentSegments } from "./parse-content-segments"

export type { ResolvedContentSegment }

export function resolveContentSegments(
  content: string,
  context: AdPageContext
): ResolvedContentSegment[] {
  return parseContentSegments(content).map((segment) => {
    if (segment.type === "ad") {
      return {
        type: "ad",
        marker: segment.marker,
        ad: getInContentAd(segment.marker, context),
      }
    }
    return segment
  })
}
