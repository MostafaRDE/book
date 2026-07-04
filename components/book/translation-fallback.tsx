"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { chapterPath } from "@/lib/content/paths"
import { useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type TranslationFallbackProps = {
  bookSlug: string
  chapterSlug: string
  chapterTitle: string
}

export function TranslationFallback({
  bookSlug,
  chapterSlug,
  chapterTitle,
}: TranslationFallbackProps) {
  const t = useTranslations()

  return (
    <div className="my-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <p className="font-medium">{t.translationMissingTitle}</p>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {t.translationMissingBody}
      </p>
      <Link
        href={chapterPath(bookSlug, chapterSlug, "en")}
        className={cn(buttonVariants({ variant: "outline" }), "mt-4 rounded-full")}
      >
        {t.readEnglishVersion}: {chapterTitle}
      </Link>
    </div>
  )
}
