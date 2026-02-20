import Link from "next/link"
import { packages } from "@/lib/data/packages"
import { getPackageImageOverrides } from "@/src/lib/data/package-images"
import { Button } from "@/components/ui/button"
import { AdminPackageEditorClient } from "./editor-client"

type PageProps = {
  params: { category: string; slug: string }
}

export default async function AdminPackageEditorPage({ params }: PageProps) {
  const rawCategory = decodeURIComponent(params.category)
  const rawSlug = decodeURIComponent(params.slug)
  const normalizedCategory = rawCategory.toLowerCase()
  const normalizedSlug = rawSlug.toLowerCase()
  const pkg = packages.find(
    (item) => item.category.toLowerCase() === normalizedCategory && item.slug.toLowerCase() === normalizedSlug,
  )

  if (!pkg) {
    return (
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Admin Console</p>
            <h1 className="text-3xl font-semibold">Package not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We could not match {rawCategory}/{rawSlug}. Please choose a package again.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/packages">Back to packages</Link>
          </Button>
        </div>
      </section>
    )
  }

  const overrides = await getPackageImageOverrides(pkg.category, pkg.slug)

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Admin Console</p>
          <h1 className="text-3xl font-semibold">{pkg.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage hero, gallery, and itinerary images.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/packages">Back to packages</Link>
        </Button>
      </div>

      <AdminPackageEditorClient packageKey={`${pkg.category}/${pkg.slug}`} pkg={pkg} initialOverrides={overrides} />
    </section>
  )
}
