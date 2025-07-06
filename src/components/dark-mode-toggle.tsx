"use client"

import { Moon, Settings, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun />
      case "dark":
        return <Moon />
      case "system":
        return <Settings />
      default:
        return <Settings />
    }
  }

  const getNextTheme = () => {
    if (theme === "light") {
      return "dark"
    }
    if (theme === "dark") {
      return "system"
    }
    return "light"
  }

  return (
    <button
      aria-label={`Switch to ${getNextTheme()} mode`}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
      onClick={toggleTheme}
      type="button"
    >
      <span className="text-lg">{getThemeIcon()}</span>
    </button>
  )
}
