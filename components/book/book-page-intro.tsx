"use client"

import { BookOpen, Clock, Layers } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import type { BookDetail, ChapterSummary } from "@/lib/content/types"
import { useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type BookPageIntroProps = {
  book: BookDetail
  firstChapter: ChapterSummary | undefined
}

export function BookPageIntro({ book, firstChapter }: BookPageIntroProps) {
  const t = useTranslations()
  const { chapterPath: localizedChapterPath } = useLocalizedPaths()

  return (
    <>
      <nav className="text-muted-foreground mb-6 text-sm">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t.library}
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-foreground">{book.title}</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
        {book.featured ? (
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            {t.flagshipBook}
          </Badge>
        ) : null}
        <h1 className="font-display text-4xl font-normal tracking-tight text-balance sm:text-5xl">
          {book.title}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          {book.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1 rounded-full">
            <BookOpen className="size-3" />
            {book.chapterCount} {t.chaptersCount}
          </Badge>
          <Badge variant="secondary" className="gap-1 rounded-full">
            <Clock className="size-3" />
            {book.readingTimeMinutes} {t.min}
          </Badge>
          {book.hasParts ? (
            <Badge variant="outline" className="gap-1 rounded-full">
              <Layers className="size-3" />
              {book.partCount} {t.partsCount}
            </Badge>
          ) : (
            <Badge variant="outline" className="rounded-full">
              {t.noParts}
            </Badge>
          )}
        </div>
        {firstChapter ? (
          <Link
            href={localizedChapterPath(book.slug, firstChapter.slug)}
            className={cn(buttonVariants(), "mt-8 rounded-full px-5")}
          >
            {t.startWith}: {firstChapter.title}
          </Link>
        ) : null}
      </header>
    </>
  )
}
