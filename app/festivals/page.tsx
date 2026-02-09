"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const festivalSchedule2026 = [
  { festival: "Lhamoi Dromche", location: "Trongsa", date: "Feb 23-25" },
  { festival: "Punakha Drupchen", location: "Punakha", date: "Feb 22-25" },
  { festival: "Punakha Tshechu", location: "Punakha", date: "Feb 26-28" },
  { festival: "Tharpaling Thongdrol", location: "Chumi, Bumthang", date: "Mar 3" },
  { festival: "Tangsibi Mani", location: "Ura, Bumthang", date: "Mar 4-6" },
  { festival: "Bhutan International Marathon", location: "Annual Event", date: "Mar 5" },
  { festival: "Gomphukora", location: "Trashigang", date: "Mar 26-28" },
  { festival: "Talo Tshechu", location: "Talo, Punakha", date: "Mar 26-28" },
  { festival: "Gasa Tshechu", location: "Gasa", date: "Mar 26-28" },
  { festival: "Zhemgang Tshechu", location: "Zhemgang", date: "Mar 26-28" },
  { festival: "Paro Tshechu", location: "Paro", date: "Mar 28-April 1", popular: true },
  { festival: "Chhorten Kora", location: "Trashiyangtse", date: "Mar 28" },
  { festival: "Haa Spring Festival", location: "Haa Valley", date: "April 7-9" },
  { festival: "Rhododendron Festival", location: "Lampelri Botanical Garden, Dochula", date: "April 17-19" },
  { festival: "Domkhar Tshechu", location: "Chumi, Bumthang", date: "April 18-20" },
  { festival: "Ura Yakchoe", location: "Ura, Bumthang", date: "April 20-24" },
  { festival: "Nimalung Tshechu", location: "Chumi, Bumthang", date: "June 14-16" },
  { festival: "Kurjey Tshechu", location: "Choekor, Bumthang", date: "June 16" },
  { festival: "Mushroom Festival", location: "Genekha, Thimphu", date: "Aug 15-16" },
  { festival: "Matsutaki Mushroom Festival", location: "Ura, Bumthang", date: "Aug 23-24" },
  { festival: "Tour of the Dragon - Bicycle Race", location: "Bumthang-Thimphu", date: "Sept 5" },
  { festival: "Thimphu Drupchen", location: "Thimphu", date: "Sep 9" },
  { festival: "Paro Dromche", location: "Paro", date: "Sep 11" },
  { festival: "Wangdue Tshechu", location: "Wangduephodrang", date: "Sep 11-13" },
  { festival: "Thimphu Tshechu", location: "Thimphu", date: "Sep 13-15", popular: true },
  { festival: "Tamshing Phala Choepa", location: "Tamshing, Bumthang", date: "Sep 13-15" },
  { festival: "Gangtey Tshechu", location: "Gangtey, Phobjikha Valley", date: "Sep 16-18" },
  { festival: "Thangbi Mani", location: "Choekor, Bumthang", date: "Sep 17-19" },
  { festival: "Jhomolhari Mountain Festival", location: "Dangochang (Jhomolhari Base Camp)", date: "Oct 14-15" },
  { festival: "Royal Highland Festival", location: "TBA", date: "Oct 23-24" },
  { festival: "Chukha Tshechu", location: "Chukha", date: "Nov 11-13" },
  { festival: "Jakar Tshechu", location: "Choekor, Bumthang", date: "Nov 8-12" },
  { festival: "Jambay Lhakhang Drup", location: "Choekor, Bumthang", date: "Nov 15-18", popular: true },
  { festival: "Prakhar Duchhoed", location: "Chumi, Bumthang", date: "Nov 16-18" },
  { festival: "Dechenphu Tshechu", location: "Thimphu", date: "Nov 11" },
  { festival: "Black Necked Crane Festival", location: "Phobjikha Valley", date: "Nov 11", popular: true },
  { festival: "Goenpi Dromche", location: "Trongsa", date: "Nov 6-8" },
  { festival: "Mongar Tshechu", location: "Mongar", date: "Nov 9-11" },
  { festival: "Trashigang Tshechu", location: "Trashigang", date: "Nov 9-11" },
  { festival: "Jambay Lhakhang Singye Cham", location: "Bumthang", date: "Nov 15" },
  { festival: "Pemagatshel Tshechu", location: "Pema Gatshel", date: "Nov 9-11" },
  { festival: "Nalakhar Tshechu", location: "Bumthang", date: "Nov 15-17" },
  { festival: "Druk Wangyel Tshechu", location: "Dochula", date: "Dec 13" },
  { festival: "Trongsa Tshechu", location: "Trongsa", date: "Dec 9-12 (Dec 8 Chamjur)" },
  { festival: "Lhuentse Tshechu", location: "Lhuentse", date: "Dec 8-10" },
]

