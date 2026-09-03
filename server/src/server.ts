/**
 * Server entry point.
 *
 * Starts the Fastify server on the configured port.
 * Run: npm run dev   (development with hot-reload via tsx)
 *      npm start     (production, after npm run build)
 */

import { buildApp } from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./lib/logger.js";

async function main(): Promise<void> {
  const app = await buildApp();

  await app.listen({ port: config.port, host: "0.0.0.0" });

  logger.info(`Standards Mitra API listening`, {
    port: config.port,
    mode: config.aiProvider === "mock" ? "mock" : "api",
    bisSource: config.bisSourceMode,
    frontendOrigin: config.frontendOrigin,
  });
}

main().catch((err: Error) => {
  logger.error("Fatal startup error", { message: err.message });
  process.exit(1);
});
