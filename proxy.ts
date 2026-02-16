import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, locales } from "@/i18n/config"

const PUBLIC_FILE = /\.[^/]+$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  const [empty, locale, ...rest] = pathname.split("/")
  const isLocale = locales.includes(locale as (typeof locales)[number])

  if (isLocale) {
    const response = NextResponse.rewrite(new URL(`/${rest.join("/")}`, request.url))
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  const response = NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  response.cookies.set("NEXT_LOCALE", defaultLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
  return response
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
