<div align="center">

# fobs · for Stacks

### The social market for Stacks.

**See what your friends are trading. Take the same position — as a real swap your own wallet signs, settled on Bitcoin.**

</div>

---

fobs turns trading into a feed. Follow people, watch the trades they actually
make land in real time, and take your own position in the same asset with one
tap. Every symbol is a real asset that already trades on **Stacks** — from
Bitcoin-backed `sBTC` to the SIP-010 tokens people actually hold.

This repository is the **landing page** for the Stacks build: the marketing
surface, a live markets preview, and a working **early-access waitlist** backed
by Neon Postgres. The trading app itself lives elsewhere.

**fobs is a bridge, not an issuer.** It mints nothing, burns nothing, and holds
no key. It routes you into markets that already exist and wraps them in a social
layer. The single most important thing about fobs is what it *cannot* do: it
cannot hold your funds, and it cannot sign for you.

## Why Stacks

Stacks settles to Bitcoin. A trade here is a swap your own wallet signs on a
Stacks DEX, and the confirmed transaction is anchored to the Bitcoin chain — so
the social feed is a view over activity with Bitcoin-grade finality underneath
it, not a ledger fobs controls.

## The loop

```text
  see someone you follow trade
              │
              ▼
        FOMO their trade  ──▶  your own on-chain swap, your size, your signature
              ▲                          │
              └──── appears in their feed ┘
```

FOMO is **not** copy-trading. It pre-fills the asset and suggests an amount; you
choose the size and your own wallet signs your own swap, linked back to the
original.

## What's real, and who signs

| Piece        | State                                                                      |
| ------------ | -------------------------------------------------------------------------- |
| **Assets**   | Real Stacks assets — `sBTC`, `STX`, and SIP-010 tokens. fobs issues none.  |
| **A trade**  | A swap on a Stacks DEX (ALEX, Velar), settled on Bitcoin.                  |
| **The key**  | Yours. The server builds and forwards the transaction; it never holds one. |
| **Prices**   | Read live off Stacks — a DEX route or a reference price.                    |
| **Holdings** | Real balances, read from your wallet's own token accounts.                 |

> The markets board on the landing page shows **illustrative sample data**
> (`lib/data.ts`) so the page renders with no backend. The production app reads
> the figures above live.

## The early-access waitlist

The `#access` section is a real form. It POSTs to `/api/waitlist`, which inserts
a unique, lower-cased email into a Neon Postgres table:

```sql
CREATE TABLE waitlist (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT,
  country    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- Talks to Neon over HTTP via `@neondatabase/serverless`, so it runs on a Vercel
  serverless function with no pooled connection.
- Queries are parameterised by construction (tagged-template `sql`).
- A repeat sign-up is idempotent (`ON CONFLICT (email) DO NOTHING`) — the person
  still gets a confirmation, we just don't store them twice.
- The table is created on demand, so a fresh database needs no migration.

## Run it locally

```bash
pnpm install
cp .env.example .env.local        # set DATABASE_URL to your Neon connection string
pnpm db:init                      # optional: create the waitlist table up front
pnpm dev                          # http://localhost:3000
```

`pnpm build` · `pnpm typecheck` · `pnpm db:init`

## Design

The "Soft Editorial Fintech" system carried over from fobs on Solana:

- Warm off-white canvas `#f4f3ef`, hairline `#e3e2dc` borders, lowercase `fobs`.
- The **primary button is black**; **blue `#3175c6` is data-only**.
- **Green/red only on real figures** (the 1D column); a null renders as an em
  dash, never `$0`.
- The chain status pill and tab icon are retinted to a Stacks/Bitcoin orange.

## Built with

Next.js (App Router) and React 19, deployed on Vercel · `motion` for the scroll
reveals · Neon Postgres via `@neondatabase/serverless` for the waitlist ·
self-hosted Geist + GeistMono · Tailwind CSS for utilities, hand-authored tokens
in `app/globals.css`.

## Disclosure

fobs issues none of these tokens and deploys no contract of its own. On-chain
assets carry real risk. fobs is a medium into existing markets on Stacks — the
trading, the issuance, and the custody all live where the tokens already do.
Never send funds anywhere expecting fobs to hold them.
