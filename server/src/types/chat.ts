/** Server-side chat domain types. */

export type Language = "EN" | "HI" | "TE";

export const SUPPORTED_LANGUAGES: Language[] = ["EN", "HI", "TE"];

export type ChatRequest = {
  message: string;
  conversationId?: string;
  language: Language;
};

/** A single citation included in a chat response. */
export type CitationResponse = {
  id: string;
  standardNumber: string;
  title: string;
  clause?: string;
  snippet: string;
};

export type ChatResponse = {
  message: string;
  conversationId: string;
  citations: CitationResponse[];
};
