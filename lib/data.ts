import type { AssetSummary } from "./types";

/**
 * Placeholder tickers for the sample interface.
 *
 * These symbols are shown only to populate the preview UI — no prices, no
 * activity, and no claim about what fobs will list. Everything (the assets,
 * the data, the mechanics) is undecided pre-launch, so every numeric field is
 * intentionally empty and renders as an em dash. Nothing here is real.
 */
export const SAMPLE_ASSETS: AssetSummary[] = [
  { id: "nvda", symbol: "NVDA", name: "NVIDIA", price: null, priceKnown: false, tradeCount: 0, traderCount: 0 },
  { id: "aapl", symbol: "AAPL", name: "Apple", price: null, priceKnown: false, tradeCount: 0, traderCount: 0 },
  { id: "msft", symbol: "MSFT", name: "Microsoft", price: null, priceKnown: false, tradeCount: 0, traderCount: 0 },
  { id: "googl", symbol: "GOOGL", name: "Alphabet", price: null, priceKnown: false, tradeCount: 0, traderCount: 0 },
  { id: "tsla", symbol: "TSLA", name: "Tesla", price: null, priceKnown: false, tradeCount: 0, traderCount: 0 }
];

/** No changes shown pre-launch — every row renders an em dash. */
export const SAMPLE_CHANGES: Record<string, number | null> = {};
