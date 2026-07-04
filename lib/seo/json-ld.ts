import type { Locale } from "@/lib/i18n/messages"
import { absoluteUrl, SITE_AUTHOR, SITE_URL } from "@/lib/seo/metadata"
import { bookPath, chapterPath } from "@/lib/content/paths"
import { localizeSiteMeta } from "@/lib/i18n/localize"
import { getSiteMeta } from "@/lib/content/get-content"

export function buildWebsiteJsonLd(locale: Locale = "en") {
  const site = localizeSiteMeta(getSiteMeta(), locale)
  const siteFa = localizeSiteMeta(getSiteMeta(), "fa")

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    alternateName: siteFa.title,
    url: locale === "fa" ? absoluteUrl("/fa") : SITE_URL,
    description: site.description,
    inLanguage: ["en", "fa"],
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: "https://mostafaeffati.com",
    },
  }
}

export function buildBookJsonLd(
  book: {
    slug: string
    title: string
    description: string
    chapterCount: number
  },
  locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    url: absoluteUrl(bookPath(book.slug, locale)),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
    numberOfPages: book.chapterCount,
    inLanguage: locale,
  }
}

export function buildArticleJsonLd(
  chapter: {
    bookSlug: string
    slug: string
    title: string
    description: string
    readingTimeMinutes: number
    contentLocale?: Locale
  },
  locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: chapter.title,
    description: chapter.description,
    url: absoluteUrl(chapterPath(chapter.bookSlug, chapter.slug, locale)),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: "https://mostafaeffati.com",
    },
    inLanguage: chapter.contentLocale ?? locale,
    timeRequired: `PT${chapter.readingTimeMinutes}M`,
    isPartOf: {
      "@type": "Book",
      url: absoluteUrl(bookPath(chapter.bookSlug, locale)),
    },
  }
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  _locale: Locale = "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
