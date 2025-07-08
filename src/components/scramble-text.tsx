"use client"

import { useEffect, useState } from "react"

interface FullScrambleProps {
  text: string
  className?: string
  scrambleSpeed?: number
  maxIterations?: number
  characters?: string
}

export default function FullScramble({
  text,
  className = "",
  scrambleSpeed = 50,
  maxIterations = 20,
  characters = "01",
}: FullScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let currentIteration = 0

    const shuffleText = () => {
      return text
        .split("")
        .map((char) => {
          if (char === " ") {
            return " "
          }
          return characters[Math.floor(Math.random() * characters.length)]
        })
        .join("")
    }

    if (isScrambling) {
      interval = setInterval(() => {
        if (currentIteration < maxIterations) {
          setDisplayText(shuffleText())
          currentIteration++
        } else {
          setDisplayText(text)
          setIsScrambling(false)
          clearInterval(interval)
        }
      }, scrambleSpeed)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [text, characters, scrambleSpeed, maxIterations, isScrambling])

  return <span className={className}>{displayText}</span>
}
