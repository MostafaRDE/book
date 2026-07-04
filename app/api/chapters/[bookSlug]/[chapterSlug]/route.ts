import { NextResponse } from "next/server"

import { getChapter } from "@/lib/content/get-content"

type RouteContext = {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { bookSlug, chapterSlug } = await context.params
  const chapter = getChapter(bookSlug, chapterSlug)

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 })
  }

  return NextResponse.json(chapter)
}