const festivals = [
  {
    id: "paro-tshechu",
    name: "Paro Tshechu",
    month: "March-April",
    dates: "Dates vary (Lunar Calendar)",
    location: "Paro Dzong",
    description:
      "The most famous festival in Bhutan, featuring spectacular masked dances, the unfurling of the giant thongdrel, and thousands of pilgrims from across the kingdom.",
    highlights: [
      "Sacred mask dances",
      "Giant thongdrel unveiling",
      "Atsara (clowns) performances",
      "Traditional music",
    ],
    duration: "5 days",
    image: "/paro-tshechu-festival-bhutan-colorful-masks.jpg",
    packageLink: "/packages/paro-tshechu",
    popular: true,
  },
  {
    id: "thimphu-tshechu",
    name: "Thimphu Tshechu",
    month: "September-October",
    dates: "Dates vary (Lunar Calendar)",
    location: "Tashichho Dzong, Thimphu",
    description:
      "Bhutan's largest festival held in the capital, attracting massive crowds to witness sacred dances and receive blessings in the presence of the royal family.",
    highlights: [
      "Largest festival gathering",
      "Royal family attendance",
      "Spectacular costumes",
      "Religious ceremonies",
    ],
    duration: "3 days",
    image: "/thimphu-tshechu-festival-dancers-masks.jpg",
    packageLink: "/packages/thimphu-tshechu",
    popular: true,
  },
  {
    id: "punakha-drubchen",
    name: "Punakha Drubchen & Tshechu",
    month: "February-March",
    dates: "Dates vary (Lunar Calendar)",
    location: "Punakha Dzong",
    description:
      "Unique festival featuring dramatic reenactments of historic battles, followed by traditional tshechu dances in one of Bhutan's most beautiful dzongs.",
    highlights: ["Battle reenactments", "Warrior dances", "Punakha Dzong setting", "Spring blooms"],
    duration: "4 days",
    image: "/punakha-dzong-festival-bhutan.jpg",
    packageLink: "/packages/punakha-drubchen",
  },
  {
    id: "jambay-lhakhang",
    name: "Jambay Lhakhang Drup",
    month: "October-November",
    dates: "Dates vary (Lunar Calendar)",
    location: "Jambay Lhakhang, Bumthang",
    description:
      "One of the most unique festivals featuring the sacred fire ceremony and midnight naked dance, performed to bless infertile women.",
    highlights: ["Fire ceremony", "Midnight naked dance", "Ancient temple setting", "Spiritual blessings"],
    duration: "3 days",
    image: "/jambay-lhakhang-fire-ceremony-bhutan.jpg",
    packageLink: "/packages/jambay-lhakhang",
  },
  {
    id: "black-necked-crane",
    name: "Black-Necked Crane Festival",
    month: "November",
    dates: "November 11",
    location: "Phobjikha Valley",
    description:
      "Celebrates the arrival of endangered black-necked cranes to Phobjikha Valley with cultural performances, conservation awareness, and nature walks.",
    highlights: ["Crane spotting", "Environmental awareness", "Folk dances", "Valley exploration"],
    duration: "1 day",
    image: "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
    packageLink: "/packages",
  },
  {
    id: "wangdue-tshechu",
    name: "Wangdue Phodrang Tshechu",
    month: "September-October",
    dates: "Dates vary (Lunar Calendar)",
    location: "Wangdue Phodrang",
    description:
      "Traditional festival featuring the famous Raksha Mangcham (Ox Dance) and other sacred mask dances unique to this region.",
    highlights: ["Ox Dance", "Regional traditions", "Mountain views", "Local culture"],
    duration: "3 days",
    image: "/wangdue-phodrang-tshechu-festival-ox-dance-bhutan.jpg",
    packageLink: "/packages",
  },
  {
    id: "haa-summer",
    name: "Haa Summer Festival",
    month: "July",
    dates: "Mid-July",
    location: "Haa Valley",
    description:
      "Celebrates the nomadic herders of Haa Valley with yak rides, traditional games, local cuisine, and stunning alpine scenery.",
    highlights: ["Yak culture", "Traditional sports", "Local cuisine", "Alpine setting"],
    duration: "2 days",
    image: "/haa-valley-summer-festival-yak-nomadic-herders.jpg",
    packageLink: "/packages",
  },
  {
    id: "royal-highlander",
    name: "Royal Highlander Festival",
    month: "October",
    dates: "Mid-October",
    location: "Laya, Gasa",
    description:
      "Remote highland festival celebrating the unique culture of the highland communities, featuring yak shows and traditional customs.",
    highlights: ["Highland culture", "Yak competitions", "Remote location", "Unique traditions"],
    duration: "2 days",
    image: "/royal-highlander-festival-laya-highland-culture.jpg",
    packageLink: "/packages",
  },
]

