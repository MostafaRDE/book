import { NextResponse } from "next/server"

import { getBookBySlug } from "@/lib/content/get-content"
import type { Locale } from "@/lib/i18n/messages"

type RouteContext = {
  params: Promise<{ bookSlug: string }>
}

export async function GET(request: Request, context: RouteContext) {
  const { bookSlug } = await context.params
  const { searchParams } = new URL(request.url)
  const locale = (searchParams.get("locale") ?? "en") as Locale
  const book = getBookBySlug(bookSlug, locale)

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}
