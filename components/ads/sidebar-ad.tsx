"use client"

import { ChevronDown, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { localizeAdText, type AdCreative } from "@/lib/ads/types"
import { useLocale, useTranslations } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

const DISMISS_KEY = "mostafa-book-ad-dismissed"

type SidebarAdProps = {
  ad: { placementId: string; creative: AdCreative } | null
}

export function SidebarAd({ ad }: SidebarAdProps) {
  const locale = useLocale()
  const t = useTranslations()
  const [ready, setReady] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!ad) return
    const key = `${DISMISS_KEY}:${ad.placementId}`
    setDismissed(sessionStorage.getItem(key) === "1")
    setReady(true)
  }, [ad])

  if (!ad || !ready || dismissed) return null

  const data = ad.creative.desktop
  const label = localizeAdText(ad.creative.label, locale)
  const title = localizeAdText(data.title, locale)
  const description = localizeAdText(data.description, locale)

  function dismiss() {
    sessionStorage.setItem(`${DISMISS_KEY}:${ad!.placementId}`, "1")
    setDismissed(true)
  }

  return (
    <div
      data-ad-placement={ad.placementId}
      className="shrink-0 overflow-hidden rounded-lg border border-border/60 bg-card/40 text-sm shadow-sm"
    >
      <div className="flex items-center gap-1 border-b border-border/40 px-2 py-1.5">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="text-muted-foreground hover:text-foreground flex min-w-0 flex-1 items-center gap-1.5 text-start text-xs transition-colors"
          aria-expanded={expanded}
        >
          <Badge
            variant="outline"
            className="shrink-0 px-1.5 py-0 text-[9px] uppercase"
          >
            {label}
          </Badge>
          <span className="truncate opacity-80">{title}</span>
          <ChevronDown
            className={cn(
              "ms-auto size-3.5 shrink-0 opacity-60 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={dismiss}
          aria-label={t.dismissAd}
          className="shrink-0 opacity-60 hover:opacity-100"
        >
          <X className="size-3" />
        </Button>
      </div>

      {expanded ? (
        <Link
          href={data.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="hover:bg-muted/40 block px-3 py-2.5 transition-colors"
        >
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt={title}
              className="mb-2 w-full rounded-md object-cover"
              loading="lazy"
            />
          ) : null}
          <p className="font-medium leading-snug">{title}</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {description}
          </p>
        </Link>
      ) : null}
    </div>
  )
}
