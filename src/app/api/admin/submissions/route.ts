// src/app/api/admin/submissions/route.ts
// GET (list+filter), PATCH (toggle read), DELETE

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// ── GET /api/admin/submissions ──────────────────────────────────────────────
// Query params:
//   tab=unread|read        (default: unread)
//   month=YYYY-MM          (optional)
//   from=ISO               (optional)
//   to=ISO                 (optional)
//   q=search string        (optional, searches name/email/phone)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const tab = searchParams.get("tab") ?? "unread";
    const month = searchParams.get("month");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const q = searchParams.get("q")?.trim();

    const where: Prisma.ContactSubmissionWhereInput = {
      read: tab === "read",
    };

    // Date range filter
    if (month) {
      const [year, mon] = month.split("-").map(Number);
      where.createdAt = {
        gte: new Date(year, mon - 1, 1),
        lt: new Date(year, mon, 1),
      };
    } else if (from || to) {
      where.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      };
    }

    // Search filter
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
      ];
    }

    const [items, unreadCount, readCount] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.contactSubmission.count({ where: { read: true } }),
    ]);

    return NextResponse.json({ items, unreadCount, readCount });
  } catch (err) {
    console.error("[submissions GET]", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}

// ── PATCH /api/admin/submissions ────────────────────────────────────────────
// Body: { id: number, read: boolean }
export async function PATCH(req: NextRequest) {
  try {
    const { id, read } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updated = await prisma.contactSubmission.update({
      where: { id: Number(id) },
      data: {
        read: Boolean(read),
        handledAt: read ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    console.error("[submissions PATCH]", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}

// ── DELETE /api/admin/submissions ───────────────────────────────────────────
// Body: { id: number }
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.contactSubmission.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[submissions DELETE]", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
