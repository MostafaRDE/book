"use client"

import { ListTree, Search } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"
import { useBookStore } from "@/stores/book-store"

export function MobileReadingBar() {
  const t = useTranslations()
  const pathname = usePathname()
  const setSidebarOpen = useBookStore((state) => state.setSidebarOpen)
  const setSearchOpen = useBookStore((state) => state.setSearchOpen)

  const onBookRoute =
    pathname.startsWith("/books") || pathname.startsWith("/fa/books")

  if (!onBookRoute) return null

  return (
    <div className="bg-background/90 fixed inset-x-0 bottom-0 z-40 border-t border-border/60 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <Button
          variant="default"
          className="h-11 flex-1 gap-2 rounded-xl"
          onClick={() => setSidebarOpen(true)}
        >
          <ListTree className="size-4" />
          {t.chaptersNav}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-11 shrink-0 rounded-xl"
          onClick={() => setSearchOpen(true)}
          aria-label={t.search}
        >
          <Search className="size-4" />
        </Button>
      </div>
    </div>
  )
}
