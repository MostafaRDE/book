import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = pathname === "/fa" || pathname.startsWith("/fa/") ? "fa" : "en"

  const response = NextResponse.next()
  response.headers.set("x-locale", locale)
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
