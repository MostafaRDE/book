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
  const books = getAllBooks("fa")
  return books.flatMap((book) => {
    const detail = getBookBySlug(book.slug, "fa")
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
  const chapter = getChapter(bookSlug, chapterSlug, "fa")
  if (!chapter) return { title: "فصل پیدا نشد" }
  return buildPageMetadata({
    title: chapter.title,
    description: chapter.description,
    path: chapterPath(bookSlug, chapterSlug, "fa"),
    locale: "fa",
    type: "article",
    tags: chapter.tags,
  })
}

export default async function FaChapterPage({ params }: ChapterPageProps) {
  const { bookSlug, chapterSlug } = await params
  return (
    <ChapterPageView
      bookSlug={bookSlug}
      chapterSlug={chapterSlug}
      locale="fa"
    />
  )
}
