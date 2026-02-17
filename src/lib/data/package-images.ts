export type PackageImageOverrides = {
  mainImage?: string
  gallery?: string[]
  itineraryImages?: Record<string, string>
}

type Manifest = {
  updatedAt: string
  packages: Record<string, PackageImageOverrides>
}

const EMPTY_MANIFEST: Manifest = { updatedAt: new Date(0).toISOString(), packages: {} }

const getManifestUrl = () => process.env.PACKAGE_IMAGES_MANIFEST_URL

export const fetchManifest = async (): Promise<Manifest> => {
  const manifestUrl = getManifestUrl()
  if (!manifestUrl) return EMPTY_MANIFEST

  try {
    const res = await fetch(manifestUrl, { next: { revalidate: 60 } })
    if (!res.ok) return EMPTY_MANIFEST
    const data = (await res.json()) as Manifest
    return {
      updatedAt: data.updatedAt || new Date().toISOString(),
      packages: data.packages || {},
    }
  } catch {
    return EMPTY_MANIFEST
  }
}

export const getPackageImageOverrides = async (
  category: string,
  slug: string,
): Promise<PackageImageOverrides> => {
  const manifest = await fetchManifest()
  const key = `${category}/${slug}`
  return manifest.packages?.[key] || {}
}
