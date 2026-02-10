import { notFound } from "next/navigation"
import type { Metadata } from "next"
import PackageDetailClient from "@/app/packages/[id]/package-detail-client"
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

  return <PackageDetailClient id={slug} />
}
