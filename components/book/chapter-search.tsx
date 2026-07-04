"use client"

import { useQuery } from "@tanstack/react-query"
import { BookOpen, Clock, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { ChapterSummary } from "@/lib/content/types"
import { useLocale, useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"
import { useBookStore } from "@/stores/book-store"

async function fetchChapters(locale: string): Promise<ChapterSummary[]> {
  const response = await fetch(`/api/chapters?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load chapters")
  return response.json()
}

export function ChapterSearchTrigger() {
  const t = useTranslations()
  const setSearchOpen = useBookStore((state) => state.setSearchOpen)

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-muted-foreground hidden h-8 gap-2 sm:inline-flex"
      onClick={() => setSearchOpen(true)}
    >
      <Search className="size-3.5" />
      <span>{t.search}</span>
      <kbd className="bg-muted text-muted-foreground pointer-events-none hidden rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium md:inline-block">
        ⌘K
      </kbd>
    </Button>
  )
}

export function ChapterSearchDialog() {
  const t = useTranslations()
  const locale = useLocale()
  const { chapterPath: localizedChapterPath } = useLocalizedPaths()
  const router = useRouter()
  const { searchOpen, setSearchOpen } = useBookStore()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data: chapters = [] } = useQuery({
    queryKey: ["chapters", locale],
    queryFn: () => fetchChapters(locale),
    enabled: searchOpen,
  })

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chapters

    return chapters.filter(
      (chapter) =>
        chapter.title.toLowerCase().includes(q) ||
        chapter.description.toLowerCase().includes(q) ||
        chapter.bookTitle.toLowerCase().includes(q) ||
        chapter.partTitle?.toLowerCase().includes(q) ||
        chapter.tags?.some((tag) => tag.toLowerCase().includes(q))
    )
  }, [chapters, query])

  const close = useCallback(() => {
    setSearchOpen(false)
    setQuery("")
    setSelectedIndex(0)
  }, [setSearchOpen])

  const openChapter = useCallback(
    (bookSlug: string, chapterSlug: string) => {
      close()
      router.push(localizedChapterPath(bookSlug, chapterSlug))
    },
    [close, router]
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === "Escape") close()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [close, setSearchOpen])

  useEffect(() => {
    if (!searchOpen) return

    function onDialogKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setSelectedIndex((index) => Math.min(index + 1, results.length - 1))
      }
      if (event.key === "ArrowUp") {
        event.preventDefault()
        setSelectedIndex((index) => Math.max(index - 1, 0))
      }
      if (event.key === "Enter" && results[selectedIndex]) {
        event.preventDefault()
        openChapter(
          results[selectedIndex].bookSlug,
          results[selectedIndex].slug
        )
      }
    }

    window.addEventListener("keydown", onDialogKeyDown)
    return () => window.removeEventListener("keydown", onDialogKeyDown)
  }, [openChapter, results, searchOpen, selectedIndex])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!searchOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={close}
        aria-label={t.search}
      />
      <div className="bg-popover text-popover-foreground relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl ring-1 ring-foreground/5">
        <div className="flex items-center gap-2 border-b px-4">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-12 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="scroll-fade max-h-[min(50vh,360px)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="text-muted-foreground px-3 py-8 text-center text-sm">
              {t.noChaptersFound}
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((chapter, index) => (
                <li key={`${chapter.bookSlug}-${chapter.slug}`}>
                  <button
                    type="button"
                    onClick={() =>
                      openChapter(chapter.bookSlug, chapter.slug)
                    }
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-start transition-colors",
                      index === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/60"
                    )}
                  >
                    <span className="bg-muted text-muted-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs">
                      {String(chapter.order).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-muted-foreground block text-[11px] uppercase tracking-wide">
                        {chapter.bookTitle}
                        {chapter.partTitle ? ` · ${chapter.partTitle}` : ""}
                      </span>
                      <span className="block font-medium">{chapter.title}</span>
                      <span className="text-muted-foreground mt-0.5 block truncate text-sm">
                        {chapter.description}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="gap-1 text-[10px]">
                          <Clock className="size-2.5" />
                          {chapter.readingTimeMinutes} {t.min}
                        </Badge>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-xs">
          <span className="flex items-center gap-1">
            <BookOpen className="size-3" />
            {chapters.length} {t.chaptersCount}
          </span>
          <span className="hidden sm:inline">{t.searchHint}</span>
        </div>
      </div>
    </div>
  )
}

export function MobileSearchButton() {
  const t = useTranslations()
  const setSearchOpen = useBookStore((state) => state.setSearchOpen)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="sm:hidden"
      onClick={() => setSearchOpen(true)}
      aria-label={t.search}
    >
      <Search className="size-4" />
    </Button>
  )
}
