import type { ReactNode } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
