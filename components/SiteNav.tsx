/**
 * The marketing chrome: a lowercase "fobs" wordmark centred on the warm canvas,
 * warm hairline borders, a black action button (data-blue is reserved for
 * data), and a status pill that names the chain — Stacks, settled on Bitcoin.
 *
 * A standalone landing page, so the links are in-page anchors rather than app
 * routes.
 */
export function SiteNav({
  action = { href: "#access", label: "Get early access" }
}: {
  action?: { href: string; label: string };
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e3e2dc] bg-[#f4f3ef]/85 backdrop-blur">
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10"
        aria-label="Main"
      >
        <div className="hidden items-center gap-7 text-xs text-[#666761] md:flex">
          <a href="#markets" className="hover:text-[#111312]">
            Markets
          </a>
          <a href="#how" className="hover:text-[#111312]">
            How it works
          </a>
          <a href="#disclosure" className="hover:text-[#111312]">
            Disclosure
          </a>
        </div>

        <a
          href="#top"
          aria-label="fobs"
          className="text-[20px] font-bold tracking-[-0.06em] text-[#111312] md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          fobs
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full bg-[#fdeee2] px-3 py-1 text-[10px] font-medium text-[#b4560f] sm:inline-flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f2a24d]" />
            Stacks · Bitcoin
          </span>
          <a className="fobs-button-primary" href={action.href}>
            {action.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
