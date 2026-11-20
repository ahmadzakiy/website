import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllNotesGroupedByCategory } from "@/lib/supabase"

export const revalidate = 0
export const metadata: Metadata = { title: "Notes — Ahmad Zakiy" }

const categories = [
  { key: "articles", title: "Articles", description: "Ideas worth another read." },
  { key: "websites", title: "Websites", description: "The internet, at its best." },
  { key: "tools", title: "Tools", description: "A few helpful things." },
] as const

async function NotesCollection() {
  const notes = await getAllNotesGroupedByCategory()
  return (
    <div className="notes-collection">
      {categories.map((category) => (
        <section
          aria-labelledby={`${category.key}-title`}
          className="notes-category"
          id={category.key}
          key={category.key}
        >
          <div className="notes-category-heading">
            <div>
              <h2 id={`${category.key}-title`}>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <span className="category-count">{notes[category.key].length}</span>
          </div>
          {notes[category.key].length > 0 ? (
            <ol className="note-list">
              {notes[category.key].map((item) => (
                <li key={item.id}>
                  <a href={item.href} rel="noopener noreferrer" target="_blank">
                    <span>{item.title}</span>
                    <ArrowUpRight aria-hidden="true" size={18} />
                    <span className="sr-only">Opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="notes-empty">A little space for the next good find.</p>
          )}
        </section>
      ))}
    </div>
  )
}

export default function NotesPage() {
  return (
    <main className="interior-page page-width" id="main-content">
      <header className="page-intro">
        <p className="eyebrow">Collected along the way</p>
        <h1>
          A curious mind.
          <br />
          <span>An open notebook.</span>
        </h1>
        <p>
          Articles, websites, and tools I keep coming back to.
          <br className="desktop-break" /> Maybe you’ll find something good here, too.
        </p>
      </header>
      <Suspense
        fallback={
          <div aria-busy="true" className="notes-loading">
            <span className="sr-only">Loading notes</span>
            {categories.map((category) => (
              <div className="notes-loading-row" key={category.key}>
                <span>{category.title}</span>
                <div />
                <div />
              </div>
            ))}
          </div>
        }
      >
        <NotesCollection />
      </Suspense>
    </main>
  )
}
