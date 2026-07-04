import { notFound } from "next/navigation"

import { ContentWithAds } from "@/components/ads/content-with-ads"
import { BookShell } from "@/components/book/book-shell"
import { ChapterBreadcrumb } from "@/components/book/chapter-breadcrumb"
import { ChapterHeader } from "@/components/book/chapter-header"
import { ChapterNav } from "@/components/book/chapter-nav"
import { ChapterToc } from "@/components/book/chapter-toc"
import { ChapterTocInline } from "@/components/book/chapter-toc-inline"
import { ReadingProgress } from "@/components/book/reading-progress"
import { TrackChapter } from "@/components/book/track-chapter"
import { TranslationFallback } from "@/components/book/translation-fallback"
import { JsonLd } from "@/components/seo/json-ld"
import { getSidebarAd } from "@/lib/ads/get-ads"
import { extractHeadings } from "@/lib/content/extract-headings"
import {
  getAdjacentChapters,
  getBookBySlug,
  getChapter,
  getSiteMeta,
} from "@/lib/content/get-content"
import { bookPath, chapterPath } from "@/lib/content/paths"
import type { Locale } from "@/lib/i18n/messages"
import { localizeSiteMeta } from "@/lib/i18n/localize"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo/json-ld"

type ChapterPageViewProps = {
  bookSlug: string
  chapterSlug: string
  locale: Locale
}

export function ChapterPageView({
  bookSlug,
  chapterSlug,
  locale,
}: ChapterPageViewProps) {
  const book = getBookBySlug(bookSlug, locale)
  const chapter = getChapter(bookSlug, chapterSlug, locale)

  if (!book || !chapter) notFound()

  const { previous, next } = getAdjacentChapters(bookSlug, chapterSlug, locale)
  const headings = chapter.hasTranslation
    ? extractHeadings(chapter.content)
    : []
  const libraryTitle = localizeSiteMeta(getSiteMeta(), locale).title
  const sidebarAd = getSidebarAd({
    page: "chapter",
    locale,
    bookSlug,
    chapterSlug,
  })

  const breadcrumbItems = [
    { name: libraryTitle, path: locale === "fa" ? "/fa" : "/" },
    { name: book.title, path: bookPath(bookSlug, locale) },
    ...(chapter.partTitle
      ? [{ name: chapter.partTitle, path: bookPath(bookSlug, locale) }]
      : []),
    {
      name: chapter.title,
      path: chapterPath(bookSlug, chapterSlug, locale),
    },
  ]

  const adContext = {
    page: "chapter" as const,
    locale,
    bookSlug,
    chapterSlug,
  }

  return (
    <BookShell sidebarAd={sidebarAd}>
      <JsonLd
        data={[
          buildArticleJsonLd(chapter, locale),
          buildBreadcrumbJsonLd(breadcrumbItems, locale),
        ]}
      />
      <ReadingProgress />
      <TrackChapter bookSlug={bookSlug} chapterSlug={chapterSlug} />
      <div className="mx-auto flex w-full max-w-5xl gap-10">
        <article className="min-w-0 flex-1">
          <ChapterBreadcrumb
            bookSlug={bookSlug}
            bookTitle={book.title}
            partTitle={chapter.partTitle ?? undefined}
            chapterTitle={chapter.title}
          />

          <ChapterHeader
            title={chapter.title}
            description={chapter.description}
            partTitle={chapter.partTitle ?? undefined}
            readingTimeMinutes={chapter.readingTimeMinutes}
            tags={chapter.tags}
          />

          <ChapterTocInline headings={headings} />

          {chapter.hasTranslation ? (
            <ContentWithAds
              content={chapter.content}
              context={adContext}
              skipFirstH1
            />
          ) : (
            <TranslationFallback
              bookSlug={bookSlug}
              chapterSlug={chapterSlug}
              chapterTitle={
                getChapter(bookSlug, chapterSlug, "en")?.title ?? chapter.title
              }
            />
          )}

          <ChapterNav
            bookSlug={bookSlug}
            previous={previous}
            next={next}
          />
        </article>

        <ChapterToc headings={headings} />
      </div>
    </BookShell>
  )
}
