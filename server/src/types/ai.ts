/** AI provider abstraction types. */

import type { Language } from "./chat.js";
import type { RetrievalSource } from "./retrieval.js";

export type GenerateAnswerInput = {
  question: string;
  language: Language;
  /** Retrieved BIS context to ground the answer. Never empty in production. */
  retrievedContext: RetrievalSource[];
};

export type GenerateAnswerOutput = {
  answer: string;
  /** IDs of retrieved sources the AI actually used in its answer. */
  usedSourceIds: string[];
};

/**
 * Provider-agnostic AI interface.
 *
 * Implementations must:
 * - Ground answers exclusively in the provided retrievedContext.
 * - Return usedSourceIds so citations can be built accurately.
 * - NOT invent IS numbers, clauses, certification claims, or policies.
 * - Return a clear "cannot verify" answer when context is insufficient.
 */
export interface AIProvider {
  generateAnswer(input: GenerateAnswerInput): Promise<GenerateAnswerOutput>;
}
