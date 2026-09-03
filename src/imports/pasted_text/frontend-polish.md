STEP 11 — FRONTEND POLISH + PRODUCTION UX REFINEMENT

Continue from the existing Standards Mitra Vite + React + TypeScript project.

IMPORTANT:
- Keep the project frontend-only.
- DO NOT create a `server/` folder.
- DO NOT create a backend.
- DO NOT migrate to Next.js.
- DO NOT add database, authentication, AI API, or BIS API integrations.
- DO NOT redesign the product from scratch.
- Preserve all functionality completed in Steps 1–10.
- Improve the existing UI and interaction quality without breaking the current architecture.

CURRENT ARCHITECTURE

The project already contains:

src/
├── components/
├── config/
├── services/
│   ├── apiClient.ts
│   ├── chatService.ts
│   └── bisService.ts
├── types/
└── App.tsx

Keep this architecture.

The existing API-ready service layer must remain intact.


GOAL

Take the current Standards Mitra frontend from a functional prototype to a polished, production-quality frontend experience.

Focus on:

1. Visual consistency
2. Responsive behavior
3. Accessibility
4. Empty state quality
5. Chat readability
6. Citation UX
7. Voice UX
8. Photo/OCR UX
9. Settings UX
10. Loading/error states
11. Micro-interactions
12. Mobile usability


1. DESIGN SYSTEM REFINEMENT

Create or refine centralized design tokens.

Maintain the existing visual direction:

- White/off-white background
- Dark slate text
- Navy trust accent
- Muted saffron/blue BIS-inspired accents
- Subtle borders
- Soft shadows
- 12–16px corner radii
- Inter/system sans-serif
- Clear hierarchy
- Calm professional government-service feel

Do not make the interface overly colorful.

Avoid excessive gradients, glassmorphism, heavy shadows, or decorative effects.

The product should feel:

TRUSTWORTHY
CLEAR
ACCESSIBLE
MODERN
PROFESSIONAL


2. DESKTOP APP SHELL

Refine the desktop layout around approximately:

1440 × 900

Maintain:

- Collapsible left sidebar
- Standards Mitra branding
- Conversation history
- New Chat
- Header
- Language selector
- Status indicator
- Center chat area
- Sticky chat input

Improve spacing and alignment.

Ensure the chat column has a comfortable readable width instead of stretching across the entire screen.


3. MOBILE EXPERIENCE

Optimize for approximately:

390 × 844

The mobile interface must not feel like a compressed desktop version.

Ensure:

- Sidebar becomes a mobile drawer/sheet
- Header remains compact
- Chat messages remain readable
- Input remains accessible above the keyboard
- Voice controls remain easy to tap
- Camera/photo controls remain easy to tap
- Citation panel becomes a bottom sheet
- Settings becomes a bottom sheet
- No horizontal scrolling
- Buttons have comfortable touch targets


4. EMPTY STATE

Refine the empty state.

Use the existing heading:

"Ask anything about Indian Standards"

Keep 3–4 useful prompt cards.

Example prompts:

"What is an Indian Standard?"
"How do I find the right BIS standard?"
"What does a BIS certification mark mean?"
"Help me understand a standard clause"

Cards should feel useful rather than decorative.

Make the empty state visually balanced on both desktop and mobile.


5. CHAT MESSAGE UX

Improve UserMessage and AssistantMessage.

Assistant responses should have:

- Comfortable line height
- Clear paragraphs
- Good spacing between sections
- Easy-to-scan lists
- Citation badges integrated naturally
- No excessively wide text blocks

User messages should remain visually distinct without overpowering assistant content.

Avoid large chat bubbles that waste screen space.


6. THINKING / LOADING STATE

Refine the existing TypingIndicator.

Use:

"Thinking…"

Keep the animation subtle.

Respect:

prefers-reduced-motion

When reduced motion is enabled:

- Remove pulsing animations
- Avoid unnecessary transitions
- Keep the indicator visible but static


7. ERROR STATE

Keep the existing amber error card.

It should clearly communicate:

- Something went wrong
- The answer was not completed
- User can retry

Keep:

"Try again"

The retry action must reuse the existing retry flow.

Do not create a new error architecture.


8. CITATION EXPERIENCE

Refine CitationBadge.

Citation badges should look trustworthy and easy to recognize.

Example:

IS 3025
Clause 5.2

Clicking a citation should open the existing citation detail panel.

Desktop:
- Right-side panel

Mobile:
- Bottom sheet

The panel should contain:

- Standard number
- Standard title
- Clause
- Short source snippet
- "View full standard"

