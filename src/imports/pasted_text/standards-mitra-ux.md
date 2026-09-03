STEP 12 — REALISTIC STANDARDS MITRA CONTENT + CONVERSATION UX

Continue from the existing Standards Mitra Vite + React + TypeScript project.

IMPORTANT:
- Keep the project frontend-only.
- DO NOT create a server/ folder.
- DO NOT create a backend.
- DO NOT add a database.
- DO NOT add authentication.
- DO NOT connect to a real AI API.
- DO NOT connect to a real BIS API.
- DO NOT migrate to Next.js.
- DO NOT redesign the application from scratch.
- Preserve all functionality from Steps 1–11.
- Keep the existing API-ready service architecture intact.
- This step is focused on making the prototype feel like a realistic, polished Standards Mitra product.


PRIMARY GOAL

Make Standards Mitra feel like a believable AI assistant for Indian Standards while remaining a frontend prototype.

Focus on:

1. Realistic demo conversations
2. Better multi-turn conversation behavior
3. Follow-up suggestion chips
4. Better citation examples
5. More useful conversation history
6. Stronger empty-to-active conversation transition
7. Better loading and error UX
8. Hindi and Telugu demo states
9. Consistent desktop/mobile behavior
10. Final product-demo polish


1. REALISTIC DEMO CONTENT

Update the mock conversation data so the application feels like a genuine Standards Mitra demo.

Create realistic example conversations around:

- Understanding an Indian Standard
- Finding the right BIS standard
- BIS certification
- BIS certification marks
- Understanding a standard clause
- Hallmarking
- Consumer guidance
- Product compliance questions

IMPORTANT:

These are DEMO responses only.

Do not invent specific legal requirements, certification rules, clause numbers, or factual BIS claims unless they are clearly represented as simulated/demo content.

Avoid presenting fictional information as verified BIS information.

Where a response needs factual specificity that is not available in the frontend prototype, use wording such as:

"Demo response — verified BIS source information will appear here when the live knowledge service is connected."


2. MULTI-TURN CONVERSATIONS

Improve the mock chat behavior so conversations feel continuous.

Example:

User:
"What is an Indian Standard?"

Assistant:
"An Indian Standard is a documented standard developed or adopted to establish requirements, specifications, methods, or guidance for products, services, or processes."

Then offer follow-ups such as:

"What does BIS certification mean?"
"How do I find a standard?"
"Show me an example"

If the user selects a follow-up, add it as a new user message and generate the corresponding demo assistant response.

Do not actually call an external AI service.

Use the existing mock chat service architecture.


3. FOLLOW-UP CHIPS

Add contextual follow-up chips underneath assistant responses where appropriate.

Examples:

"What does BIS certification mean?"
"How can I find the standard?"
"Explain this clause"
"What should a consumer check?"
"Tell me more"

Follow-up chips should:

- Be visually subtle
- Fit the existing design system
- Be keyboard accessible
- Have visible hover/focus states
- Work on mobile
- Trigger the existing send-message flow

Do not show excessive chips.

Prefer 2–4 useful suggestions.


4. CITATION DEMO CONTENT

Improve citation examples so they feel realistic without pretending they are live verified sources.

Use the existing CitationBadge and CitationDetailPanel.

Example structure:

Standard:
"IS XXXX"

Title:
"Demo Indian Standard"

Clause:
"Example clause"

Snippet:
"Demo source excerpt — live verified BIS content will appear when the knowledge service is connected."

Clearly distinguish prototype/demo source content from verified live source content.

Do not invent official BIS document URLs.

Keep "View full standard" as prototype-only behavior.


5. CONVERSATION HISTORY

Improve the sidebar history.

Use several realistic demo conversation titles.

Examples:

"Understanding Indian Standards"
"BIS certification basics"
"Finding a product standard"
"Understanding a standard clause"
"Hallmarking questions"

Keep history as frontend demo data.

Do not add persistence or accounts.

Clicking a conversation should load its demo messages.

The active conversation should be visually distinct.


6. NEW CHAT FLOW

Improve the transition from an active conversation to a new chat.

When New Chat is clicked:

- Clear current messages
- Reset citation state
- Reset voice state
- Reset photo/OCR state
- Keep selected language
- Keep selected text size
- Return to the empty state

Do not reload the entire page.


7. EMPTY STATE → ACTIVE CHAT

Make the transition feel polished.

Initial state:

"Ask anything about Indian Standards"

with prompt cards.

After sending a prompt:

- Hide the empty-state prompt cards
- Show the conversation
- Keep the chat input fixed/sticky
- Scroll naturally toward the newest message
- Show the Thinking state
- Then display the simulated assistant response

Do not abruptly jump the interface.


8. SMART MOCK RESPONSES

Improve the existing mock response logic.

Create a clear mapping between demo questions and demo answers.

For example:

"What is an Indian Standard?"
"What does BIS certification mean?"
"How do I find the right BIS standard?"
"What is a standard clause?"
"What does a BIS certification mark mean?"

Each should produce a useful demo response.

Unknown questions should produce a safe generic response such as:

"I'm currently running in demo mode. This question will be answered using verified BIS sources when the live knowledge service is connected."


9. LANGUAGE DEMO STATES

Preserve:

EN
HI
TE

Improve visible UI labels and demo content for language switching.

At minimum, translate:

