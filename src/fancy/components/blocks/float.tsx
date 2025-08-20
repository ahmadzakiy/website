"use client"

import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import type React from "react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

// Animation constants
const DEFAULT_SPEED = 0.5
const DEFAULT_AMPLITUDE_X = 10
const DEFAULT_AMPLITUDE_Y = 30
const DEFAULT_AMPLITUDE_Z = 30
const DEFAULT_ROTATION_X = 15
const DEFAULT_ROTATION_Y = 15
const DEFAULT_ROTATION_Z = 7.5

// Animation frequency multipliers for different axes
const TIME_MULTIPLIER = 0.02
const MOTION_FREQ_X = 0.7
const MOTION_FREQ_Y = 0.6
const MOTION_FREQ_Z = 0.5
const ROTATION_FREQ_X = 0.5
const ROTATION_FREQ_Y = 0.4
const ROTATION_FREQ_Z = 0.3

type FloatProps = {
  children: React.ReactNode
  speed?: number
  amplitude?: [number, number, number] // [x, y, z]
  rotationRange?: [number, number, number] // [x, y, z]
  timeOffset?: number
  className?: string
}

const Float: React.FC<FloatProps> = ({
  children,
  speed = DEFAULT_SPEED,
  amplitude = [DEFAULT_AMPLITUDE_X, DEFAULT_AMPLITUDE_Y, DEFAULT_AMPLITUDE_Z], // Default [x, y, z] amplitudes
  rotationRange = [DEFAULT_ROTATION_X, DEFAULT_ROTATION_Y, DEFAULT_ROTATION_Z], // Default [x, y, z] rotation ranges
  timeOffset = 0,
  className,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rotateZ = useMotionValue(0)

  // Use refs for animation values to avoid recreating the animation frame callback
  const time = useRef(0)

  useAnimationFrame(() => {
    time.current += speed * TIME_MULTIPLIER

    // Smooth floating motion on all axes
    const newX = Math.sin(time.current * MOTION_FREQ_X + timeOffset) * amplitude[0]
    const newY = Math.sin(time.current * MOTION_FREQ_Y + timeOffset) * amplitude[1]
    const newZ = Math.sin(time.current * MOTION_FREQ_Z + timeOffset) * amplitude[2]

    // 3D rotations with different frequencies for more organic movement
    const newRotateX = Math.sin(time.current * ROTATION_FREQ_X + timeOffset) * rotationRange[0]
    const newRotateY = Math.sin(time.current * ROTATION_FREQ_Y + timeOffset) * rotationRange[1]
    const newRotateZ = Math.sin(time.current * ROTATION_FREQ_Z + timeOffset) * rotationRange[2]

    x.set(newX)
    y.set(newY)
    z.set(newZ)
    rotateX.set(newRotateX)
    rotateY.set(newRotateY)
    rotateZ.set(newRotateZ)
  })

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

export default Float
