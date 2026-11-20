import { ArrowUpRight, Mail } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Contact — Ahmad Zakiy" }

export default function LinksPage() {
  return (
    <main className="contact-page interior-page page-width" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Good things start with a hello.</p>
        <h1>
          Let’s make
          <br />
          <span>something click.</span>
        </h1>
        <p>
          For design systems, interesting projects,
          <br className="desktop-break" /> or just a cup of coffee.
        </p>
      </header>
      <a className="contact-email" href="mailto:in.zakiy@gmail.com">
        <span className="contact-mail-icon">
          <Mail aria-hidden="true" size={24} strokeWidth={1.5} />
        </span>
        <span>
          <span className="eyebrow">Drop me a line</span>
          <strong>in.zakiy@gmail.com</strong>
        </span>
        <ArrowUpRight aria-hidden="true" size={24} />
      </a>
      <div className="contact-aside">
        <p>
          Based in Jakarta, Indonesia.
          <br />
          Usually somewhere between Figma and a code editor.
        </p>
        <Link className="text-link" href="/projects">
          See what I’ve been making <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </main>
  )
}
