import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Bot, Code2, Layers2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProjectShowcase from "@/components/project-showcase"
import { AuroraBackground } from "@/components/ui/aurora-background"

export default function Home() {
  return (
    <main id="main-content">
      <section aria-labelledby="home-title" className="home-hero page-width">
        <AuroraBackground className="home-hero-aurora">
          <div className="hero-identity">
            <Image
              alt=""
              className="hero-avatar"
              height={30}
              priority
              src="/sijaki.jpg"
              unoptimized
              width={30}
            />
            <span>
              Ahmad Zakiy <span className="identity-separator">/</span> Design Engineer
            </span>
          </div>
          <h1 id="home-title">
            Designing systems.
            <br />
            <span>Building for agents.</span>
          </h1>
          <p className="hero-description">
            I’m shaping design systems at{" "}
            <a href="https://www.mekari.com/" rel="noopener noreferrer" target="_blank">
              Mekari
            </a>{" "}
            and building MCP tooling that helps AI agents build with{" "}
            <a href="https://docs.mekari.design/" rel="noopener noreferrer" target="_blank">
              Pixel
            </a>
            .
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#selected-work">
              Explore my work <ArrowDown aria-hidden="true" size={16} />
            </a>
            <Link className="text-link" href="/links">
              Get in touch <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </AuroraBackground>
      </section>
      <section
        aria-labelledby="selected-work-title"
        className="selected-work page-width"
        id="selected-work"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">What I’m building</p>
            <h2 id="selected-work-title">Systems, agents, and experiments.</h2>
          </div>
          <Link className="text-link" href="/projects">
            All work <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <ProjectShowcase />
      </section>
      <section aria-labelledby="approach-title" className="approach-section page-width">
        <div className="approach-heading">
          <p className="eyebrow">The way I work</p>
          <h2 id="approach-title">
            The big picture.
            <br />
            <span>And the tiny details.</span>
          </h2>
        </div>
        <div className="approach-content">
          <p>
            I work on shared components, documentation, and MCP tools that help AI agents use Pixel
            Design System. The goal is to turn design decisions into consistent, working interfaces.
          </p>
          <div className="expertise-list">
            <span>
              <Layers2 aria-hidden="true" size={17} /> Design systems
            </span>
            <span>
              <Code2 aria-hidden="true" size={17} /> Interface engineering
            </span>
            <span>
              <Bot aria-hidden="true" size={17} /> Agentic AI tooling
            </span>
          </div>
          <a
            className="text-link"
            href="https://zakiy.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Meet Bun, my AI agent <ArrowUpRight aria-hidden="true" size={17} />
            <span className="sr-only">Opens in a new tab</span>
          </a>
          <p className="off-clock">
            Off the clock: hardcore/punk in my headphones. Still pretending to find peace.
          </p>
        </div>
      </section>
      <section aria-labelledby="home-notes-title" className="notes-preview page-width">
        <div className="notes-preview-intro">
          <BookOpen aria-hidden="true" size={28} strokeWidth={1.5} />
          <p className="eyebrow">An open notebook</p>
          <h2 id="home-notes-title">
            Good things
            <br />
            are worth keeping.
          </h2>
          <p>A growing collection of articles, websites, and tools that caught my attention.</p>
        </div>
        <div className="notes-preview-links">
          <Link href="/notes#articles">
            <span>
              <strong>Articles</strong>
              <span>Ideas that stay with you.</span>
            </span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
          <Link href="/notes#websites">
            <span>
              <strong>Websites</strong>
              <span>Little corners of a very big internet.</span>
            </span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
          <Link href="/notes#tools">
            <span>
              <strong>Tools</strong>
              <span>Things that make the work better.</span>
            </span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
        </div>
      </section>
      <section aria-labelledby="home-contact-title" className="home-contact page-width">
        <p className="eyebrow">A good place to start</p>
        <h2 id="home-contact-title">Have something in mind?</h2>
        <p>A project, a design problem, or just a good conversation.</p>
        <a className="button button-primary" href="mailto:in.zakiy@gmail.com">
          Let’s talk <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </section>
    </main>
  )
}
