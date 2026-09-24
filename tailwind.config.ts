import type { Config } from "tailwindcss";

/**
 * Standalone fobs-for-Stacks landing page.
 *
 * Unlike the original fobs app — where Tailwind's preflight was disabled so it
 * would not fight the hand-authored globals.css — this is a fresh project, so
 * preflight stays on and does the base reset. The `--fobs-*` tokens and the
 * `.fobs-*` semantic classes live in `app/globals.css`.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
