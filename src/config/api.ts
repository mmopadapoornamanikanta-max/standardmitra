/**
 * API configuration.
 *
 * VITE_API_MODE   — "mock" (default) or "api"
 * VITE_API_BASE_URL — base URL for the backend (API mode only)
 *
 * NOTE: All VITE_* variables are bundled into client-side code.
 * Never place API secrets, private tokens, or service keys here.
 * Secrets must live in a server-side layer and never reach the browser.
 */

export type ApiMode = "mock" | "api";

export const API_MODE: ApiMode =
  (import.meta.env.VITE_API_MODE as ApiMode | undefined) === "api" ? "api" : "mock";

/** Backend base URL used only in API mode. */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

/** Request timeout in milliseconds. */
export const API_TIMEOUT_MS = 15_000;
