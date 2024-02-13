import "./globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import { ReactNode } from "react"

import { Header } from "@/components/navigation/header"
import { Providers } from "@/components/shared/providers"
import { siteConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"

const eiko = localFont({
  src: [
    {
      path: "../../public/fonts/eiko/eiko-thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-thin_italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-extra_light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-extralight_italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-light_italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-regular_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-medium_italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-bold_italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-black.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-black_italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/eiko/eiko-heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/eiko/eiko-heavy_italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-eiko",
})

const mori = localFont({
  src: [
    {
      path: "../../public/fonts/mori/mori-extralight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-extralight_italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-light_italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-book.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-book_italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-regular_italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-medium_italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-semibold_italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-bold_italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/mori/mori-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/mori/mori-extrabold_italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-mori",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.links.site),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: `${siteConfig.links.site}/manifest.json`,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.links.site,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // // siteId: "1467726470533754880",
    creator: "@laam_dev",
    // // creatorId: "1467726470533754880",
    images: {
      url: `${siteConfig.links.site}/og.png`,
      alt: siteConfig.name,
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-screen font-sans antialiased",
          eiko.variable,
          mori.variable
        )}
      >
        {/* <AnalyticsPageView /> */}
        <Providers>
          <main className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 grow">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
