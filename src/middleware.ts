import { NextResponse, type NextRequest } from "next/server";
import { activeTenantCodes } from "@/config/tenants";

const validTenants = new Set(activeTenantCodes);

const PUBLIC_PREFIXES = [
  "/_next",
  "/favicon.ico",
  "/tenants",
  "/api",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];
  if (!validTenants.has(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
