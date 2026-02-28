// src/app/api/admin/logout/route.ts

import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
// Clears the session cookie to log out the admin user
// possible to use it in the future
export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
