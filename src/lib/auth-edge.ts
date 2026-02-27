// src/lib/auth-edge.ts
// Edge Runtime compatible auth — uses Web Crypto API only (no Node.js crypto)
// Used by middleware.ts

export const SESSION_COOKIE = "admin_session";

async function generateTokenEdge(username: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${username}:${secret}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifySessionTokenEdge(token: string): Promise<boolean> {
  if (!token) return false;
  const username = process.env.ADMIN_USERNAME ?? "";
  const secret = process.env.SESSION_SECRET ?? "change-me-in-production";
  const expected = await generateTokenEdge(username, secret);
  // constant-time comparison
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) {
    diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function isAuthenticatedEdge(req: Request): Promise<boolean> {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  const token = match?.[1];
  if (!token) return false;
  return verifySessionTokenEdge(decodeURIComponent(token));
}
