"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

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
  scrambleSpeed = 20,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "01",
  scrambledClassName,
  ...props
}: ScrambleLinkProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const revealedIndices = useRef(new Set<number>())

  useEffect(() => {
    let interval: NodeJS.Timeout
    let currentIteration = 0

    const getCenterIndex = (textLength: number) => {
      const middle = Math.floor(textLength / 2)
      const offset = Math.floor(revealedIndices.current.size / 2)
      const nextIndex =
        revealedIndices.current.size % 2 === 0
          ? middle + offset
          : middle - offset - 1

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealedIndices.current.has(nextIndex)
      ) {
        return nextIndex
      }

      for (let i = 0; i < textLength; i++) {
        if (!revealedIndices.current.has(i)) {
          return i
        }
      }
      return 0
    }

    const getNextIndex = () => {
      const textLength = text.length
      switch (revealDirection) {
        case "start":
          return revealedIndices.current.size
        case "end":
          return textLength - 1 - revealedIndices.current.size
        case "center":
          return getCenterIndex(textLength)
        default:
          return revealedIndices.current.size
      }
    }

    const shuffleText = (inputText: string) => {
      if (useOriginalCharsOnly) {
        const positions = inputText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: revealedIndices.current.has(i),
        }))

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace)
          .filter((p) => !p.isRevealed)
          .map((p) => p.char)

        // Shuffle remaining non-revealed, non-space characters
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) {
              return " "
            }
            if (p.isRevealed) {
              return text[p.index]
            }
            return nonSpaceChars[charIndex++]
          })
          .join("")
      }

      return inputText
        .split("")
        .map((char, i) => {
          if (char === " ") {
            return " "
          }
          if (revealedIndices.current.has(i)) {
            return text[i]
          }
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ]
        })
        .join("")
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("")

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        if (sequential) {
          if (revealedIndices.current.size < text.length) {
            const nextIndex = getNextIndex()
            revealedIndices.current.add(nextIndex)
            setDisplayText(shuffleText(text))
          } else {
            clearInterval(interval)
            setIsScrambling(false)
          }
        } else {
          setDisplayText(shuffleText(text))
          currentIteration++
          if (currentIteration >= maxIterations) {
            clearInterval(interval)
            setIsScrambling(false)
            setDisplayText(text)
          }
        }
      }, scrambleSpeed)
    } else {
      setDisplayText(text)
      revealedIndices.current.clear()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [
    isHovering,
    text,
    characters,
    scrambleSpeed,
    useOriginalCharsOnly,
    sequential,
    revealDirection,
    maxIterations,
  ])

  return (
    <Link
      className={cn(
        "inline-block cursor-pointer whitespace-pre-wrap text-left text-gray-900 text-sm transition-colors duration-200 hover:text-gray-600 sm:text-lg dark:text-white dark:hover:text-gray-300",
        className
      )}
      href={href}
      onBlur={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => (
          <span
            className={cn(
              revealedIndices.current.has(index) || !isScrambling || !isHovering
                ? ""
                : scrambledClassName
            )}
            key={`${text}-${index}-${char}`}
          >
            {char}
          </span>
        ))}
      </span>
    </Link>
  )
}
