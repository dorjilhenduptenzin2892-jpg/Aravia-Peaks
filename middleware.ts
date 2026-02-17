import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, locales } from "@/i18n/config"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

const PUBLIC_FILE = /\.[^/]+$/

const isAdminPath = (pathname: string) => pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isAdminPath(pathname)) {
    if (
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/api/admin/login") ||
      pathname.startsWith("/api/admin/session") ||
      pathname.startsWith("/api/admin/logout")
    ) {
      return NextResponse.next()
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? null
    const isValid = await isValidSession(token)

    if (!isValid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  const [, locale, ...rest] = pathname.split("/")
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
  matcher: ["/((?!_next|.*\\..*).*)", "/api/admin/:path*"],
}
