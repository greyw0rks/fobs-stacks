import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The early-access waitlist endpoint.
 *
 * POST { email } → inserts a row into `waitlist`, keyed by a unique lower-cased
 * email so a repeat sign-up is a friendly no-op rather than a duplicate. We
 * capture a coarse `source` and the request's country header (set by Vercel's
 * edge) for later triage — never anything that identifies the person beyond the
 * email they gave us.
 *
 * The table is created on demand with `CREATE TABLE IF NOT EXISTS`, so a fresh
 * Neon database needs no migration step before the first sign-up lands.
 */

// A deliberately conservative check: this is not full RFC 5322, it just rejects
// the obvious non-addresses before we touch the database.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let ready: Promise<void> | null = null;

function ensureTable(sql: ReturnType<typeof db>) {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          email      TEXT NOT NULL UNIQUE,
          source     TEXT,
          country    TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })().catch((error) => {
      // Reset so the next request can retry rather than caching a failure.
      ready = null;
      throw error;
    });
  }
  return ready;
}

export async function POST(request: Request) {
  let email: unknown;
  let source: unknown;
  try {
    const body = await request.json();
    email = body?.email;
    source = body?.source;
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const src = typeof source === "string" ? source.slice(0, 64) : "landing";
  const country = request.headers.get("x-vercel-ip-country");

  try {
    const sql = db();
    await ensureTable(sql);

    // ON CONFLICT keeps a repeat sign-up idempotent — the person still gets a
    // success state, we just don't store them twice.
    const rows = await sql`
      INSERT INTO waitlist (email, source, country)
      VALUES (${normalized}, ${src}, ${country})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    return NextResponse.json({ ok: true, created: rows.length > 0 });
  } catch (error) {
    console.error("[waitlist] insert failed", error);
    return NextResponse.json(
      { error: "Could not reach the waitlist right now. Try again shortly." },
      { status: 500 }
    );
  }
}
