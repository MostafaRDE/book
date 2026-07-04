import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

import type { Locale } from "@/lib/i18n/messages"
import { pickLocalizedField } from "./localize-field"
import type {
  BookDetail,
  BookForeword,
  BookFrontmatter,
  BookSummary,
  Chapter,
  ChapterFrontmatter,
  ChapterSummary,
  PartFrontmatter,
  PartSummary,
  SiteMeta,
} from "./types"

const CONTENT_DIR = path.join(process.cwd(), "content")
const BOOKS_DIR = path.join(CONTENT_DIR, "books")

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T
}

function chapterSlugFromFile(fileName: string): string {
  return fileName.replace(/\.fa\.md$/, ".md").replace(/\.md$/, "")
}

function isChapterSourceFile(fileName: string): boolean {
  return fileName.endsWith(".md") && !fileName.endsWith(".fa.md")
}

function resolveChapterBody(
  baseFilePath: string,
  locale: Locale
): { body: string; contentLocale: Locale; hasTranslation: boolean } {
  const faFilePath = baseFilePath.replace(/\.md$/, ".fa.md")

  if (locale === "fa" && fs.existsSync(faFilePath)) {
    const { content } = matter(fs.readFileSync(faFilePath, "utf8"))
    return {
      body: content.trim(),
      contentLocale: "fa",
      hasTranslation: true,
    }
  }

  const { content } = matter(fs.readFileSync(baseFilePath, "utf8"))
  const englishBody = content.trim()

  if (locale === "fa") {
    return {
      body: "",
      contentLocale: "fa",
      hasTranslation: false,
    }
  }

  return {
    body: englishBody,
    contentLocale: "en",
    hasTranslation: true,
  }
}

function parseChapterFile(
  filePath: string,
  bookSlug: string,
  bookTitle: string,
  partSlug: string | null,
  partTitle: string | null,
  locale: Locale
): Chapter {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data } = matter(raw)
  const slug = chapterSlugFromFile(path.basename(filePath))
  const frontmatter = data as ChapterFrontmatter
  const { body, contentLocale, hasTranslation } = resolveChapterBody(
    filePath,
    locale
  )

  return {
    bookSlug,
    bookTitle,
    partSlug,
    partTitle,
    slug,
    title: pickLocalizedField(frontmatter.title, locale, slug),
    description: pickLocalizedField(frontmatter.description, locale, ""),
    order: frontmatter.order ?? 999,
    tags: frontmatter.tags ?? [],
    published: frontmatter.published !== false,
    readingTimeMinutes: estimateReadingTime(body || matter(raw).content.trim()),
    content: body,
    contentLocale,
    hasTranslation,
  }
}

function loadChaptersFromDir(
  dir: string,
  bookSlug: string,
  bookTitle: string,
  partSlug: string | null,
  partTitle: string | null,
  locale: Locale
): Chapter[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(isChapterSourceFile)
    .map((file) =>
      parseChapterFile(
        path.join(dir, file),
        bookSlug,
        bookTitle,
        partSlug,
        partTitle,
        locale
      )
    )
    .filter((chapter) => chapter.published)
    .sort((a, b) => a.order - b.order)
}

