import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Check for Better Auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect customer account / cart / order routes
  if (
    (pathname.startsWith("/account") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/order")) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/cart/:path*", "/order/:path*"],
};
