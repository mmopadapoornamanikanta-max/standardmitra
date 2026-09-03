STEP 11 — REAL BACKEND + AI/BIS ARCHITECTURE

Continue from the existing Standards Mitra project.

IMPORTANT:
- Do NOT redesign or replace the existing UI.
- Do NOT migrate Vite + React to Next.js.
- Preserve all existing functionality from Steps 1–10.
- The current frontend is Vite + React + TypeScript.
- Keep the frontend build working.
- This step is about creating the backend/API architecture and connecting the existing frontend cleanly.

GOAL

Create a production-oriented backend architecture for Standards Mitra.

Target flow:

React/Vite Frontend
        ↓
POST /api/chat
        ↓
Backend API
        ↓
Chat Orchestrator
        ↓
BIS Retrieval Layer
        ↓
Relevant Standards / Clauses
        ↓
AI Response Generation
        ↓
Citation Normalization
        ↓
React Chat UI


1. CREATE A SEPARATE BACKEND

Create a separate `server/` directory.

Use:
- Node.js
- TypeScript
- Fastify

Do NOT move the existing frontend into the backend.

Suggested structure:

server/
  src/
    app.ts
    server.ts

    config/
      env.ts

    routes/
      health.ts
      chat.ts
      standards.ts

    controllers/
      chatController.ts
      standardsController.ts

    services/
      chatOrchestrator.ts
      aiService.ts
      retrievalService.ts
      bisService.ts
      citationService.ts

    types/
      chat.ts
      standards.ts
      ai.ts
      retrieval.ts

    lib/
      errors.ts
      logger.ts

  package.json
  tsconfig.json
  .env.example


2. BACKEND ENVIRONMENT VARIABLES

Create `.env.example`.

Use server-only environment variables such as:

PORT=3001
FRONTEND_ORIGIN=http://localhost:5173

AI_PROVIDER=
AI_API_KEY=

BIS_SOURCE_MODE=mock

IMPORTANT:
- Never expose AI_API_KEY to the Vite frontend.
- Never prefix backend secrets with `VITE_`.
- Never hard-code API keys.
- Do not commit `.env`.
- Validate required environment variables on server startup.


3. HEALTH ENDPOINT

Create:

GET /api/health

Response:

{
  "status": "ok"
}

This will be used to verify that the backend is running.


4. CHAT API CONTRACT

Create:

POST /api/chat

Request:

{
  "message": "What is IS 3025?",
  "conversationId": "optional-id",
  "language": "EN"
}

Supported languages:

EN
HI
TE

Response:

{
  "message": "Answer generated from verified BIS sources.",
  "conversationId": "conversation-id",
  "citations": [
    {
      "standardNumber": "IS 3025",
      "title": "Standard title",
      "clause": "Relevant clause",
      "snippet": "Short verified source excerpt"
    }
  ]
}

Keep the API wire format separate from the existing frontend domain types.


5. VALIDATE REQUESTS

Use schema validation.

Reject:
- Missing message
- Empty message
- Invalid language
- Invalid request body

Return clean HTTP errors.

Example:

400 Bad Request

{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Message is required."
  }
}


6. CHAT ORCHESTRATOR

Create `chatOrchestrator.ts`.

Responsibilities:

1. Receive user question.
2. Determine requested language.
3. Search the BIS retrieval layer.
4. Collect relevant standards/clauses.
5. Pass retrieved context to the AI service.
6. Generate a grounded answer.
7. Normalize citations.
8. Return the final ChatResponse.

The controller should remain thin.

Architecture:

chatController
      ↓
chatOrchestrator
      ↓
retrievalService
      ↓
aiService
      ↓
citationService


7. AI SERVICE ABSTRACTION

Create an AI provider interface.

Example conceptual interface:

generateAnswer({
  question,
  language,
  context
})

The implementation must be provider-agnostic.

Do not tightly couple the entire application to one AI vendor.

The AI service should receive retrieved BIS context rather than answering standards questions from unsupported general knowledge.


8. BIS RETRIEVAL ARCHITECTURE

Create:

`retrievalService.ts`

with an interface similar to:

searchRelevantSources(query)

The retrieval result should contain metadata such as:

- standard number
- standard title
- clause
- source identifier
- text/snippet
- relevance score

Create a BIS service boundary:

`bisService.ts`

IMPORTANT:

Do NOT assume that a public BIS API exists.

Do not invent BIS endpoints.

Instead, create an adapter/interface that can later connect to an official BIS data source, approved document repository, or indexed BIS corpus.


9. RAG / KNOWLEDGE GROUNDING

Design the backend around retrieval-augmented generation.

Pipeline:

User Question
      ↓
Query Retrieval
      ↓
Relevant BIS Documents
      ↓
