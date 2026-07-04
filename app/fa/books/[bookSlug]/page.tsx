import type { Metadata } from "next"

import { BookPageView } from "@/components/pages/book-page-view"
import { getAllBooks, getBookBySlug } from "@/lib/content/get-content"
import { bookPath } from "@/lib/content/paths"
import { buildPageMetadata } from "@/lib/seo/metadata"

type BookPageProps = {
  params: Promise<{ bookSlug: string }>
}

export async function generateStaticParams() {
  return getAllBooks("fa").map((book) => ({ bookSlug: book.slug }))
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { bookSlug } = await params
  const book = getBookBySlug(bookSlug, "fa")
  if (!book) return { title: "کتاب پیدا نشد" }
  return buildPageMetadata({
    title: book.title,
    description: book.description,
    path: bookPath(bookSlug, "fa"),
    locale: "fa",
  })
}

export default async function FaBookPage({ params }: BookPageProps) {
  const { bookSlug } = await params
  return <BookPageView bookSlug={bookSlug} locale="fa" />
}
