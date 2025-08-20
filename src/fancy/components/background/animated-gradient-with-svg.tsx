"use client"

import type React from "react"
import { useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { useDimensions } from "../../../hooks/use-debounced-dimensions"

// Animation constants
const POSITION_RANGE = 50 // Range for random positioning (%)
const RANDOM_OFFSET = 0.5 // Offset for random values to center around 0
const SIZE_MIN = 0.5 // Minimum size multiplier for circles
const SIZE_MAX = 1.5 // Maximum size multiplier for circles

type AnimatedGradientProps = {
  colors: string[]
  speed?: number
  blur?: "light" | "medium" | "heavy"
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height],
  )

  let blurClass = "blur-2xl"
  if (blur === "medium") {
    blurClass = "blur-3xl"
  } else if (blur === "heavy") {
    blurClass = "blur-[100px]"
  }

  return (
    <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
      <div className={cn("absolute inset-0", blurClass)}>
        {colors.map((color) => {
          const animationProps = {
            animation: `background-gradient ${speed}s infinite ease-in-out`,
            animationDuration: `${speed}s`,
            top: `${Math.random() * POSITION_RANGE}%`,
            left: `${Math.random() * POSITION_RANGE}%`,
            "--tx-1": Math.random() - RANDOM_OFFSET,
            "--ty-1": Math.random() - RANDOM_OFFSET,
            "--tx-2": Math.random() - RANDOM_OFFSET,
            "--ty-2": Math.random() - RANDOM_OFFSET,
            "--tx-3": Math.random() - RANDOM_OFFSET,
            "--ty-3": Math.random() - RANDOM_OFFSET,
            "--tx-4": Math.random() - RANDOM_OFFSET,
            "--ty-4": Math.random() - RANDOM_OFFSET,
          } as React.CSSProperties

          return (
            <svg
              className={cn("absolute", "animate-background-gradient")}
              height={circleSize * randomInt(SIZE_MIN, SIZE_MAX)}
              key={color}
              style={animationProps}
              viewBox="0 0 100 100"
              width={circleSize * randomInt(SIZE_MIN, SIZE_MAX)}
            >
              <title>{`Animated gradient circle with color ${color}`}</title>
              <circle cx="50" cy="50" fill={color} r="50" />
            </svg>
          )
        })}
      </div>
    </div>
  )
}

export default AnimatedGradient
