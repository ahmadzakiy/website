import JakartaClock from "@/components/jakarta-clock"
import ScrambleText from "@/components/scramble-text"

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 p-8 pt-32 sm:p-8 sm:pt-36">
        <h1 className="text-2xl text-black leading-tight sm:text-6xl dark:text-white">
          <ScrambleText
            maxIterations={15}
            scrambleSpeed={50}
            text="Ahmad Zakiy is UX Engineer at a Mekari, focused on building and scaling Design Systems that help teams craft better interfaces."
          />
          <br />
          <br />
          <ScrambleText
            maxIterations={12}
            scrambleSpeed={70}
            text="When he's not designing and coding, he's listening to hardcore/punk, thinking and exploring the world of AI."
          />
          <br />
          <br />
          <ScrambleText
            maxIterations={10}
            scrambleSpeed={100}
            text="He's based in Jakarta, where it's currently "
          />
          <JakartaClock />.
        </h1>
      </div>
    </>
  )
}
