"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 0)
  }

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
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/packages"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Tour Packages
          </Link>
          <Link
            href="/travel-guide"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={handleLinkClick}
          >
            Travel Guide
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
            Contact Us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md transition-shadow"
            onClick={handleLinkClick}
          >
            Plan Your Trip
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
              Tour Packages
            </Link>
            <Link
              href="/travel-guide"
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
              onClick={handleLinkClick}
            >
              Travel Guide
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
              Plan Your Trip
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
