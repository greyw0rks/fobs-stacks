import type { AssetSummary } from "./types";

/**
 * Sample market data for the landing preview.
 *
 * These are real Stacks assets (native STX, Bitcoin-backed sBTC, and SIP-010
 * tokens that trade on Stacks DEXes like ALEX and Velar), but the figures here
 * are illustrative placeholders for the marketing preview — the production app
 * reads live prices and real trade/holder counts from a Stacks indexer. Nothing
 * on this page should be traded on.
 */
export const SAMPLE_ASSETS: AssetSummary[] = [
  { id: "sbtc", symbol: "sBTC", name: "Stacks Bitcoin", price: 63140.5, priceKnown: true, tradeCount: 2841, traderCount: 612 },
  { id: "stx", symbol: "STX", name: "Stacks", price: 1.83, priceKnown: true, tradeCount: 5210, traderCount: 940 },
  { id: "alex", symbol: "ALEX", name: "ALEX Lab", price: 0.0421, priceKnown: true, tradeCount: 1387, traderCount: 421 },
  { id: "velar", symbol: "VELAR", name: "Velar", price: 0.0138, priceKnown: true, tradeCount: 902, traderCount: 288 },
  { id: "diko", symbol: "DIKO", name: "Arkadiko", price: 0.0067, priceKnown: true, tradeCount: 640, traderCount: 173 },
  { id: "usda", symbol: "USDA", name: "Arkadiko USD", price: 0.998, priceKnown: true, tradeCount: 1104, traderCount: 355 },
  { id: "welsh", symbol: "WELSH", name: "Welshcorgicoin", price: 0.00019, priceKnown: true, tradeCount: 3320, traderCount: 807 },
  { id: "aeusdc", symbol: "aeUSDC", name: "Allbridge USDC", price: 1.0, priceKnown: true, tradeCount: 731, traderCount: 210 }
];

/** Illustrative close-to-close 1D moves, keyed by symbol. */
export const SAMPLE_CHANGES: Record<string, number | null> = {
  sBTC: 1.42,
  STX: 3.87,
  ALEX: -2.15,
  VELAR: 5.63,
  DIKO: -0.94,
  USDA: 0.02,
  WELSH: 8.41,
  aeUSDC: null
};
