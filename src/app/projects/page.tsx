import ScrambleText from "@/components/scramble-text"

export default function NotesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
      <h1 className="text-2xl text-black leading-tight sm:text-5xl dark:text-white">
        <ScrambleText maxIterations={15} scrambleSpeed={50} text="Coming soon" />
      </h1>
    </div>
  )
}
