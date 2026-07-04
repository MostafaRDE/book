import type { MetadataRoute } from "next"

import { getAllBooks, getBookBySlug, getSiteMeta } from "@/lib/content/get-content"
import { bookPath, chapterPath } from "@/lib/content/paths"
import type { Locale } from "@/lib/i18n/messages"

const locales: Locale[] = ["en", "fa"]

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteMeta()
  const base = site.siteUrl.replace(/\/$/, "")
  const now = new Date()

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({
      url: `${base}${locale === "fa" ? "/fa" : ""}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
    })
  }

  for (const locale of locales) {
    for (const book of getAllBooks(locale)) {
      entries.push({
        url: `${base}${bookPath(book.slug, locale)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: book.featured ? 0.9 : 0.8,
      })

      const detail = getBookBySlug(book.slug, locale)
      for (const chapter of detail?.chapters ?? []) {
        entries.push({
          url: `${base}${chapterPath(book.slug, chapter.slug, locale)}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }
    }
  }

  return entries
}
