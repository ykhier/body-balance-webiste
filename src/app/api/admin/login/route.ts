// src/app/api/admin/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { safeCompare, generateSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const adminUser = process.env.ADMIN_USERNAME ?? "";
    const adminPass = process.env.ADMIN_PASSWORD ?? "";

    const userMatch = safeCompare(username ?? "", adminUser);
    const passMatch = safeCompare(password ?? "", adminPass);

    if (!userMatch || !passMatch) {
      return NextResponse.json(
        { error: "שם משתמש או סיסמה שגויים" },
        { status: 401 }
      );
    }

    const token = generateSessionToken(adminUser);
    const isProd = process.env.NODE_ENV === "production";

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
