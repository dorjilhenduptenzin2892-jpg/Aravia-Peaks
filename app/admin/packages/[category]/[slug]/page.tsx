import { notFound } from "next/navigation"
import Link from "next/link"
import { packages } from "@/lib/data/packages"
import { getPackageImageOverrides } from "@/src/lib/data/package-images"
import { Button } from "@/components/ui/button"
import { AdminPackageEditorClient } from "./editor-client"

type PageProps = {
  params: { category: string; slug: string }
}

export default async function AdminPackageEditorPage({ params }: PageProps) {
  const { category, slug } = params
  const pkg = packages.find((item) => item.category === category && item.slug === slug)

  if (!pkg) {
    notFound()
  }

  const overrides = await getPackageImageOverrides(category, slug)

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
