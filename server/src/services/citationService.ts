/**
 * Citation service — normalises retrieval sources into the frontend
 * citation format.
 *
 * Only sources that the AI actually used are included in the response.
 * Source URLs are deliberately omitted until a verified BIS document
 * repository is connected — we never fabricate links.
 */

import type { RetrievalSource } from "../types/retrieval.js";
import type { CitationResponse } from "../types/chat.js";

/**
 * Build citation objects from retrieval sources filtered to the IDs
 * that the AI service reported using in its answer.
 */
export function normalizeCitations(
  sources: RetrievalSource[],
  usedSourceIds: string[],
): CitationResponse[] {
  const usedSet = new Set(usedSourceIds);

  return sources
    .filter((s) => usedSet.has(s.id))
    .map((s, index) => ({
      id: `citation-${index + 1}`,
      standardNumber: s.standardNumber,
      title: s.title,
      ...(s.clause ? { clause: s.clause } : {}),
      snippet: s.snippet,
    }));
}
