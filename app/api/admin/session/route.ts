import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

const getCookie = (request: Request, name: string) => {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(";").map((part) => part.trim())
  const target = cookies.find((item) => item.startsWith(`${name}=`))
  if (!target) return null
  return decodeURIComponent(target.slice(name.length + 1))
}

export async function GET(request: Request) {
  const token = getCookie(request, ADMIN_SESSION_COOKIE)
  const authenticated = await isValidSession(token)
  return NextResponse.json({ authenticated })
}
