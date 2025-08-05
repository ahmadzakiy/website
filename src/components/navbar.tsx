"use client"

import { useLenis } from "lenis/react"
import { motion, useMotionValue, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { DarkModeToggle } from "./dark-mode-toggle"
import ScrambleLink from "./scramble-link"

export default function Navbar() {
  const lenis = useLenis()
  const scrollY = useMotionValue(0)

  // Listen to Lenis scroll events and update Motion's scrollY value
  useEffect(() => {
    if (!lenis) {
      return
    }

    const updateScrollY = (e: { scroll: number }) => {
      scrollY.set(e.scroll)
    }

    lenis.on("scroll", updateScrollY)
    return () => lenis.off("scroll", updateScrollY)
  }, [lenis, scrollY])

  // Transform values based on Lenis scroll
  const top = useTransform(scrollY, [0, 32], [32, 0])
  const leftRight = useTransform(
    scrollY,
    [0, 120],
    ["calc(50vw - 400px)", "0px"]
  )
  const borderRadius = useTransform(scrollY, [0, 80], [9999, 0])
  const width = useTransform(scrollY, [0, 120], [800, "100vw"])
  const paddingX = useTransform(scrollY, [32, 120], [16, 32])
  const shadowOpacity = useTransform(scrollY, [0, 32], [0.15, 0])
  const boxShadow = useTransform(
    shadowOpacity,
    (opacity) => `0 8px 32px rgba(0, 0, 0, ${opacity})`
  )

  return (
    <motion.nav
      className="fixed z-50 border border-white/20 bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-black/70"
      style={{
        top,
        left: leftRight,
        right: leftRight,
        borderRadius,
        width,
        boxShadow,
      }}
    >
      <motion.div style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center" href="/">
            <Image
              alt="Ahmad Zakiy"
              className="flex-none rounded-full"
              height={40}
              priority={true}
              src="/sijaki.jpg"
              width={40}
            />
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ScrambleLink href="/projects" text="Projects" />
            <ScrambleLink href="/notes" text="Notes" />
            <ScrambleLink href="/links" text="Links" />
            <DarkModeToggle />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
