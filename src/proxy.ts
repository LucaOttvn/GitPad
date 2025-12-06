import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedRoutes = ["/file-editor", "/file-explorer"]

export async function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (!isProtected) return NextResponse.next()

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  if (!token) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
