import type { Metadata } from "next"

import { HomePageView, getHomeMetadata } from "@/components/pages/home-page-view"
import { buildPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildPageMetadata({
  ...getHomeMetadata("en"),
  path: "/",
  locale: "en",
})

export default function HomePage() {
  return <HomePageView locale="en" />
}
