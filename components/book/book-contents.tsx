"use client"

import { useQuery } from "@tanstack/react-query"
import { Clock } from "lucide-react"
import Link from "next/link"

import { LocaleDiagonalArrow } from "@/components/book/locale-diagonal-arrow"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { BookDetail } from "@/lib/content/types"
import { useLocale, useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

async function fetchBook(bookSlug: string, locale: string): Promise<BookDetail> {
  const response = await fetch(`/api/books/${bookSlug}?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load book")
  return response.json()
}

type BookContentsProps = {
  bookSlug: string
}

export function BookContents({ bookSlug }: BookContentsProps) {
  const locale = useLocale()
  const { chapterPath: localizedChapterPath } = useLocalizedPaths()
  const { data: book, isLoading } = useQuery({
    queryKey: ["books", bookSlug, locale],
    queryFn: () => fetchBook(bookSlug, locale),
  })

  if (isLoading || !book) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="bg-muted h-5 w-1/3 rounded" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (book.hasParts && book.parts) {
    return (
      <div className="space-y-10">
        {book.parts.map((part) => (
          <section key={part.slug}>
            <div className="mb-4">
              <h2 className="font-display text-2xl font-normal tracking-tight">
                {part.title}
              </h2>
              {part.description ? (
                <p className="text-muted-foreground mt-1 text-sm">
                  {part.description}
                </p>
              ) : null}
            </div>
            <div className="space-y-3">
              {part.chapters.map((chapter) => (
                <ChapterRow
                  key={chapter.slug}
                  href={localizedChapterPath(book.slug, chapter.slug)}
                  order={chapter.order}
                  title={chapter.title}
                  description={chapter.description}
                  minutes={chapter.readingTimeMinutes}
                  tags={chapter.tags}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {book.chapters.map((chapter) => (
        <ChapterRow
          key={chapter.slug}
          href={localizedChapterPath(book.slug, chapter.slug)}
          order={chapter.order}
          title={chapter.title}
          description={chapter.description}
          minutes={chapter.readingTimeMinutes}
          tags={chapter.tags}
        />
      ))}
    </div>
  )
}

type ChapterRowProps = {
  href: string
  order: number
  title: string
  description: string
  minutes: number
  tags?: string[]
}

function ChapterRow({
  href,
  order,
  title,
  description,
  minutes,
  tags,
}: ChapterRowProps) {
  const t = useTranslations()

  return (
    <Link href={href} className="group block">
      <Card
        className={cn(
          "transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
        )}
      >
        <CardHeader className="gap-2 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-1 font-mono text-xs tabular-nums">
                {String(order).padStart(2, "0")}
              </p>
              <CardTitle className="text-lg transition-colors group-hover:text-primary">
                {title}
              </CardTitle>
            </div>
            <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <LocaleDiagonalArrow className="size-3.5" />
            </span>
          </div>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-0">
          <Badge variant="secondary" className="gap-1 rounded-full">
            <Clock className="size-3" />
            {minutes} {t.min}
          </Badge>
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full text-[10px]">
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  )
}
