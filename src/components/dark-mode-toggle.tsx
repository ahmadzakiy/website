"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

const nextTheme = { system: "light", light: "dark", dark: "system" } as const

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const next = nextTheme[theme]
  return (
    <button
      aria-label={`Theme: ${theme}. Switch to ${next} mode`}
      className="theme-toggle"
      onClick={() => setTheme(next)}
      type="button"
    >
      {theme === "system" ? <Monitor aria-hidden="true" size={17} /> : null}
      {theme === "light" ? <Sun aria-hidden="true" size={17} /> : null}
      {theme === "dark" ? <Moon aria-hidden="true" size={17} /> : null}
    </button>
  )
}
