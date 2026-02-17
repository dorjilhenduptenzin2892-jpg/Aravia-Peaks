"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { PackageItineraryItem } from "@/lib/data/packages"
import { cn } from "@/lib/utils"

type PackageItineraryAccordionProps = {
  itinerary: PackageItineraryItem[]
  durationDays?: number
  highlights?: string[]
  packageTitle?: string
  heroImage?: string
}

type TimelineItem = PackageItineraryItem & {
  dayNumber: number
  image?: string
  tags?: string[]
}

const FALLBACK_DAY_THEMES = [
  "Arrival & welcome",
  "Cultural immersion",
  "Nature and landscapes",
  "Local experiences",
  "Leisure and departure",
]

const TAG_KEYWORDS: Array<{ label: string; match: RegExp }> = [
  { label: "Hike", match: /hike|trek|trail|summit/i },
  { label: "Monastery", match: /monastery|dzong|temple|cloister/i },
  { label: "Scenic Drive", match: /drive|pass|valley|landscape/i },
  { label: "Culture", match: /festival|culture|heritage|tradition/i },
  { label: "Local Food", match: /food|cuisine|market|farm|culinary/i },
  { label: "Nature", match: /nature|forest|lake|river|wildlife/i },
]

const buildTags = (input: string) => {
  const matches = TAG_KEYWORDS.filter((tag) => tag.match.test(input)).map((tag) => tag.label)
  return Array.from(new Set(matches)).slice(0, 4)
}

const safeArray = <T,>(value?: T[]) => (Array.isArray(value) ? value.filter(Boolean) : [])

export function PackageItineraryAccordion({
  itinerary,
  durationDays,
  highlights,
  packageTitle,
  heroImage,
}: PackageItineraryAccordionProps) {
  const safeItinerary = useMemo(() => (Array.isArray(itinerary) ? itinerary : []), [itinerary])
  const safeHighlights = useMemo(() => (Array.isArray(highlights) ? highlights.filter(Boolean) : []), [highlights])

  const fallbackDays = useMemo(() => {
    if (durationDays && durationDays > 0) return durationDays
    if (safeHighlights.length >= 5) return 5
    if (safeHighlights.length >= 3) return 3
    return 3
  }, [durationDays, safeHighlights.length])

  const normalizedItems = useMemo<TimelineItem[]>(() => {
    if (safeItinerary.length) {
      return safeItinerary.map((item, index) => ({
        ...item,
        dayNumber: item.day || index + 1,
        image: (item as TimelineItem).image,
        tags: safeArray((item as TimelineItem).tags),
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

  const items = useMemo<TimelineItem[]>(() => {
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
        This journey is customized… we will share a day-by-day plan after inquiry.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {openItems.length} of {items.length} days expanded
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOpenItems(allValues)}
            aria-label="Expand all days"
            className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/20"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => setOpenItems([])}
            aria-label="Collapse all days"
            className="rounded-full border border-border/60 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-6 top-4 h-[calc(100%-2rem)] w-1 rounded-full bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
          {items.map((item, index) => {
            const value = allValues[index]
            const isOpen = openItems.includes(value)
            const bannerImage = item.image || heroImage
            const tagSource = [item.title, item.description].filter(Boolean).join(" ")
            const tags = safeArray(item.tags).length ? safeArray(item.tags) : buildTags(tagSource)

            return (
              <AccordionItem
                key={value}
                value={value}
                className={cn(
                  "group relative mb-6 rounded-3xl border border-border/70 bg-card/90 px-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                  isOpen && "border-primary/40 shadow-md",
                )}
              >
                <div
                  className={cn(
                    "absolute left-4 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary/40 bg-background shadow-sm transition",
                    isOpen && "bg-primary shadow-[0_0_12px_rgba(56,189,248,0.6)]",
                  )}
                />
                <AccordionTrigger>
                  <div className="flex w-full items-start gap-4">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-base font-semibold text-primary">
                      {item.dayNumber}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Day {item.dayNumber}
                        </span>
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                          Signature moment
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
                      {tags.length ? (
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-border/60 bg-muted/60 px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5">
                    <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border/60">
                      {bannerImage ? (
                        <>
                          <Image
                            src={bannerImage}
                            alt={item.title || packageTitle || "Itinerary highlight"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 space-y-1 text-white">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Signature moment</p>
                            <p className="text-lg font-semibold">{item.title || `Day ${item.dayNumber}`}</p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-primary/20 via-accent/10 to-background" />
                      )}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                      <p className="leading-relaxed text-sm md:text-base text-muted-foreground">
                        {item.description || "Detailed itinerary coming soon."}
                      </p>
                      <div className="grid gap-3">
                        {[
                          { label: "Pacing", value: "Balanced" },
                          { label: "Guide", value: "Private" },
                          { label: "Transfers", value: "Door-to-door" },
                        ].map((meta) => (
                          <div
                            key={meta.label}
                            className="rounded-2xl border border-border/60 bg-background px-4 py-3"
                          >
                            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                              {meta.label}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground">{meta.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
