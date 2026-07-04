import type { Metadata } from "next"

import type { Locale } from "@/lib/i18n/messages"
import { localizeSiteMeta } from "@/lib/i18n/localize"
import { getSiteMeta } from "@/lib/content/get-content"
import { withLocalePrefix } from "@/lib/i18n/routing"

const site = getSiteMeta()
const siteEn = localizeSiteMeta(site, "en")
const siteFa = localizeSiteMeta(site, "fa")

export const SITE_URL = siteEn.siteUrl
export const SITE_AUTHOR = siteEn.author

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, SITE_URL).toString()
}

type PageSeoInput = {
  title: string
  description: string
  path: string
  locale?: Locale
  type?: "website" | "article"
  publishedTime?: string
  tags?: string[]
}

function localePath(path: string, locale: Locale): string {
  return withLocalePrefix(path, locale)
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale = "en",
  type = "website",
  publishedTime,
  tags,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(localePath(path, locale))
  const enUrl = absoluteUrl(localePath(path, "en"))
  const faUrl = absoluteUrl(localePath(path, "fa"))

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        fa: faUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: locale === "fa" ? siteFa.title : siteEn.title,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      type,
      ...(type === "article" && publishedTime
        ? { publishedTime, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function buildRootMetadata(): Metadata {
  const enUrl = SITE_URL
  const faUrl = absoluteUrl("/fa")

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteEn.title,
      template: `%s · ${SITE_AUTHOR}`,
    },
    description: siteEn.description,
    keywords: [
      "Mostafa Effati",
      "personal library",
      "essays",
      "engineering",
      "مصطفی عفتی",
      "کتابخانه",
    ],
    authors: [{ name: SITE_AUTHOR, url: "https://mostafaeffati.com" }],
    creator: SITE_AUTHOR,
    alternates: {
      canonical: enUrl,
      languages: {
        en: enUrl,
        fa: faUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: siteEn.title,
      description: siteEn.description,
      url: enUrl,
      siteName: siteEn.title,
      locale: "en_US",
      alternateLocale: ["fa_IR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteEn.title,
      description: siteEn.description,
    },
    other: {
      "description:fa": siteFa.description,
    },
  }
}
