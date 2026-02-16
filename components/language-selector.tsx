"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import { locales } from "@/i18n/config"

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const stripLocale = (path: string) => {
    const segments = path.split("/")
    const currentLocale = segments[1]
    if (locales.includes(currentLocale as (typeof locales)[number])) {
      return `/${segments.slice(2).join("/")}`.replace(/\/$/, "") || "/"
    }
    return path
  }

  const handleLocaleChange = (lang: (typeof languages)[number]) => {
    setLanguage(lang)
    const basePath = stripLocale(pathname)
    router.push(`/${lang.code}${basePath}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-3 py-2 h-9 rounded-none hover:bg-accent/10">
          <span className="text-base">🌍</span>
          <span className="text-sm font-medium">{language.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
            {language.code === lang.code && <span className="text-lg">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
