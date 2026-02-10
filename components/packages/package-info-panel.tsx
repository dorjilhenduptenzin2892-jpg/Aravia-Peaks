import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { TourPackage } from "@/lib/data/packages"
import { packageUi } from "@/lib/content/package-ui"

export function PackageInfoPanel({ pkg }: { pkg: TourPackage }) {
  return (
    <Card className="card-premium glass-card border border-border/60">
      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{packageUi.planPanelTitle}</h3>
          <p className="text-sm text-muted-foreground">{packageUi.planPanelDescription}</p>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex justify-between"><span>Best time to travel</span><span className="font-medium">{pkg.bestTime}</span></div>
          <div className="flex justify-between"><span>Group size</span><span className="font-medium">{pkg.groupSize}</span></div>
          <div className="flex justify-between"><span>Comfort level</span><span className="font-medium">{pkg.comfortLevel}</span></div>
          <div className="flex justify-between"><span>Region</span><span className="font-medium">{pkg.region}</span></div>
        </div>

        <Button asChild className="btn-premium hover-glow w-full">
          <Link href={`/inquiry?package=${pkg.slug}&name=${encodeURIComponent(pkg.title)}&category=${encodeURIComponent(pkg.category)}&duration=${encodeURIComponent(pkg.durationLabel)}`}>
            Customize This Trip
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
