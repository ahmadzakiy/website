import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google"
import SiteShell from "@/components/site-shell"
import SmoothScroll from "@/components/smooth-scroll"
import "./globals.css"
import "./portfolio.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
})

const interSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ahmad Zakiy",
  description:
    "Design Engineer at Mekari, shaping Pixel Design System and building MCP tooling for AI agents.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          interSans.variable,
          instrumentSerif.variable,
          geistMono.variable,
          "relative z-10",
        )}
      >
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <SmoothScroll />
        <ThemeProvider defaultTheme="system" storageKey="website-theme">
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
