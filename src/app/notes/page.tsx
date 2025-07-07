import ScrambleLink from "@/components/scramble-link"
import ScrambleText from "@/components/scramble-text"
import { type LinkItem, notesData } from "@/data/notes"

export default function NotesPage() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
        <h1 className="text-2xl text-black leading-tight sm:text-6xl dark:text-white">
          <ScrambleText
            maxIterations={15}
            scrambleSpeed={50}
            text="Links and Resources"
          />
        </h1>

        <div className="flex w-full flex-col gap-8 sm:w-[800px]">
          {/* Articles Section */}
          <section className="flex flex-col gap-4">
            <h2 className="font-serif text-gray-600 text-lg sm:text-3xl dark:text-gray-300">
              ---articles---
            </h2>
            <ol className="flex flex-col gap-3 font-sans text-base sm:text-lg">
              {notesData.articles.map((article: LinkItem, index: number) => (
                <li key={article.href}>
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
              ---websites---
            </h2>
            <ol className="flex flex-col gap-3 font-sans text-base sm:text-lg">
              {notesData.websites.map((website: LinkItem, index: number) => (
                <li key={website.href}>
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
              ---tools---
            </h2>
            <ol className="flex flex-col gap-3 font-sans text-base sm:text-lg">
              {notesData.tools.map((tool: LinkItem, index: number) => (
                <li key={tool.href}>
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
      </div>
    </>
  )
}
