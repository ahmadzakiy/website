import ScrambleLink from "@/components/scramble-link"
import ScrambleText from "@/components/scramble-text"

export default function NotesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
      <h1 className="text-2xl text-black leading-tight sm:text-5xl dark:text-white">
        <ScrambleText maxIterations={15} scrambleSpeed={50} text="Links" />
      </h1>
      <p>
        email me at{" "}
        <ScrambleLink
          className="font-bold sm:text-base"
          href="mailto:in.zakiy@example.com"
          text="in.zakiy@example.com"
        />{" "}
        for projects, or just for a cup of coffee.
      </p>
    </div>
  )
}
