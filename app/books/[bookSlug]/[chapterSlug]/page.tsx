import type { Metadata } from "next"

import { ChapterPageView } from "@/components/pages/chapter-page-view"
import {
  getAllBooks,
  getBookBySlug,
  getChapter,
} from "@/lib/content/get-content"
import { chapterPath } from "@/lib/content/paths"
import { buildPageMetadata } from "@/lib/seo/metadata"

type ChapterPageProps = {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}

export async function generateStaticParams() {
  const books = getAllBooks("en")
  return books.flatMap((book) => {
    const detail = getBookBySlug(book.slug, "en")
    return (
      detail?.chapters.map((chapter) => ({
        bookSlug: book.slug,
        chapterSlug: chapter.slug,
      })) ?? []
    )
  })
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { bookSlug, chapterSlug } = await params
  const chapter = getChapter(bookSlug, chapterSlug, "en")
  if (!chapter) return { title: "Chapter not found" }
  return buildPageMetadata({
    title: chapter.title,
    description: chapter.description,
    path: chapterPath(bookSlug, chapterSlug, "en"),
    locale: "en",
    type: "article",
    tags: chapter.tags,
  })
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { bookSlug, chapterSlug } = await params
  return (
    <ChapterPageView
      bookSlug={bookSlug}
      chapterSlug={chapterSlug}
      locale="en"
    />
  )
}
