"use client"

import Link from "next/link"

import {
  ChapterSearchDialog,
  ChapterSearchTrigger,
  MobileSearchButton,
} from "@/components/book/chapter-search"
import { LocaleToggle } from "@/components/book/locale-toggle"
import { ThemeToggle } from "@/components/book/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "@/hooks/use-translations"

type SiteHeaderProps = {
  author: string
}

export function SiteHeader({ author }: SiteHeaderProps) {
  const t = useTranslations()

  return (
    <>
      <header className="bg-background/70 sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="truncate font-semibold tracking-tight transition-opacity hover:opacity-80"
            >
              {author}
            </Link>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <Badge
              variant="secondary"
              className="hidden rounded-full sm:inline-flex"
            >
              {t.library}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <ChapterSearchTrigger />
            <MobileSearchButton />
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <ChapterSearchDialog />
    </>
  )
}
