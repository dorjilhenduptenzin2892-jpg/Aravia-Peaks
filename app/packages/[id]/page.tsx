import { redirect } from "next/navigation"
import { getAllPackages, getPackageBySlug, getPackagePath } from "@/lib/data/packages"

// Generate static params for all package IDs at build time
export function generateStaticParams() {
  return getAllPackages().map((pkg) => ({ id: pkg.slug }))
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = getPackageBySlug(id)
  if (pkg) {
    redirect(getPackagePath(pkg))
  }
  redirect("/packages")
}
