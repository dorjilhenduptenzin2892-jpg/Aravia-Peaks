"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { ImageLoader } from "@/components/media/image-loader"

export function GallerySlider({ images, title }: { images: string[]; title: string }) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="rounded-2xl"
    >
      {images.map((image, index) => (
        <SwiperSlide key={`${image}-${index}`}>
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <ImageLoader
              src={image}
              alt={`${title} gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={index < 3 ? "eager" : "lazy"}
              priority={index < 3}
              fetchPriority={index < 3 ? "high" : "auto"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
