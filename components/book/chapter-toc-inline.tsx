"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"
import type { HeadingItem } from "@/lib/content/extract-headings"

type ChapterTocInlineProps = {
  headings: HeadingItem[]
}

export function ChapterTocInline({ headings }: ChapterTocInlineProps) {
  const t = useTranslations()
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <details className="xl:hidden group/toc mb-8 overflow-hidden rounded-xl border border-border/60 bg-card/40 open:shadow-sm">
      <summary className="text-muted-foreground flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span>{t.onThisPage}</span>
        <span className="text-xs opacity-70 transition-transform group-open/toc:rotate-180">
          ▾
        </span>
      </summary>
      <nav className="border-t border-border/50 px-2 py-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm leading-snug transition-colors",
              heading.level === 3 && "ps-6 text-xs",
              activeId === heading.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </details>
  )
}
