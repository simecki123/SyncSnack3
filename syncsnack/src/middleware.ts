import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the user is on the root path
  if (pathname === "/" || pathname === "/en" || pathname === "/hr") {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For all other routes, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match root, login, and internationalized pathnames
  matcher: [
    "/",
    "/login",
    "/register",
    "/setprofile",
    "/group-events",
    "/orders",
    "/forgot-password",
    "/(hr|en)/:path*",
  ],
};
