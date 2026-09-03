/**
 * Retrieval service — searches the BIS knowledge source and returns
 * ranked source snippets for the AI to ground its answer on.
 *
 * This is the RAG retrieval layer. It is intentionally decoupled from
 * both the AI service and the BIS source adapter so each can be
 * replaced independently.
 */

import type { RetrievalResult } from "../types/retrieval.js";
import type { BisSource } from "./bisService.js";
import { retrievalError, retrievalTimeout } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export class RetrievalService {
  private readonly source: BisSource;
  private readonly timeoutMs: number;

  constructor(source: BisSource, timeoutMs: number) {
    this.source = source;
    this.timeoutMs = timeoutMs;
  }

  async searchRelevantSources(query: string): Promise<RetrievalResult> {
    logger.debug("retrieval: searching", { queryLength: query.length });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(retrievalTimeout()), this.timeoutMs),
    );

    try {
      const sources = await Promise.race([
        this.source.search(query),
        timeoutPromise,
      ]);

      logger.info("retrieval: found sources", { count: sources.length });
      return { query, sources };
    } catch (err) {
      if ((err as { code?: string }).code === "RETRIEVAL_TIMEOUT") throw err;
      logger.error("retrieval: source error", { errorName: (err as Error).name });
      throw retrievalError();
    }
  }
}
