"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
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
  characters = "01",
  scrambledClassName,
  ...props
}: ScrambleLinkProps) {
  return (
    <Link href={href} {...props}>
      <ScrambleHover
        characters={characters}
        className={cn(
          "cursor-pointer text-left text-gray-900 text-sm transition-colors duration-200 hover:text-gray-600 sm:text-lg dark:text-white dark:hover:text-gray-300",
          className
        )}
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
