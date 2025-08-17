"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrambleLinkProps {
  href: string
  text: string
  className?: string
  scrambleSpeed?: number
  maxIterations?: number
  characters?: string
  target?: string
  rel?: string
}

export default function ScrambleLink({
  href,
  text,
  className = "",
  scrambleSpeed = 20,
  maxIterations = 10,
  characters = "01",
  ...props
}: ScrambleLinkProps) {
  const [displayText, setDisplayText] = useState(text)
  const [shouldScramble, setShouldScramble] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let currentIteration = 0

    const availableChars = characters.split("")

    const shuffleText = () => {
      return text
        .split("")
        .map((char) => {
          if (char === " ") {
            return " "
          }
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ]
        })
        .join("")
    }

    if (shouldScramble) {
      interval = setInterval(() => {
        setDisplayText(shuffleText())
        currentIteration++
        if (currentIteration >= maxIterations) {
          clearInterval(interval)
          setShouldScramble(false)
          setDisplayText(text)
        }
      }, scrambleSpeed)
    } else {
      setDisplayText(text)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [shouldScramble, text, characters, scrambleSpeed, maxIterations])

  const handleMouseEnter = () => {
    setShouldScramble(false)
  }

  const handleMouseLeave = () => {
    setShouldScramble(true)
  }

  return (
    <Link
      className={cn(
        "inline-block cursor-pointer whitespace-pre-wrap text-left text-gray-900 transition-colors duration-200 hover:text-gray-400 sm:text-lg dark:text-white dark:hover:text-gray-400",
        className
      )}
      href={href}
      onBlur={handleMouseLeave}
      onFocus={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </Link>
  )
}
