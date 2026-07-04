import { NextResponse } from "next/server"

import { getAllChapters } from "@/lib/content/get-content"
import type { Locale } from "@/lib/i18n/messages"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = (searchParams.get("locale") ?? "en") as Locale
  return NextResponse.json(getAllChapters(locale))
}
