"use client"

import { useEffect, useState } from "react"
import { getPackageImages } from "@/src/utils/getPackageImages"
import { GallerySlider } from "@/components/packages/gallery-slider"

const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"]

const normalizeList = (list: string[]) => {
  const clean = list.filter(Boolean).map((item) => (item.startsWith("/") ? item : `/${item}`))
  return Array.from(
    new Set(
      clean.filter((item) => {
        const ext = item.split("?")[0]?.split(".").pop()?.toLowerCase()
        return !ext || allowedExtensions.includes(ext)
      }),
    ),
  )
}

export function PackageGallery({
  slug,
  title,
  fallbackImages = [],
}: {
  slug: string
  title: string
  fallbackImages?: string[]
}) {
  const [images, setImages] = useState<string[]>(() => normalizeList(fallbackImages))

  // Load and resolve package images from both /public and /public/images sources.
  useEffect(() => {
    let isMounted = true
    getPackageImages(slug).then((list) => {
      "use client"

      import Image from "next/image"
      import { useEffect, useMemo, useState } from "react"
      import { Swiper, SwiperSlide } from "swiper/react"
      import { FreeMode, Keyboard, Navigation, Thumbs } from "swiper/modules"
      import "swiper/css"
      import "swiper/css/free-mode"
      import "swiper/css/navigation"
      import "swiper/css/thumbs"
      import { getPackageImages } from "@/src/utils/getPackageImages"
      import { DEFAULT_IMAGE_FALLBACK, resolveImageList } from "@/src/utils/imageResolver"

      type GalleryImage = {
        src: string
        key: string
      }

      const blurPlaceholder =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjMGMxYjMzIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjZjhmYWZmIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjMyMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=="

      const toGalleryImages = (list: string[]): GalleryImage[] =>
        list.map((src, index) => ({ src, key: `${src}-${index}` }))

      export function PackageGallery({
        slug,
        title,
        fallbackImages = [],
      }: {
        slug: string
        title: string
        fallbackImages?: string[]
      }) {
        const [images, setImages] = useState<GalleryImage[]>([])
        const [isLoading, setIsLoading] = useState(true)
        const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
        const [activeIndex, setActiveIndex] = useState(0)
        const [isZoomOpen, setIsZoomOpen] = useState(false)

        useEffect(() => {
          let isMounted = true
          setIsLoading(true)

          getPackageImages(slug)
            .then(async (list) => {
              const merged = Array.from(new Set([...(list || []), ...fallbackImages]))
              const resolved = await resolveImageList(merged, DEFAULT_IMAGE_FALLBACK)
              if (!isMounted) return
              setImages(toGalleryImages(resolved))
            })
            .finally(() => {
              if (isMounted) setIsLoading(false)
            })

          return () => {
            isMounted = false
          }
        }, [slug, fallbackImages])

        useEffect(() => {
          if (!isZoomOpen) return
          const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsZoomOpen(false)
          }
          window.addEventListener("keydown", onKey)
          return () => window.removeEventListener("keydown", onKey)
        }, [isZoomOpen])

        const activeImage = images[activeIndex]?.src ?? DEFAULT_IMAGE_FALLBACK

        // Skeleton layout to avoid layout shift while images resolve.
        const skeleton = useMemo(
          () => (
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden rounded-2xl bg-muted/40 aspect-[16/9] animate-pulse" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-20 w-24 rounded-xl bg-muted/40 animate-pulse"
                  />
                ))}
              </div>
            </div>
          ),
          [],
        )

        if (isLoading) return skeleton

        if (!images.length) {
          return (
            <div className="rounded-xl border border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
              Gallery images will be updated soon.
            </div>
          )
        }

        return (
          <div className="space-y-4">
            {/* Main hero slider */}
            <Swiper
              modules={[Navigation, Thumbs, Keyboard]}
              navigation
              keyboard={{ enabled: true }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              speed={500}
              className="rounded-2xl overflow-hidden bg-muted/20"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIndex(index)
                      setIsZoomOpen(true)
                    }}
                    className="relative w-full overflow-hidden rounded-2xl aspect-[16/9]"
                  >
                    <Image
                      src={image.src}
                      alt={`${title} image ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail strip */}
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              freeMode
              slidesPerView={4}
              spaceBetween={12}
              watchSlidesProgress
              breakpoints={{
                640: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
              }}
              className="rounded-2xl"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-${image.key}`}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative w-full overflow-hidden rounded-xl border transition-all ${
                      index === activeIndex ? "border-primary shadow-lg" : "border-border/50 opacity-70"
                    }`}
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={`${title} thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 30vw, 15vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={blurPlaceholder}
                        loading="lazy"
                      />
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Zoom modal */}
            {isZoomOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                role="dialog"
                aria-modal="true"
                onClick={() => setIsZoomOpen(false)}
              >
                <div className="relative max-w-5xl w-full" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    className="absolute -top-12 right-0 text-white text-sm"
                    onClick={() => setIsZoomOpen(false)}
                  >
                    Close
                  </button>
                  <div className="relative w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src={activeImage}
                      alt={`${title} zoomed image`}
                      width={1600}
                      height={1000}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }
