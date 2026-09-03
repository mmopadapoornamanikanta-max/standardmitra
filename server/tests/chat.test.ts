import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../src/app.js";

describe("POST /api/chat", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  /* ── Success cases ─────────────────────────────────────── */

  it("returns 200 with message and citations for a valid request", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "How do I check BIS certification?", language: "EN" },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(typeof body.message).toBe("string");
    expect(body.message.length).toBeGreaterThan(0);
    expect(typeof body.conversationId).toBe("string");
    expect(Array.isArray(body.citations)).toBe(true);
  });

  it("returns a conversationId when none is supplied", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "What is hallmarking?", language: "EN" },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.conversationId).toBeTruthy();
  });

  it("echoes back the supplied conversationId", async () => {
    const id = "test-conversation-abc";
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "Tell me about gold hallmarking", language: "EN", conversationId: id },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().conversationId).toBe(id);
  });

  it("accepts HI language", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "BIS प्रमाणन क्या है?", language: "HI" },
    });
    expect(response.statusCode).toBe(200);
  });

  it("accepts TE language", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "BIS ధృవీకరణ అంటే ఏమిటి?", language: "TE" },
    });
    expect(response.statusCode).toBe(200);
  });

  it("returns citations for hallmark queries", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "How do I verify a gold hallmark?", language: "EN" },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.citations.length).toBeGreaterThan(0);
    expect(body.citations[0]).toHaveProperty("standardNumber");
    expect(body.citations[0]).toHaveProperty("title");
    expect(body.citations[0]).toHaveProperty("snippet");
  });

  /* ── Validation errors ─────────────────────────────────── */

  it("returns 400 when message is missing", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { language: "EN" },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("INVALID_REQUEST");
  });

  it("returns 400 when message is empty string", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "", language: "EN" },
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns 400 when language is missing", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "What is BIS?" },
    });
    expect(response.statusCode).toBe(400);
  });

  it("returns 400 when language is invalid", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "What is BIS?", language: "FR" },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("INVALID_REQUEST");
  });

  it("silently strips unknown body fields and returns 200", async () => {
    /* Fastify's Ajv uses removeAdditional:true by default — unknown fields
     * are stripped rather than rejected. The request succeeds. */
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: {
        message: "What is BIS?",
        language: "EN",
        unknownField: "stripped by Ajv",
      },
    });
    expect(response.statusCode).toBe(200);
  });

  /* ── Citation normalisation ────────────────────────────── */

  it("citation objects have required fields", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/chat",
      payload: { message: "BIS certification for products", language: "EN" },
    });

    const body = response.json();
    for (const c of body.citations as Record<string, unknown>[]) {
      expect(typeof c.id).toBe("string");
      expect(typeof c.standardNumber).toBe("string");
      expect(typeof c.title).toBe("string");
      expect(typeof c.snippet).toBe("string");
    }
  });
});
