"use client"

import { useEffect, useState } from "react"
import ScrambleText from "@/components/scramble-text"

// Time update constants
const TIME_UPDATE_INTERVAL = 1000 // Update every second
const INITIAL_LOADING_DELAY = 1000 // Initial loading delay

export function useJakartaTime() {
  const [time, setTime] = useState("...")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const jakartaTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setTime(jakartaTime)
    }

    // Update immediately
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, TIME_UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return time
}

// Scrambled Jakarta Clock Component
export default function JakartaClock() {
  const time = useJakartaTime()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, INITIAL_LOADING_DELAY)

    return () => clearTimeout(timer)
  }, [])

  return (
    <span suppressHydrationWarning>
      {isLoading ? <ScrambleText scrambleSpeed={100} text="00:00:00" /> : time}
    </span>
  )
}
