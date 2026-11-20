import type { Metadata } from "next"
import ProjectShowcase from "@/components/project-showcase"

export const metadata: Metadata = { title: "Work — Ahmad Zakiy" }

export default function ProjectsPage() {
  return (
    <main className="interior-page page-width" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Design systems & independent projects</p>
        <h1>
          Made of curiosity.
          <br />
          <span>Built to be used.</span>
        </h1>
        <p>
          Design systems, developer tools, and personal experiments
          <br className="desktop-break" /> connecting design, code, and AI agents.
        </p>
      </header>
      <ProjectShowcase />
      <div className="work-endnote">
        <span className="small-dot" /> Always a work in progress. That’s the fun part.
      </div>
    </main>
  )
}
