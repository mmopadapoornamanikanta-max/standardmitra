/**
 * Generic HTTP client.
 *
 * Responsibilities:
 * - build request URLs from the configured base
 * - set default headers
 * - enforce a request timeout
 * - propagate an optional caller-supplied AbortSignal (e.g. from New Chat)
 * - normalize non-2xx responses and network failures into ApiClientError
 * - return typed JSON responses
 *
 * This module knows nothing about chat, citations, voice, or UI components.
 */

import { API_BASE_URL, API_TIMEOUT_MS } from "../config/api";
import type { ApiError } from "../types/api";

export class ApiClientError extends Error {
  readonly code?: string;
  readonly status?: number;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiClientError";
    this.code = error.code;
    this.status = error.status;
  }
}

/**
 * Make a typed JSON request.
 *
 * @param endpoint  — path relative to API_BASE_URL, e.g. "/api/chat"
 * @param options   — standard RequestInit (excluding signal)
 * @param signal    — optional AbortSignal from the caller (e.g. New Chat cancellation)
 */
export async function request<T>(
  endpoint: string,
  options?: Omit<RequestInit, "signal">,
  signal?: AbortSignal,
): Promise<T> {
  // Internal controller handles the timeout; caller signal is propagated into it.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  // Forward caller abort into the internal controller.
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timer);
      throw new ApiClientError({ message: "Request was cancelled", code: "ABORTED" });
    }
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as Record<string, unknown>;
      throw new ApiClientError({
        message:
          typeof body.message === "string"
            ? body.message
            : `Request failed with status ${res.status}`,
        code: typeof body.code === "string" ? body.code : undefined,
        status: res.status,
      });
    }

    return res.json() as Promise<T>;
  } catch (err) {
    clearTimeout(timer);

    if (err instanceof ApiClientError) throw err;

    if (err instanceof DOMException && err.name === "AbortError") {
      const isCallerAbort = signal?.aborted ?? false;
      throw new ApiClientError({
        message: isCallerAbort
          ? "Request was cancelled"
          : "Request timed out. Please try again.",
        code: isCallerAbort ? "ABORTED" : "TIMEOUT",
      });
    }

    throw new ApiClientError({
      message:
        err instanceof Error
          ? err.message
          : "Network error. Please check your connection and try again.",
      code: "NETWORK_ERROR",
    });
  }
}
