import { neon } from "@neondatabase/serverless";

/**
 * The single Neon client for the app.
 *
 * `@neondatabase/serverless` speaks to Neon over HTTP, so it works from a
 * Vercel serverless/edge function without a pooled TCP connection. The tagged
 * template (`sql\`...\``) sends parameters out-of-band — never string-
 * interpolated — so callers get parameterised queries by construction.
 *
 * `DATABASE_URL` is the Neon connection string (see `.env.example`). We read it
 * lazily inside a getter so importing this module never throws at build time on
 * an environment that has not set it yet.
 */
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — cannot reach the waitlist database.");
  }
  return neon(url);
}
