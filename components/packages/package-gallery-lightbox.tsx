"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PackageGalleryLightbox({ images, title }: { images: string[]; title: string }) {
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images])
  const gallery = safeImages.length ? safeImages : ["/images/package-bg.webp"]
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openAt = (index: number) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % gallery.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            onClick={() => openAt(index)}
          >
            <Image
              src={image}
              alt={`${title} gallery ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative aspect-[16/9] bg-black">
            <Image
              src={gallery[activeIndex]}
              alt={`${title} preview ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <Button variant="outline" onClick={goPrev}>
              Previous
            </Button>
            <div className="text-xs text-muted-foreground">
              {activeIndex + 1} / {gallery.length}
            </div>
            <Button variant="outline" onClick={goNext}>
              Next
            </Button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex gap-2 overflow-x-auto">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-thumb-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-16 w-24 overflow-hidden rounded-lg border",
                    index === activeIndex ? "border-primary" : "border-border/60",
                  )}
                >
                  <Image src={image} alt="Thumbnail" fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
