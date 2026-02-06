"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

export function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Travel Updates</Badge>}
          title="Get Bhutan travel insights"
          description="Seasonal festivals, best travel windows, and insider recommendations."
        />

        <div className="mt-8 mx-auto max-w-xl rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input placeholder="Your email" type="email" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
