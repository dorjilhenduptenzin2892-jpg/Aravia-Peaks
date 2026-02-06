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
    <header className="sticky top-0 z-50 w-full bg-background/98 backdrop-blur-md border-b shadow-sm">
      <div className="flex h-20 items-center justify-between pl-4 pr-4 md:pr-6 lg:pr-8">
        <Link
          href="/"
          className="flex items-center overflow-hidden h-full max-w-[400px] transition-opacity hover:opacity-90"
          onClick={handleLinkClick}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/v0_image-8L09fXhY0MLSwKLTYV5NsWZ8pv23ml.png"
            alt="DrukVista - Gateway to Bhutan"
            width={400}
            height={140}
            className="h-full w-auto object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/packages"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
            onClick={handleLinkClick}
          >
            Tour Packages
          </Link>
          <Link
            href="/travel-guide"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
            onClick={handleLinkClick}
          >
            Travel Guide
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
            onClick={handleLinkClick}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105"
            onClick={handleLinkClick}
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/inquiry"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-md uppercase tracking-wide shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-400/60 transition-all duration-300 border-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-600 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            onClick={handleLinkClick}
          >
            <span className="relative z-10">PLAN YOUR TRIP NOW</span>
            <span className="relative z-10 inline-block transition-transform group-hover:translate-x-1 duration-300">
              →
            </span>
          </Link>

          <div className="flex items-stretch bg-orange-500 backdrop-blur-sm rounded-lg border-2 border-orange-600 shadow-md overflow-hidden">
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
        <div className="border-t bg-background/98 backdrop-blur-md md:hidden">
          {/* Removed max-w-7xl mx-auto from mobile menu */}
          <nav className="flex flex-col gap-4 px-4 py-6">
            <Link href="/" className="text-sm font-medium hover:text-foreground/80" onClick={handleLinkClick}>
              Home
            </Link>
            <Link href="/packages" className="text-sm font-medium hover:text-foreground/80" onClick={handleLinkClick}>
              Tour Packages
            </Link>
            <Link
              href="/travel-guide"
              className="text-sm font-medium hover:text-foreground/80"
              onClick={handleLinkClick}
            >
              Travel Guide
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-foreground/80" onClick={handleLinkClick}>
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-bold px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>
            <div className="pt-2">
              <LanguageSelector />
            </div>
            <Link
              href="/inquiry"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-bold rounded-md uppercase tracking-wide shadow-lg transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-600"
              onClick={handleLinkClick}
            >
              <span className="relative z-10">PLAN YOUR TRIP NOW</span>
              <span className="relative z-10 inline-block transition-transform group-hover:translate-x-1 duration-300">
                →
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
