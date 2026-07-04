"use client"

import { ArrowUpLeft, ArrowUpRight } from "lucide-react"

import { useLocale } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type LocaleDiagonalArrowProps = {
  className?: string
}

/** EN: ↗ — FA: ↖ */
export function LocaleDiagonalArrow({ className }: LocaleDiagonalArrowProps) {
  const locale = useLocale()
  const Icon = locale === "fa" ? ArrowUpLeft : ArrowUpRight

  return <Icon className={cn(className)} aria-hidden />
}
