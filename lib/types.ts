export type AssetSummary = {
  id: string;
  symbol: string;
  name: string;
  /** USD reference price. Null until read — rendered as an em dash, never $0. */
  price: number | null;
  priceKnown: boolean;
  /** Real trades indexed for this asset. */
  tradeCount: number;
  /** Distinct people who have traded it — the "fobs buying" social signal. */
  traderCount: number;
};
