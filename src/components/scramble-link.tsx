"use client"

import Link from "next/link"
import ScrambleHover from "../fancy/components/text/scramble-hover"

interface ScrambleLinkProps {
  href: string
  text: string
  className?: string
  scrambleSpeed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: "start" | "end" | "center"
  useOriginalCharsOnly?: boolean
  characters?: string
  scrambledClassName?: string
  target?: string
  rel?: string
}

export default function ScrambleLink({
  href,
  text,
  className = "",
  scrambleSpeed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  scrambledClassName,
  ...props
}: ScrambleLinkProps) {
  return (
    <Link href={href} {...props}>
      <ScrambleHover
        characters={characters}
        className="cursor-pointer font-medium text-gray-900 text-sm transition-colors duration-200 hover:text-gray-600 sm:text-lg dark:text-white dark:hover:text-gray-300"
        maxIterations={maxIterations}
        revealDirection={revealDirection}
        scrambledClassName={scrambledClassName}
        scrambleSpeed={scrambleSpeed}
        sequential={sequential}
        text={text}
        useOriginalCharsOnly={useOriginalCharsOnly}
      />
    </Link>
  )
}
