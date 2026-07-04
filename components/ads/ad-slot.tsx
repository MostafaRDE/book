"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { localizeAdText, type AdCreative } from "@/lib/ads/types"
import { useLocale } from "@/hooks/use-translations"
import { cn } from "@/lib/utils"

type AdSlotProps = {
  creative: AdCreative
  placementId: string
  className?: string
  /** sidebar = compact card in nav column; inline = in markdown flow */
  layout?: "default" | "sidebar" | "inline"
}

function AdCreativeCard({
  creative,
  placementId,
  variant,
  layout = "default",
  className,
}: AdSlotProps & { variant: "desktop" | "mobile" }) {
  const locale = useLocale()
  const data = variant === "desktop" ? creative.desktop : creative.mobile
  const label = localizeAdText(creative.label, locale)
  const title = localizeAdText(data.title, locale)
  const description = localizeAdText(data.description, locale)
  const isSidebar = layout === "sidebar"

  return (
    <aside
      data-ad-placement={placementId}
      data-ad-variant={variant}
      className={cn(
        "overflow-hidden rounded-xl border-2 border-primary/25 bg-primary/[0.04] shadow-sm",
        layout === "default" && "border-border/60 bg-card/50",
        isSidebar && "border-primary/30",
        !isSidebar && variant === "desktop" ? "hidden lg:block" : null,
        !isSidebar && variant === "mobile" ? "lg:hidden" : null,
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3 py-2">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary text-[10px] uppercase"
        >
          {label}
        </Badge>
      </div>
      <Link
        href={data.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="hover:bg-muted/40 block p-3 transition-colors"
      >
        {data.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.image}
            alt={title}
            className="mb-2 w-full rounded-lg object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className={cn(
              "bg-primary/5 mb-2 flex items-center justify-center rounded-lg border border-dashed border-primary/35 px-3 text-center text-sm font-medium text-primary",
              isSidebar ? "min-h-[88px]" : "aspect-[2/1] min-h-[120px]"
            )}
          >
            {title}
          </div>
        )}
        {!isSidebar ? (
          <>
            <p className="font-medium leading-snug">{title}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              {description}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground text-xs leading-relaxed">
            {description}
          </p>
        )}
      </Link>
    </aside>
  )
}

export function AdSlot({
  creative,
  placementId,
  className,
  layout = "default",
}: AdSlotProps) {
  if (creative.type === "adsense") {
    return (
      <div
        data-ad-placement={placementId}
        className={cn("flex justify-center", layout === "inline" ? "my-8" : "p-2", className)}
      >
        <ins
          className="adsbygoogle block min-h-[250px] w-full max-w-3xl"
          data-ad-client={creative.adsenseClient}
          data-ad-slot={creative.adsenseSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  if (layout === "sidebar") {
    return (
      <div className={cn("shrink-0", className)}>
        <AdCreativeCard
          creative={creative}
          placementId={placementId}
          variant="desktop"
          layout="sidebar"
        />
      </div>
    )
  }

  return (
    <div className={cn(layout === "inline" ? "my-8" : "my-4", className)}>
      <AdCreativeCard
        creative={creative}
        placementId={placementId}
        variant="desktop"
        layout={layout}
      />
      <AdCreativeCard
        creative={creative}
        placementId={placementId}
        variant="mobile"
        layout={layout}
      />
    </div>
  )
}

type SidebarAdProps = {
  ad: { placementId: string; creative: AdCreative } | null
}

// Sidebar ad moved to components/ads/sidebar-ad.tsx
