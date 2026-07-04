"use client"

import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { ChapterSummary } from "@/lib/content/types"
import {
  useLocale,
  useLocalizedPaths,
  useTranslations,
} from "@/hooks/use-translations"
import { useBookStore } from "@/stores/book-store"

async function fetchChapters(locale: string): Promise<ChapterSummary[]> {
  const response = await fetch(`/api/chapters?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load chapters")
  return response.json()
}

export function ContinueReading() {
  const t = useTranslations()
  const locale = useLocale()
  const { chapterPath: localizedChapterPath } = useLocalizedPaths()
  const lastRead = useBookStore((state) => state.lastRead)
  const { data: chapters } = useQuery({
    queryKey: ["chapters", locale],
    queryFn: () => fetchChapters(locale),
  })

  const chapter = chapters?.find(
    (item) =>
      item.bookSlug === lastRead?.bookSlug &&
      item.slug === lastRead?.chapterSlug
  )

  if (!lastRead || !chapter) return null

  return (
    <Link
      href={localizedChapterPath(lastRead.bookSlug, lastRead.chapterSlug)}
      className="group relative mb-10 block overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/80 to-card p-5 shadow-sm transition-all hover:border-primary/35 hover:shadow-md"
    >
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Bookmark className="text-primary size-4" />
            <span className="text-primary text-xs font-medium tracking-wide uppercase">
              {t.continueReading}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{chapter.bookTitle}</p>
          <p className="truncate text-lg font-semibold">{chapter.title}</p>
          {chapter.partTitle ? (
            <p className="text-muted-foreground mt-1 text-sm">
              {t.partLabel} {chapter.partTitle}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">
              {chapter.readingTimeMinutes} {t.min}
            </Badge>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
          <ArrowRight className="size-4 rtl:rotate-180" />
        </div>
      </div>
    </Link>
  )
}
