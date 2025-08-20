import { type RefObject, useEffect, useState } from "react"

type Dimensions = {
  width: number
  height: number
}

// Debounce delay for resize events to avoid excessive calculations
const RESIZE_DEBOUNCE_DELAY = 250

export function useDimensions(ref: RefObject<HTMLElement | SVGElement | null>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, RESIZE_DEBOUNCE_DELAY) // Wait after resize ends
    }

    // Initial measurement
    updateDimensions()

    window.addEventListener("resize", debouncedUpdateDimensions)

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions
}
