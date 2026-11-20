"use client"

import Image from "next/image"
import { useState } from "react"

const fallbackThumbnail = "/images/work/pixel-abstract.jpg"

export default function WorkThumbnail({ src }: { src: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const source = src.trim()
  const resolvedSource = source && failedSource !== source ? source : fallbackThumbnail

  return (
    <Image
      alt=""
      className="work-thumbnail"
      height={512}
      loading="lazy"
      onError={() => {
        if (resolvedSource !== fallbackThumbnail) {
          setFailedSource(source)
        }
      }}
      src={resolvedSource}
      unoptimized
      width={512}
    />
  )
}
