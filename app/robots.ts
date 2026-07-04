import type { MetadataRoute } from "next"

import { getSiteMeta } from "@/lib/content/get-content"

export default function robots(): MetadataRoute.Robots {
  const site = getSiteMeta()
  const base = site.siteUrl.replace(/\/$/, "")

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
