"use client"

import { BookList } from "@/components/book/book-list"
import { useTranslations } from "@/hooks/use-translations"

export function BooksSection() {
  const t = useTranslations()

  return (
    <section id="books">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-normal tracking-tight">
          {t.books}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">{t.booksSectionDesc}</p>
      </div>
      <BookList />
    </section>
  )
}
