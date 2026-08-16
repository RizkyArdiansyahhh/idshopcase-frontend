import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Handle and strip any /en or /id prefix from URL
  const localeMatch = pathname.match(/^\/(en|id)(\/.*)?$/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const cleanPath = localeMatch[2] || "/";
    const redirectUrl = new URL(`${cleanPath}${search}`, request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 31536000 });
    response.cookies.set("locale", locale, { path: "/", maxAge: 31536000 });
    return response;
  }

  // Check for Better Auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|images|models).*)",
  ],
};
