/**
 * AI service — provider-agnostic answer generation.
 *
 * The mock provider generates answers from retrieved context without
 * any external API call, allowing full development without credentials.
 *
 * When a real AI provider is configured, implement a new class that
 * satisfies the AIProvider interface and register it in createAIProvider().
 *
 * Critical rule: the AI must ground answers in retrievedContext only.
 * It must NOT invent IS numbers, clause references, certification
 * requirements, or BIS policies not present in the retrieved sources.
 */

import type { AIProvider, GenerateAnswerInput, GenerateAnswerOutput } from "../types/ai.js";
import { aiError, aiTimeout } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

/* ── Mock provider ────────────────────────────────────────── */

class MockAIProvider implements AIProvider {
  async generateAnswer(input: GenerateAnswerInput): Promise<GenerateAnswerOutput> {
    if (input.retrievedContext.length === 0) {
      return {
        answer:
          "Verified BIS source material for this question is not available. " +
          "Please check an official BIS source or contact your nearest BIS office.",
        usedSourceIds: [],
      };
    }

    const top = input.retrievedContext[0];
    const usedSourceIds = input.retrievedContext.slice(0, 2).map((s) => s.id);

    /* Build a safe, grounded answer from the retrieved snippet. */
    const answer =
      `Based on ${top.title}${top.clause ? ` (${top.clause})` : ""}:\n\n` +
      `${top.snippet}\n\n` +
      `This information is from BIS documentation. For authoritative guidance, ` +
      `please refer to the official Indian Standard or contact your nearest BIS office.`;

    return { answer, usedSourceIds };
  }
}

/* ── Factory ──────────────────────────────────────────────── */

export function createAIProvider(
  provider: "mock" | "claude" | "openai",
  _apiKey: string | undefined,
  timeoutMs: number,
): AIProvider {
  let impl: AIProvider;

  if (provider === "mock") {
    impl = new MockAIProvider();
  } else {
    /* Real provider implementations go here.
     * Example for Claude:
     *   impl = new ClaudeProvider(apiKey, { model: "claude-sonnet-5" });
     * Example for OpenAI:
     *   impl = new OpenAIProvider(apiKey, { model: "gpt-4o" });
     */
    throw new Error(
      `AI_PROVIDER="${provider}" is not yet implemented. ` +
        `Set AI_PROVIDER=mock to run without credentials.`,
    );
  }

  /* Wrap with timeout enforcement regardless of provider. */
  return new TimeoutAIProvider(impl, timeoutMs);
}

class TimeoutAIProvider implements AIProvider {
  constructor(
    private readonly inner: AIProvider,
    private readonly timeoutMs: number,
  ) {}

  async generateAnswer(input: GenerateAnswerInput): Promise<GenerateAnswerOutput> {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(aiTimeout()), this.timeoutMs),
    );

    try {
      return await Promise.race([this.inner.generateAnswer(input), timeoutPromise]);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "AI_TIMEOUT") throw err;
      logger.error("ai: provider error", { errorName: (err as Error).name });
      throw aiError();
    }
  }
}
