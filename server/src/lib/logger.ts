/**
 * Structured logger — thin wrapper over console that emits JSON in
 * production and readable text in development.
 *
 * Fastify's built-in Pino logger handles request-level logs; this module
 * is for service/orchestrator code outside the request lifecycle.
 *
 * Rules:
 * - NEVER log API keys, AI provider secrets, or user credentials.
 * - NEVER log raw AI provider error bodies (may contain prompt details).
 * - Log request IDs and error codes, not sensitive user content.
 */

type Level = "debug" | "info" | "warn" | "error";

type LogEntry = {
  level: Level;
  time: string;
  msg: string;
  [key: string]: unknown;
};

const isProd = process.env.NODE_ENV === "production";

function write(level: Level, msg: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = { level, time: new Date().toISOString(), msg, ...meta };
  if (isProd) {
    process.stdout.write(JSON.stringify(entry) + "\n");
  } else {
    const prefix = `[${entry.time}] ${level.toUpperCase().padEnd(5)}`;
    const extras = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    console.log(`${prefix} ${msg}${extras}`);
  }
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => write("debug", msg, meta),
  info:  (msg: string, meta?: Record<string, unknown>) => write("info",  msg, meta),
  warn:  (msg: string, meta?: Record<string, unknown>) => write("warn",  msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => write("error", msg, meta),
};
