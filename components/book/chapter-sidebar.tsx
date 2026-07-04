"use client"

import { useQuery } from "@tanstack/react-query"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Library,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SidebarAd } from "@/components/ads/sidebar-ad"
import type { AdCreative } from "@/lib/ads/types"
import { bookPath, chapterPath } from "@/lib/content/paths"
import type {
  BookDetail,
  BookSummary,
  ChapterSummary,
  PartSummary,
} from "@/lib/content/types"
import type { Locale, Messages } from "@/lib/i18n/messages"
import { useLocale, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"
import { useBookStore } from "@/stores/book-store"

async function fetchBooks(locale: string): Promise<BookSummary[]> {
  const response = await fetch(`/api/books?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load books")
  return response.json()
}

async function fetchBook(bookSlug: string, locale: string): Promise<BookDetail> {
  const response = await fetch(`/api/books/${bookSlug}?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load book")
  return response.json()
}

function useActiveBookSlug(pathname: string): string | null {
  const match = pathname.match(/^\/(?:fa\/)?books\/([^/]+)/)
  return match?.[1] ?? null
}

function useActiveChapterSlug(pathname: string): string | null {
  const match = pathname.match(/^\/(?:fa\/)?books\/[^/]+\/([^/]+)/)
  return match?.[1] ?? null
}

function formatPartNumber(order: number) {
  return String(order).padStart(2, "0")
}

type ChapterLinkProps = {
  bookSlug: string
  chapter: ChapterSummary
  index: number
  active: boolean
  onNavigate: () => void
  t: Messages
  locale: Locale
}

function ChapterLink({
  bookSlug,
  chapter,
  index,
  active,
  onNavigate,
  t,
  locale,
}: ChapterLinkProps) {
  return (
    <Link
      href={chapterPath(bookSlug, chapter.slug, locale)}
      onClick={onNavigate}
      className={cn(
        "group/chapter flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] tabular-nums",
          active
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover/chapter:bg-background"
        )}
      >
        {formatPartNumber(index)}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block leading-snug font-medium",
            active ? "text-primary-foreground" : "text-foreground/90"
          )}
        >
          {chapter.title}
        </span>
        <span
          className={cn(
            "mt-0.5 flex items-center gap-1 text-[11px]",
            active ? "text-primary-foreground/75" : "text-muted-foreground"
          )}
        >
          <Clock className="size-2.5" />
          {chapter.readingTimeMinutes} {t.min}
        </span>
      </span>
    </Link>
  )
}

type PartSectionProps = {
  bookSlug: string
  part: PartSummary
  partIndex: number
  pathname: string
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
  chapterOffset: number
  t: Messages
  locale: Locale
}

