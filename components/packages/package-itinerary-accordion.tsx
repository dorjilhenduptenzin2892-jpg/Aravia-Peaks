"use client"

import { useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { PackageItineraryItem } from "@/lib/data/packages"

type PackageItineraryAccordionProps = {
  itinerary: PackageItineraryItem[]
  durationDays?: number
  highlights?: string[]
  packageTitle?: string
}

const FALLBACK_DAY_THEMES = [
  "Arrival & welcome",
  "Cultural immersion",
  "Nature and landscapes",
  "Local experiences",
  "Leisure and departure",
]

export function PackageItineraryAccordion({
  itinerary,
  durationDays,
  highlights,
  packageTitle,
}: PackageItineraryAccordionProps) {
  const safeItinerary = useMemo(() => (Array.isArray(itinerary) ? itinerary : []), [itinerary])
  const safeHighlights = useMemo(() => (Array.isArray(highlights) ? highlights.filter(Boolean) : []), [highlights])

  const fallbackDays = useMemo(() => {
    if (durationDays && durationDays > 0) return durationDays
    if (safeHighlights.length >= 5) return 5
    if (safeHighlights.length >= 3) return 3
    return 3
  }, [durationDays, safeHighlights.length])

  const normalizedItems = useMemo(() => {
    if (safeItinerary.length) {
      return safeItinerary.map((item, index) => ({
        ...item,
        dayNumber: item.day || index + 1,
      }))
    }

    return Array.from({ length: fallbackDays }, (_, index) => {
      const theme = FALLBACK_DAY_THEMES[index % FALLBACK_DAY_THEMES.length]
      const highlight = safeHighlights[index] || safeHighlights[index % safeHighlights.length]
      return {
        dayNumber: index + 1,
        title: theme,
        description:
          highlight ||
          `A curated day in Bhutan with experiences tailored to ${packageTitle || "your interests"}.`,
      }
    })
  }, [safeItinerary, fallbackDays, safeHighlights, packageTitle])

  const items = useMemo(() => {
    if (!safeItinerary.length || !durationDays || durationDays <= normalizedItems.length) {
      return normalizedItems
    }

    const remaining = durationDays - normalizedItems.length
    const appended = Array.from({ length: remaining }, (_, index) => ({
      dayNumber: normalizedItems.length + index + 1,
      title: FALLBACK_DAY_THEMES[(normalizedItems.length + index) % FALLBACK_DAY_THEMES.length],
      description:
        safeHighlights[index] ||
        `Additional exploration day tailored to ${packageTitle || "your travel style"}.`,
    }))

    return [...normalizedItems, ...appended]
  }, [safeItinerary.length, durationDays, normalizedItems, safeHighlights, packageTitle])

  const allValues = items.map((item) => `day-${item.dayNumber}-${item.title || item.dayNumber}`)
  const [openItems, setOpenItems] = useState<string[]>(allValues.length ? [allValues[0]] : [])

  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground">
        This journey is customized for each traveler. We will send a tailored day-by-day plan after your inquiry.
      </p>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOpenItems(allValues)}
          className="text-xs uppercase tracking-wide text-primary hover:text-primary/80"
        >
          Expand all
        </button>
        <button
          type="button"
          onClick={() => setOpenItems([])}
          className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
        >
          Collapse all
        </button>
      </div>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {items.map((item, index) => {
          const value = allValues[index]
          return (
            <AccordionItem
              key={value}
              value={value}
              className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 px-6 shadow-sm transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:bg-card"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
              <AccordionTrigger>
                <div className="flex w-full items-start gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-base font-semibold text-primary shadow-inner">
                    <span className="absolute -left-7 top-1/2 hidden h-0.5 w-7 -translate-y-1/2 bg-border/80 md:block" />
                    {item.dayNumber}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Day {item.dayNumber}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                        Signature day
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-foreground md:text-lg">
                        {item.title || `Day ${item.dayNumber} experience`}
                      </span>
                      <span className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                        {item.dayNumber <= 2 ? "Arrival" : item.dayNumber >= items.length ? "Departure" : "Experience"}
                      </span>
                    </div>
                    {item.meals || item.stay ? (
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {item.meals ? (
                          <span className="rounded-full border border-border/60 bg-muted/60 px-3 py-1">
                            Meals: {item.meals}
                          </span>
                        ) : null}
                        {item.stay ? (
                          <span className="rounded-full border border-border/60 bg-muted/60 px-3 py-1">
                            Stay: {item.stay}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 border-l border-border/60 pl-10 text-muted-foreground">
                  <p className="leading-relaxed text-sm md:text-base">
                    {item.description || "Detailed itinerary coming soon."}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Curated pacing", value: "Balanced" },
                      { label: "Private guide", value: "Included" },
                      { label: "Transfers", value: "Door-to-door" },
                    ].map((meta) => (
                      <div
                        key={meta.label}
                        className="rounded-2xl border border-border/60 bg-background px-3 py-2"
                      >
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {meta.label}
                        </p>
                        <p className="text-xs font-semibold text-foreground">{meta.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