function getBookSlugs(): string[] {
  if (!fs.existsSync(BOOKS_DIR)) return []
  return fs
    .readdirSync(BOOKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

export function getSiteMeta(): SiteMeta {
  return readJson<SiteMeta>(path.join(CONTENT_DIR, "site.json"))
}

/** @deprecated Use getSiteMeta */
export function getBookMeta(): SiteMeta {
  return getSiteMeta()
}

function loadBookForeword(bookDir: string, locale: Locale): BookForeword | null {
  const basePath = path.join(bookDir, "foreword.md")
  if (!fs.existsSync(basePath)) return null

  const { body, contentLocale, hasTranslation } = resolveChapterBody(
    basePath,
    locale
  )

  if (!body) {
    return { content: "", contentLocale, hasTranslation }
  }

  return { content: body, contentLocale, hasTranslation }
}

function loadBookDetail(bookSlug: string, locale: Locale = "en"): BookDetail | null {
  const bookDir = path.join(BOOKS_DIR, bookSlug)
  const bookJsonPath = path.join(bookDir, "book.json")

  if (!fs.existsSync(bookJsonPath)) return null

  const bookData = readJson<BookFrontmatter>(bookJsonPath)
  if (bookData.published === false) return null

  const bookTitle = pickLocalizedField(bookData.title, locale, bookSlug)
  const partsDir = path.join(bookDir, "parts")
  const flatChaptersDir = path.join(bookDir, "chapters")

  let parts: PartSummary[] | null = null
  let chapters: ChapterSummary[] = []

  if (fs.existsSync(partsDir)) {
    const partDirs = fs
      .readdirSync(partsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)

    parts = partDirs
      .map((partSlug) => {
        const partDir = path.join(partsDir, partSlug)
        const partJsonPath = path.join(partDir, "part.json")
        const partData = fs.existsSync(partJsonPath)
          ? readJson<PartFrontmatter>(partJsonPath)
          : ({
              title: partSlug,
              order: 999,
            } satisfies PartFrontmatter)

        const partTitle = pickLocalizedField(partData.title, locale, partSlug)
        const partChapters = loadChaptersFromDir(
          partDir,
          bookSlug,
          bookTitle,
          partSlug,
          partTitle,
          locale
        ).map(
          ({
            content: _content,
            contentLocale: _contentLocale,
            hasTranslation: _hasTranslation,
            ...summary
          }) => summary
        )

        return {
          slug: partSlug,
          title: partTitle,
          description: pickLocalizedField(partData.description, locale),
          order: partData.order ?? 999,
          chapters: partChapters,
        }
      })
      .filter((part) => part.chapters.length > 0)
      .sort((a, b) => a.order - b.order)

    chapters = parts.flatMap((part) => part.chapters)
  } else if (fs.existsSync(flatChaptersDir)) {
    chapters = loadChaptersFromDir(
      flatChaptersDir,
      bookSlug,
      bookTitle,
      null,
      null,
      locale
    ).map(
      ({
        content: _content,
        contentLocale: _contentLocale,
        hasTranslation: _hasTranslation,
        ...summary
      }) => summary
    )
  }

  const readingTimeMinutes = chapters.reduce(
    (sum, chapter) => sum + chapter.readingTimeMinutes,
    0
  )

  return {
    slug: bookSlug,
    title: bookTitle,
    description: pickLocalizedField(bookData.description, locale, ""),
    order: bookData.order ?? 999,
    tags: bookData.tags ?? [],
    published: true,
    featured: bookData.featured ?? false,
    chapterCount: chapters.length,
    readingTimeMinutes,
    hasParts: Boolean(parts && parts.length > 0),
    partCount: parts?.length ?? 0,
    parts,
    chapters,
    foreword: loadBookForeword(bookDir, locale),
  }
}

export function getAllBooks(locale: Locale = "en"): BookSummary[] {
  return getBookSlugs()
    .map((slug) => loadBookDetail(slug, locale))
    .filter((book): book is BookDetail => book !== null)
    .map(({ parts: _parts, chapters: _chapters, ...summary }) => summary)
    .sort((a, b) => a.order - b.order)
}

export function getBookBySlug(
  bookSlug: string,
  locale: Locale = "en"
): BookDetail | null {
  return loadBookDetail(bookSlug, locale)
}

export function getAllChapters(locale: Locale = "en"): ChapterSummary[] {
  return getAllBooks(locale).flatMap((book) => {
    const detail = loadBookDetail(book.slug, locale)
    return detail?.chapters ?? []
  })
}

export function getChapterSummaries(locale: Locale = "en"): ChapterSummary[] {
  return getAllChapters(locale)
}

export function getChapter(
  bookSlug: string,
  chapterSlug: string,
  locale: Locale = "en"
): Chapter | null {
  const book = loadBookDetail(bookSlug, locale)
  if (!book) return null

  const summary = book.chapters.find((chapter) => chapter.slug === chapterSlug)
  if (!summary) return null

  const chapterDir = summary.partSlug
    ? path.join(BOOKS_DIR, bookSlug, "parts", summary.partSlug)
    : path.join(BOOKS_DIR, bookSlug, "chapters")

  const filePath = path.join(chapterDir, `${chapterSlug}.md`)
  if (!fs.existsSync(filePath)) return null

  const chapter = parseChapterFile(
    filePath,
    bookSlug,
    book.title,
    summary.partSlug,
    summary.partTitle,
    locale
  )

  return chapter.published ? chapter : null
}

/** @deprecated Use getChapter(bookSlug, chapterSlug) */
export function getChapterBySlug(chapterSlug: string): Chapter | null {
  for (const book of getAllBooks()) {
    const chapter = getChapter(book.slug, chapterSlug)
    if (chapter) return chapter
  }
  return null
}

export function getAdjacentChapters(
  bookSlug: string,
  chapterSlug: string,
  locale: Locale = "en"
): {
  previous: ChapterSummary | null
  next: ChapterSummary | null
} {
  const book = loadBookDetail(bookSlug, locale)
  if (!book) return { previous: null, next: null }

  const index = book.chapters.findIndex((chapter) => chapter.slug === chapterSlug)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: book.chapters[index - 1] ?? null,
    next: book.chapters[index + 1] ?? null,
  }
}

export function getFeaturedBook(locale: Locale = "en"): BookDetail | null {
  const books = getAllBooks(locale)
  const featuredSlug = books.find((book) => book.featured)?.slug ?? books[0]?.slug
  return featuredSlug ? getBookBySlug(featuredSlug, locale) : null
}

export function chapterHasTranslation(
  bookSlug: string,
  chapterSlug: string,
  partSlug: string | null
): boolean {
  const chapterDir = partSlug
    ? path.join(BOOKS_DIR, bookSlug, "parts", partSlug)
    : path.join(BOOKS_DIR, bookSlug, "chapters")
  return fs.existsSync(path.join(chapterDir, `${chapterSlug}.fa.md`))
}
