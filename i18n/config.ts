export const locales = ["en", "es", "fr", "de", "zh"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeLabels: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  zh: { name: "中文", flag: "🇨🇳" },
}
