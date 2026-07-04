"use client"

import { usePathname } from "next/navigation"

import type { AdCreative } from "@/lib/ads/types"
import { siteData } from "@/lib/i18n/site-data"
import { cn } from "@/lib/utils"

import { AmbientBackground } from "./ambient-background"
import { ChapterSidebar } from "./chapter-sidebar"
import { MobileReadingBar } from "./mobile-reading-bar"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

type BookShellProps = {
  children: React.ReactNode
  sidebarAd?: { placementId: string; creative: AdCreative } | null
}

export function BookShell({ children, sidebarAd = null }: BookShellProps) {
  const pathname = usePathname()
  const onBookRoute =
    pathname.startsWith("/books") || pathname.startsWith("/fa/books")

  return (
    <div className="relative flex min-h-svh flex-col">
      <AmbientBackground />
      <SiteHeader author={siteData.author} />
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <ChapterSidebar sidebarAd={sidebarAd} />
        <main
          className={cn(
            "min-w-0 flex-1 px-4 py-8 sm:px-6 lg:py-10",
            onBookRoute &&
              "pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-10"
          )}
        >
          {children}
        </main>
      </div>
      <SiteFooter author={siteData.author} siteUrl={siteData.siteUrl} />
      <MobileReadingBar />
    </div>
  )
}
