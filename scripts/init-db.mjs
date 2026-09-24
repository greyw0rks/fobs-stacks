// scripts/init-db.mjs
//
// One-shot: create the `waitlist` table in the Neon database named by
// DATABASE_URL. The API route also creates it lazily, so this is only for
// provisioning ahead of the first sign-up (or verifying the connection).
//
//   DATABASE_URL="postgresql://…neon.tech/…?sslmode=require" node scripts/init-db.mjs

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS waitlist (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    source     TEXT,
    country    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM waitlist`;
console.log(`waitlist table is ready. Rows: ${count}`);