export default function FestivalsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-paro-taktsang-monastery-tiger-nest-mountain.jpg"
              alt="Bhutan festivals"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary text-primary-foreground shadow-sm">{t("festivals_badge")}</Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance text-white">
                {t("festivals_title")}
              </h1>
              <p className="text-lg text-white/90 text-balance">{t("festivals_description")}</p>
            </div>
          </div>
        </section>

        {/* Bhutanese Festival Schedule */}
        <section className="py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl font-bold mb-2">Bhutanese Festival Schedule 2026</h2>
                <p className="text-muted-foreground">Complete list of festivals happening throughout the year</p>
              </div>

              <Card className="card-premium glass-card border border-border/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold bg-muted">
                            Festival
                          </th>
                          <th className="text-left py-3 px-4 font-semibold bg-muted">
                            Location
                          </th>
                          <th className="text-left py-3 px-4 font-semibold bg-muted">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {festivalSchedule2026.map((item, index) => (
                          <tr
                            key={index}
                            className={`border-b border-border/60 hover:bg-muted/40 transition-colors ${
                              item.popular ? "bg-muted/30" : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{item.festival}</span>
                                {item.popular && (
                                  <Badge className="text-xs bg-primary text-primary-foreground border-0">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{item.location}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-muted/40 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Note:</strong> You may choose the festival of your interest
                      from the above list and contact us. We will provide more detailed information on your choice of
                      festivals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Festivals */}
        <section className="relative py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-2xl font-bold mb-4">{t("festivals_what_are")}</h2>
              <p className="text-muted-foreground">{t("festivals_explanation")}</p>
            </div>
          </div>
        </section>

        {/* Featured Festivals Grid */}
        <section className="py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold mb-2">Featured Festivals</h2>
              <p className="text-muted-foreground">Experience the most celebrated festivals in Bhutan</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {festivals.map((festival) => (
                <Card
                  key={festival.id}
                  className="card-premium glass-card overflow-hidden group transition-all duration-300 border border-border/60"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={festival.image}
                      alt={festival.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {festival.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground border-0 shadow-sm">
                          {t("festivals_most_popular")}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold text-xl text-white mb-1">{festival.name}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span>📅</span>
                        <span>{festival.month}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{festival.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏰</span>
                        <span>{festival.duration}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{festival.description}</p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2">{t("festivals_highlights")}</p>
                      <div className="flex flex-wrap gap-1">
                        {festival.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button className="w-full btn-premium hover-glow" asChild>
                        <Link href={festival.packageLink}>{t("festivals_view_package")}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="relative py-16 md:py-24 section-tint">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-center mb-8">
                {t("festivals_important_notes_title")}
              </h2>
              <div className="space-y-4">
                <Card className="card-premium border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 bg-card">
                    <h3 className="font-semibold text-lg mb-2">{t("festivals_dates_vary")}</h3>
                    <p className="text-sm text-muted-foreground">{t("festivals_dates_vary_description")}</p>
                  </CardContent>
                </Card>

                <Card className="card-premium border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 bg-card">
                    <h3 className="font-semibold text-lg mb-2">{t("festivals_book_early")}</h3>
                    <p className="text-sm text-muted-foreground">{t("festivals_book_early_description")}</p>
                  </CardContent>
                </Card>

                <Card className="card-premium border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 bg-card">
                    <h3 className="font-semibold text-lg mb-2">{t("festivals_what_to_wear")}</h3>
                    <p className="text-sm text-muted-foreground">{t("festivals_what_to_wear_description")}</p>
                  </CardContent>
                </Card>

                <Card className="card-premium border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 bg-card">
                    <h3 className="font-semibold text-lg mb-2">
                      {t("festivals_photography_etiquette")}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t("festivals_photography_etiquette_description")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-festival-masked-dancers-colorful-costumes-c.jpg"
              alt="Bhutan festival"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">{t("festivals_cta_title")}</h2>
              <p className="text-lg text-white/90 mb-8">{t("festivals_cta_description")}</p>
              <Button size="lg" className="btn-premium hover-glow" asChild>
                <Link href="/inquiry">{t("festivals_cta_button")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
