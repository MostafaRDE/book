"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "@/hooks/use-translations"

export function ReadingProgress() {
  const t = useTranslations()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, value)))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="bg-border/60 fixed inset-x-0 top-0 z-50 h-0.5"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t.readingProgress}
    >
      <div
        className="from-primary via-primary to-primary/70 h-full bg-gradient-to-r transition-[width] duration-150 ease-out rtl:bg-gradient-to-l"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
