"use client"

import { BookMarked, Clock, Layers, Library, Tags } from "lucide-react"
import Link from "next/link"

import { LocaleDiagonalArrow } from "@/components/book/locale-diagonal-arrow"

import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LibraryStats } from "@/lib/content/book-stats"
import type { BookSummary } from "@/lib/content/types"
import { useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type LibraryHeroProps = {
  stats: LibraryStats
  featuredBook: BookSummary | null
}

export function LibraryHero({ stats, featuredBook }: LibraryHeroProps) {
  const t = useTranslations()
  const { bookPath: localizedBookPath } = useLocalizedPaths()

  return (
    <section className="relative mb-14 overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 shadow-sm backdrop-blur-sm sm:p-10">
      <div className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -start-10 size-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-0">
            <Library className="size-3" />
            {t.personalLibrary}
          </Badge>
          <Badge variant="outline">{t.markdownFirst}</Badge>
        </div>

        <h1 className="font-display text-4xl font-normal tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
          {t.siteTitle}
        </h1>

        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
          {t.siteDescription}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: BookMarked, label: t.books, value: stats.bookCount },
            { icon: Layers, label: t.chapters, value: stats.chapterCount },
            { icon: Clock, label: t.minRead, value: stats.totalReadingMinutes },
            { icon: Tags, label: t.topics, value: stats.tagCount },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-border/50 bg-background/60 px-3 py-3 text-center backdrop-blur-sm"
            >
              <Icon className="text-muted-foreground mx-auto mb-1.5 size-4" />
              <p className="text-xl font-semibold tabular-nums">{value}</p>
              <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>

        {featuredBook ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizedBookPath(featuredBook.slug)}
              className={cn(buttonVariants(), "gap-2 rounded-full px-5")}
            >
              {t.readBook} {featuredBook.title}
              <LocaleDiagonalArrow className="size-4" />
            </Link>
            <Link
              href="#books"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-5"
              )}
            >
              {t.browseAllBooks}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