- New Chat
- Settings
- Send
- Thinking
- Try again
- Ask anything about Indian Standards
- Voice controls
- Photo/OCR controls
- Citation panel labels

Use natural UI translations.

Do not claim that the underlying AI is multilingual in the prototype.

If complete demo translations are not available, keep the UI translation and clearly preserve the demo nature of responses.


10. TEXT SIZE

Ensure the existing:

Default
Large

text-size setting affects:

- Chat messages
- Headings
- Prompt cards
- Citation details
- Sidebar content
- Input text

Do not allow enlarged text to cause horizontal overflow.


11. MESSAGE FORMATTING

Build on the existing bullet-list rendering.

Assistant responses should support:

- Paragraphs
- Bullet lists
- Short headings where appropriate
- Citation badges
- Follow-up chips

Keep responses visually scannable.

Avoid huge blocks of text.

Do not introduce markdown rendering libraries unless genuinely necessary.


12. MESSAGE AUTO-SCROLL

Improve conversation scrolling.

When a new user message is sent:

- Scroll toward the latest message.

When the assistant response appears:

- Keep the newest content visible without aggressively forcing the user to the bottom if they have manually scrolled upward.

Do not create jarring scrolling.


13. LOADING UX

Use the existing:

"Thinking…"

state.

Improve timing so the prototype feels natural.

Avoid extremely long artificial delays.

The loading state must clear when:

- Response succeeds
- Response errors
- Request is cancelled
- New Chat is selected


14. ERROR + RETRY UX

Preserve the existing amber error message.

Example:

"Something went wrong. Please try again."

Keep:

"Try again"

The retry action must reuse the existing retry architecture.

Do not duplicate the user's message unnecessarily.


15. VOICE + PHOTO CONSISTENCY

Do not rebuild the existing voice and photo/OCR systems.

Only ensure that they integrate naturally with the conversation flow.

Voice:

Listening
→ Preview
→ Confirm
→ Send

Photo:

Options
→ Preview
→ Scanning
→ OCR
→ Edit
→ Use text
→ Populate input

Neither flow should auto-submit without user confirmation.


16. DESKTOP QA

Optimize for:

1440 × 900

Verify:

- Sidebar width
- Chat column width
- Header alignment
- Empty state position
- Message spacing
- Citation panel
- Settings panel
- Voice panel
- Photo panel
- Sticky input
- Follow-up chips


17. MOBILE QA

Optimize for:

390 × 844

Verify:

- No horizontal scrolling
- Comfortable message width
- Bottom input behavior
- Bottom sheets
- Mobile sidebar
- Follow-up chip wrapping
- Citation readability
- Voice controls
- Photo controls
- Large text mode


18. ACCESSIBILITY

Maintain:

- Keyboard navigation
- Visible focus
- Semantic buttons
- ARIA labels where appropriate
- Escape-to-close overlays
- Logical tab order
- Screen-reader-friendly controls

Ensure follow-up chips are keyboard accessible.

Ensure citation badges can be activated with keyboard controls.

Respect:

prefers-reduced-motion


19. VISUAL POLISH

Use subtle interaction states for:

- Prompt cards
- Follow-up chips
- Sidebar items
- Send button
- Microphone button
- Camera button
- Citation badges

Keep the existing professional visual language.

Avoid:

- Excessive animation
- Bright gradients
- Large decorative illustrations
- Excessive shadows
- Gamification
- Unnecessary UI elements


20. DATA ORGANIZATION

Keep demo data separate from UI components.

Prefer structures such as:

src/data/
  mockConversations.ts
  mockResponses.ts
  mockCitations.ts

If equivalent data files already exist, extend them instead of duplicating them.

Keep the canonical domain types in:

src/types/chat.ts

Do not create duplicate Message or Citation types.


21. SERVICE ARCHITECTURE

Keep:

src/services/apiClient.ts
src/services/chatService.ts
src/services/bisService.ts

The mock chat implementation should remain behind `chatService.ts`.

Do not put response-generation logic directly inside React components.

React components should remain responsible for presentation and user interaction.


22. NO FAKE LIVE DATA

This is extremely important.

Do NOT make demo content appear to be retrieved live from BIS.

Do NOT display:

"Verified by BIS"

unless it is actually connected to verified source data.

Use clear prototype/demo wording where appropriate.


23. FINAL QA

After implementation:

1. Run TypeScript checks.
2. Run production build.
3. Test empty state.
4. Test prompt cards.
5. Test multi-turn conversation.
6. Test follow-up chips.
7. Test conversation history.
8. Test New Chat.
9. Test citation panel.
10. Test voice flow.
11. Test photo/OCR flow.
12. Test EN/HI/TE switching.
13. Test Default/Large text.
14. Test retry.
15. Test keyboard navigation.
16. Test Escape behavior.
17. Test reduced-motion behavior.
18. Test 390 × 844.
19. Test 1440 × 900.
20. Confirm there is NO server/ folder.
21. Confirm there is NO backend implementation.
22. Confirm there are zero TypeScript errors.
23. Confirm production build succeeds.

FINAL REQUIREMENT:

Standards Mitra should now feel like a polished, realistic AI assistant prototype for Indian Standards.

Keep the product calm, trustworthy, accessible, and simple.

Do not add backend infrastructure.

Do not replace existing architecture.

Do not break Steps 1–11.

Only improve the frontend experience and realistic demo behavior.