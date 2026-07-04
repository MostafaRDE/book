"use client"

import Link from "next/link"

import { ExpandableMarkdownPreview } from "@/components/book/expandable-markdown-preview"
import type { ResolvedContentSegment } from "@/lib/ads/types"
import { MarkdownContent } from "@/components/book/markdown-content"
import { buttonVariants } from "@/components/ui/button"
import type { BookForeword } from "@/lib/content/types"
import { bookPath } from "@/lib/content/paths"
import { useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type BookForewordProps = {
  bookSlug: string
  foreword: BookForeword
  resolvedSegments?: ResolvedContentSegment[]
}

export function BookForewordSection({
  bookSlug,
  foreword,
  resolvedSegments,
}: BookForewordProps) {
  const t = useTranslations()

  if (!foreword.content && !foreword.hasTranslation) {
    return (
      <section className="mb-12">
        <h2 className="font-display mb-6 text-2xl font-normal tracking-tight">
          {t.foreword}
        </h2>
        <div className="my-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <p className="font-medium">{t.translationMissingTitle}</p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {t.translationMissingBody}
          </p>
          <Link
            href={bookPath(bookSlug, "en")}
            className={cn(buttonVariants({ variant: "outline" }), "mt-4 rounded-full")}
          >
            {t.readEnglishVersion}: {t.foreword}
          </Link>
        </div>
      </section>
    )
  }

  if (!foreword.content) return null

  return (
    <section className="mb-12">
      <h2 className="font-display mb-6 text-2xl font-normal tracking-tight">
        {t.foreword}
      </h2>
      <div className="prose-book leading-relaxed">
        <ExpandableMarkdownPreview
          content={foreword.content}
          readMoreLabel={t.forewordReadMore}
          resolvedSegments={resolvedSegments}
        />
      </div>
    </section>
  )
}
