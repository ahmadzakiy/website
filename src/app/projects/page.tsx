import ScrambleLink from "@/components/scramble-link"
import ScrambleText from "@/components/scramble-text"

const data = [
  {
    title: "Dota Wrapped",
    description:
      "A Dota 2 stats app that'll tell you exactly how many hours you've wasted feeding mid lane and why your friends stopped playing with you. It's like Spotify Wrapped, but instead of your questionable music taste, it exposes your questionable item builds and that time you went 0/15/2 as carry.",
    url: "https://dotawrapped.com",
  },
]

export default function NotesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
      <h1 className="text-2xl text-black leading-tight sm:text-5xl dark:text-white">
        <ScrambleText maxIterations={15} scrambleSpeed={50} text="Projects" />
      </h1>

      <div className="flex w-full flex-col gap-8 sm:mt-16 sm:w-[800px] sm:gap-28">
        {data.map((item) => (
          <ol className="z-10 flex flex-col gap-1 sm:text-lg" key={item.title}>
            <li className="flex flex-col gap-2">
              <ScrambleLink
                className="font-semibold sm:text-2xl"
                href={item.url}
                rel="noopener"
                target="_blank"
                text={item.title}
              />
              <ScrambleText
                className="text-gray-400 text-sm dark:text-gray-600"
                maxIterations={15}
                scrambleSpeed={50}
                text={item.description}
              />
            </li>
          </ol>
        ))}
      </div>
    </div>
  )
}
