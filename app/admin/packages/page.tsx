import Link from "next/link"
import Image from "next/image"
import { packages } from "@/lib/data/packages"
import { fetchManifest } from "@/src/lib/data/package-images"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PackageGroup = {
  label: string
  items: typeof packages
}

const categoryLabels: Record<string, string> = {
  cultural: "Cultural Tours",
  trekking: "Trekking Tours",
  festival: "Festival Tours",
  adventure: "Adventure Tours",
  luxury: "Luxury Tours",
  custom: "Custom Journeys",
}

export default async function AdminPackagesPage() {
  const manifest = await fetchManifest()
  const grouped = packages.reduce<Record<string, typeof packages>>((acc, pkg) => {
    acc[pkg.category] = acc[pkg.category] || []
    acc[pkg.category].push(pkg)
    return acc
  }, {})

  const groups: PackageGroup[] = Object.entries(grouped).map(([category, items]) => ({
    label: categoryLabels[category] || category,
    items,
  }))

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Admin Console</p>
          <h1 className="text-3xl font-semibold">Package image manager</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manifest updated: {new Date(manifest.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.label}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((pkg) => {
                const key = `${pkg.category}/${pkg.slug}`
                const overrides = manifest.packages[key]
                const overrideCount =
                  (overrides?.mainImage ? 1 : 0) +
                  (overrides?.gallery?.length ? 1 : 0) +
                  (overrides?.itineraryImages ? 1 : 0)

                return (
                  <Card key={key} className="overflow-hidden">
                    <div className="relative h-44 w-full">
                      <Image
                        src={overrides?.mainImage || pkg.heroImage}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg">{pkg.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{pkg.category}</Badge>
                        <Badge variant={overrideCount ? "default" : "secondary"}>
                          {overrideCount ? `${overrideCount} overrides` : "No overrides"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">{pkg.durationLabel}</div>
                      <Button asChild size="sm">
                        <Link href={`/admin/packages/${pkg.category}/${pkg.slug}`}>Manage</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