Relevant Clauses
      ↓
Context Assembly
      ↓
AI
      ↓
Grounded Answer
      ↓
Citations

Critical rule:

The AI must NOT invent:
- IS numbers
- clause numbers
- certification requirements
- hallmarking requirements
- testing requirements
- regulatory claims
- BIS policies

If sufficient verified source material cannot be retrieved, the system should clearly state that it cannot verify the requested information instead of fabricating an answer.


10. CITATION NORMALIZATION

Create `citationService.ts`.

Convert retrieval metadata into the frontend citation structure.

Each citation should contain:

standardNumber
title
clause
snippet

Optionally support future fields:

sourceId
sourceUrl
documentVersion

Only populate source URLs when they are actually verified.

Do not invent URLs.


11. STANDARDS ENDPOINTS

Prepare the architecture for future endpoints such as:

GET /api/standards/:standardNumber

and

GET /api/standards/search?q=...

These should use the BIS service boundary.

If no real BIS data source is connected yet, return a clear not-configured response rather than fake standards data.


12. MOCK BACKEND MODE

Implement a safe mock mode so the backend can run without real AI or BIS credentials.

Example:

BIS_SOURCE_MODE=mock

In mock mode:
- Return clearly marked sample data.
- Keep the same production API contract.
- Do not pretend sample data is official BIS information.

The frontend should be able to point to:

VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3001


13. ERROR HANDLING

Create centralized backend error handling.

Handle:
- validation errors
- AI timeout
- retrieval failure
- BIS source unavailable
- unexpected server errors

Return predictable JSON errors.

Never return:
- API keys
- stack traces
- internal secrets
- sensitive environment variables


14. CORS

Configure CORS so the backend accepts requests from the configured frontend origin.

Use:

FRONTEND_ORIGIN

Do not use unrestricted `*` in production configuration.


15. TIMEOUTS

Add reasonable request timeouts.

AI/retrieval calls must not hang indefinitely.

Return a clean error if a downstream service times out.


16. LOGGING

Add structured server logging.

Log:
- request ID
- endpoint
- status
- duration
- error code when applicable

Do NOT log:
- API keys
- authorization secrets
- unnecessary user-private content


17. FRONTEND INTEGRATION

Use the existing frontend API architecture from Step 10.

Do NOT add `fetch()` directly to React components.

The existing:

src/services/apiClient.ts
src/services/chatService.ts

must remain the frontend integration boundary.

Only update them if necessary to exactly match the backend contract.

The existing mock mode must continue working.


18. CONVERSATION ID

Support an optional `conversationId`.

If no conversationId is provided:
- generate one on the backend.

For this step, conversation persistence can remain in-memory/prototype-level.

Do NOT add authentication or a database unless the existing project already requires it.

Design the interfaces so persistent storage can be added later.


19. NON-STREAMING FIRST

Keep `/api/chat` as a normal request/response endpoint for now.

Do NOT redesign the existing chat UI around streaming.

The architecture should leave room for future streaming responses.


20. DOCUMENT THE API

Create:

`docs/api-contract.md`

Document:

- GET /api/health
- POST /api/chat
- future standards endpoints
- request schema
- response schema
- citation schema
- error schema
- environment variables
- local development commands


21. TESTING

Add backend tests for:

- health endpoint
- valid chat request
- invalid chat request
- invalid language
- missing message
- mock retrieval
- citation normalization
- AI service failure
- retrieval failure
- no sufficient source material
- generated conversation ID
- supplied conversation ID


22. SECURITY RULES

Follow these rules:

- No secrets in frontend code.
- No API keys in source control.
- No hard-coded AI credentials.
- No fabricated BIS information.
- No fabricated citations.
- No fake BIS URLs.
- Validate all external inputs.
- Keep backend credentials server-side.
- Return safe error messages.


23. FINAL ACCEPTANCE CRITERIA

The implementation is complete only if:

1. Existing Vite + React frontend still works.
2. Existing UI is not redesigned.
3. Existing chat mock mode still works.
4. Backend starts independently.
5. GET /api/health works.
6. POST /api/chat follows the documented contract.
7. Frontend API mode can communicate with the backend.
8. Backend has clear AI/retrieval/BIS service boundaries.
9. Citation data is normalized consistently.
10. No secrets are exposed to the frontend.
11. No unsupported BIS facts are fabricated.
12. Mock backend mode works without external credentials.
13. TypeScript has zero errors.
14. Frontend production build succeeds.
15. Backend build succeeds.
16. API documentation exists.
17. Tests cover the main success/error paths.

IMPORTANT FINAL RULE:

Do not replace working functionality just to introduce the backend.

Extend the existing Standards Mitra architecture incrementally and keep the current frontend behavior intact.