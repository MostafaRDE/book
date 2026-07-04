"use client"

import { useQuery } from "@tanstack/react-query"
import { Library } from "lucide-react"

import { BookCard } from "@/components/book/book-card"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale, useLocalizedPaths, useTranslations } from "@/hooks/use-translations"
import type { BookSummary } from "@/lib/content/types"

async function fetchBooks(locale: string): Promise<BookSummary[]> {
  const response = await fetch(`/api/books?locale=${locale}`)
  if (!response.ok) throw new Error("Failed to load books")
  return response.json()
}

export function BookList() {
  const t = useTranslations()
  const locale = useLocale()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", locale],
    queryFn: () => fetchBooks(locale),
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="h-48 animate-pulse">
            <CardContent className="p-6">
              <div className="shimmer bg-muted mb-3 h-6 w-1/2 rounded" />
              <div className="shimmer bg-muted h-4 w-full rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="text-muted-foreground flex items-center gap-2 py-8">
          <Library className="size-4" />
          {t.couldNotLoadBooks}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((book) => (
        <BookCard key={book.slug} book={book} featured={book.featured} />
      ))}
    </div>
  )
}
