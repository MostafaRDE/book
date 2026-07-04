import { notFound } from "next/navigation"

import { BookSectionAd } from "@/components/ads/book-section-ad"
import { BookShell } from "@/components/book/book-shell"
import { BookContents } from "@/components/book/book-contents"
import { BookForewordSection } from "@/components/book/book-foreword"
import { BookPageIntro } from "@/components/book/book-page-intro"
import { JsonLd } from "@/components/seo/json-ld"
import { getBookBySlug, getSiteMeta } from "@/lib/content/get-content"
import { bookPath } from "@/lib/content/paths"
import type { Locale } from "@/lib/i18n/messages"
import { localizeSiteMeta } from "@/lib/i18n/localize"
import { getSidebarAd } from "@/lib/ads/get-ads"
import { resolveContentSegments } from "@/lib/ads/resolve-content-segments"
import { buildBookJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld"

type BookPageViewProps = {
  bookSlug: string
  locale: Locale
}

export function BookPageView({ bookSlug, locale }: BookPageViewProps) {
  const book = getBookBySlug(bookSlug, locale)
  if (!book) notFound()

  const firstChapter = book.chapters[0]
  const libraryTitle = localizeSiteMeta(getSiteMeta(), locale).title
  const sidebarAd = getSidebarAd({ page: "book", locale, bookSlug })
  const adContext = { page: "book" as const, locale, bookSlug }
  const forewordSegments = book.foreword
    ? resolveContentSegments(book.foreword.content, adContext)
    : undefined

  return (
    <BookShell sidebarAd={sidebarAd}>
      <JsonLd
        data={[
          buildBookJsonLd(book, locale),
          buildBreadcrumbJsonLd(
            [
              { name: libraryTitle, path: locale === "fa" ? "/fa" : "/" },
              { name: book.title, path: bookPath(bookSlug, locale) },
            ],
            locale
          ),
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <BookPageIntro book={book} firstChapter={firstChapter} />
        <BookSectionAd section="after-intro" context={adContext} />
        {book.foreword ? (
          <BookForewordSection
            bookSlug={book.slug}
            foreword={book.foreword}
            resolvedSegments={forewordSegments}
          />
        ) : null}
        <BookSectionAd section="after-foreword" context={adContext} />
        <BookSectionAd section="before-contents" context={adContext} />
        <BookContents bookSlug={book.slug} />
      </div>
    </BookShell>
  )
}
