"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2 rounded-full border border-border/60 bg-background/90 backdrop-blur-md px-4 py-2 shadow-lg md:hidden">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Plan your Bhutan trip</span>
        <Button size="sm" asChild>
          <Link href="/inquiry">Plan Now</Link>
        </Button>
      </div>
    </div>
  )
}
