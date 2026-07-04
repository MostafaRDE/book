import type { Metadata } from "next"

import { HomePageView, getHomeMetadata } from "@/components/pages/home-page-view"
import { buildPageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildPageMetadata({
  ...getHomeMetadata("fa"),
  path: "/",
  locale: "fa",
})

export default function FaHomePage() {
  return <HomePageView locale="fa" />
}
