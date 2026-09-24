"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

/**
 * The early-access form.
 *
 * A single email field that POSTs to `/api/waitlist`. It keeps the fobs button
 * language — black primary, data-blue reserved — and swaps the whole control
 * for a quiet confirmation once the address lands, so a repeat submit is not
 * even possible from the UI.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "landing" })
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        created?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again shortly.");
        return;
      }

      setStatus("done");
      setMessage(
        data.created
          ? "You're on the list — we'll be in touch."
          : "You're already on the list — sit tight."
      );
    } catch {
      setStatus("error");
      setMessage("Could not reach the waitlist. Check your connection and retry.");
    }
  }

  if (status === "done") {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-[#dceee5] bg-[#f0f7f3] px-5 py-4">
        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#23845b] text-[11px] font-bold text-white">
          ✓
        </span>
        <p className="text-sm leading-6 text-[#23845b]">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@wallet.btc"
          aria-label="Email address"
          autoComplete="email"
          className="w-full rounded-[10px] border border-[#e3e2dc] bg-white px-4 py-3 text-sm text-[#111312] outline-none transition-colors placeholder:text-[#a7a89f] focus:border-[#111312] sm:max-w-[320px]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="fobs-button-primary px-6 py-3 disabled:opacity-60"
        >
          {status === "loading" ? "Adding…" : "Request an invite →"}
        </button>
      </div>

      {status === "error" ? (
        <p className="mt-3 text-xs text-[#c94c4c]">{message}</p>
      ) : (
        <p className="mt-3 text-xs text-[#9b9c95]">
          No custody, no seeded balances — your own signature on every trade.
        </p>
      )}
    </form>
  );
}
