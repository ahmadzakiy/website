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
      ? ["#9ca2af", "#d1d5db", "#9ca3af"]
      : ["#6b7281", "#4b5563", "#6b7280"]

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 p-8 pt-32 sm:p-8 sm:pt-36">
        <span className="pointer-events-none absolute inset-0 z-0 bg-[#d1d5db] dark:bg-[#4b5563]">
          <AnimatedGradient blur="medium" colors={gradientColors} speed={20} />
        </span>
        <h1 className="relative z-10 text-3xl text-black sm:text-6xl sm:leading-18 dark:text-white">
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
            text="When he's not designing and coding things on the web, he's listening to hardcore/punk, but mostly he pretends to find peace."
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
