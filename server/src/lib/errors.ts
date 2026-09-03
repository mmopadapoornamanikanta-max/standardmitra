/**
 * Centralized error types and helpers.
 *
 * AppError wraps all expected application errors with an HTTP status,
 * machine-readable code, and a safe user-facing message.
 *
 * Raw errors from AI providers, retrieval systems, or Node.js internals
 * must NEVER be forwarded to the client — only AppError messages are.
 */

export type ErrorCode =
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "AI_TIMEOUT"
  | "AI_ERROR"
  | "RETRIEVAL_TIMEOUT"
  | "RETRIEVAL_ERROR"
  | "BIS_UNAVAILABLE"
  | "INSUFFICIENT_SOURCES"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;

  constructor(status: number, code: ErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

export function badRequest(message: string): AppError {
  return new AppError(400, "INVALID_REQUEST", message);
}

export function notFound(message: string): AppError {
  return new AppError(404, "NOT_FOUND", message);
}

export function aiTimeout(): AppError {
  return new AppError(
    504,
    "AI_TIMEOUT",
    "The AI service took too long to respond. Please try again.",
  );
}

export function aiError(): AppError {
  return new AppError(
    502,
    "AI_ERROR",
    "The AI service returned an unexpected response. Please try again.",
  );
}

export function retrievalTimeout(): AppError {
  return new AppError(
    504,
    "RETRIEVAL_TIMEOUT",
    "The knowledge retrieval service timed out. Please try again.",
  );
}

export function retrievalError(): AppError {
  return new AppError(
    502,
    "RETRIEVAL_ERROR",
    "Could not retrieve relevant standards. Please try again.",
  );
}

export function bisUnavailable(): AppError {
  return new AppError(
    503,
    "BIS_UNAVAILABLE",
    "The BIS knowledge source is currently unavailable. Please try again later.",
  );
}

export function insufficientSources(language: string): AppError {
  const msg =
    language === "HI"
      ? "इस प्रश्न के लिए सत्यापित BIS स्रोत सामग्री उपलब्ध नहीं है। कृपया किसी आधिकारिक BIS स्रोत से जाँच करें।"
      : language === "TE"
        ? "ఈ ప్రశ్నకు ధృవీకరించిన BIS మూల సమాచారం అందుబాటులో లేదు. దయచేసి అధికారిక BIS మూలం నుండి తనిఖీ చేయండి."
        : "Verified BIS source material for this question is not available. " +
          "Please check an official BIS source or contact your nearest BIS office.";
  return new AppError(200, "INSUFFICIENT_SOURCES", msg);
}

export function internalError(): AppError {
  return new AppError(500, "INTERNAL_ERROR", "An unexpected error occurred. Please try again.");
}

/** Serialise an AppError into the standard error envelope. */
export function toErrorBody(err: AppError) {
  return {
    error: {
      code: err.code,
      message: err.message,
    },
  };
}
