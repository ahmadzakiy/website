"use client"

export default function NotesError({ reset }: { reset: () => void }) {
  return (
    <main className="interior-page page-width" id="main-content">
      <div className="page-intro">
        <p className="eyebrow">A small interruption</p>
        <h1>
          The notebook
          <br />
          <span>couldn’t load.</span>
        </h1>
        <p>Please try again in a moment.</p>
        <button className="button button-primary" onClick={reset} type="button">
          Try again
        </button>
      </div>
    </main>
  )
}
