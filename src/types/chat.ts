/* Shared application types — single source of truth */

export type Language = "EN" | "HI" | "TE";

export type TextSize = "default" | "large";

export type Citation = {
  id: string;
  standardNumber: string;
  title: string;
  clause?: string;
  snippet: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
  /** True when the assistant turn failed — renders error UI instead of normal content. */
  isError?: boolean;
  /** Original user text to re-send when the retry button is clicked. */
  retryText?: string;
  /** Contextual follow-up questions to show below this message. */
  suggestions?: string[];
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

export type VoiceState =
  | "listening"
  | "preview"
  | "processing"
  | "error";

export type PhotoScanState =
  | "options"
  | "preview"
  | "scanning"
  | "ocr"
  | "error";
