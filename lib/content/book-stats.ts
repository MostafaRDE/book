import { getAllBooks, getAllChapters } from "./get-content"

export type LibraryStats = {
  bookCount: number
  chapterCount: number
  totalReadingMinutes: number
  tagCount: number
  topTags: string[]
}

export function getLibraryStats(): LibraryStats {
  const books = getAllBooks()
  const chapters = getAllChapters()
  const tags = new Set<string>()

  for (const chapter of chapters) {
    chapter.tags?.forEach((tag) => tags.add(tag))
  }

  const tagFrequency = new Map<string, number>()
  for (const chapter of chapters) {
    chapter.tags?.forEach((tag) => {
      tagFrequency.set(tag, (tagFrequency.get(tag) ?? 0) + 1)
    })
  }

  const topTags = [...tagFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag)

  return {
    bookCount: books.length,
    chapterCount: chapters.length,
    totalReadingMinutes: chapters.reduce(
      (sum, chapter) => sum + chapter.readingTimeMinutes,
      0
    ),
    tagCount: tags.size,
    topTags,
  }
}

/** @deprecated Use getLibraryStats */
export function getBookStats(): LibraryStats {
  return getLibraryStats()
}
