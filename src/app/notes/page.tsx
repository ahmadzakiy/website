import { Suspense } from "react"
import ErrorBoundary from "@/components/error-boundary"
import ScrambleLink from "@/components/scramble-link"
import ScrambleText from "@/components/scramble-text"
import SectionSkeleton from "@/components/section-skeleton"
import { getAllNotesGroupedByCategory } from "@/lib/supabase"

// Notes section component
async function NotesSection() {
  const notesData = await getAllNotesGroupedByCategory()

  return (
    <div className="flex w-full flex-col gap-8 sm:w-[800px]">
      {/* Articles Section */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-gray-600 text-lg sm:text-3xl dark:text-gray-300">
          articles
        </h2>
        <ol className="flex flex-col gap-1 sm:text-lg">
          {notesData.articles.map((article, index: number) => (
            <li key={article.id}>
              <ScrambleLink
                href={article.href}
                rel="noopener"
                target="_blank"
                text={`${index + 1}. ${article.title}`}
              />
            </li>
          ))}
        </ol>
      </section>

      {/* Websites Section */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-gray-600 text-lg sm:text-3xl dark:text-gray-300">
          websites
        </h2>
        <ol className="flex flex-col gap-1 sm:text-lg">
          {notesData.websites.map((website, index: number) => (
            <li key={website.id}>
              <ScrambleLink
                href={website.href}
                rel="noopener"
                target="_blank"
                text={`${index + 1}. ${website.title}`}
              />
            </li>
          ))}
        </ol>
      </section>

      {/* Tools Section */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-gray-600 text-lg sm:text-3xl dark:text-gray-300">
          tools
        </h2>
        <ol className="flex flex-col gap-1 sm:text-lg">
          {notesData.tools.map((tool, index: number) => (
            <li key={tool.id}>
              <ScrambleLink
                href={tool.href}
                rel="noopener"
                target="_blank"
                text={`${index + 1}. ${tool.title}`}
              />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default function NotesPage() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
        <h1 className="text-2xl text-black leading-tight sm:text-5xl dark:text-white">
          <ScrambleText
            maxIterations={15}
            scrambleSpeed={50}
            text="Links and Resources"
          />
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
          <ErrorBoundary fallback="Unable to load notes from Supabase. Please check your environment variables.">
            <NotesSection />
          </ErrorBoundary>
        </Suspense>
      </div>
    </>
  )
}
