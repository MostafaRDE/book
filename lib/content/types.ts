export type SiteMeta = {
  title: Record<string, string> | string
  description: Record<string, string> | string
  author: string
  siteUrl: string
  defaultLocale?: string
  language?: string
}

export type LocalizedSiteMeta = {
  title: string
  description: string
  author: string
  siteUrl: string
  language: string
}

import type { LocalizedString } from "./localize-field"

export type { LocalizedString }

export type BookFrontmatter = {
  title: LocalizedString
  description: LocalizedString
  order: number
  tags?: string[]
  published?: boolean
  featured?: boolean
}

export type PartFrontmatter = {
  title: LocalizedString
  description?: LocalizedString
  order: number
}

export type ChapterFrontmatter = {
  title: LocalizedString
  description: LocalizedString
  order: number
  tags?: string[]
  published?: boolean
}

export type ChapterSummary = {
  bookSlug: string
  bookTitle: string
  partSlug: string | null
  partTitle: string | null
  slug: string
  title: string
  description: string
  order: number
  tags?: string[]
  published?: boolean
  readingTimeMinutes: number
}

export type Chapter = ChapterSummary & {
  content: string
  contentLocale: "en" | "fa"
  hasTranslation: boolean
}

export type PartSummary = {
  slug: string
  title: string
  description?: string
  order: number
  chapters: ChapterSummary[]
}

export type BookSummary = {
  slug: string
  title: string
  description: string
  order: number
  tags?: string[]
  published?: boolean
  featured?: boolean
  chapterCount: number
  readingTimeMinutes: number
  hasParts: boolean
  partCount: number
}

export type BookForeword = {
  content: string
  contentLocale: "en" | "fa"
  hasTranslation: boolean
}

export type BookDetail = BookSummary & {
  parts: PartSummary[] | null
  chapters: ChapterSummary[]
  foreword: BookForeword | null
}

/** @deprecated Use SiteMeta */
export type BookMeta = SiteMeta
