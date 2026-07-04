"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { getInitializedMermaid } from "@/lib/mermaid/register"
import { withSafeJsonStringify } from "@/lib/mermaid/safe-stringify"
import { cn } from "@/lib/utils"

type MermaidDiagramProps = {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const renderId = useId().replace(/:/g, "")
  const renderPassRef = useRef(0)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let cancelled = false
    const pass = ++renderPassRef.current

    async function render() {
      if (!containerRef.current || !chart.trim()) return

      setReady(false)
      containerRef.current.innerHTML = ""

      try {
        const isDark = resolvedTheme === "dark"
        const mermaid = await getInitializedMermaid(isDark)
        const id = `mermaid-${renderId}-${pass}`
        const { svg } = await withSafeJsonStringify(() =>
          mermaid.render(id, chart.trim())
        )

        if (!cancelled && containerRef.current && pass === renderPassRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
          setReady(true)
        }
      } catch (err) {
        if (!cancelled && pass === renderPassRef.current) {
          setError(err instanceof Error ? err.message : "Diagram error")
          setReady(false)
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, renderId, resolvedTheme, mounted])

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Mermaid: {error}
      </div>
    )
  }

  return (
    <figure
      className={cn(
        "mermaid-diagram group/diagram relative my-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-card/80 to-card/40 p-5 shadow-sm ring-1 ring-primary/10 sm:p-8",
        !ready && "min-h-[10rem] animate-pulse"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_70%)]"
        aria-hidden
      />
      <div
        ref={containerRef}
        className={cn(
          "relative flex min-h-[6rem] justify-center transition-opacity duration-500 [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:drop-shadow-sm",
          ready ? "opacity-100" : "opacity-0"
        )}
        role="img"
        aria-label="Diagram"
        aria-busy={!ready}
      />
    </figure>
  )
}
