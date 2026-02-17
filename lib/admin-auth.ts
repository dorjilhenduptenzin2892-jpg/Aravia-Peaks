import type { NextRequest } from "next/server"
import { createHash } from "node:crypto"

export const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_USER = "admin"
const ADMIN_PASS = "Ghost006*"

export const getAdminCredentials = () => {
  return {
    username: ADMIN_USER,
    password: ADMIN_PASS,
  }
}

const hashValue = (value: string) => {
  return createHash("sha256").update(value).digest("hex")
}

export const createSessionToken = async () => {
  const { username, password } = getAdminCredentials()
  return hashValue(`${username}:${password}`)
}

export const isValidSession = async (token?: string | null) => {
  if (!token) return false
  const expected = await createSessionToken()
  return token === expected
}

export const getSessionFromRequest = (request: NextRequest) => {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? null
}
