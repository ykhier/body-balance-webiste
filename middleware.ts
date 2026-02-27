// middleware.ts — protect /admin and /api/admin/* routes
// Must only import Edge Runtime compatible modules

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedEdge } from "@/lib/auth-edge";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = await isAuthenticatedEdge(req);

  // If already logged in and visiting login page → redirect to dashboard
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    if (isAuthenticated && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin and /api/admin/* routes
  if (!isAuthenticated) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

