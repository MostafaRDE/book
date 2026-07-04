import type { Metadata } from "next"
import { headers } from "next/headers"
import {
  Geist,
  Geist_Mono,
  Amiri,
  Instrument_Serif,
  Vazirmatn,
} from "next/font/google"

import { AppProviders } from "@/providers/app-providers"
import { buildRootMetadata } from "@/lib/seo/metadata"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans-en",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading-en",
  subsets: ["latin"],
  weight: ["400"],
})

const vazirmatn = Vazirmatn({
  variable: "--font-sans-fa",
  subsets: ["arabic", "latin"],
})

/** Literary Naskh for Persian display titles — readable at all sizes */
const amiri = Amiri({
  variable: "--font-heading-fa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = buildRootMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerStore = await headers()
  const locale = headerStore.get("x-locale") === "fa" ? "fa" : "en"
  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${vazirmatn.variable} ${amiri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
