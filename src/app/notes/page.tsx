import { Suspense } from "react"
import ErrorBoundary from "@/components/error-boundary"
import ScrambleLink from "@/components/scramble-link"
import ScrambleText from "@/components/scramble-text"
import SectionSkeleton from "@/components/section-skeleton"
import { getAllNotesGroupedByCategory } from "@/lib/supabase"

// Notes section component
async function NotesSection() {
  const notesData = await getAllNotesGroupedByCategory()

  // Define sections configuration
  const sections = [
    { key: "articles", title: "articles", data: notesData.articles },
    { key: "websites", title: "websites", data: notesData.websites },
    { key: "tools", title: "tools", data: notesData.tools },
  ] as const

  return (
    <div className="flex w-full flex-col gap-8 sm:mt-16 sm:w-[800px] sm:gap-28">
      {sections.map((section) => (
        <section className="relative flex flex-col gap-4" key={section.key}>
          <h2 className="sm:-left-20 sm:-top-24 -top-10 -left-10 absolute font-serif text-8xl text-gray-600 opacity-10 sm:text-[200px] dark:text-gray-300">
            {section.title}
          </h2>
          <ol className="flex flex-col gap-1 sm:text-lg">
            {section.data.map((item, index: number) => (
              <li key={item.id}>
                <ScrambleLink
                  href={item.href}
                  rel="noopener"
                  target="_blank"
                  text={`${index + 1}. ${item.title}`}
                />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

export default function NotesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
      <h1 className="text-2xl text-black leading-tight sm:text-4xl dark:text-white">
        <ScrambleText maxIterations={15} scrambleSpeed={50} text="Notes" />
      </h1>

      <Suspense
        fallback={
          <div className="flex w-full flex-col gap-8 sm:w-[800px]">
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </div>
        }
      >
        <ErrorBoundary fallback="Unable to load notes from Supabase.">
          <NotesSection />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
