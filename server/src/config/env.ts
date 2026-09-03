/**
 * Environment configuration.
 *
 * Loads and validates process.env on startup. The server refuses to start
 * if required variables are absent, preventing silent misconfiguration.
 *
 * All secrets live here — they NEVER reach the Vite frontend bundle.
 *
 * Development: run with `node --env-file=.env` (Node ≥ 20.6) or set env
 * vars in your shell. Copy server/.env.example to server/.env first.
 */

export type AIProvider = "mock" | "claude" | "openai";
export type BisSourceMode = "mock" | "index";

function get(key: string): string | undefined {
  return process.env[key];
}

function getRequired(key: string): string {
  const value = get(key);
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Copy server/.env.example to server/.env and fill in the values.`,
    );
  }
  return value;
}

function getInt(key: string, fallback: number): number {
  const raw = get(key);
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) {
    throw new Error(`Environment variable ${key} must be an integer, got: "${raw}"`);
  }
  return n;
}

function parseAIProvider(raw: string): AIProvider {
  if (raw === "mock" || raw === "claude" || raw === "openai") return raw;
  throw new Error(`AI_PROVIDER must be "mock", "claude", or "openai". Got: "${raw}"`);
}

function parseBisSourceMode(raw: string): BisSourceMode {
  if (raw === "mock" || raw === "index") return raw;
  throw new Error(`BIS_SOURCE_MODE must be "mock" or "index". Got: "${raw}"`);
}

export type Config = {
  port: number;
  frontendOrigin: string;
  aiProvider: AIProvider;
  aiApiKey: string | undefined;
  aiTimeoutMs: number;
  bisSourceMode: BisSourceMode;
  bisIndexUrl: string | undefined;
  retrievalTimeoutMs: number;
};

function loadConfig(): Config {
  const aiProvider = parseAIProvider(get("AI_PROVIDER") ?? "mock");
  const bisSourceMode = parseBisSourceMode(get("BIS_SOURCE_MODE") ?? "mock");

  if (aiProvider !== "mock" && !get("AI_API_KEY")) {
    throw new Error(
      `AI_API_KEY is required when AI_PROVIDER="${aiProvider}". ` +
        `Set AI_PROVIDER=mock to run without credentials.`,
    );
  }

  return {
    port: getInt("PORT", 3001),
    frontendOrigin: get("FRONTEND_ORIGIN") ?? "http://localhost:5173",
    aiProvider,
    aiApiKey: get("AI_API_KEY"),
    aiTimeoutMs: getInt("AI_TIMEOUT_MS", 20_000),
    bisSourceMode,
    bisIndexUrl: get("BIS_INDEX_URL"),
    retrievalTimeoutMs: getInt("RETRIEVAL_TIMEOUT_MS", 10_000),
  };
}

export const config: Config = loadConfig();
