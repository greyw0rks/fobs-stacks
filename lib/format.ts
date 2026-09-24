/**
 * Display helpers, carried over from the original fobs build.
 *
 * A null price is not zero — it renders as an em dash, never "$0.00", so a
 * missing figure never looks like a real one.
 */

/** Prices carry real oracle precision. */
export function price(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })}`;
}
