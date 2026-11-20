"use client"

import { Pause, Play } from "lucide-react"
import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type AuroraBackgroundProps = Omit<ComponentProps<"div">, "children" | "ref"> & {
  children: ReactNode
  showRadialGradient?: boolean
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  const root = useRef<HTMLDivElement>(null)
  const inView = useRef(true)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const element = root.current
    if (!element) {
      return
    }

    const updateActivity = () => setActive(inView.current && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry?.isIntersecting ?? false
      updateActivity()
    })

    observer.observe(element)
    updateActivity()
    document.addEventListener("visibilitychange", updateActivity)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", updateActivity)
    }
  }, [])

  const label = paused ? "Resume background animation" : "Pause background animation"

  return (
    <div
      {...props}
      className={cn("aurora-background", className)}
      data-paused={paused || !active}
      data-radial-gradient={showRadialGradient}
      ref={root}
    >
      <div aria-hidden="true" className="aurora-background__visual">
        <span className="aurora-background__layer aurora-background__layer--blue" />
        <span className="aurora-background__layer aurora-background__layer--lavender" />
      </div>
      <div className="aurora-background__content">{children}</div>
      <button
        aria-label={label}
        aria-pressed={paused}
        className="aurora-background__toggle"
        onClick={() => setPaused((value) => !value)}
        title={label}
        type="button"
      >
        {paused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}
      </button>
    </div>
  )
}
