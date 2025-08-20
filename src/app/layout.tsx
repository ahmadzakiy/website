import { ReactLenis } from "lenis/react"
import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import "./globals.css"

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
  description: "Living a life shaped by bits rather than atoms",
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
      <head>
        <link href="/sijaki.jpg" rel="icon" type="image/jpeg" />
      </head>
      <body
        className={cn(
          interSans.variable,
          instrumentSerif.variable,
          geistMono.variable,
          "relative z-10",
        )}
      >
        <ReactLenis root />
        <ThemeProvider defaultTheme="system" storageKey="website-theme">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
