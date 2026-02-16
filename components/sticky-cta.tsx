"use client"

import Link from "next/link"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getPackageByCategoryAndSlug, getPackageBySlug } from "@/lib/data/packages"

export function StickyCTA() {
  const pathname = usePathname()

  const data = useMemo(() => {
    const match = pathname.match(/^\/packages\/([^/]+)\/([^/]+)/)
    if (!match) return null

    const [, category, slug] = match
    const pkg = getPackageByCategoryAndSlug(category, slug) || getPackageBySlug(slug)

    if (!pkg) return null

    const params = new URLSearchParams({
      package: pkg.slug,
      name: pkg.title,
      category: pkg.category,
      duration: pkg.durationLabel,
    })

    return {
      title: pkg.title,
      href: `/inquiry?${params.toString()}`,
    }
  }, [pathname])

  if (!data) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2 rounded-full border border-border/60 bg-background/90 backdrop-blur-md px-4 py-2 shadow-lg md:hidden">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium line-clamp-1">Request a quote for {data.title}</span>
        <Button size="sm" asChild>
          <Link href={data.href}>Request a quote</Link>
        </Button>
      </div>
    </div>
  )
}
