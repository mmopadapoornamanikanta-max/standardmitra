/**
 * API request / response types.
 *
 * These describe the contract between the React frontend and the future
 * backend. They are deliberately separate from the chat domain types in
 * src/types/chat.ts so that the wire format can evolve independently of
 * the UI data model.
 *
 * Expected future endpoint:
 *
 *   POST /api/chat
 *
 *   Request body:
 *   {
 *     "message": "How do I check BIS certification?",
 *     "conversationId": "optional-existing-id",
 *     "language": "EN"
 *   }
 *
 *   Response body:
 *   {
 *     "message": "Response text...",
 *     "conversationId": "server-assigned-id",
 *     "citations": [
 *       {
 *         "id": "c1",
 *         "standardNumber": "IS XXXX",
 *         "title": "Example Standard Title",
 *         "clause": "Clause 4.1",
 *         "snippet": "Relevant excerpt from the standard."
 *       }
 *     ]
 *   }
 */

import type { Citation } from "./chat";

export type { Citation };

export type ChatRequest = {
  message: string;
  conversationId?: string;
  /** Language preference; the backend will eventually respond in this language. */
  language: "EN" | "HI" | "TE";
};

export type ChatResponse = {
  message: string;
  citations?: Citation[];
  /** Backend-assigned conversation ID — store and send back on subsequent turns. */
  conversationId?: string;
  /** Contextual follow-up suggestions (populated by mock mode; optional in live API). */
  suggestions?: string[];
};

export type ApiError = {
  message: string;
  /** Machine-readable error code, e.g. "TIMEOUT", "NOT_FOUND". */
  code?: string;
  /** HTTP status code when available. */
  status?: number;
};
