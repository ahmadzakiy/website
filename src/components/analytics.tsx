"use client"

import { GoogleAnalytics } from "@next/third-parties/google"

type AnalyticsProps = {
  gaId?: string
}

export default function Analytics({ gaId }: AnalyticsProps) {
  // Only render in production and when GA ID is provided
  if (process.env.NODE_ENV !== "production" || !gaId) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}
