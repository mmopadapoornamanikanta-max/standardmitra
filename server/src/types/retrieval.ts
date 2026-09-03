/** Types for the BIS retrieval / RAG pipeline. */

/** A single retrieved source document or clause. */
export type RetrievalSource = {
  id: string;
  standardNumber: string;
  title: string;
  clause?: string;
  snippet: string;
  /** 0–1 relevance score from the retrieval system. */
  relevanceScore: number;
  /** Opaque identifier in the backing index (for future deduplication). */
  sourceIdentifier?: string;
};

/** The full result of a retrieval query. */
export type RetrievalResult = {
  query: string;
  sources: RetrievalSource[];
};
