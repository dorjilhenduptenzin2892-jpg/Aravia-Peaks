import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackageDetails } from "@/components/packages/package-details"
import { getAllPackages, getPackageByCategoryAndSlug } from "@/lib/data/packages"

export function generateStaticParams() {
  return getAllPackages().map((pkg) => ({ category: pkg.category, slug: pkg.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const pkg = getPackageByCategoryAndSlug(category, slug)

  if (!pkg) {
    return { title: "Package Not Found" }
  }

  return {
    title: `${pkg.title} | Bhutan Aravia Peaks`,
    description: pkg.summary,
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      images: [{ url: pkg.heroImage, alt: pkg.title }],
      type: "article",
    },
  }
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const pkg = getPackageByCategoryAndSlug(category, slug)

  if (!pkg) {
    notFound()
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    itinerary: pkg.itinerary.map((item) => ({
      "@type": "TouristAttraction",
      name: item.title,
      description: item.description,
    })),
    tourType: pkg.category,
    areaServed: pkg.region,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PackageDetails pkg={pkg} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  )
}
