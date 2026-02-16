import type React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Playfair_Display, Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { defaultLocale, locales } from "@/i18n/config"
import { LanguageProvider } from "@/lib/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { StickyCTA } from "@/components/sticky-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
  description:
    "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
  keywords:
    "Bhutan tours, Bhutan travel, cultural festivals, Paro Tshechu, Thimphu festival, Bhutan packages, trekking Bhutan, authentic Bhutan, luxury Bhutan, Bhutan Aravia Peaks",
  metadataBase: new URL("https://aravia-peaks.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      es: "/es",
      fr: "/fr",
      de: "/de",
      zh: "/zh",
    },
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
    description:
      "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
    description:
      "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
  },
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const localeCookie = cookies().get("NEXT_LOCALE")?.value
  const locale = locales.includes(localeCookie as (typeof locales)[number]) ? localeCookie : defaultLocale
  const messages = (await import(`../messages/${locale}.json`)).default

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>
            <ScrollToTop />
            <div id="main-content">{children}</div>
            <StickyCTA />
            <WhatsAppFloat />
          </LanguageProvider>
        </NextIntlClientProvider>

      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.addEventListener('load', () => {
        // remove v0 "Built with" links
        document
          .querySelectorAll('a[href*="v0.app"]')
          .forEach(el => el.remove());

        // remove any v0 iframe/widget
        document
          .querySelectorAll('iframe[src*="v0.app"], div[data-v0], div[class*="v0"]')
          .forEach(el => el.remove());

        // remove any floating close (X) button
        document.querySelectorAll('div').forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' && Number(style.zIndex) > 999) {
            el.remove();
          }
        });
      });
    `,
        }}
      />
      </body>
    </html>
  )

}
