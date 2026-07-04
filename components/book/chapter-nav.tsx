"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ChapterSummary } from "@/lib/content/types"
import { useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type ChapterNavProps = {
  bookSlug: string
  previous: ChapterSummary | null
  next: ChapterSummary | null
}

export function ChapterNav({ bookSlug, previous, next }: ChapterNavProps) {
  const t = useTranslations()
  const { chapterPath: localizedChapterPath } = useLocalizedPaths()

  if (!previous && !next) return null

  return (
    <div className="mt-14">
      <Separator className="mb-6" />
      <div className="grid gap-4 sm:grid-cols-2">
        {previous ? (
          <Link
            href={localizedChapterPath(bookSlug, previous.slug)}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group h-auto flex-col items-start gap-2 rounded-2xl p-5 text-start"
            )}
          >
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
              {t.previous}
            </span>
            <span className="text-base font-semibold leading-snug">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={localizedChapterPath(bookSlug, next.slug)}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group h-auto flex-col items-end gap-2 rounded-2xl p-5 text-end sm:col-start-2"
            )}
          >
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
              {t.next}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
            <span className="text-base font-semibold leading-snug">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
