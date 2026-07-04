# Mostafa Effati — Library

Personal publishing at [book.mostafaeffati.com](https://book.mostafaeffati.com). Multiple books, optional parts, markdown-first.

## Architecture

```
content/
  site.json
  books/
    {book-slug}/
      book.json
      parts/{part-slug}/     # optional — book with sections
        part.json
        chapter.md
      chapters/*.md          # flat book — chapters only
```

## Sample books included

| Book | Structure | Description |
|------|-----------|-------------|
| **Mostafa Effati** | 3 parts, 7 chapters | Flagship — Engineering, Letters, Stillness |
| **Shipping Notes** | flat, 3 chapters | Product / launch notes |
| **Field Journal** | flat, 2 chapters | Short observations |

## URLs

- `/` — library home
- `/books/{book-slug}` — book overview
- `/books/{book-slug}/{chapter-slug}` — chapter

## Add a book with parts

```text
content/books/my-book/book.json
content/books/my-book/parts/engineering/part.json
content/books/my-book/parts/engineering/my-chapter.md
```

## Add a flat book (chapters only)

```text
content/books/my-book/book.json
content/books/my-book/chapters/my-chapter.md
```

## Dev

```bash
pnpm install
pnpm dev
```
