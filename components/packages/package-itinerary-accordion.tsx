"use client"

import { useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { PackageItineraryItem } from "@/lib/data/packages"

export function PackageItineraryAccordion({ itinerary }: { itinerary: PackageItineraryItem[] }) {
  const safeItinerary = useMemo(() => (Array.isArray(itinerary) ? itinerary : []), [itinerary])
  const items = safeItinerary.map((item, index) => ({
    ...item,
    dayNumber: item.day || index + 1,
  }))

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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
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
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Day {item.dayNumber}
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {item.title || `Day ${item.dayNumber} experience`}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">{item.description || "Detailed itinerary coming soon."}</p>
                  {item.meals ? <p className="text-xs">Meals: {item.meals}</p> : null}
                  {item.stay ? <p className="text-xs">Stay: {item.stay}</p> : null}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
