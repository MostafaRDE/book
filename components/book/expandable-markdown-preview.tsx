"use client"

import { ChevronDown } from "lucide-react"
import { useMemo, useState } from "react"

import { MarkdownWithResolvedAds } from "@/components/ads/markdown-with-resolved-ads"
import { MarkdownContent } from "@/components/book/markdown-content"
import type { ResolvedContentSegment } from "@/lib/ads/types"

type ExpandableMarkdownPreviewProps = {
  content: string
  readMoreLabel: string
  className?: string
  previewParagraphs?: number
  maxPreviewChars?: number
  resolvedSegments?: ResolvedContentSegment[]
}

export function ExpandableMarkdownPreview({
  content,
  readMoreLabel,
  className,
  previewParagraphs = 1,
  maxPreviewChars = 300,
  resolvedSegments,
}: ExpandableMarkdownPreviewProps) {
  const paragraphs = useMemo(
    () =>
      content
        .split(/\n\n+/)
        .map((block) => block.trim())
        .filter(Boolean),
    [content]
  )

  const shouldCollapse =
    paragraphs.length > previewParagraphs ||
    (paragraphs[0]?.length ?? 0) > maxPreviewChars

  const [expanded, setExpanded] = useState(false)

  const previewContent = paragraphs.slice(0, previewParagraphs).join("\n\n")
  const hasAds = Boolean(resolvedSegments?.some((s) => s.type === "ad"))

  if (!shouldCollapse) {
    if (hasAds && resolvedSegments) {
      return (
        <MarkdownWithResolvedAds segments={resolvedSegments} className={className} />
      )
    }
    return <MarkdownContent content={content} className={className} />
  }

  if (expanded) {
    if (hasAds && resolvedSegments) {
      return (
        <MarkdownWithResolvedAds segments={resolvedSegments} className={className} />
      )
    }
    return <MarkdownContent content={content} className={className} />
  }

  return (
    <div>
      <MarkdownContent content={previewContent} className={className} />
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="text-muted-foreground/80 hover:text-foreground mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm transition-colors"
      >
        <ChevronDown className="size-4 opacity-50" aria-hidden />
        <span>{readMoreLabel}</span>
      </button>
    </div>
  )
}
