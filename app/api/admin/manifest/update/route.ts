import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

type Manifest = {
  updatedAt: string
  packages: Record<string, {
    mainImage?: string
    gallery?: string[]
    itineraryImages?: Record<string, string>
  }>
}

const getManifestUrl = () => process.env.PACKAGE_IMAGES_MANIFEST_URL

const readManifest = async (): Promise<Manifest> => {
  const manifestUrl = getManifestUrl()
  if (!manifestUrl) {
    return { updatedAt: new Date().toISOString(), packages: {} }
  }

  try {
    const res = await fetch(manifestUrl, { cache: "no-store" })
    if (!res.ok) throw new Error("Missing manifest")
    const data = (await res.json()) as Manifest
    return {
      updatedAt: data.updatedAt || new Date().toISOString(),
      packages: data.packages || {},
    }
  } catch {
    return { updatedAt: new Date().toISOString(), packages: {} }
  }
}

export async function POST(request: Request) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value ?? null
  const authenticated = await isValidSession(token)
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Missing blob token" }, { status: 500 })
  }

  const body = (await request.json()) as {
    packageKey: string
    mainImage?: string | null
    gallery?: string[] | null
    itineraryDayImageSet?: { day: number; url: string } | null
    itineraryDayImageRemove?: { day: number } | null
  }

  if (!body.packageKey) {
    return NextResponse.json({ error: "Missing package key" }, { status: 400 })
  }

  const manifest = await readManifest()
  const entry = manifest.packages[body.packageKey] ?? {}

  if (body.mainImage !== undefined) {
    if (body.mainImage === null) {
      delete entry.mainImage
    } else {
      entry.mainImage = body.mainImage
    }
  }

  if (body.gallery !== undefined) {
    if (body.gallery === null) {
      delete entry.gallery
    } else {
      entry.gallery = body.gallery
    }
  }

  if (body.itineraryDayImageSet) {
    entry.itineraryImages = entry.itineraryImages || {}
    entry.itineraryImages[String(body.itineraryDayImageSet.day)] = body.itineraryDayImageSet.url
  }

  if (body.itineraryDayImageRemove) {
    if (entry.itineraryImages) {
      delete entry.itineraryImages[String(body.itineraryDayImageRemove.day)]
      if (!Object.keys(entry.itineraryImages).length) {
        delete entry.itineraryImages
      }
    }
  }

  const hasValues = entry.mainImage || entry.gallery?.length || entry.itineraryImages
  if (hasValues) {
    manifest.packages[body.packageKey] = entry
  } else {
    delete manifest.packages[body.packageKey]
  }

  manifest.updatedAt = new Date().toISOString()

  const manifestUrl = getManifestUrl()
  const manifestPath = manifestUrl ? new URL(manifestUrl).pathname.slice(1) : "package-images/manifest.json"

  const blob = await put(manifestPath, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return NextResponse.json({ entry: manifest.packages[body.packageKey] || {}, url: blob.url })
}
