STEP 10 — STANDARDS MITRA: API-READY CHAT SERVICE ARCHITECTURE

GOAL

Extend the existing Standards Mitra React + TypeScript frontend with a clean API/service architecture.

IMPORTANT:

- Do NOT redesign the UI.
- Do NOT change the approved visual design from Steps 1–9.
- Do NOT remove any existing functionality.
- Do NOT implement a real AI provider yet unless an API endpoint is already provided by the project.
- Do NOT implement authentication.
- Do NOT implement a database.
- Do NOT expose API secrets in browser/client code.
- Keep the current mock functionality working.
- The purpose of this step is to create a clean boundary between the React UI and future AI/BIS backend services.

The existing frontend must continue to work exactly as it does now.

==================================================
1. CURRENT ARCHITECTURE
==================================================

The existing application already has:

- React
- TypeScript
- Vite
- centralized application state
- centralized handleSendMessage()
- canonical types in src/types/chat.ts
- mock response generation
- responsive useIsMobile()
- chat components
- citation components
- voice components
- photo/OCR components
- settings
- reduced-motion support

Preserve all of these.

Do NOT migrate from Vite to Next.js in this step.

Next.js migration is a separate infrastructure step.

==================================================
2. NEW SERVICE ARCHITECTURE
==================================================

Create:

src/
├── services/
│   ├── chatService.ts
│   ├── bisService.ts
│   └── apiClient.ts
│
├── config/
│   └── api.ts
│
├── types/
│   ├── chat.ts
│   └── api.ts
│
├── data/
│   └── mock.ts
│
└── components/
    └── existing components remain unchanged where possible

Do not move unrelated components.

==================================================
3. API CONFIGURATION
==================================================

Create:

src/config/api.ts

Centralize API configuration.

Use environment variables.

Example concept:

VITE_API_BASE_URL

Do NOT hardcode production API URLs throughout the application.

Provide a safe development fallback such as:

http://localhost:3000

ONLY if appropriate for local development.

Never place API keys, private tokens, or secrets in VITE_* variables.

Remember that Vite environment variables prefixed with VITE_ are exposed to browser code.

==================================================
4. API TYPES
==================================================

Create:

src/types/api.ts

Define normalized request/response types.

Example:

type ChatRequest = {
  message: string;
  conversationId?: string;
  language: "EN" | "HI" | "TE";
};

type ChatResponse = {
  message: string;
  citations?: Citation[];
  conversationId?: string;
};

Use the existing Citation type from:

src/types/chat.ts

Do not duplicate Citation.

Also define an API error type.

Example concept:

type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

Keep the types simple and extensible.

==================================================
5. API CLIENT
==================================================

Create:

src/services/apiClient.ts

Responsibilities:

- construct API URLs
- make HTTP requests
- parse JSON
- handle non-2xx responses
- normalize basic network errors
- provide typed responses

Do NOT put chat-specific business logic here.

Create a reusable typed request helper where appropriate.

Example conceptual responsibility:

request<T>(endpoint, options): Promise<T>

The API client must NOT know about:

- MessageList
- ChatInput
- VoiceOverlay
- PhotoScanSheet
- CitationPanel

It is infrastructure only.

==================================================
6. CHAT SERVICE
==================================================

Create:

src/services/chatService.ts

This is the main abstraction used by the React application.

Expose a function such as:

sendChatMessage(request: ChatRequest): Promise<ChatResponse>

Responsibilities:

- call the appropriate API endpoint through apiClient
- convert backend response into the frontend ChatResponse format
- handle API errors consistently
- remain independent from React components

Do NOT call fetch directly from App.tsx.

Do NOT call fetch directly from ChatInput.tsx.

Do NOT call fetch directly from UserMessage or AssistantMessage.

The UI must communicate through chatService.ts.

==================================================
7. MOCK MODE
==================================================

IMPORTANT:

Do NOT remove the existing mock response functionality.

Create a simple configuration such as:

API_MODE = "mock" | "api"

or an equivalent environment-based approach.

Development should remain possible without a backend.

When mock mode is enabled:

sendChatMessage()
→ existing getSimulatedResponse()
→ normalized ChatResponse

When API mode is enabled:

sendChatMessage()
→ apiClient
→ backend endpoint
→ normalized ChatResponse

The React UI should NOT need to know which mode is active.

This is critical.

The component should simply call:

sendChatMessage()

==================================================
8. HANDLE SEND MESSAGE
==================================================

Preserve the existing centralized:

handleSendMessage(text)

Do NOT move all logic into chatService.

The responsibilities should remain separated.

App-level orchestration:

