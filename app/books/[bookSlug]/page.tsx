import type { Metadata } from "next"

import { BookPageView } from "@/components/pages/book-page-view"
import { getAllBooks, getBookBySlug } from "@/lib/content/get-content"
import { bookPath } from "@/lib/content/paths"
import { pickLocalizedField } from "@/lib/content/localize-field"
import { buildPageMetadata } from "@/lib/seo/metadata"

type BookPageProps = {
  params: Promise<{ bookSlug: string }>
}

export async function generateStaticParams() {
  return getAllBooks("en").map((book) => ({ bookSlug: book.slug }))
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { bookSlug } = await params
  const book = getBookBySlug(bookSlug, "en")
  if (!book) return { title: "Book not found" }
  return buildPageMetadata({
    title: book.title,
    description: book.description,
    path: bookPath(bookSlug, "en"),
    locale: "en",
  })
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookSlug } = await params
  return <BookPageView bookSlug={bookSlug} locale="en" />
}
