import type { MetadataRoute } from "next"
import { packages, packageCategories } from "@/lib/data/packages"
import { locales } from "@/i18n/config"

const baseUrl = "https://aravia-peaks.vercel.app"

const staticRoutes = [
  "/",
  "/about",
  "/packages",
  "/festivals",
  "/travel-guide",
  "/bhutan/farmhouses-homestays",
  "/contact",
  "/inquiry",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  const categoryRoutes = packageCategories.map((category) => `/packages/${category.slug}`)
  const packageRoutes = packages.map((pkg) => `/packages/${pkg.category}/${pkg.slug}`)

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...packageRoutes]

  allRoutes.forEach((route) => {
    locales.forEach((locale) => {
      urls.push({
        url: `${baseUrl}/${locale}${route === "/" ? "" : route}`,
        lastModified: new Date(),
      })
    })
  })

  return urls
}
