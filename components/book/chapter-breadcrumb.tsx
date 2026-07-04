"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { useLocalizedPaths, useTranslations } from "@/hooks/use-translations"

type ChapterBreadcrumbProps = {
  bookSlug: string
  bookTitle: string
  partTitle?: string
  chapterTitle: string
}

export function ChapterBreadcrumb({
  bookSlug,
  bookTitle,
  partTitle,
  chapterTitle,
}: ChapterBreadcrumbProps) {
  const t = useTranslations()
  const { bookPath: localizedBookPath } = useLocalizedPaths()

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5 text-sm"
    >
      <Link href="/" className="hover:text-foreground transition-colors">
        {t.library}
      </Link>
      <ChevronRight className="size-3.5 opacity-50 rtl:rotate-180" />
      <Link
        href={localizedBookPath(bookSlug)}
        className="hover:text-foreground transition-colors"
      >
        {bookTitle}
      </Link>
      {partTitle ? (
        <>
          <ChevronRight className="size-3.5 opacity-50 rtl:rotate-180" />
          <span>{partTitle}</span>
        </>
      ) : null}
      <ChevronRight className="size-3.5 opacity-50 rtl:rotate-180" />
      <span className="text-foreground font-medium">{chapterTitle}</span>
    </nav>
  )
}
