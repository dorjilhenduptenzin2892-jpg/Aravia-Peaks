"use client"

import { useState } from "react"
import Image from "next/image"
import type { TourPackage } from "@/lib/data/packages"
import type { PackageImageOverrides } from "@/src/lib/data/package-images"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  packageKey: string
  pkg: TourPackage
  initialOverrides: PackageImageOverrides
}

type ManifestPayload = {
  packageKey: string
  mainImage?: string | null
  gallery?: string[] | null
  itineraryDayImageSet?: { day: number; url: string } | null
  itineraryDayImageRemove?: { day: number } | null
}

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as { error?: string }
    return data.error || "Request failed"
  } catch {
    return "Request failed"
  }
}

export function AdminPackageEditorClient({ packageKey, pkg, initialOverrides }: Props) {
  const [heroOverride, setHeroOverride] = useState<string | null>(initialOverrides.mainImage ?? null)
  const [galleryOverrides, setGalleryOverrides] = useState<string[]>(initialOverrides.gallery ?? [])
  const [itineraryOverrides, setItineraryOverrides] = useState<Record<string, string>>(
    initialOverrides.itineraryImages ?? {},
  )
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("packageKey", packageKey)

    const res = await fetch("/api/admin/blob-upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error(await parseError(res))
    }

    const data = (await res.json()) as { url: string }
    return data.url
  }

  const updateManifest = async (payload: ManifestPayload) => {
    const res = await fetch("/api/admin/manifest/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error(await parseError(res))
    }
  }

  const handleHeroUpload = async (file: File) => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const url = await uploadFile(file)
      await updateManifest({ packageKey, mainImage: url })
      setHeroOverride(url)
      setMessage("Hero image updated.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  const handleHeroRemove = async () => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      await updateManifest({ packageKey, mainImage: null })
      setHeroOverride(null)
      setMessage("Hero override removed.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setBusy(false)
    }
  }

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const uploads = await Promise.all(Array.from(files).map((file) => uploadFile(file)))
      const next = [...galleryOverrides, ...uploads]
      await updateManifest({ packageKey, gallery: next })
      setGalleryOverrides(next)
      setMessage("Gallery images updated.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  const handleGalleryRemove = async (index: number) => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const next = galleryOverrides.filter((_, idx) => idx !== index)
      await updateManifest({ packageKey, gallery: next.length ? next : null })
      setGalleryOverrides(next)
      setMessage("Gallery updated.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setBusy(false)
    }
  }

  const handleGalleryClear = async () => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      await updateManifest({ packageKey, gallery: null })
      setGalleryOverrides([])
      setMessage("Gallery overrides cleared.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setBusy(false)
    }
  }

  const handleItineraryUpload = async (day: number, file: File) => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const url = await uploadFile(file)
      await updateManifest({ packageKey, itineraryDayImageSet: { day, url } })
      setItineraryOverrides((prev) => ({ ...prev, [String(day)]: url }))
      setMessage(`Day ${day} image updated.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setBusy(false)
    }
  }

  const handleItineraryRemove = async (day: number) => {
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      await updateManifest({ packageKey, itineraryDayImageRemove: { day } })
      setItineraryOverrides((prev) => {
        const next = { ...prev }
        delete next[String(day)]
        return next
      })
      setMessage(`Day ${day} override removed.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hero image override</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Current display</p>
              <div className="relative h-48 w-full overflow-hidden rounded-xl border">
                <Image src={heroOverride || pkg.heroImage} alt={pkg.title} fill className="object-cover" />
              </div>
              {heroOverride ? <Badge>Override active</Badge> : <Badge variant="secondary">Default</Badge>}
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold">Original hero</p>
              <div className="relative h-48 w-full overflow-hidden rounded-xl border">
                <Image src={pkg.heroImage} alt={`${pkg.title} default`} fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="hero-upload">Upload a new hero image</Label>
            <Input
              id="hero-upload"
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={async (event) => {
                const file = event.target.files?.[0]
                if (file) {
                  await handleHeroUpload(file)
                }
                event.currentTarget.value = ""
              }}
            />
            <Button type="button" variant="outline" onClick={handleHeroRemove} disabled={busy || !heroOverride}>
              Remove hero override
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery overrides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {galleryOverrides.length ? (
              galleryOverrides.map((src, index) => (
                <div key={src} className="space-y-2">
                  <div className="relative h-36 w-full overflow-hidden rounded-xl border">
                    <Image src={src} alt={`Gallery override ${index + 1}`} fill className="object-cover" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={busy}
                    onClick={() => handleGalleryRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No gallery overrides yet.</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="gallery-upload">Add gallery images</Label>
            <Input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              disabled={busy}
              onChange={async (event) => {
                await handleGalleryUpload(event.target.files)
                event.currentTarget.value = ""
              }}
            />
            <Button type="button" variant="outline" onClick={handleGalleryClear} disabled={busy || !galleryOverrides.length}>
              Clear gallery overrides
            </Button>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Original gallery</p>
            <div className="grid gap-4 md:grid-cols-3">
              {pkg.gallery.map((src) => (
                <div key={src} className="relative h-28 w-full overflow-hidden rounded-xl border">
                  <Image src={src} alt={`${pkg.title} gallery`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Itinerary day images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {pkg.itinerary.map((item) => {
              const override = itineraryOverrides[String(item.day)]
              return (
                <div key={item.day} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">Day {item.day}</p>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                    </div>
                    {override ? <Badge>Override active</Badge> : <Badge variant="secondary">Default</Badge>}
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-[160px_1fr]">
                    <div className="relative h-28 w-full overflow-hidden rounded-xl border">
                      <Image src={override || pkg.heroImage} alt={`Day ${item.day} preview`} fill className="object-cover" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor={`itinerary-${item.day}`}>Upload day image</Label>
                      <Input
                        id={`itinerary-${item.day}`}
                        type="file"
                        accept="image/*"
                        disabled={busy}
                        onChange={async (event) => {
                          const file = event.target.files?.[0]
                          if (file) {
                            await handleItineraryUpload(item.day, file)
                          }
                          event.currentTarget.value = ""
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={busy || !override}
                        onClick={() => handleItineraryRemove(item.day)}
                      >
                        Remove override
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {(message || error) && (
        <div className="rounded-xl border px-4 py-3 text-sm">
          {message ? <p className="text-emerald-600">{message}</p> : null}
          {error ? <p className="text-destructive">{error}</p> : null}
        </div>
      )}
    </div>
  )
}
