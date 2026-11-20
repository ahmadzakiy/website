import { ArrowUpRight, Layers2 } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Design systems — Ahmad Zakiy" }

export default function FigmaPage() {
  return (
    <main className="interior-page page-width" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Design meets development</p>
        <h1>
          One language.
          <br />
          <span>From Figma to code.</span>
        </h1>
        <p>
          I build design systems that connect the decisions
          <br className="desktop-break" /> we make in design to the interfaces we ship.
        </p>
      </header>
      <section className="design-system-panel">
        <Layers2 aria-hidden="true" size={32} strokeWidth={1.5} />
        <h2>Consistency starts with a shared foundation.</h2>
        <p>Components, tokens, and the details that help teams build better together.</p>
        <Link className="text-link" href="/links">
          Let’s talk design systems <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </main>
  )
}
