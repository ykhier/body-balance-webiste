// src/lib/auth.ts
// Server-side auth helpers (Node.js runtime only — NOT for middleware)
// For middleware, use src/lib/auth-edge.ts

import { timingSafeEqual, createHash } from "crypto";

export const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "change-me-in-production";

/** Timing-safe string comparison to prevent timing attacks */
export function safeCompare(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ba.length !== bb.length) {
      timingSafeEqual(ba, Buffer.alloc(ba.length));
      return false;
    }
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

/** Generate a deterministic session token from username + secret */
export function generateSessionToken(username: string): string {
  return createHash("sha256")
    .update(`${username}:${SESSION_SECRET}`)
    .digest("hex");
}

/** Verify a session token */
export function verifySessionToken(token: string): boolean {
  const username = process.env.ADMIN_USERNAME ?? "";
  const expected = generateSessionToken(username);
  return safeCompare(token, expected);
}

/** Read session cookie in Server Components / Route Handlers (Node.js runtime only) */
export async function getSessionFromCookies(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}