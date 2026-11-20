"use client"

import { useEffect, useState } from "react"
import ProjectShowcase from "@/components/project-showcase"
import { datasets } from "./fixtures"
import "./stress.css"

type Dataset = keyof typeof datasets

function setQuery(key: string, value: string) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(null, "", url)
}

export default function StressHarness() {
  const [dataset, setDataset] = useState<Dataset>("demo")
  const [largeText, setLargeText] = useState(false)
  const [rtl, setRtl] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get("data")
    if (requested && Object.hasOwn(datasets, requested)) {
      setDataset(requested as Dataset)
    }
    setLargeText(params.get("text") === "large")
    setRtl(params.get("dir") === "rtl")
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const originalSize = root.style.fontSize
    if (largeText) {
      root.style.fontSize = "200%"
    }
    return () => {
      root.style.fontSize = originalSize
    }
  }, [largeText])

  return (
    <main className="work-stress page-width" id="main-content">
      <header className="work-stress-heading">
        <p className="eyebrow">Development only</p>
        <h1>Work cards: stress test</h1>
        <p>
          The same component as the homepage, with different data. Missing images in Worst case are
          intentional.
        </p>
        <div className="work-stress-options">
          <label>
            <input
              checked={largeText}
              onChange={(event) => {
                setLargeText(event.target.checked)
                setQuery("text", event.target.checked ? "large" : "normal")
              }}
              type="checkbox"
            />{" "}
            Large text (200%)
          </label>
          <label>
            <input
              checked={rtl}
              onChange={(event) => {
                setRtl(event.target.checked)
                setQuery("dir", event.target.checked ? "rtl" : "ltr")
              }}
              type="checkbox"
            />{" "}
            RTL content
          </label>
        </div>
      </header>
      <section aria-label="Work card dataset" dir={rtl ? "rtl" : "ltr"}>
        <ProjectShowcase items={datasets[dataset].items} />
      </section>
      <nav aria-label="Stress-test data" className="stress-picker">
        {(Object.keys(datasets) as Dataset[]).map((key) => (
          <button
            aria-pressed={dataset === key}
            key={key}
            onClick={() => {
              setDataset(key)
              setQuery("data", key)
            }}
            type="button"
          >
            {datasets[key].label}
          </button>
        ))}
      </nav>
    </main>
  )
}
