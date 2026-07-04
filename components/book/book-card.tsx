"use client"

import { BookOpen, Clock, Layers } from "lucide-react"
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
import type { BookSummary } from "@/lib/content/types"
import { useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type BookCardProps = {
  book: BookSummary
  featured?: boolean
}

export function BookCard({ book, featured }: BookCardProps) {
  const t = useTranslations()
  const { bookPath: localizedBookPath } = useLocalizedPaths()

  return (
    <Link href={localizedBookPath(book.slug)} className="group block h-full">
      <Card
        className={cn(
          "relative h-full overflow-hidden transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
          featured && "border-primary/30 bg-primary/[0.03]"
        )}
      >
        {featured ? (
          <div className="bg-primary text-primary-foreground absolute end-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
            {t.flagship}
          </div>
        ) : null}
        <div className="absolute inset-y-0 start-0 w-1 scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
        <CardHeader className="gap-2">
          <CardTitle className="font-display pe-16 text-2xl font-normal tracking-tight transition-colors group-hover:text-primary">
            {book.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {book.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
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
                {t.flatChapters}
              </Badge>
            )}
          </div>
          {book.tags && book.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          <p className="text-primary flex items-center gap-1 text-sm font-medium opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            {t.openBook}
            <LocaleDiagonalArrow className="size-3.5" />
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
