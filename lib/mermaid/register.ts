import { getMermaidConfig } from "./config"

let layoutsRegistered = false
let initializedForDark: boolean | null = null

/** Register optional layout engines (ELK) once per session. */
export async function ensureMermaidLayouts() {
  if (layoutsRegistered) return

  const mermaid = (await import("mermaid")).default
  const elkLayouts = (await import("@mermaid-js/layout-elk")).default
  mermaid.registerLayoutLoaders(elkLayouts)
  layoutsRegistered = true
}

/** Initialize mermaid config when theme changes — avoids re-init every render. */
export async function getInitializedMermaid(isDark: boolean) {
  await ensureMermaidLayouts()
  const mermaid = (await import("mermaid")).default

  if (initializedForDark !== isDark) {
    mermaid.initialize(getMermaidConfig(isDark))
    initializedForDark = isDark
  }

  return mermaid
}
