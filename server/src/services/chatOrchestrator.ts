/**
 * Chat orchestrator — coordinates the full RAG pipeline for a single
 * chat turn.
 *
 * Pipeline:
 *   1. Receive user question + language + optional conversationId
 *   2. Search the BIS retrieval layer
 *   3. If no sources found → return "insufficient sources" response
 *   4. Pass retrieved context to the AI service
 *   5. Normalise citations from used sources
 *   6. Return ChatResponse
 *
 * The controller stays thin — all business logic lives here.
 *
 * Architecture:
 *   chatController → chatOrchestrator → retrievalService → aiService → citationService
 */

import { randomUUID } from "crypto";
import type { ChatRequest, ChatResponse } from "../types/chat.js";
import type { RetrievalService } from "./retrievalService.js";
import type { AIProvider } from "../types/ai.js";
import { normalizeCitations } from "./citationService.js";
import { insufficientSources } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

const MINIMUM_SOURCES_REQUIRED = 1;

export class ChatOrchestrator {
  constructor(
    private readonly retrieval: RetrievalService,
    private readonly ai: AIProvider,
  ) {}

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const conversationId = request.conversationId ?? randomUUID();
    const requestId = randomUUID();

    logger.info("orchestrator: chat start", {
      requestId,
      conversationId,
      language: request.language,
      messageLength: request.message.length,
    });

    /* ── Step 1: Retrieve relevant BIS sources ─────────────── */
    const retrieval = await this.retrieval.searchRelevantSources(request.message);

    if (retrieval.sources.length < MINIMUM_SOURCES_REQUIRED) {
      logger.warn("orchestrator: insufficient sources", {
        requestId,
        sourceCount: retrieval.sources.length,
      });
      const err = insufficientSources(request.language);
      /* Return a 200 with an explanatory message rather than an error —
       * the user gets a helpful response, not a failure. */
      return {
        message: err.message,
        conversationId,
        citations: [],
      };
    }

    /* ── Step 2: Generate a grounded answer ────────────────── */
    const aiOutput = await this.ai.generateAnswer({
      question: request.message,
      language: request.language,
      retrievedContext: retrieval.sources,
    });

    /* ── Step 3: Normalise citations ───────────────────────── */
    const citations = normalizeCitations(retrieval.sources, aiOutput.usedSourceIds);

    logger.info("orchestrator: chat complete", {
      requestId,
      conversationId,
      citationCount: citations.length,
    });

    return {
      message: aiOutput.answer,
      conversationId,
      citations,
    };
  }
}
