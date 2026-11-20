"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"

export default function SmoothScroll() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setEnabled(!preference.matches)

    updatePreference()
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  return enabled ? <ReactLenis root /> : null
}