function PartSection({
  bookSlug,
  part,
  partIndex,
  pathname,
  expanded,
  onToggle,
  onNavigate,
  chapterOffset,
  t,
  locale,
}: PartSectionProps) {
  const hasActiveChapter = part.chapters.some(
    (chapter) => pathname === chapterPath(bookSlug, chapter.slug, locale)
  )

  return (
    <section className="overflow-hidden rounded-xl border border-border/60 bg-muted/20">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-start gap-2 px-3 py-2.5 text-start transition-colors hover:bg-muted/40",
          hasActiveChapter && !expanded && "bg-primary/5"
        )}
      >
        <span className="bg-background text-muted-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] tabular-nums">
          {formatPartNumber(partIndex + 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug">
            {part.title}
          </span>
          {part.description ? (
            <span className="text-muted-foreground mt-0.5 block line-clamp-2 text-[11px] leading-relaxed">
              {part.description}
            </span>
          ) : null}
          <span className="text-muted-foreground mt-1 block text-[10px] tracking-wide uppercase">
            {part.chapters.length} {t.chaptersCount}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "text-muted-foreground mt-1 size-4 shrink-0 transition-transform",
            !expanded && "-rotate-90 rtl:rotate-90"
          )}
        />
      </button>

      {expanded ? (
        <div className="space-y-0.5 border-t border-border/50 px-1.5 py-1.5">
          {part.chapters.map((chapter, index) => (
            <ChapterLink
              key={chapter.slug}
              bookSlug={bookSlug}
              chapter={chapter}
              index={chapterOffset + index + 1}
              active={pathname === chapterPath(bookSlug, chapter.slug, locale)}
              onNavigate={onNavigate}
              t={t}
              locale={locale}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

function BookSidebarHeader({ book, t }: { book: BookDetail; t: Messages }) {
  return (
    <div className="mb-4 rounded-xl border border-border/60 bg-card/50 p-3">
      <p className="text-muted-foreground mb-2 text-[10px] font-medium tracking-[0.14em] uppercase">
        {t.currentBook}
      </p>
      <p className="font-display text-lg leading-snug tracking-tight">
        {book.title}
      </p>
      <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-[11px]">
        <span className="inline-flex items-center gap-1">
          <BookOpen className="size-3" />
          {book.chapterCount} {t.chaptersCount}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {book.readingTimeMinutes} {t.min}
        </span>
        {book.hasParts ? (
          <span>
            {book.partCount} {t.partsCount}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function SidebarNav({
  pathname,
  books,
  activeBook,
  expandedParts,
  togglePart,
  onNavigate,
  locale,
}: {
  pathname: string
  books: BookSummary[]
  activeBook: BookDetail | undefined
  expandedParts: Set<string>
  togglePart: (partSlug: string) => void
  onNavigate: () => void
  locale: Locale
}) {
  const t = useTranslations()
  const homeHref = locale === "fa" ? "/fa" : "/"
  const isHome = pathname === "/" || pathname === "/fa"

  return (
    <nav className="space-y-4">
      <Link
        href={homeHref}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isHome
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Library className="size-4 shrink-0" />
        {t.library}
      </Link>

      {activeBook ? (
        <div className="space-y-3">
          <BookSidebarHeader book={activeBook} t={t} />

          <Link
            href={bookPath(activeBook.slug, locale)}
            onClick={onNavigate}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === bookPath(activeBook.slug, locale)
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{t.bookOverview}</span>
            <ChevronRight className="size-3.5 opacity-60 rtl:rotate-180" />
          </Link>

          <Separator />

          {activeBook.hasParts && activeBook.parts ? (
            <div className="space-y-2">
              <p className="text-muted-foreground px-1 text-[10px] font-medium tracking-[0.14em] uppercase">
                {t.partsAndChapters}
              </p>
              {activeBook.parts.map((part, partIndex) => {
                const chapterOffset = activeBook.parts!
                  .slice(0, partIndex)
                  .reduce((sum, item) => sum + item.chapters.length, 0)

                return (
                  <PartSection
                    key={part.slug}
                    bookSlug={activeBook.slug}
                    part={part}
                    partIndex={partIndex}
                    pathname={pathname}
                    expanded={expandedParts.has(part.slug)}
                    onToggle={() => togglePart(part.slug)}
                    onNavigate={onNavigate}
                    chapterOffset={chapterOffset}
                    t={t}
                    locale={locale}
                  />
                )
              })}
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-muted-foreground mb-2 px-1 text-[10px] font-medium tracking-[0.14em] uppercase">
                {t.chapters}
              </p>
              {activeBook.chapters.map((chapter, index) => (
                <ChapterLink
                  key={chapter.slug}
                  bookSlug={activeBook.slug}
                  chapter={chapter}
                  index={index + 1}
                  active={
                    pathname ===
                    chapterPath(activeBook.slug, chapter.slug, locale)
                  }
                  onNavigate={onNavigate}
                  t={t}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-muted-foreground mb-2 px-1 text-[10px] font-medium tracking-[0.14em] uppercase">
            {t.books}
          </p>
          <div className="space-y-0.5">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={bookPath(book.slug, locale)}
                onClick={onNavigate}
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{book.title}</span>
                  <span className="text-muted-foreground mt-0.5 block text-[11px]">
                    {book.chapterCount} {t.chShort}
                    {book.hasParts ? ` · ${book.partCount} ${t.partsCount}` : ""}
                  </span>
                </span>
                <ChevronRight className="size-3.5 shrink-0 opacity-50 rtl:rotate-180" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export function ChapterSidebar({
  sidebarAd = null,
}: {
  sidebarAd?: { placementId: string; creative: AdCreative } | null
}) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const activeBookSlug = useActiveBookSlug(pathname)
  const activeChapterSlug = useActiveChapterSlug(pathname)
  const { sidebarOpen, setSidebarOpen } = useBookStore()
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set())

  const { data: books = [] } = useQuery({
    queryKey: ["books", locale],
    queryFn: () => fetchBooks(locale),
  })

  const { data: activeBook } = useQuery({
    queryKey: ["books", activeBookSlug, locale],
    queryFn: () => fetchBook(activeBookSlug!, locale),
    enabled: Boolean(activeBookSlug),
  })

  const activePartSlug = useMemo(() => {
    if (!activeBook?.parts || !activeChapterSlug) return null
    return (
      activeBook.parts.find((part) =>
        part.chapters.some((chapter) => chapter.slug === activeChapterSlug)
      )?.slug ?? null
    )
  }, [activeBook, activeChapterSlug])

  useEffect(() => {
    if (!activeBook?.parts) {
      setExpandedParts(new Set())
      return
    }

    setExpandedParts((current) => {
      const next = new Set(current)
      if (activePartSlug) next.add(activePartSlug)
      if (next.size === 0) {
        activeBook.parts?.forEach((part) => next.add(part.slug))
      }
      return next
    })
  }, [activeBook?.slug, activeBook?.parts, activePartSlug])

  function togglePart(partSlug: string) {
    setExpandedParts((current) => {
      const next = new Set(current)
      if (next.has(partSlug)) next.delete(partSlug)
      else next.add(partSlug)
      return next
    })
  }

  const closeSidebar = () => setSidebarOpen(false)

  const nav = (
    <SidebarNav
      pathname={pathname}
      books={books}
      activeBook={activeBook}
      expandedParts={expandedParts}
      togglePart={togglePart}
      onNavigate={closeSidebar}
      locale={locale}
    />
  )

  const adBlock = <SidebarAd ad={sidebarAd} />

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-e border-border/60 xl:block">
        <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col px-4 py-5">
          <ScrollArea className="scroll-fade min-h-0 flex-1 pe-2">
            {nav}
          </ScrollArea>
          {sidebarAd ? <div className="mt-3 shrink-0">{adBlock}</div> : null}
        </div>
      </aside>

      <aside className="hidden w-64 shrink-0 border-e border-border/60 lg:block xl:hidden">
        <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col px-3 py-5">
          <ScrollArea className="scroll-fade min-h-0 flex-1 pe-2">
            {nav}
          </ScrollArea>
          {sidebarAd ? <div className="mt-3 shrink-0">{adBlock}</div> : null}
        </div>
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="flex w-[min(100vw-2rem,22rem)] flex-col p-0">
          <SheetHeader className="shrink-0 border-b px-4 py-4">
            <SheetTitle className="text-start">
              {activeBook ? activeBook.title : t.library}
            </SheetTitle>
          </SheetHeader>
          {sidebarAd ? (
            <div className="shrink-0 border-b px-3 py-3">{adBlock}</div>
          ) : null}
          <ScrollArea className="scroll-fade min-h-0 flex-1 px-3 py-4">
            {nav}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
