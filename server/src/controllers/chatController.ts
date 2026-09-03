/**
 * Chat controller — thin HTTP adapter for the chat orchestrator.
 *
 * Responsibilities: deserialise the request, call the orchestrator,
 * serialise the response. No business logic here.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { ChatOrchestrator } from "../services/chatOrchestrator.js";
import type { Language } from "../types/chat.js";
import { AppError, toErrorBody, internalError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export type ChatRequestBody = {
  message: string;
  conversationId?: string;
  language: Language;
};

export function makeChatController(orchestrator: ChatOrchestrator) {
  return async function handleChat(
    request: FastifyRequest<{ Body: ChatRequestBody }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const response = await orchestrator.chat(request.body);
      reply.status(200).send(response);
    } catch (err) {
      if (err instanceof AppError) {
        /* Insufficient sources returns a 200 with a message — already handled
         * in the orchestrator. All other AppErrors get their own status. */
        reply.status(err.status).send(toErrorBody(err));
        return;
      }
      logger.error("chat: unexpected error", { errorName: (err as Error).name });
      const fallback = internalError();
      reply.status(fallback.status).send(toErrorBody(fallback));
    }
  };
}
