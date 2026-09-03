/**
 * Fastify application factory.
 *
 * Wires together configuration, CORS, services, and routes.
 * Exported as a factory so tests can create isolated instances.
 */

import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";

import { config } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { AppError, toErrorBody } from "./lib/errors.js";

import { createBisSource } from "./services/bisService.js";
import { RetrievalService } from "./services/retrievalService.js";
import { createAIProvider } from "./services/aiService.js";
import { ChatOrchestrator } from "./services/chatOrchestrator.js";

import { healthRoutes } from "./routes/health.js";
import { chatRoutes } from "./routes/chat.js";
import { standardsRoutes } from "./routes/standards.js";

export async function buildApp() {
  const app = Fastify({
    logger: false, // Use our own structured logger
    ajv: {
      customOptions: {
        /* Ajv strict mode — reject unknown fields where schemas say additionalProperties: false */
        strict: false,
      },
    },
  });

  /* ── CORS ───────────────────────────────────────────────── */
  await app.register(cors, {
    origin: config.frontendOrigin,
    methods: ["GET", "POST", "OPTIONS"],
  });

  /* ── Sensible defaults (httpErrors etc.) ────────────────── */
  await app.register(sensible);

  /* ── Global error handler ───────────────────────────────── */
  app.setErrorHandler((err, request, reply) => {
    if (err instanceof AppError) {
      reply.status(err.status).send(toErrorBody(err));
      return;
    }

    /* Fastify validation errors */
    if (err.validation) {
      const msg =
        err.validation[0]?.message ?? "Invalid request body.";
      reply.status(400).send({
        error: { code: "INVALID_REQUEST", message: msg },
      });
      return;
    }

    logger.error("unhandled error", { path: request.url, message: err.message });
    reply.status(500).send({
      error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." },
    });
  });

  /* ── Dependency wiring ──────────────────────────────────── */
  const bisSource = createBisSource(config.bisSourceMode);
  const retrieval = new RetrievalService(bisSource, config.retrievalTimeoutMs);
  const ai = createAIProvider(config.aiProvider, config.aiApiKey, config.aiTimeoutMs);
  const orchestrator = new ChatOrchestrator(retrieval, ai);

  /* ── Routes ─────────────────────────────────────────────── */
  await app.register(healthRoutes);
  await app.register(chatRoutes, { orchestrator });
  await app.register(standardsRoutes);

  return app;
}
