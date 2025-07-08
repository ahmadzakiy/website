"use client"

import { useEffect, useState } from "react"
import JakartaClock from "@/components/jakarta-clock"
import ScrambleText from "@/components/scramble-text"
import { useTheme } from "@/components/theme-provider"
import AnimatedGradient from "../fancy/components/background/animated-gradient-with-svg"

export default function Home() {
  const { theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      setResolvedTheme(systemTheme)
    } else {
      setResolvedTheme(theme as "light" | "dark")
    }
  }, [theme])

  const gradientColors =
    resolvedTheme === "light"
      ? ["#f1f1f1", "#C7C7C7", "#C7C7C7"]
      : ["#232323", "#3C3C3C", "#3C3C3C"]

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 p-8 pt-32 sm:p-8 sm:pt-36">
        <span className="pointer-events-none absolute inset-0 z-0 bg-[#f1f1f1] dark:bg-[#232323]">
          <AnimatedGradient blur="medium" colors={gradientColors} speed={10} />
        </span>
        <h1 className="relative z-10 text-3xl text-black leading-tight sm:text-6xl dark:text-white">
          <ScrambleText
            maxIterations={15}
            scrambleSpeed={50}
            text="Ahmad Zakiy is UX Engineer at a Mekari, focused on building and scaling Design Systems that help teams craft sleekest user experiences."
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
