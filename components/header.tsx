"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<"tours" | "guide" | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          onClick={handleLinkClick}
        >
          <Image
            src="/images/logofinal.png"
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
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
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
              className={`absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-border bg-background p-4 shadow-lg ${
                openMenu === "tours" ? "block" : "hidden"
              }`}
            >
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
              className={`absolute left-0 top-full w-60 translate-y-2 rounded-xl border border-border bg-background p-4 shadow-lg ${
                openMenu === "guide" ? "block" : "hidden"
              }`}
            >
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

          <Link
            href="/bhutan/farmhouses-homestays"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Hotels & Homestays
          </Link>
          <Link
            href="/#experiences"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Bhutan Experiences
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Testimonials & Reviews
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
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
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-shadow"
            onClick={handleLinkClick}
          >
            Book Custom Tour
          </Link>

          <div className="flex items-stretch rounded-lg border border-border bg-muted/60 shadow-sm overflow-hidden">
            <LanguageSelector />
          </div>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background/95 backdrop-blur-md md:hidden">
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
            <div className="pt-2">
              <LanguageSelector />
            </div>
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
