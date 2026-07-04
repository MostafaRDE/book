export function parseContentSegments(content: string) {
  const segments: Array<
    { type: "markdown"; content: string } | { type: "ad"; marker: string }
  > = []
  const pattern = /<!--\s*ad:([\w-]+)\s*-->/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "markdown",
        content: content.slice(lastIndex, match.index),
      })
    }
    segments.push({ type: "ad", marker: match[1] })
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < content.length) {
    segments.push({ type: "markdown", content: content.slice(lastIndex) })
  }

  if (segments.length === 0) {
    segments.push({ type: "markdown", content })
  }

  return segments
}