handleSendMessage()
- validates/normalizes input
- adds UserMessage
- sets typing state
- calls chatService
- receives normalized response
- adds AssistantMessage
- adds citations
- handles errors
- clears typing state

Service layer:

chatService
- communicates with backend/mock provider
- returns normalized data

UI components:
- display state
- trigger callbacks

==================================================
9. LOADING STATE
==================================================

Preserve the existing TypingIndicator.

When a request begins:

isTyping = true

When the request succeeds or fails:

isTyping = false

Do not create a second loading-state system.

Prevent accidental duplicate submissions while a request is active where appropriate.

The UI should remain responsive.

==================================================
10. ERROR HANDLING
==================================================

Add a clean frontend error path.

Possible errors:

- network failure
- API unavailable
- timeout
- invalid response
- server error
- unknown error

Create a user-friendly error state.

Example UI copy:

“Sorry, I couldn’t process that request. Please try again.”

Do not expose:

- stack traces
- internal server errors
- API keys
- implementation details
- raw HTTP responses

Keep the existing visual language.

Do NOT redesign the entire chat UI for errors.

Reuse existing components/styles where possible.

Provide a retry action where appropriate.

Retry should use the same centralized message/service architecture.

==================================================
11. CITATIONS
==================================================

The backend response may eventually contain citations.

Normalize them into the existing:

Citation[]

type.

Do NOT change CitationBadge or CitationPanel unnecessarily.

Existing citation behavior must continue to work:

AssistantMessage
→ CitationBadge
→ CitationPanel

The service layer should only provide normalized citation data.

Do NOT invent real BIS standards or clauses.

During mock mode, continue using placeholder standards such as:

IS XXXX

==================================================
12. LANGUAGE SUPPORT
==================================================

Pass the current application language to the chat service.

Supported:

EN
HI
TE

Example:

{
  message,
  conversationId,
  language
}

Do NOT implement actual translation logic.

Do NOT hardcode language behavior inside ChatInput.

The backend will eventually determine the response language.

==================================================
13. CONVERSATION ID
==================================================

Support an optional:

conversationId

The frontend should be able to send:

message
language
conversationId

The backend may return a conversationId.

If returned:

- store it in the appropriate application state
- reuse it for subsequent messages

Do NOT implement database persistence.

Do NOT implement authentication.

For now, the conversation ID may be temporary/in-memory.

==================================================
14. BIS SERVICE
==================================================

Create:

src/services/bisService.ts

Do NOT implement real BIS API integration yet.

Instead, establish the abstraction for future functionality.

Example conceptual functions:

getStandardDetails()
searchStandards()

These may remain unimplemented or return clearly marked mock data if needed.

The purpose is to establish a future boundary:

React
→ chatService
→ backend
→ BIS/knowledge layer

The React components should never directly communicate with BIS services.

==================================================
15. FRONTEND/BACKEND CONTRACT
==================================================

Document the expected future API contract in code comments or a small documentation file.

Example conceptual endpoint:

POST /api/chat

Request:

{
  "message": "How do I check BIS certification?",
  "conversationId": "optional-id",
  "language": "EN"
}

Response:

{
  "message": "Response text...",
  "conversationId": "conversation-id",
  "citations": [
    {
      "id": "citation-1",
      "standardNumber": "IS XXXX",
      "title": "Example Standard",
      "clause": "Example clause",
      "snippet": "Example source snippet"
    }
  ]
}

IMPORTANT:

This is only the frontend contract.

Do not create a fake production backend.

==================================================
16. SECURITY
==================================================

Do NOT:

- put API secrets in client-side code
- hardcode tokens
- commit .env files
- expose private keys
- create fake authentication
- store sensitive credentials in localStorage

If an API eventually requires secrets, those requests should be routed through a secure server-side layer.

Because the current application is Vite, do not pretend that browser environment variables are secret.

==================================================
17. TIMEOUTS AND REQUEST CANCELLATION
==================================================

Implement a reasonable request timeout or AbortController pattern in the API client if it fits the current architecture.

The UI should not remain permanently stuck in:

“Thinking…”

If a request fails or is cancelled:

- clear typing state
- show an appropriate error
- allow retry

Do not create unnecessary complexity.

==================================================
18. ABORT / NEW CHAT SAFETY
==================================================

Handle this case:

User sends message
→ request starts
→ user clicks New Chat

The old request must not corrupt the newly created conversation.

If practical, use request identity or AbortController.

At minimum, verify that stale responses cannot unexpectedly append messages to a new conversation.

Preserve the existing New Chat behavior.

==================================================
19. VOICE AND OCR
==================================================

Do NOT create separate API systems for voice and OCR.

