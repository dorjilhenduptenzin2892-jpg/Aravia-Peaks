"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

const packages = [
  // Cultural Festival Packages
  {
    id: "paro-tshechu",
    category: "festival",
    title: "Paro Tshechu Festival Tour",
    description: "Experience the most famous festival in Bhutan with spectacular masked dances and ceremonies",
    duration: "7 Days / 6 Nights",
    price: 2450,
    image: "/paro-tshechu-festival-bhutan-colorful-masks-dancin.jpg",
    highlights: ["Paro Tshechu Festival", "Tiger's Nest Trek", "Thimphu Sightseeing", "Cultural Immersion"],
    popular: true,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: "thimphu-tshechu",
    category: "festival",
    title: "Thimphu Tshechu Festival",
    description: "Witness Bhutan's largest festival in the capital city with grand celebrations",
    duration: "6 Days / 5 Nights",
    price: 2250,
    image: "/thimphu-tshechu-festival-dancers-masks.jpg",
    highlights: ["Thimphu Festival", "Buddha Dordenma", "Punakha Dzong", "Local Markets"],
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "punakha-drubchen",
    category: "festival",
    title: "Punakha Drubchen & Tshechu",
    description: "Two consecutive festivals featuring dramatic reenactments and sacred dances",
    duration: "8 Days / 7 Nights",
    price: 2650,
    image: "/punakha-dzong-festival-bhutan-fortress.jpg",
    highlights: ["Punakha Festival", "Chimi Lhakhang", "Valley Hikes", "Traditional Ceremonies"],
    rating: 4.9,
    reviews: 82,
  },
  {
    id: "jambay-lhakhang",
    category: "festival",
    title: "Jambay Lhakhang Festival",
    description: "Unique fire ceremony and naked dance in the mystical Bumthang valley",
    duration: "9 Days / 8 Nights",
    price: 2850,
    image: "/jambay-lhakhang-fire-ceremony-bhutan-temple.jpg",
    highlights: ["Fire Ceremony", "Bumthang Valley", "Ancient Temples", "Sacred Dances"],
    rating: 4.7,
    reviews: 64,
  },

  // Cultural Tour Packages
  {
    id: "cultural-heritage",
    category: "cultural",
    title: "Cultural Heritage Explorer",
    description: "Discover ancient dzongs, monasteries, and the iconic Tiger's Nest",
    duration: "5 Days / 4 Nights",
    price: 1850,
    image: "/tigers-nest-monastery-bhutan-cliff-mountain.jpg",
    highlights: ["Tiger's Nest", "Paro Dzong", "Thimphu Sightseeing", "Traditional Crafts"],
    popular: true,
    rating: 4.9,
    reviews: 215,
  },
  {
    id: "spiritual-journey",
    category: "cultural",
    title: "Spiritual Journey",
    description: "Meditate in ancient monasteries and connect with Buddhist wisdom",
    duration: "7 Days / 6 Nights",
    price: 2350,
    image: "/bhutan-monastery-meditation-monks-spiritual-peace.jpg",
    highlights: ["Monastery Stays", "Meditation Sessions", "Buddhist Teachings", "Sacred Sites"],
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "eastern-bhutan",
    category: "cultural",
    title: "Eastern Bhutan Discovery",
    description: "Explore the remote and less-visited eastern regions of Bhutan",
    duration: "10 Days / 9 Nights",
    price: 3200,
    image: "/eastern-bhutan-remote-villages-mountains.jpg",
    highlights: ["Trashigang", "Mongar", "Traditional Villages", "Handicraft Centers"],
    rating: 4.7,
    reviews: 73,
  },
  {
    id: "western-highlights",
    category: "cultural",
    title: "Western Bhutan Highlights",
    description: "Experience the best of Paro, Thimphu, and Punakha valleys",
    duration: "6 Days / 5 Nights",
    price: 2100,
    image: "/punakha-valley-bhutan-rice-fields-landscape.jpg",
    highlights: ["Dochula Pass", "Punakha Dzong", "Memorial Chorten", "Folk Museum"],
    rating: 4.8,
    reviews: 189,
  },

  // Trekking & Adventure Packages
  {
    id: "druk-path-trek",
    category: "trekking",
    title: "Druk Path Trek",
    description: "Classic trek from Paro to Thimphu through alpine meadows and lakes",
    duration: "8 Days / 7 Nights",
    price: 2750,
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
    highlights: ["Alpine Lakes", "Mountain Views", "Yak Herders", "Camping"],
    popular: true,
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "jomolhari-trek",
    category: "trekking",
    title: "Jomolhari Base Camp Trek",
    description: "Challenging trek to the base of sacred Mt. Jomolhari",
    duration: "11 Days / 10 Nights",
    price: 3600,
    image: "/mt-jomolhari-bhutan-snow-mountain-base-camp.jpg",
    highlights: ["Mt. Jomolhari", "Hot Springs", "Nomadic Camps", "High Passes"],
    rating: 4.8,
    reviews: 97,
  },
  {
    id: "snowman-trek",
    category: "trekking",
    title: "Snowman Trek",
    description: "One of the world's most difficult treks through remote Himalayan regions",
    duration: "25 Days / 24 Nights",
    price: 7850,
    image: "/bhutan-snowman-trek-extreme-himalayan-mountains-sn.jpg",
    highlights: ["11 High Passes", "Remote Valleys", "Extreme Adventure", "Yak Caravans"],
    rating: 4.9,
    reviews: 28,
  },
  {
    id: "dagala-thousand-lakes",
    category: "trekking",
    title: "Dagala Thousand Lakes Trek",
    description: "Moderate trek through pristine alpine landscape dotted with glacial lakes",
    duration: "9 Days / 8 Nights",
    price: 2950,
    image: "/bhutan-alpine-glacial-lakes-mountains-pristine-wil.jpg",
    highlights: ["Alpine Lakes", "Rhododendrons", "Wildlife Spotting", "Mountain Panoramas"],
    rating: 4.7,
    reviews: 86,
  },

  // Luxury Experiences
  {
    id: "luxury-bhutan",
    category: "luxury",
    title: "Luxury Bhutan Experience",
    description: "Indulge in Bhutan's finest hotels, cuisine, and exclusive experiences",
    duration: "7 Days / 6 Nights",
    price: 4950,
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
    highlights: ["5-Star Resorts", "Private Tours", "Gourmet Dining", "Spa Treatments"],
    rating: 5.0,
    reviews: 94,
  },
  {
    id: "luxury-wellness",
    category: "luxury",
    title: "Wellness & Rejuvenation Retreat",
    description: "Holistic wellness journey with hot stone baths and spa treatments",
    duration: "6 Days / 5 Nights",
    price: 3850,
    image: "/bhutan-wellness-spa-hot-stone-bath-meditation-retr.jpg",
    highlights: ["Hot Stone Baths", "Yoga Sessions", "Meditation", "Organic Cuisine"],
    rating: 4.9,
    reviews: 67,
  },

  // Special Interest
  {
    id: "photography-tour",
    category: "special",
    title: "Photography Expedition",
    description: "Capture Bhutan's stunning landscapes and vibrant culture with expert guidance",
    duration: "8 Days / 7 Nights",
    price: 3150,
    image: "/bhutan-photography-landscape-monks-temples-colorfu.jpg",
    highlights: ["Golden Hour Shoots", "Festival Photography", "Landscape Focus", "Pro Tips"],
    rating: 4.8,
    reviews: 79,
  },
  {
    id: "birdwatching",
    category: "special",
    title: "Birdwatching Paradise",
    description: "Spot rare Himalayan birds in pristine forests and valleys",
    duration: "9 Days / 8 Nights",
    price: 2950,
    image: "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
    highlights: ["680+ Bird Species", "Expert Guides", "Endemic Species", "Nature Walks"],
    rating: 4.7,
    reviews: 52,
  },
]

