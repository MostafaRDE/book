import type { Locale } from "@/lib/i18n/messages"

import { BookShell } from "@/components/book/book-shell"
import { BookList } from "@/components/book/book-list"
import { BooksSection } from "@/components/book/books-section"
import { ContinueReading } from "@/components/book/continue-reading"
import { LibraryHero } from "@/components/book/library-hero"
import { JsonLd } from "@/components/seo/json-ld"
import { getLibraryStats } from "@/lib/content/book-stats"
import { getAllBooks } from "@/lib/content/get-content"
import { localizeSiteMeta } from "@/lib/i18n/localize"
import { getSiteMeta } from "@/lib/content/get-content"
import { buildWebsiteJsonLd } from "@/lib/seo/json-ld"

type HomePageViewProps = {
  locale: Locale
}

export function HomePageView({ locale }: HomePageViewProps) {
  const stats = getLibraryStats()
  const books = getAllBooks(locale)
  const featuredBook = books.find((book) => book.featured) ?? books[0] ?? null

  return (
    <BookShell>
      <JsonLd data={buildWebsiteJsonLd(locale)} />
      <div className="mx-auto max-w-4xl">
        <LibraryHero stats={stats} featuredBook={featuredBook} />
        <ContinueReading />
        <BooksSection />
      </div>
    </BookShell>
  )
}

export function getHomeMetadata(locale: Locale) {
  const site = localizeSiteMeta(getSiteMeta(), locale)
  return { title: site.title, description: site.description }
}
