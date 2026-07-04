/** ELK attaches DOM nodes to the graph; mermaid debug paths JSON.stringify them and throw. */
export async function withSafeJsonStringify<T>(fn: () => Promise<T>): Promise<T> {
  const original = JSON.stringify
  JSON.stringify = ((value: unknown, replacer?, space?) => {
    try {
      return original(value, replacer as never, space as never)
    } catch {
      return '"[unserializable]"'
    }
  }) as typeof JSON.stringify

  try {
    return await fn()
  } finally {
    JSON.stringify = original
  }
}
