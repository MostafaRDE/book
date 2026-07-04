import { slugify } from "./slugify"

export type HeadingItem = {
  id: string
  text: string
  level: 2 | 3
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = []
  const seen = new Map<string, number>()

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) continue

    const level = match[1].length as 2 | 3
    const text = match[2].replace(/\s*#+\s*$/, "").trim()
    let id = slugify(text)

    const count = seen.get(id) ?? 0
    if (count > 0) id = `${id}-${count}`
    seen.set(slugify(text), count + 1)

    headings.push({ id, text, level })
  }

  return headings
}
