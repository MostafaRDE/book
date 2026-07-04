"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"
import type { HeadingItem } from "@/lib/content/extract-headings"

type ChapterTocProps = {
  headings: HeadingItem[]
}

export function ChapterToc({ headings }: ChapterTocProps) {
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
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-20 ps-6">
        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
          {t.onThisPage}
        </p>
        <nav className="border-s border-border/60 scroll-fade max-h-[calc(100svh-6rem)] space-y-0.5 overflow-y-auto ps-3">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-sm leading-snug transition-colors",
                heading.level === 3 && "ps-3 text-xs",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
