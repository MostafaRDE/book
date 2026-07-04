"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"

type ChapterHeaderProps = {
  title: string
  description: string
  partTitle?: string
  readingTimeMinutes: number
  tags?: string[]
}

export function ChapterHeader({
  title,
  description,
  partTitle,
  readingTimeMinutes,
  tags,
}: ChapterHeaderProps) {
  const t = useTranslations()

  return (
    <header className="mb-10 rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm sm:p-8">
      <p className="text-muted-foreground mb-3 font-mono text-xs tracking-wide uppercase">
        {partTitle ? `${partTitle} · ` : ""}
        {readingTimeMinutes} {t.minutesRead}
      </p>
      <h1 className="font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        {description}
      </p>
      {tags && tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </header>
  )
}
