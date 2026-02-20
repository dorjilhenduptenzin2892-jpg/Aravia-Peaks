"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LockIcon } from "@/components/icons"

export function Header() {
  const [adminState, setAdminState] = useState<"loading" | "guest" | "admin">("loading")
  const [isScrolled, setIsScrolled] = useState(false)

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
          const contentType = res.headers.get("content-type") || ""
          if (!contentType.includes("application/json")) {
            setAdminState("guest")
            return
          }

          const data = (await res.json().catch(() => null)) as { authenticated?: boolean } | null
          setAdminState(data?.authenticated ? "admin" : "guest")
          return
        }

        setAdminState("guest")
      } catch {
        if (isMounted) setAdminState("guest")
      }
    }

    checkSession()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLinkClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 0)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full text-white transition-all duration-300 ${
        isScrolled ? "bg-[#0f1f4b]/95 shadow-lg" : "bg-[#0f1f4b]"
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
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/60 hover:text-white"
            onClick={handleLinkClick}
          >
            Book Custom Tour
          </Link>

          {adminState === "admin" ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin/packages"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:border-white/60 hover:text-white"
                onClick={handleLinkClick}
              >
                <LockIcon className="text-base" /> Dashboard
              </Link>
              <button
                type="button"
                className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
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
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:border-white/60 hover:text-white"
              onClick={handleLinkClick}
            >
              <LockIcon className="text-base" /> Admin
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
