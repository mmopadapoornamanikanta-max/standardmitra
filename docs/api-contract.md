# Standards Mitra — API Contract

This document describes the HTTP API served by the Standards Mitra backend.
It is the authoritative contract between the React/Vite frontend and the backend.

---

## Base URL

| Environment | URL |
|---|---|
| Local development | `http://localhost:3001` |
| Production | Set via `VITE_API_BASE_URL` |

---

## Authentication

This version does not require authentication.
Authentication will be added in a future step.

---

## Common Response Format

All responses return `application/json`.

### Success envelope

```json
{
  "field": "value"
}
```

### Error envelope

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Human-readable message safe to show in the UI."
  }
}
```

---

## Endpoints

### GET /api/health

Verify that the backend is running.

**Response 200**

```json
{
  "status": "ok"
}
```

---

### POST /api/chat

Send a user message and receive a grounded assistant response.

**Request**

```json
{
  "message": "How do I check BIS certification?",
  "conversationId": "optional-existing-id",
  "language": "EN"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | string | ✓ | User's question (1–4000 characters) |
| `language` | `"EN"` \| `"HI"` \| `"TE"` | ✓ | Response language preference |
| `conversationId` | string | — | Existing conversation ID to continue |

**Response 200**

```json
{
  "message": "Based on IS XXXX (Clause 6.2): ...",
  "conversationId": "550e8400-e29b-41d4-a716-446655440000",
  "citations": [
    {
      "id": "citation-1",
      "standardNumber": "IS XXXX",
      "title": "BIS Product Certification — General Requirements",
      "clause": "Clause 6.2 — Licensing Conditions",
      "snippet": "Products under this scheme shall bear the Standard Mark only when..."
    }
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `message` | string | Grounded assistant answer |
| `conversationId` | string | Assigned or echoed conversation ID |
| `citations` | Citation[] | Sources used to generate the answer |

**Response 400 — Invalid request**

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Message is required."
  }
}
```

**Response 200 — Insufficient sources**

When the retrieval layer cannot find verified BIS material, the backend returns
a 200 (not an error) with a safe explanatory message and an empty citations array.
The frontend displays this as a normal assistant response.

```json
{
  "message": "Verified BIS source material for this question is not available. Please check an official BIS source or contact your nearest BIS office.",
  "conversationId": "...",
  "citations": []
}
```

**Response 502/504 — Upstream failure**

```json
{
  "error": {
    "code": "AI_TIMEOUT",
    "message": "The AI service took too long to respond. Please try again."
  }
}
```

#### Error codes

| Code | HTTP | Meaning |
|---|---|---|
| `INVALID_REQUEST` | 400 | Missing or invalid field |
| `NOT_FOUND` | 404 | Resource does not exist |
| `AI_TIMEOUT` | 504 | AI provider timed out |
| `AI_ERROR` | 502 | AI provider returned unexpected response |
| `RETRIEVAL_TIMEOUT` | 504 | Retrieval service timed out |
| `RETRIEVAL_ERROR` | 502 | Retrieval service failed |
| `BIS_UNAVAILABLE` | 503 | BIS knowledge source is unavailable |
| `INSUFFICIENT_SOURCES` | 200 | Not enough verified material (safe response) |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

### GET /api/standards/:standardNumber

Fetch details for a single Indian Standard.

> **Status:** Not yet implemented. Returns 404 until a BIS document index is connected.

**Response 404**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Standard \"IS XXXX\" is not yet available. The BIS document index has not been connected."
  }
}
```

---

### GET /api/standards/search?q=...

Search Indian Standards by keyword.

> **Status:** Not yet implemented. Returns 404 until a BIS document index is connected.

**Parameters**

| Name | Required | Description |
|---|---|---|
| `q` | ✓ | Search query (minimum 1 character) |

---

## Citation Schema

All citations in API responses conform to:

```json
{
  "id": "citation-1",
  "standardNumber": "IS XXXX",
  "title": "Standard Title",
  "clause": "Clause X.X — Clause Name",
  "snippet": "Relevant excerpt from the standard text."
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique within the response |
| `standardNumber` | string | Placeholder `IS XXXX` in mock mode |
| `title` | string | Full standard title |
| `clause` | string? | Optional — specific clause reference |
| `snippet` | string | Short verified excerpt |

> **Important:** `sourceUrl` is intentionally omitted. Do not fabricate BIS document URLs.
> When a verified BIS document repository is connected, `sourceUrl` will be added to verified citations only.

---

## Environment Variables

All variables documented in `server/.env.example`.

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | — | `3001` | Port the backend listens on |
| `FRONTEND_ORIGIN` | — | `http://localhost:5173` | Allowed CORS origin |
| `AI_PROVIDER` | — | `mock` | `mock`, `claude`, or `openai` |
| `AI_API_KEY` | When not mock | — | AI provider secret (**server-side only**) |
| `AI_TIMEOUT_MS` | — | `20000` | AI request timeout |
| `BIS_SOURCE_MODE` | — | `mock` | `mock` or `index` |
| `BIS_INDEX_URL` | When `index` | — | BIS vector index connection string |
| `RETRIEVAL_TIMEOUT_MS` | — | `10000` | Retrieval request timeout |

> **Security:** `AI_API_KEY` must NEVER appear in any `VITE_*` variable.
> Vite bundles `VITE_*` variables into the browser-exposed JavaScript bundle.

---

## Local Development

```bash
# 1. Install backend dependencies
cd server && npm install

# 2. Copy environment file
cp .env.example .env

# 3. Start the backend (mock mode, no credentials needed)
npm run dev

# 4. In a separate terminal, start the frontend
cd .. && npm run dev

# 5. Point the frontend at the local backend
# In the root .env (Vite), set:
# VITE_API_MODE=api
# VITE_API_BASE_URL=http://localhost:3001
```

---

## Architecture Notes

```
React / Vite frontend
        │
        │  POST /api/chat
        ▼
Fastify backend
        │
   chatOrchestrator
        │
        ├── retrievalService ──► BisSource (mock | index)
        │
        └── aiService ──────────► AIProvider (mock | claude | openai)
                │
           citationService
                │
           ChatResponse ──────────────────────────────────► frontend
```

The backend enforces that the AI only uses retrieved BIS context.
It does not invent IS numbers, clause references, certification requirements,
or BIS policies not present in the retrieved sources.
