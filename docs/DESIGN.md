# fobs · for Stacks — Design System

**"Soft Editorial Fintech."** One light theme on a warm off-white canvas, a
single data-blue accent, and green/red reserved for real figures. Carried over
from the fobs (Solana) landing; the palette and the two product rules are
unchanged — only the copy speaks to Stacks, and the chain accents are retinted
to a Stacks/Bitcoin orange.

> **On Figma:** there is no separate Figma file. The design system is defined in
> code as the source of truth — tokens and semantic classes in
> `app/globals.css`, composed in `app/page.tsx` and the `components/`. The
> **clickable prototype is the design file** (`https://fobs-stacks.vercel.app`).
> This document is the human-readable spec of that system.

---

## 1. Principles

1. **Editorial, not dashboard.** Full-bleed, generous type, a large lowercase
   `fobs` wordmark. Reads like a page, not a control panel.
2. **Warm and light.** A single off-white canvas with hairline borders; no dark
   mode, no heavy chrome.
3. **Colour carries meaning.** Blue is *data-only*. Green/red appear *only* on
   real figures. Everything else is neutral.
4. **A missing figure is never a fake one.** A null price renders as an em dash
   (`—`), never `$0`.

## 2. Palette (tokens)

Defined as CSS custom properties in `app/globals.css`.

| Token | Value | Role |
| ----- | ----- | ---- |
| `--fobs-bg` | `#f4f3ef` | Warm off-white canvas |
| `--fobs-surface` | `#ffffff` | Cards / surfaces |
| `--fobs-surface-soft` | `#eeeee9` | Recessed surface (disclosure) |
| `--fobs-text` | `#111312` | Primary text |
| `--fobs-muted` | `#777872` | Secondary text |
| `--fobs-border` | `#e3e2dc` | Hairline borders |
| `--fobs-black` | `#080909` | **Primary button** |
| `--fobs-blue` | `#3175c6` | **Data accent only** |
| `--fobs-blue-soft` | `#dceafa` | Data-bar / soft blue fills |
| `--fobs-green` / `--fobs-green-soft` | `#23845b` / `#dceee5` | Positive **real** figures / "Live" pill |
| `--fobs-red` / `--fobs-red-soft` | `#c94c4c` / `#f5dcdc` | Negative **real** figures |
| `--fobs-purple` `--fobs-peach` `--fobs-yellow` `--fobs-mint` | soft tints | Decorative hero glows |

Stacks/Bitcoin orange (`#b4560f` eyebrow, `#fbe3cd` hero glow) retints the chain
status and eyebrow accents for the Stacks build.

### The two product rules (do not break)

- **Primary button is black** (`--fobs-black`), never blue. Blue is data-only.
- **Green/red only on real figures** — the 1D change column. A null is an em
  dash, never a coloured `$0`.

## 3. Radius scale

`--fobs-radius-sm 8px` · `md 12px` · `lg 18px` · `xl 24px`. Cards use `lg`;
the access panel uses `xl`; the floating hero product card uses `28px`.

## 4. Typography

- **Geist** (variable, `--font-sans`) for text; **GeistMono** (`--font-mono`)
  for every price, count and address. Both self-hosted via `next/font/local`.
- `tabular-nums` on all numeric data so figures align in columns.
- Hero: `52 → 82px`, weight 600, tight tracking (`-0.065em`), lowercase `fobs`.
- Eyebrows: `11px`, uppercase, wide tracking, orange.

## 5. Semantic classes (`app/globals.css`)

| Class | Use |
| ----- | --- |
| `.fobs-surface` | White card: surface bg + hairline border + `radius-lg`. |
| `.fobs-button-primary` | Black pill button, white text, hover `opacity .88`. |
| `.fobs-button-secondary` | White pill, hairline border, hover `#faf9f5`. |

Layout beyond these is Tailwind utilities composed inline.

## 6. Components

- **SiteNav** — top nav with a single primary action (`Get early access`).
- **HeroProduct** — a floating, slightly rotated product card (`rotate-[2deg]`)
  over a soft gradient blur; shows the live-prices board a visitor can read
  before signing up. A "Live" pill in soft green.
- **MarketsTable** — the board. Columns: Asset · Price · 1D · fobs buying.
  "fobs buying" is a blue data bar scaled to the busiest asset; 1D is the only
  green/red; nulls are em dashes.
- **WaitlistForm** — client form posting to `/api/waitlist`.
- **motion** (`Reveal`, `Stagger`, `StaggerItem`) — scroll-reveal and staggered
  entrance via `motion`; purely decorative, no layout dependence.

## 7. Motion

Sections reveal on scroll with a small staggered delay per section
(`delay 0.05 → 0.25`). Feature cards stagger in. Motion never blocks content —
it is progressive enhancement over a fully-rendered page.

## 8. Accessibility

- Single light theme with strong text contrast (`#111312` on `#f4f3ef`).
- Colour is never the *only* signal: the 1D sign is also a `+/-` prefix; a
  missing value is an explicit em dash.
- Mono + `tabular-nums` keep numeric columns legible and aligned.
- Self-hosted fonts with `display: swap` avoid invisible-text flashes.

## 9. Source of truth

- Tokens & classes: [`app/globals.css`](../app/globals.css)
- Composition: [`app/page.tsx`](../app/page.tsx), [`components/`](../components)
- Live prototype: `https://fobs-stacks.vercel.app`

## 10. Related documents

- [Product specification](./PRODUCT_SPEC.md)
- [Architecture](./ARCHITECTURE.md)
