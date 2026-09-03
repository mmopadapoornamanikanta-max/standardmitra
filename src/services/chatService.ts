/**
 * Chat service — the application's single boundary to the chat backend.
 *
 * When VITE_API_MODE=mock (default): routes through the existing
 * getSimulatedResponse() mock, preserving the development experience
 * without any backend.
 *
 * When VITE_API_MODE=api: routes through apiClient to the configured
 * backend endpoint (POST /api/chat).
 *
 * React components must NEVER call fetch() or apiClient directly.
 * All chat communication flows through this module.
 */

import { API_MODE } from "../config/api";
import { request, ApiClientError } from "./apiClient";
import { getSimulatedResponse } from "../data/mockResponses";
import type { ChatRequest, ChatResponse } from "../types/api";

const CHAT_ENDPOINT = "/api/chat";

/** Simulated network latency for mock mode (ms). */
const MOCK_DELAY_MIN = 1100;
const MOCK_DELAY_RANGE = 700;

/**
 * Send a chat message and receive a normalized response.
 *
 * In mock mode the delay simulates a real network round-trip.
 * In API mode the request is forwarded to the configured backend.
 *
 * Pass `signal` to support cancellation (e.g. when the user starts a
 * new conversation while a request is in-flight).
 */
export async function sendChatMessage(
  req: ChatRequest,
  signal?: AbortSignal,
): Promise<ChatResponse> {
  if (API_MODE === "mock") {
    return simulateMockResponse(req, signal);
  }

  return request<ChatResponse>(
    CHAT_ENDPOINT,
    { method: "POST", body: JSON.stringify(req) },
    signal,
  );
}

function simulateMockResponse(
  req: ChatRequest,
  signal?: AbortSignal,
): Promise<ChatResponse> {
  return new Promise<ChatResponse>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new ApiClientError({ message: "Request was cancelled", code: "ABORTED" }));
      return;
    }

    const delay = MOCK_DELAY_MIN + Math.random() * MOCK_DELAY_RANGE;

    const timer = setTimeout(() => {
      const result = getSimulatedResponse(req.message);
      resolve({
        message: result.content,
        citations: result.citations,
        suggestions: result.suggestions,
        conversationId: req.conversationId ?? `conv-${Date.now()}`,
      });
    }, delay);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new ApiClientError({ message: "Request was cancelled", code: "ABORTED" }));
      },
      { once: true },
    );
  });
}
