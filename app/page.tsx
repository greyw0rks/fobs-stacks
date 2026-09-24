import { SiteNav } from "@/components/SiteNav";
import { MarketsTable } from "@/components/fobs/markets-table";
import { Reveal, Stagger, StaggerItem } from "@/components/fobs/motion";
import { WaitlistForm } from "@/components/waitlist-form";
import { SAMPLE_ASSETS, SAMPLE_CHANGES } from "@/lib/data";
import { price } from "@/lib/format";

/**
 * fobs for Stacks — the landing page.
 *
 * A social market built around people and FOMO: see what your friends trade
 * and jump in alongside them. This is an invite-only landing page —
 * editorial, full-bleed, on the warm canvas: a large lowercase-"fobs" hero, a
 * floating product card, a feature row, a markets sample, and a plain
 * disclosure.
 *
 * Nothing here is committed yet. The tickers and figures are placeholder sample
 * data (see lib/data.ts) for the sample UI — not a live read, and not a claim
 * about what fobs will list.
 */
export default function LandingPage() {
  const assets = SAMPLE_ASSETS;

  return (
    <main id="top" className="min-h-screen bg-[#f4f3ef] text-[#111312]">
      <SiteNav action={{ href: "#access", label: "Get early access" }} />

      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute right-[4%] top-[-40px] h-[520px] w-[520px] rounded-full bg-[#fbe3cd] blur-3xl" />
          <div className="pointer-events-none absolute right-[12%] top-[140px] h-[340px] w-[340px] rounded-full bg-[#dfeafa] blur-3xl" />

          <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pt-24">
            <div className="max-w-[620px]">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b4560f]">
                Social market · by invite
              </p>

              <h1 className="text-[52px] font-semibold leading-[0.96] tracking-[-0.065em] sm:text-[68px] lg:text-[82px]">
                Trade what
                <br />
                your friends trade.
              </h1>

              <p className="mt-7 max-w-[500px] text-base leading-7 text-[#6e6f69] sm:text-lg">
                A social market built around people and FOMO — see what your
                friends are trading and jump in alongside them. What we build is
                still being decided.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#access" className="fobs-button-primary px-6 py-3">
                  Get early access →
                </a>
                <a href="#markets" className="fobs-button-secondary px-6 py-3">
                  Explore markets
                </a>
              </div>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-[#8b8c85]">Waitlist</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Open</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-[#8b8c85]">Access</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-[-0.04em]">By invite</dd>
                </div>
              </dl>
            </div>

            <HeroProduct assets={assets} />
          </div>
        </section>
      </Reveal>

      {/* Feature row */}
      <Reveal delay={0.05}>
        <section className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
          <Stagger className="grid gap-3 sm:grid-cols-3">
            {[
              ["Transparency first", "Built to read data on-chain rather than invent it."],
              ["Follow your friends", "See what the people you follow are into."],
              ["FOMO", "Jump into a trade at your own size, on your terms."]
            ].map(([title, text]) => (
              <StaggerItem key={title} className="rounded-[18px] border border-[#e3e2dc] bg-white p-6">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#777872]">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* Markets sample */}
      <Reveal delay={0.1}>
        <section id="markets" className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
          <div className="mb-5 max-w-[620px]">
            <h2 className="text-xl font-semibold tracking-[-0.04em]">Markets</h2>
            <p className="mt-2 text-sm leading-6 text-[#6e6f69]">
              A sample of the interface. The assets, data, and mechanics shown
              here aren't final — nothing on this page is a commitment.
            </p>
          </div>

          <MarketsTable
            assets={assets}
            changes={SAMPLE_CHANGES}
            title="Sample UI — not final"
            subtitle="Sample data"
          />
        </section>
      </Reveal>

      {/* How it works */}
      <Reveal delay={0.15}>
        <section id="how" className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
          <div className="mb-6 max-w-[620px]">
            <h2 className="text-xl font-semibold tracking-[-0.04em]">The idea</h2>
            <p className="mt-2 text-sm leading-6 text-[#6e6f69]">
              How we picture it working. The specifics will firm up as we build —
              treat this as direction, not a promise.
            </p>
          </div>

          <ol className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Someone trades", "A person you follow makes a trade."],
              ["It is recorded", "The trade becomes a row in the feed."],
              ["You see it", "If you follow them, it shows up in your feed."],
              ["You FOMO it", "Jump in with your own trade, at your own size."]
            ].map(([title, text], i) => (
              <li key={title} className="rounded-[18px] border border-[#e3e2dc] bg-white p-5">
                <span className="text-[11px] font-semibold tabular-nums text-[#3175c6]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#777872]">{text}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* Disclosure */}
      <Reveal delay={0.2}>
        <section id="disclosure" className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
          <div className="rounded-[18px] border border-[#e3e2dc] bg-[#eeeee9] p-6 text-sm leading-6 text-[#5c5d57]">
            <strong className="text-[#111312]">fobs is not live yet.</strong>{" "}
            Everything on this page — the assets, the data, and how it works —
            is illustrative and still being decided. Nothing here is an offer or
            a commitment, and nothing on it should be traded on.
          </div>
        </section>
      </Reveal>

      {/* Early access */}
      <Reveal delay={0.25}>
        <section id="access" className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
          <div className="overflow-hidden rounded-[24px] border border-[#e3e2dc] bg-white p-8 sm:p-12">
            <div className="max-w-[560px]">
              <h2 className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Get early access.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#6e6f69]">
                fobs is invite-only for now. Leave your email and we'll send you
                an invite.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[#e3e2dc]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-8 text-xs text-[#777872] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span className="max-w-[560px]">
            fobs — a social market, by invite. More to come.
          </span>
          <nav className="flex flex-wrap gap-5">
            <a href="#markets" className="hover:text-[#111312]">Markets</a>
            <a href="#how" className="hover:text-[#111312]">How it works</a>
            <a href="#disclosure" className="hover:text-[#111312]">Disclosure</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/**
 * A floating product card — the market board a visitor can read before they
 * have an account, framed as the app's own surface hovering inside the soft
 * environment.
 */
function HeroProduct({ assets }: { assets: typeof SAMPLE_ASSETS }) {
  const rows = assets.slice(0, 5);
  return (
    <div className="relative min-h-[420px] lg:min-h-[520px]">
      <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-[#fbe3cd] via-[#f5e0d0] to-[#dceafa] blur-xl" />

      <div className="relative mx-auto max-w-[500px] rotate-[2deg] rounded-[28px] border border-white bg-white/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,.08)] backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold tracking-[-0.05em]">fobs</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf5ef] px-3 py-1 text-[10px] text-[#23845b]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#23845b]" />
            Sample
          </span>
        </div>

        <div className="rounded-2xl bg-[#f5f4ef] p-4">
          <span className="text-[10px] uppercase tracking-wide text-[#8b8c85]">Sample</span>
          <div className="mt-3 space-y-3">
            {rows.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#85867f]">
                No live prices read yet.
              </p>
            ) : (
              rows.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-bold">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{asset.symbol}</div>
                      <div className="text-[10px] text-[#92938c]">{asset.name}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium tabular-nums">{price(asset.price)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
