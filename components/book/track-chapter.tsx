"use client"

import { useEffect } from "react"

import { useBookStore } from "@/stores/book-store"

type TrackChapterProps = {
  bookSlug: string
  chapterSlug: string
}

export function TrackChapter({ bookSlug, chapterSlug }: TrackChapterProps) {
  const setLastRead = useBookStore((state) => state.setLastRead)

  useEffect(() => {
    setLastRead(bookSlug, chapterSlug)
  }, [bookSlug, chapterSlug, setLastRead])

  return null
}
