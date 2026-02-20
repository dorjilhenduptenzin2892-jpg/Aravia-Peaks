import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageLoader } from "@/components/media/image-loader"
import { getPackagePath, packageCategories, type TourPackage } from "@/lib/data/packages"

export function PackageCard({ pkg, imageOverride }: { pkg: TourPackage; imageOverride?: string }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category
  const priceLabel = pkg.startingFrom ? `From $${pkg.startingFrom.toLocaleString()}` : null
  const heroImage = imageOverride || pkg.heroImage

  return (
    <Link href={getPackagePath(pkg)} className="block w-full">
      <Card className="card-premium glass-card overflow-hidden h-full border border-border/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative overflow-hidden aspect-[4/3]">
          <ImageLoader
            src={heroImage}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/80">
            {pkg.durationLabel}
          </div>
        </div>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted/70 px-3 py-1">{categoryLabel}</span>
            <span className="rounded-full bg-muted/70 px-3 py-1">{pkg.difficulty}</span>
            <span className="rounded-full bg-muted/70 px-3 py-1">{pkg.region}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{pkg.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{pkg.summary}</p>
          </div>
          <div className="grid gap-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{pkg.durationLabel}</span>
              <span>Best time: {pkg.bestTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Group size: {pkg.groupSize}</span>
              {priceLabel ? <span className="font-semibold text-foreground">{priceLabel}</span> : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.slice(0, 3).map((item) => (
              <Badge key={item} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
