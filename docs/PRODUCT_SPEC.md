# fobs · for Stacks — Product Specification

> **The social market for Stacks.** See what your friends are trading, and take
> the same position — as a real swap your own wallet signs, settled on Bitcoin.

**Status:** private preview (early-access waitlist open)
**This repo:** the marketing landing page + waitlist. The trading app itself
lives elsewhere; this document specifies the product the landing page describes.

---

## 1. Summary

fobs turns trading into a social feed. You follow people, watch the trades they
*actually* make land in real time, and take your own position in the same asset
with one tap. Every symbol is a real asset that already trades on **Stacks** —
from Bitcoin-backed `sBTC` to the native `STX` token to the SIP-010 tokens
people actually hold.

The single most important property of fobs is what it **cannot** do: it cannot
hold your funds, and it cannot sign for you. fobs is a **bridge, not an
issuer** — it mints nothing, burns nothing, and holds no key. It routes you into
markets that already exist and wraps them in a social layer.

## 2. Problem

Trading is social in practice but private in tooling. People discover assets
through friends, group chats and screenshots, then act on that signal on a
disconnected exchange where nobody can see the position they took. Two gaps:

1. **Discovery is anecdotal.** "What are you buying?" happens in DMs, detached
   from the actual on-chain trade, easy to fake, impossible to verify.
2. **Custodial social-trading is dangerous.** Copy-trading products that hold
   keys or pool funds concentrate risk and custody in exactly the place a
   permissionless market shouldn't.

## 3. What fobs is

A **view over real on-chain activity** with a social graph on top. A trade is a
real swap your own wallet signs on a Stacks DEX; the confirmed transaction —
anchored to Bitcoin — becomes a row in a feed. Following someone means their
confirmed swaps appear in your feed, live.

### Non-goals

- **Not custodial.** fobs never holds funds or keys.
- **Not an issuer.** fobs deploys no token contract of its own.
- **Not copy-trading.** FOMO pre-fills an asset and *suggests* a size; you
  choose your own size and your own wallet signs your own swap.
- **Not an oracle.** Prices are read from Stacks (a DEX route or a reference
  price), never invented; an unknown price renders as an em dash, never `$0`.

## 4. Core concepts

| Concept       | Definition |
| ------------- | ---------- |
| **Asset**     | A real Stacks asset — `sBTC`, `STX`, or a SIP-010 token (ALEX, VELAR, DIKO, USDA, WELSH, aeUSDC, …). fobs issues none. |
| **Trade**     | A swap on a Stacks DEX (ALEX, Velar), settled on Bitcoin. Keyed by its Stacks transaction id. |
| **Feed**      | The stream of confirmed trades from people you follow. |
| **FOMO**      | Taking your own position in an asset someone you follow just traded — your size, your signature, linked back to the original trade. |
| **fobs buying** | A social signal: how many distinct people have traded a given asset. |

## 5. The core loop

```
  see someone you follow trade
              │
              ▼
        FOMO their trade  ──▶  your own on-chain swap, your size, your signature
              ▲                          │
              └──── appears in their feed ┘
```

1. **Someone trades.** Their Stacks wallet signs a swap into a real token. fobs
   routes it and never signs.
2. **It is recorded.** The confirmed swap becomes a feed row, keyed to its
   Stacks transaction id and anchored to Bitcoin. No custody.
3. **You see it.** If you follow them it appears in your feed, and you get a
   notification, live.
4. **You FOMO it.** Not a copy. Your own swap, your own size, your own
   signature — linked back to the original.

## 6. Who signs, and what's real

| Piece        | State |
| ------------ | ----- |
| **Assets**   | Real Stacks assets — `sBTC`, `STX`, SIP-010 tokens. fobs issues none. |
| **A trade**  | A swap on a Stacks DEX (ALEX, Velar), settled on Bitcoin. |
| **The key**  | Yours. The server builds and forwards the transaction; it never holds one. |
| **Prices**   | Read live off Stacks — a DEX route or a reference price. |
| **Holdings** | Real balances, read from your wallet's own token accounts. |

## 7. Landing page scope (this repository)

The landing page is the marketing surface plus a working early-access waitlist.

### 7.1 Sections

- **Hero** — lowercase `fobs`, the pitch, primary/secondary CTAs, and a live
  stat row (markets, trades indexed, prices live, settlement = Bitcoin).
- **Feature row** — real on-chain data · follow your friends · FOMO.
- **Live markets** — a preview board of tracked Stacks assets. Values are
  **illustrative sample data** (`lib/data.ts`); the production app reads them
  live.
- **How it works** — the four-step loop above.
- **Disclosure** — plain statement that fobs issues nothing, holds no key, and
  the figures shown are illustrative.
- **Early access** — the waitlist form.

### 7.2 Markets board columns

- **Asset** — symbol + name.
- **Price** — USD reference price; a null renders as an em dash, never `$0`.
- **1D** — close-to-close change; the only green/red on the board; null → em dash.
- **fobs buying** — distinct traders, drawn as a blue data bar scaled to the
  busiest asset.

## 8. Early-access waitlist

The `#access` form is real. It POSTs `{ email }` to `/api/waitlist`, which
inserts a unique, lower-cased email into a Neon Postgres `waitlist` table.

- **Idempotent:** a repeat sign-up is a friendly no-op (`ON CONFLICT (email) DO
  NOTHING`) — the person still gets a success state, we just don't store them
  twice.
- **Parameterised by construction:** queries use the tagged-template `sql`
  client, so values are never string-interpolated.
- **Zero-migration:** the table is created on demand (`CREATE TABLE IF NOT
  EXISTS`), so a fresh database needs no migration step.
- **Minimal capture:** email, a coarse `source`, and Vercel's edge country
  header for triage — nothing that identifies a person beyond the email given.

### Validation & limits

- Conservative email shape check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), max 254 chars.
- Email normalised to trimmed lower-case before insert.
- Non-JSON body → `400`; DB unreachable → `500` with a retry-friendly message.

## 9. Trust & safety

- fobs never takes custody and never signs — the security model is that there is
  no key to steal from fobs.
- On-chain assets carry real risk; the product is explicit that fobs is a medium
  into existing markets, not a guarantor of any asset.
- Figures on the marketing page are labelled illustrative so no one trades on
  sample data.

## 10. Success metrics (product, post-launch)

- Waitlist sign-ups → activated wallets connected.
- Follows created per active user (social graph density).
- FOMO conversion: feed impressions → signed swaps.
- Share of trades that originate from a followed person's feed row.

## 11. Related documents

- [Architecture](./ARCHITECTURE.md)
- [Design system](./DESIGN.md)
- [README](../README.md)
