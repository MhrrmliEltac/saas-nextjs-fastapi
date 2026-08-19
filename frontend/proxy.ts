import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE_NAME = "access_token";
const AUTH_PATHS = ["/login", "/register"];
const DASHBOARD_PATH = "/dashboard";

export function proxy(request: NextRequest) {
  const isAuthenticated = Boolean(request.cookies.get(ACCESS_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && pathname.startsWith(DASHBOARD_PATH)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