export default function PackagesPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative py-16 md:py-24 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/package-20bg.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance text-white">
                {t("explore_packages_title")}
              </h1>
              <p className="text-lg text-white/90 text-balance">{t("explore_packages_description")}</p>
            </div>
          </div>
        </section>

        {/* Packages Grid with Tabs */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-2xl grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="all">{t("all_tours")}</TabsTrigger>
                  <TabsTrigger value="festival">{t("festivals")}</TabsTrigger>
                  <TabsTrigger value="cultural">{t("cultural")}</TabsTrigger>
                  <TabsTrigger value="trekking">{t("trekking")}</TabsTrigger>
                  <TabsTrigger value="luxury">{t("luxury")}</TabsTrigger>
                  <TabsTrigger value="special">{t("special")}</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <PackageGrid packages={packages} />
              </TabsContent>

              <TabsContent value="festival" className="mt-0">
                <PackageGrid packages={packages.filter((p) => p.category === "festival")} />
              </TabsContent>

              <TabsContent value="cultural" className="mt-0">
                <PackageGrid packages={packages.filter((p) => p.category === "cultural")} />
              </TabsContent>

              <TabsContent value="trekking" className="mt-0">
                <PackageGrid packages={packages.filter((p) => p.category === "trekking")} />
              </TabsContent>

              <TabsContent value="luxury" className="mt-0">
                <PackageGrid packages={packages.filter((p) => p.category === "luxury")} />
              </TabsContent>

              <TabsContent value="special" className="mt-0">
                <PackageGrid packages={packages.filter((p) => p.category === "special")} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              {t("cant_find_package")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">{t("custom_package_description")}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/inquiry">{t("request_custom_package")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function PackageGrid({ packages }: { packages: typeof packages }) {
  const { t } = useLanguage()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-start max-w-7xl mx-auto">
      {packages.map((pkg) => (
        <Link key={pkg.id} href={`/packages/${pkg.id}`} className="block w-full max-w-md">
          <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all h-full">
            <div className="relative h-64 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${pkg.image}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                {pkg.popular && <Badge className="bg-accent text-accent-foreground">{t("popular")}</Badge>}
                <Badge variant="secondary" className="ml-auto bg-white/90 text-foreground">
                  {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                </Badge>
              </div>

              {/* Rating */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 text-foreground px-2 py-1 rounded-md text-sm">
                <span>⭐</span>
                <span className="font-semibold">{pkg.rating}</span>
                <span className="text-muted-foreground">({pkg.reviews})</span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{pkg.duration}</span>
                </div>
              </div>

              <h3 className="font-semibold text-xl mb-2 group-hover:text-[#623c2b] transition-colors">{pkg.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

              {/* Highlights */}
              <div className="mb-4 flex flex-wrap gap-2">
                {pkg.highlights.slice(0, 3).map((highlight, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
                {pkg.highlights.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{pkg.highlights.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t">
                <p className="text-sm text-center text-muted-foreground">
                  Contact our licensed travel agent partners for pricing and bookings
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  {t("view_details")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
