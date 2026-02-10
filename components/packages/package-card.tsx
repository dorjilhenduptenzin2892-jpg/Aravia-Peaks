import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageLoader } from "@/components/media/image-loader"
import { getPackagePath, packageCategories, type TourPackage } from "@/lib/data/packages"

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category

  return (
    <Link href={getPackagePath(pkg)} className="block w-full">
      <Card className="card-premium glass-card overflow-hidden h-full border border-border/60">
        <div className="relative h-56">
          <ImageLoader
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-secondary text-secondary-foreground">{categoryLabel}</Badge>
          </div>
        </div>
        <CardContent className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted/70 px-3 py-1">{pkg.durationLabel}</span>
            <span className="rounded-full bg-muted/70 px-3 py-1">{pkg.difficulty}</span>
            <span className="rounded-full bg-muted/70 px-3 py-1">{pkg.region}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{pkg.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{pkg.summary}</p>
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
