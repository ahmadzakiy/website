"use client"

export default function Footer() {
  return (
    <div className="relative flex h-16 w-full items-center justify-center px-2 text-center text-sm sm:mt-16 sm:text-lg">
      © {new Date().getFullYear()} Ahmad Zakiy. All rights reserved. Built with
      <span className="mx-1.5 font-serif text-slate-600 italic">
        vibe coding
      </span>
    </div>
  )
}