They must continue to use:

handleSendMessage()

Voice:

Voice transcript
→ user confirmation
→ handleSendMessage()
→ chatService

OCR:

OCR result
→ user editing
→ ChatInput
→ handleSendMessage()
→ chatService

Do not bypass the central message flow.

Do not implement real speech recognition or real OCR in this step.

==================================================
20. QUICK ACTIONS AND PROMPTS
==================================================

PromptCards and QuickActionChips must continue using:

handleSendMessage()

Do not create special API calls for them.

==================================================
21. REACT COMPONENT RULE
==================================================

Components should NOT know:

- API URLs
- HTTP methods
- fetch()
- authentication headers
- backend response formats

Components only know application-level callbacks and state.

For example:

ChatInput
→ onSend(text)

App
→ handleSendMessage(text)

handleSendMessage
→ chatService.sendChatMessage()

This separation must remain clear.

==================================================
22. TYPESCRIPT QUALITY
==================================================

Use strict TypeScript.

Requirements:

- no unnecessary any
- no duplicated types
- no unsafe type assertions unless justified
- explicit service return types
- typed API responses
- typed errors where practical

Keep:

src/types/chat.ts

as the canonical location for chat domain types.

Keep:

src/types/api.ts

for API-specific request/response types.

==================================================
23. FILE ORGANIZATION
==================================================

After implementation, the project should conceptually look like:

src/
├── components/
│   ├── layout/
│   ├── chat/
│   ├── citations/
│   ├── voice/
│   ├── photo/
│   └── settings/
│
├── config/
│   └── api.ts
│
├── data/
│   └── mock.ts
│
├── hooks/
│   └── useIsMobile.ts
│
├── services/
│   ├── apiClient.ts
│   ├── chatService.ts
│   └── bisService.ts
│
├── types/
│   ├── api.ts
│   └── chat.ts
│
└── App.tsx

Adapt paths to the project's existing structure rather than unnecessarily moving working files.

==================================================
24. TEST THE TWO MODES
==================================================

Verify:

MODE 1 — MOCK

User message
→ handleSendMessage()
→ chatService
→ mock provider
→ response
→ AssistantMessage

MODE 2 — API

User message
→ handleSendMessage()
→ chatService
→ apiClient
→ configured endpoint
→ normalized response
→ AssistantMessage

If no backend endpoint exists yet, API mode should fail gracefully rather than breaking the application.

==================================================
25. QA CHECKLIST
==================================================

Verify all existing functionality still works:

[ ] Empty state works
[ ] Prompt cards work
[ ] ChatInput works
[ ] Quick actions work
[ ] User messages render
[ ] Assistant messages render
[ ] TypingIndicator works
[ ] Mock responses still work
[ ] Citations still work
[ ] CitationPanel still works
[ ] Voice still works
[ ] Voice confirmation uses handleSendMessage
[ ] Photo/OCR still works
[ ] OCR only prefills input
[ ] Settings still work
[ ] EN/HI/TE still work
[ ] Text size still works
[ ] New Chat still works
[ ] History still works
[ ] Overlay mutual exclusion still works
[ ] Reduced motion still works
[ ] API errors are handled
[ ] Loading state clears after errors
[ ] Retry works if implemented
[ ] No API secrets exposed
[ ] No direct fetch calls inside UI components
[ ] No duplicate API/state logic
[ ] TypeScript passes
[ ] Lint passes
[ ] Production build passes

==================================================
26. IMPORTANT NON-GOALS
==================================================

DO NOT implement:

- real OpenAI/LLM integration
- real BIS API
- real OCR
- real speech recognition
- authentication
- database
- user accounts
- payments
- analytics
- production deployment
- Next.js migration
- new UI features
- redesign

This step is ONLY about creating the API-ready service architecture.

==================================================
27. FINAL ACCEPTANCE CRITERIA
==================================================

At the end of Step 10:

1. The existing UI looks unchanged.

2. The existing prototype still works.

3. React components do not directly call APIs.

4. handleSendMessage() remains the central message orchestration point.

5. chatService.ts is the application's chat API boundary.

6. apiClient.ts handles generic HTTP communication.

7. api.ts contains API configuration.

8. api.ts types are centralized in src/types/api.ts.

9. Chat domain types remain centralized in src/types/chat.ts.

10. Mock mode still works.

11. API mode is ready for a future backend.

12. Errors are handled cleanly.

13. No secrets are exposed.

14. TypeScript passes.

15. Production build passes.

STOP HERE.

Do not implement the actual AI/BIS backend yet.

The next step after this will be defining and connecting the real backend/AI + BIS knowledge architecture.