Do not invent actual BIS content.

Keep the existing prototype-only behavior for "View full standard".


9. VOICE EXPERIENCE

Preserve the existing voice states:

- Idle
- Listening
- Preview
- Processing
- Cancelled
- Error

Improve visual clarity between states.

Important:

The active microphone state should use the existing navy trust accent.

Do NOT use red for normal listening.

Reserve red for actual destructive/error situations.

Voice flow:

Tap microphone
↓
Listening
↓
Transcript preview
↓
User confirms/edits
↓
Send

Never automatically send the transcript.


10. PHOTO / OCR EXPERIENCE

Preserve the existing photo workflow:

Options
↓
Preview
↓
Scanning
↓
OCR result
↓
Editing
↓
Use text
↓
Populate chat input

Do NOT auto-submit OCR text.

Improve the scanning state visually with a subtle scanning indicator.

Respect reduced-motion preferences.

Make the OCR result easy to edit before sending.


11. SETTINGS

Preserve:

Languages:

EN
HI
TE

Text sizes:

Default
Large

Ensure the selected option has a clear visual state.

Settings behavior:

Desktop:
Anchored popover/panel

Mobile:
Bottom sheet

Escape should close the panel.

Focus should remain accessible.


12. ACCESSIBILITY

Improve accessibility throughout the app.

Add:

- Semantic buttons
- Proper aria-labels
- Visible keyboard focus
- Logical tab order
- Accessible dialogs/sheets
- Escape-to-close overlays
- Screen-reader-friendly labels
- Sufficient text contrast
- Touch targets around 44px where practical

Do not rely only on color to communicate state.


13. OVERLAY BEHAVIOR

Ensure only one major overlay is open at a time.

Possible overlays:

- Sidebar
- Citation panel
- Voice panel
- Photo panel
- Settings panel

Opening one should close conflicting overlays.

Escape should close the active overlay.

Clicking outside should close dismissible overlays where appropriate.

Do not introduce complicated state-management libraries.


14. CHAT INPUT

Refine the sticky ChatInput.

It should contain:

- Text input
- Microphone
- Camera/photo
- Send

Ensure:

- Send is disabled when there is no message
- Enter sends where appropriate
- Shift+Enter creates a new line where supported
- Input remains usable on mobile
- Focus states are visible

Do not change the existing API/service architecture.


15. CONVERSATION HISTORY

Improve the sidebar history presentation.

Keep placeholder/demo conversations if there is no real persistence.

Make the currently selected conversation visually distinct.

Clicking a history item should close any open overlay.

New Chat should:

- Clear current messages
- Reset temporary voice/photo/citation state
- Preserve language
- Preserve text-size preference


16. MICRO-INTERACTIONS

Add subtle transitions for:

- Sidebar opening/closing
- Citation panel
- Settings panel
- Button hover
- Button press
- Prompt cards
- Message appearance

Keep animations short and restrained.

Respect:

prefers-reduced-motion


17. RESPONSIVE BREAKPOINTS

Test the UI at:

390 × 844
768 × 1024
1024 × 768
1440 × 900

Look specifically for:

- Overflow
- Broken spacing
- Text wrapping problems
- Buttons becoming too small
- Sticky input issues
- Overlay positioning
- Sidebar behavior


18. DO NOT CHANGE THE SERVICE ARCHITECTURE

The following must remain the source of truth:

src/services/apiClient.ts
src/services/chatService.ts
src/services/bisService.ts

React components must NOT contain direct fetch calls.

Do not move API logic into components.

Do not introduce duplicate API clients.


19. TYPESCRIPT QUALITY

Keep the existing TypeScript architecture.

Remove:

- unused imports
- unused variables
- unnecessary `any`
- duplicated types
- dead code

Do not introduce TypeScript errors.


20. FINAL QA

After implementation:

1. Run TypeScript checks.
2. Run the production build.
3. Verify desktop layout.
4. Verify mobile layout.
5. Test New Chat.
6. Test sending a message.
7. Test retry.
8. Test citation panel.
9. Test language switching.
10. Test text-size switching.
11. Test voice states.
12. Test photo/OCR states.
13. Test Escape behavior.
14. Test keyboard navigation.
15. Test reduced-motion behavior.
16. Verify no horizontal scrolling.
17. Verify no backend/server folder was created.

IMPORTANT:

This step is ONLY about polishing and strengthening the existing frontend.

Do not add backend infrastructure.

Do not replace the existing application architecture.

Do not redesign the product.

Make the existing Standards Mitra frontend feel like a polished, trustworthy, accessible production application while preserving everything already implemented.