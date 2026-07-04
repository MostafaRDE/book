/** Remove the first markdown H1 line — safe for SSR (unlike ref-based skip in render). */
export function stripFirstH1(content: string): string {
  const lines = content.split("\n")
  let removed = false
  const kept: string[] = []

  for (const line of lines) {
    if (!removed && /^#\s+/.test(line)) {
      removed = true
      continue
    }
    kept.push(line)
  }

  return kept.join("\n").replace(/^\n+/, "")
}
