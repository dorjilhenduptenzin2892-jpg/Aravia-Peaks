import { Card, CardContent } from "@/components/ui/card"
import type { PackageItineraryItem } from "@/lib/data/packages"

export function PackageItinerary({ itinerary }: { itinerary: PackageItineraryItem[] }) {
  return (
    <div className="space-y-4">
      {itinerary.map((item) => (
        <Card key={`${item.day}-${item.title}`} className="card-premium border border-border/60">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold">Day {item.day}: {item.title}</h4>
              <span className="text-xs text-muted-foreground">{item.meals ?? "Meals on request"}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.stay ? <p className="text-xs text-muted-foreground">Stay: {item.stay}</p> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
