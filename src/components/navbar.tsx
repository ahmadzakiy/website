"use client"

import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { DarkModeToggle } from "./dark-mode-toggle"
import ScrambleLink from "./scramble-link"

export default function Navbar() {
  const { scrollY } = useScroll()

  // Transform values based on scroll
  const top = useTransform(scrollY, [0, 32], [32, 0])
  const left = useTransform(scrollY, [0, 120], [16, 0])
  const right = useTransform(scrollY, [0, 120], [16, 0])
  const borderRadius = useTransform(scrollY, [0, 64], [9999, 0])
  const maxWidth = useTransform(scrollY, [0, 200], [800, 9999])
  const paddingX = useTransform(scrollY, [32, 120], [16, 32])
  const shadowOpacity = useTransform(scrollY, [0, 32], [0.15, 0])
  const boxShadow = useTransform(
    shadowOpacity,
    (opacity) => `0 8px 32px rgba(0, 0, 0, ${opacity})`
  )

  return (
    <motion.nav
      className="fixed z-50 mx-auto border border-white/20 bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-black/70"
      style={{
        top,
        left,
        right,
        borderRadius,
        maxWidth,
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
