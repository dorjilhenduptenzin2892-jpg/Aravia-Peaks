"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LockIcon } from "@/components/icons"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<"tours" | "guide" | null>(null)
  const [adminState, setAdminState] = useState<"loading" | "guest" | "admin">("loading")
  const navRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    setOpenMenu(null)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 0)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let isMounted = true
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/session")
        if (!isMounted) return
        if (res.ok) {
          const data = (await res.json()) as { authenticated: boolean }
          setAdminState(data.authenticated ? "admin" : "guest")
        } else {
          setAdminState("guest")
        }
      } catch {
        if (isMounted) setAdminState("guest")
      }
    }

    checkSession()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
        setOpenMenu(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-secondary" : "text-foreground/80 hover:text-foreground"
    }`

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 shadow-lg border-b" : "bg-transparent border-transparent"
      } backdrop-blur-lg`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          onClick={handleLinkClick}
        >
          <Image
            src="/images/logo.png"
            alt="Bhutan Aravia Peaks"
            width={180}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-wide text-muted-foreground lg:inline">
            Bhutan Aravia Peaks
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden items-center gap-6 md:flex">
          <Link href="/" className={linkClass("/")} onClick={handleLinkClick}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("tours")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              aria-expanded={openMenu === "tours"}
              aria-controls="nav-tours"
              onClick={() => setOpenMenu(openMenu === "tours" ? null : "tours")}
            >
              Bhutan Tours
            </button>
            <div
              id="nav-tours"
              className={`absolute left-0 top-full pt-2 ${openMenu === "tours" ? "block" : "hidden"}`}
            >
              <div className="w-64 rounded-xl border border-border bg-background p-4 shadow-lg">
                <Link href="/packages?category=cultural" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Cultural Tours
                </Link>
                <Link href="/packages?category=festival" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Festival Tours
                </Link>
                <Link href="/packages?category=trekking" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Trekking Tours
                </Link>
                <Link href="/packages?category=luxury" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Luxury Tours
                </Link>
                <Link href="/packages" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Adventure Tours
                </Link>
                <Link href="/inquiry" className="block px-3 py-2 text-sm font-semibold hover:bg-muted" onClick={handleLinkClick}>
                  Custom/Bespoke Tours
                </Link>
              </div>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("guide")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              aria-expanded={openMenu === "guide"}
              aria-controls="nav-guide"
              onClick={() => setOpenMenu(openMenu === "guide" ? null : "guide")}
            >
              Travel Guide
            </button>
            <div
              id="nav-guide"
              className={`absolute left-0 top-full pt-2 ${openMenu === "guide" ? "block" : "hidden"}`}
            >
              <div className="w-60 rounded-xl border border-border bg-background p-4 shadow-lg">
                <Link href="/travel-guide" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Bhutan Visa Guide
                </Link>
                <Link href="/travel-guide" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Best Time to Visit
                </Link>
                <Link href="/festivals" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Festivals Calendar
                </Link>
                <Link href="/travel-guide" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Top Attractions
                </Link>
                <Link href="/travel-guide" className="block px-3 py-2 text-sm hover:bg-muted" onClick={handleLinkClick}>
                  Travel Tips & FAQs
                </Link>
              </div>
            </div>
          </div>

          <Link href="/bhutan/farmhouses-homestays" className={linkClass("/bhutan/farmhouses-homestays")} onClick={handleLinkClick}>
            Hotels & Homestays
          </Link>
          <Link href="/#experiences" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground" onClick={handleLinkClick}>
            Bhutan Experiences
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground" onClick={handleLinkClick}>
            Testimonials & Reviews
          </Link>
          <Link href="/about" className={linkClass("/about")} onClick={handleLinkClick}>
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold px-4 py-2 rounded-md border border-border text-foreground/90 hover:text-foreground hover:border-foreground/30 transition-colors"
            onClick={handleLinkClick}
          >
            Contact / Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md btn-premium hover-glow"
            onClick={handleLinkClick}
          >
            Book Custom Tour
          </Link>

          {adminState === "admin" ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin/packages"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-foreground"
                onClick={handleLinkClick}
              >
                <LockIcon className="text-base" /> Dashboard
              </Link>
              <button
                type="button"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                onClick={async () => {
                  await fetch("/api/admin/logout", { method: "POST" })
                  setAdminState("guest")
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-foreground"
              onClick={handleLinkClick}
            >
              <LockIcon className="text-base" /> Admin
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="text-2xl">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t bg-background/95 backdrop-blur-md md:hidden" role="dialog" aria-modal="true">
          {/* Removed max-w-7xl mx-auto from mobile menu */}
          <nav className="flex flex-col gap-4 px-4 py-6">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Home
            </Link>
            <Link href="/packages" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Bhutan Tours
            </Link>
            <Link href="/bhutan/farmhouses-homestays" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Hotels & Homestays
            </Link>
            <Link href="/travel-guide" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Travel Guide
            </Link>
            <Link href="/festivals" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Festivals Calendar
            </Link>
            <Link href="/#experiences" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Bhutan Experiences
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              Testimonials & Reviews
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground" onClick={handleLinkClick}>
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 rounded-md border border-border text-foreground/90 hover:text-foreground hover:border-foreground/30 transition-colors"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>
            {adminState === "admin" ? (
              <div className="grid gap-2">
                <Link
                  href="/admin/packages"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-foreground"
                  onClick={handleLinkClick}
                >
                  <LockIcon className="text-base" /> Dashboard
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  onClick={async () => {
                    await fetch("/api/admin/logout", { method: "POST" })
                    setAdminState("guest")
                    handleLinkClick()
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground/90 hover:text-foreground"
                onClick={handleLinkClick}
              >
                <LockIcon className="text-base" /> Admin
              </Link>
            )}
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center w-full py-3 text-sm font-semibold rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-shadow"
              onClick={handleLinkClick}
            >
              Book Custom Tour
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
