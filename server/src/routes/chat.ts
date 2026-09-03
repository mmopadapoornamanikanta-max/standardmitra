import type { FastifyInstance } from "fastify";
import type { ChatOrchestrator } from "../services/chatOrchestrator.js";
import { makeChatController } from "../controllers/chatController.js";

const SUPPORTED_LANGUAGES = ["EN", "HI", "TE"];

const chatBodySchema = {
  type: "object",
  required: ["message", "language"],
  properties: {
    message: {
      type: "string",
      minLength: 1,
      maxLength: 4000,
      description: "The user's question or input.",
    },
    conversationId: {
      type: "string",
      description: "Optional existing conversation ID to continue a conversation.",
    },
    language: {
      type: "string",
      enum: SUPPORTED_LANGUAGES,
      description: "Response language preference: EN, HI, or TE.",
    },
  },
  additionalProperties: false,
};

const chatResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: { type: "string" },
      conversationId: { type: "string" },
      citations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            standardNumber: { type: "string" },
            title: { type: "string" },
            clause: { type: "string" },
            snippet: { type: "string" },
          },
        },
      },
    },
  },
};

export async function chatRoutes(
  app: FastifyInstance,
  { orchestrator }: { orchestrator: ChatOrchestrator },
): Promise<void> {
  app.post(
    "/api/chat",
    {
      schema: {
        body: chatBodySchema,
        response: chatResponseSchema,
      },
    },
    makeChatController(orchestrator),
  );
}
