import { notFound } from "next/navigation"
import type { Metadata } from "next"
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
    alternates: {
      canonical: `/packages/${pkg.category}/${pkg.slug}`,
      languages: {
        en: `/en/packages/${pkg.category}/${pkg.slug}`,
        es: `/es/packages/${pkg.category}/${pkg.slug}`,
        fr: `/fr/packages/${pkg.category}/${pkg.slug}`,
        de: `/de/packages/${pkg.category}/${pkg.slug}`,
        zh: `/zh/packages/${pkg.category}/${pkg.slug}`,
      },
    },
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      images: [{ url: pkg.heroImage, alt: pkg.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.summary,
      images: [pkg.heroImage],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    touristType: pkg.category,
    itinerary: pkg.itinerary.map((item) => ({
      "@type": "TouristTrip",
      name: `Day ${item.day}: ${item.title}`,
      description: item.description,
    })),
    provider: {
      "@type": "TravelAgency",
      name: "Bhutan Aravia Peaks",
      url: "https://aravia-peaks.vercel.app",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackageDetails pkg={pkg} />
    </>
  )
}
