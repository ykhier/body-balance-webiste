# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build      # production build
npm run lint       # ESLint via next lint
npx prisma studio  # open DB GUI
npx prisma migrate dev --name <name>  # create and apply a migration
npx prisma generate                   # regenerate Prisma client after schema change
```

No test suite exists yet.

## Architecture

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma 7 + Neon (serverless PostgreSQL) · Nodemailer

### Two separate runtimes — this is critical

| File | Runtime | Why |
|---|---|---|
| `src/lib/auth.ts` | Node.js | Uses `node:crypto` — for Route Handlers and Server Components only |
| `src/lib/auth-edge.ts` | Edge | Uses `crypto.subtle` (Web Crypto) — for `middleware.ts` only |

Never import `auth.ts` from `middleware.ts` — it will crash at runtime.

### Page structure

`src/app/page.tsx` assembles all landing-page sections in order:
`Hero → About → TargetAudience → Services → NutritionCalculator → Payment → Contact`

Navigation links live in `src/components/ui/NavLink.tsx` (`NAV_LINKS` array) — update this whenever a new section with an `id` is added.

### Scroll reveal system

Any element with `data-reveal` starts invisible and fades in when it enters the viewport. `ScrollAnimations.tsx` drives this via `IntersectionObserver`. Attributes:

- `data-delay="120"` — ms delay before reveal
- `data-from="left|right|scale"` — directional variant
- `data-stagger` — staggers direct children automatically

Wrap new section content in `<div data-reveal>` to participate.

### Design system conventions

- **Primary color `rose-*`** is actually **green** (`rose-500 = #4E8B6E`). This is intentional — the Tailwind config overrides the default rose palette.
- Layout: `section-padding` + `section-container` (defined in `globals.css` `@layer components`) — use these on every new section.
- Cards: `bg-white dark:bg-gray-800 rounded-3xl shadow-card p-6`
- Primary button: `bg-gradient-to-l from-rose-500 to-rose-400 text-white font-bold rounded-full`
- The entire site is **RTL Hebrew** (`dir="rtl"` on `<html>`). Use `dir="ltr"` only on elements that must render left-to-right (e.g., numeric gauges, fill bars).

### Admin panel

Route: `/admin` (protected by `middleware.ts`). Credentials come from `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars. Session is an httpOnly cookie (`admin_session`) containing a SHA-256 token derived from username + `SESSION_SECRET`.

The `Client` model in `schema.prisma` exists for a future clients-management tab — the UI tab placeholder is already in `src/app/admin/page.tsx`.

### Contact flow

Form → `POST /api/contact` → validates → saves `ContactSubmission` to DB → sends email via Nodemailer (Gmail SMTP, best-effort — email failure does not fail the request) → admin reads submissions at `/admin`.

### Environment variables required

```
DATABASE_URL        # Neon pooled connection string
DIRECT_URL          # Neon direct connection (for migrations only)
ADMIN_USERNAME
ADMIN_PASSWORD
SESSION_SECRET
CONTACT_TO_EMAIL    # recipient of contact form emails
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
```
