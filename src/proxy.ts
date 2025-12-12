import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  // Read encrypted cookie
  // Then return the custom JWT with the accessToken prop added by the NextAuth handler defined in app/api/auth/[...nextauth]/route.ts
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  // Redirect to the login page if the token isn't available
  if (!token) {
    const loginUrl = new URL("/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Only run on certain routes
export const config = {
  matcher: ["/file-editor/:path*", "/file-explorer/:path*", "/settings/:path*"],
}
