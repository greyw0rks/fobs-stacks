# fobs · for Stacks — Architecture

Scope: the **landing page + early-access waitlist** in this repository. Where the
production trading app is referenced, it is called out explicitly as *out of
scope for this repo*.

---

## 1. At a glance

```
                      ┌─────────────────────────────────────────┐
   Browser  ───────▶  │  Next.js 15 App Router  (Vercel)         │
                      │                                          │
                      │  app/page.tsx        static-rendered     │
                      │   ├─ SiteNav                             │
                      │   ├─ HeroProduct     ← lib/data.ts       │
                      │   ├─ MarketsTable    ← lib/data.ts       │
                      │   └─ WaitlistForm ──┐  (client)          │
                      │                     │                    │
                      │  app/api/waitlist  ◀┘  route.ts          │
                      │   (Node serverless, force-dynamic)       │
                      └───────────────┬──────────────────────────┘
                                      │  @neondatabase/serverless (HTTP)
                                      ▼
                              ┌───────────────┐
                              │  Neon Postgres │  waitlist table
                              └───────────────┘
```

The page renders with **no backend** — the markets board and hero read from
`lib/data.ts` (illustrative sample data). The only server dependency is the
waitlist endpoint, which talks to Neon over HTTP.

## 2. Stack

| Layer        | Choice | Why |
| ------------ | ------ | --- |
| Framework    | Next.js 15 (App Router), React 19 | Static marketing + a single serverless route in one deploy. |
| Hosting      | Vercel | Zero-config Next.js, edge country header, per-route serverless functions. |
| Database     | Neon Postgres via `@neondatabase/serverless` | Speaks HTTP, so it works from a serverless function with no pooled TCP connection. |
| Styling      | Tailwind CSS (utilities) + hand-authored tokens in `app/globals.css` | Utilities for layout, CSS custom properties for the design system. |
| Motion       | `motion` | Scroll-reveal / stagger only; no layout dependence. |
| Fonts        | Self-hosted Geist + GeistMono (`next/font/local`) | No third-party font request; mono for every price/count. |

## 3. Rendering model

- The landing page (`app/page.tsx`) is a **server component** that reads sample
  data at module scope and renders statically. No data fetching on request.
- `components/fobs/motion.tsx` (`Reveal`, `Stagger`, `StaggerItem`) and
  `components/waitlist-form.tsx` are the only **client** components — motion and
  the form need browser APIs.
- The waitlist route is `runtime = "nodejs"` and `dynamic = "force-dynamic"`, so
  it is never statically evaluated and always runs per request.

## 4. Data flow

### 4.1 Read path (markets board) — no backend

`lib/data.ts` exports `SAMPLE_ASSETS: AssetSummary[]` and `SAMPLE_CHANGES`.
These are **real Stacks assets** with **illustrative figures**. The types
(`lib/types.ts`) encode the important product rule: `price` is `number | null`,
and a null price is rendered as an em dash by `lib/format.ts` — never `$0`.

> In production this module is replaced by a live read from a Stacks indexer
> (prices from a DEX route on ALEX/Velar or a reference price; real trade and
> holder counts). The landing page's contract with the app is the `AssetSummary`
> shape, not the sample values.

### 4.2 Write path (waitlist)

```
WaitlistForm (client)
   │  POST { email, source } as JSON
   ▼
app/api/waitlist/route.ts  (Node serverless)
   │  1. parse JSON body            → 400 on non-JSON
   │  2. validate email shape+len   → 400 on invalid
   │  3. normalise: trim + lowercase
   │  4. ensureTable() once per lambda (CREATE TABLE IF NOT EXISTS)
   │  5. INSERT ... ON CONFLICT (email) DO NOTHING RETURNING id
   ▼
Neon Postgres
```

Response: `{ ok: true, created: boolean }` — `created` distinguishes a first
sign-up from an idempotent repeat. Failures return `500` with a retry-friendly
message and log server-side.

## 5. Data model

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT,
  country    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- `email` carries the uniqueness constraint that makes sign-up idempotent.
- `source` is a coarse, capped (≤64 char) origin tag, defaulting to `"landing"`.
- `country` is Vercel's `x-vercel-ip-country` edge header, for triage only.
- Created on demand by the route and by `scripts/init-db.mjs` (`pnpm db:init`).

## 6. The Neon client (`lib/db.ts`)

- A single `db()` accessor returns a `neon(url)` tagged-template client.
- `DATABASE_URL` is read **lazily inside the getter**, so importing the module
  never throws at build time on an environment that hasn't set it yet — a build
  on Vercel without the secret still succeeds; only a request without it fails.
- The tagged template sends parameters out-of-band, so every query is
  parameterised by construction — no string interpolation reaches SQL.

## 7. Security posture

- **No custody, no key.** This is a product invariant, but also an architectural
  one: this repo holds no wallet key material and signs nothing. The trading
  app builds and forwards transactions the user's own wallet signs.
- **SQL injection:** prevented by construction via the tagged-template client.
- **Input validation:** email shape + length checked before touching the DB;
  body must be JSON.
- **PII minimisation:** only email + coarse source + country are stored.
- **No connection pooling to leak:** Neon-over-HTTP means each serverless
  invocation is stateless; the `ensureTable` promise is memoised per warm lambda
  and reset on failure so a cold retry re-attempts.
- **Rate limiting** is *not* implemented at the app layer — it is delegated to
  the platform edge today and is a known follow-up before general availability.

## 8. Environments & config

| Variable       | Purpose |
| -------------- | ------- |
| `DATABASE_URL` | Neon connection string. Set in Vercel project env and in `.env.local` for local dev. Absent → the waitlist route returns 500; the rest of the page still renders. |

Deploy target: Vercel project `fobs-stacks`, production alias
`https://fobs-stacks.vercel.app`. Local dev: `pnpm dev` on
`http://localhost:3000`.

## 9. Repository layout

```
app/
  layout.tsx              root layout, self-hosted fonts, metadata
  page.tsx                the landing page (server component)
  globals.css             design tokens + component classes
  icon.svg                favicon (Stacks/Bitcoin orange retint)
  api/waitlist/route.ts   POST waitlist endpoint (Node serverless)
  fonts/                  Geist.woff2, GeistMono.woff2
components/
  SiteNav.tsx             top navigation
  waitlist-form.tsx       client form → /api/waitlist
  fobs/
    markets-table.tsx     the markets board
    motion.tsx            Reveal / Stagger scroll animations
lib/
  data.ts                 SAMPLE_ASSETS, SAMPLE_CHANGES (illustrative)
  types.ts                AssetSummary
  db.ts                   Neon client accessor
  format.ts               price() — null → em dash
scripts/
  init-db.mjs             pnpm db:init — create the waitlist table
docs/                     this documentation set
```

## 10. Build & verification

```bash
pnpm install
pnpm typecheck   # tsc --noEmit
pnpm build       # next build
pnpm db:init     # optional: create the waitlist table up front
```

## 11. Known limitations / next steps

- No app-layer rate limiting on the waitlist route yet.
- No double opt-in / email confirmation send (the success state is UI-only).
- Markets board is sample data by design; the live indexer read lives in the
  (separate) trading app.

## 12. Related documents

- [Product specification](./PRODUCT_SPEC.md)
- [Design system](./DESIGN.md)
- [README](../README.md)
