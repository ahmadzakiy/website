"use client"

import type { ReactNode } from "react"

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  try {
    return <>{children}</>
  } catch (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <p className="text-red-600 dark:text-red-400">
          {fallback || "Something went wrong loading the content."}
        </p>
        <p className="text-gray-500 text-sm">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    )
  }
}

export default ErrorBoundary
