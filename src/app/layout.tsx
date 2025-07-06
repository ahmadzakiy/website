import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
})

const interSans = Inter({
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
  description: "Ahmad Zakiy is a UX Engineer at Mekari",
  icons: {
    icon: "/sijaki.jpg",
    apple: "/sijaki.jpg",
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
          geistMono.variable
        )}
      >
        <ThemeProvider defaultTheme="system" storageKey="website-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
