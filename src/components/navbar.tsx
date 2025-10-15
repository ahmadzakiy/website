"use client"

import { useLenis } from "lenis/react"
import { motion, useMotionValue, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { DarkModeToggle } from "./dark-mode-toggle"
import ScrambleLink from "./scramble-link"

// Scroll animation constants
const INITIAL_TOP_OFFSET = 32
const SCROLL_THRESHOLD_BASIC = 32
const SCROLL_THRESHOLD_EXTENDED = 80
const SCROLL_THRESHOLD_FULL = 120
const MAX_BORDER_RADIUS = 9999
const INITIAL_WIDTH = 800
const INITIAL_PADDING = 12
const FINAL_PADDING = 32
const SHADOW_OPACITY = 0.15
const MOBILE_BREAKPOINT = 640
const MOBILE_HORIZONTAL_PADDING = 16

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
  const top = useTransform(scrollY, [0, SCROLL_THRESHOLD_BASIC], [INITIAL_TOP_OFFSET, 0])
  const leftRight = useTransform(scrollY, [0, SCROLL_THRESHOLD_FULL], ["calc(50vw - 400px)", "0px"])
  const mobileLeftRight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD_FULL],
    [MOBILE_HORIZONTAL_PADDING, 0],
  )
  const borderRadius = useTransform(scrollY, [0, SCROLL_THRESHOLD_EXTENDED], [MAX_BORDER_RADIUS, 0])
  const width = useTransform(scrollY, [0, SCROLL_THRESHOLD_FULL], [INITIAL_WIDTH, "100vw"])
  const paddingX = useTransform(
    scrollY,
    [SCROLL_THRESHOLD_BASIC, SCROLL_THRESHOLD_FULL],
    [INITIAL_PADDING, FINAL_PADDING],
  )
  const shadowOpacity = useTransform(scrollY, [0, SCROLL_THRESHOLD_BASIC], [SHADOW_OPACITY, 0])
  const boxShadow = useTransform(shadowOpacity, (opacity) => `0 8px 32px rgba(0, 0, 0, ${opacity})`)

  return (
    <motion.nav
      className="fixed z-50 bg-white/70 backdrop-blur-sm dark:bg-black/70"
      style={{
        top,
        left:
          typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT
            ? leftRight
            : mobileLeftRight,
        right:
          typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT
            ? leftRight
            : mobileLeftRight,
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
