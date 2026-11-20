"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { DarkModeToggle } from "./dark-mode-toggle"

const navigation = [
  { href: "/projects", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/links", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [menuOpen])

  return (
    <header className="site-header" ref={header}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-header-inner">
        <Link
          aria-label="Ahmad Zakiy, home"
          className="site-brand"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            alt=""
            className="site-avatar"
            height={32}
            priority
            src="/sijaki.jpg"
            unoptimized
            width={32}
          />
          <span className="site-brand-name">Ahmad Zakiy</span>
        </Link>
        <nav aria-label="Main navigation" className="site-navigation">
          <button
            aria-controls="site-navigation-links"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="site-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButton}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
          <div
            className="site-navigation-links"
            data-open={menuOpen || undefined}
            id="site-navigation-links"
          >
            {navigation.map((item) => (
              <Link
                aria-current={pathname === item.href ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <DarkModeToggle />
      </div>
    </header>
  )
}
