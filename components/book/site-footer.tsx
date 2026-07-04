"use client"

import Link from "next/link"

import { useTranslations } from "@/hooks/use-translations"

type SiteFooterProps = {
  author: string
  siteUrl: string
}

export function SiteFooter({ author, siteUrl }: SiteFooterProps) {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted-foreground">
          © {year} {author}. {t.footerTagline}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="https://mostafaeffati.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            mostafaeffati.com
          </Link>
          <Link
            href={siteUrl}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {siteUrl.replace("https://", "")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
