import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("jwt")?.value;

  const isProtectedPath = ["/chat", "/profile"].some((path) =>
    pathname.startsWith(path)
  );

  const isAuthPath = pathname.startsWith("/auth");

  // Case 1: Unauthenticated user trying to access protected route
  if (isProtectedPath && !jwt) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Case 2: Authenticated user trying to access /auth
  if (isAuthPath && jwt) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/chat", "/profile", "/auth"],
};
