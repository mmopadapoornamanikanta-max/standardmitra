/**
 * BIS Service — placeholder for future BIS / knowledge-layer integration.
 *
 * This module establishes the abstraction boundary so React components
 * never communicate with BIS APIs directly. The intended call chain is:
 *
 *   React → chatService → backend → BIS / knowledge layer
 *
 * When a real BIS knowledge layer is available, implement these functions
 * to fetch standard details, certification data, and hallmarking records.
 * The chat backend may call these internally, but the React UI should not.
 *
 * Do NOT add real BIS API keys or URLs here — those belong in a secure
 * server-side layer, not in browser-exposed client code.
 */

import type { Citation } from "../types/chat";

/**
 * Fetch details for a single Indian Standard by its IS number.
 * Returns null when not found or when the service is unavailable.
 */
export async function getStandardDetails(
  _standardNumber: string,
): Promise<Citation | null> {
  // Not yet implemented — will connect to BIS knowledge layer.
  return null;
}

/**
 * Search Indian Standards by keyword or query string.
 * Returns an empty array when the service is unavailable.
 */
export async function searchStandards(
  _query: string,
): Promise<Citation[]> {
  // Not yet implemented — will connect to BIS knowledge layer.
  return [];
}
