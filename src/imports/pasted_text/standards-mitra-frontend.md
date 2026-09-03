STEP 9 — STANDARDS MITRA: CONVERT THE APPROVED UI INTO A REAL NEXT.JS + REACT FRONTEND

PROJECT GOAL

Build the actual working frontend for “Standards Mitra” based on the completed Figma design and the approved Steps 1–8.

IMPORTANT:
- Do NOT redesign the UI.
- Do NOT add new product features.
- Treat the approved Figma design as the visual source of truth.
- Preserve the existing interaction behavior from Steps 1–8.
- The goal is a clean, maintainable, production-ready React/Next.js frontend foundation.
- Backend/API integrations are NOT part of this step.

==================================================
1. TECHNOLOGY
==================================================

Use:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS or the project's existing styling system
- Strict TypeScript
- Responsive CSS
- Accessible semantic HTML

The application must compile cleanly with no TypeScript errors.

Avoid unnecessary `any`.

Do not duplicate types or state definitions.

==================================================
2. PROJECT STRUCTURE
==================================================

Create a clean structure:

app/
  layout.tsx
  page.tsx
  globals.css

components/
  layout/
    AppShell.tsx
    Sidebar.tsx
    Header.tsx

  chat/
    EmptyState.tsx
    PromptCard.tsx
    MessageList.tsx
    UserMessage.tsx
    AssistantMessage.tsx
    TypingIndicator.tsx
    QuickActionChip.tsx
    ChatInput.tsx

  citations/
    CitationBadge.tsx
    CitationPanel.tsx
    PanelContent.tsx

  voice/
    VoiceOverlay.tsx
    VoiceStatus.tsx
    VoiceWaveform.tsx
    VoiceTranscript.tsx
    VoiceControls.tsx

  photo/
    PhotoScanSheet.tsx
    PhotoCaptureOptions.tsx
    PhotoPreview.tsx
    ScanProgress.tsx
    OcrResult.tsx
    ScanError.tsx

  settings/
    SettingsPanel.tsx
    LanguageSelector.tsx
    TextSizeControl.tsx

hooks/
  useIsMobile.ts

types/
  chat.ts

data/
  mock.ts

==================================================
3. CANONICAL TYPES
==================================================

Create ONE canonical source of truth:

types/chat.ts

Use:

type Language = "EN" | "HI" | "TE";

type TextSize = "default" | "large";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
};

type Citation = {
  id: string;
  standardNumber: string;
  title: string;
  clause?: string;
  snippet?: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

Also define the existing voice and photo state unions in this shared types file.

Do NOT create duplicate definitions inside individual components.

==================================================
4. APPLICATION STATE
==================================================

Keep the centralized application state architecture from Step 7.

The main application should manage:

language
textSize
inputValue
messages
isTyping
citationPanelOpen
selectedCitation
voiceState
photoScanState
settingsOpen
activeConversationId

Use React state/hooks appropriately.

Do not introduce unnecessary global state libraries.

==================================================
5. CENTRALIZED MESSAGE SENDING
==================================================

There must be ONE central function:

handleSendMessage(text: string)

This function is the single entry point for sending messages.

It must be used by:

- ChatInput
- PromptCard
- QuickActionChip
- Voice transcript confirmation
- OCR text confirmation

The flow should be:

User submits message
→ add UserMessage
→ show TypingIndicator
→ simulate assistant response
→ show AssistantMessage
→ display mock CitationBadge when applicable

Do not duplicate this logic across components.

==================================================
6. EMPTY STATE
==================================================

Preserve the approved Step 1 design.

Desktop:

1440 × 900 reference.

Include:

- Sidebar
- Header
- EmptyState
- PromptCards
- ChatInput

Preserve the existing spacing, typography, colors, borders, icon sizes, and rounded corners.

Do not redesign the empty state.

==================================================
7. ACTIVE CHAT
==================================================

Implement the approved Step 2 architecture.

Structure:

MainContent
  Header
  ChatArea
    MessageList
      UserMessage
      AssistantMessage
      TypingIndicator
    QuickActionChip area
    ChatInput

User messages should preserve the existing light #eef2f8 treatment.

Assistant messages should preserve:

- Standards Mitra sender label
- existing avatar
- multi-paragraph formatting
- citation badges

TypingIndicator must preserve the existing animated dots and “Thinking…” behavior.

==================================================
8. CITATIONS
==================================================

Preserve Step 3 exactly.

CitationBadge:

- accessible
- keyboard reachable
- minimum 44px effective hit area
- visible focus state

Clicking a citation must:

set selectedCitation
→ open CitationPanel

Desktop:

- right-side panel
- approximately 352px wide
- conversation remains visible

Mobile:

- bottom sheet
- backdrop
- drag handle
- maximum-height behavior

Use the existing PanelContent hierarchy.

Do not connect to real BIS documents yet.

Keep:

“Prototype only — link not yet connected”

for the View Full Standard action.

==================================================
9. VOICE
==================================================

Preserve Step 4.

Voice state machine:

idle
listening
preview
processing
cancelled
error

Flow:

Mic clicked
→ Listening
→ simulated transcript
→ Transcript Preview
→ user can edit
→ user confirms
→ handleSendMessage()

Do NOT implement real speech recognition.

Do NOT automatically submit the transcript without user confirmation.

Preserve:

- waveform
- reduced-motion behavior
- focus management
- Escape handling
- accessibility
- mobile bottom-sheet behavior
- desktop inline behavior

Use the existing trust/active accent rather than introducing red as a normal active state.

Red should only communicate an actual error/destructive state.

==================================================
10. PHOTO / OCR
==================================================

Preserve Step 5.

Flow:

Camera
→ Capture/Upload Options
→ Image Preview
→ Scanning
→ OCR Result
→ Editing
→ Use Text
→ populate ChatInput
→ user edits
→ user manually sends

IMPORTANT:

OCR must NEVER automatically send the message.

Use the existing:

prefillText
prefillOnce

behavior.

Do NOT implement real OCR yet.

Use the existing prototype image behavior.

Preserve:

- scanning animation
- corner markers
- reduced-motion support
- mobile bottom sheet
- desktop inline layout
- focus management
- Escape handling
- accessible controls

==================================================
11. SETTINGS + LANGUAGE
==================================================

Preserve Step 6.

Languages:

EN
HI
TE

Text size:

default
large

Use the existing translations for:

New Chat
Recent
Settings
EmptyState heading
EmptyState supporting text

The Header language selector and SettingsPanel must use the SAME language state.

Changing language should update the appropriate UI labels consistently.

Do not implement account settings, theme settings, authentication, or backend persistence.

==================================================
12. NEW CHAT
==================================================

New Chat must:

- clear messages
- clear active conversation
- close citation panel
- clear selected citation
- close voice
- close photo scanner
- close settings
- reset temporary UI states

It must preserve:

- selected language
- selected text size

==================================================
13. CONVERSATION HISTORY
==================================================

Preserve the existing sidebar history UI.

History entries can remain prototype placeholders.

If a placeholder conversation is selected:

- close voice
- close photo
- close settings
- close citation panel
- clear citation selection

Do NOT pretend that historical message data exists if it does not.

==================================================
14. RESPONSIVE DESIGN
==================================================

Desktop reference:

1440 × 900

Mobile reference:

390 × 844

Preserve the approved responsive behavior.

Desktop:

- visible sidebar
- centered chat
- right citation panel
- inline voice/photo UI where already designed

Mobile:

- sidebar drawer
- full-width chat
- sticky input
- horizontal quick-action chips
- bottom sheets for citation/settings/voice/photo where already specified

Use the existing reactive:

useIsMobile()

Do NOT rely on a one-time:

window.innerWidth

check.

Avoid hydration problems.

==================================================
15. ACCESSIBILITY
==================================================

Preserve all accessibility work from Steps 1–8.

Include:

- semantic HTML
- keyboard navigation
- visible focus-visible states
- ARIA labels
- appropriate dialog semantics
- aria-modal where appropriate
- Escape to close overlays
- focus restoration
- minimum 44px interactive targets
- accessible language selector
- accessible citation buttons
- accessible voice controls
- accessible photo controls

Do not remove existing accessibility behavior just to simplify implementation.

==================================================
16. REDUCED MOTION
==================================================

Preserve the existing:

prefers-reduced-motion

implementation.

Animations should become effectively static when reduced motion is enabled.

Important state changes must remain visually understandable even without animation.

==================================================
17. MOCK DATA
==================================================

Keep mock data centralized in:

data/mock.ts

Use placeholder standards such as:

IS XXXX

Do not invent real BIS standards, real clauses, real certification claims, or fake official BIS URLs.

Keep:

getSimulatedResponse()

as the single mock-response source.

Use data-driven rendering wherever possible.

==================================================
18. DESIGN SYSTEM
==================================================

Preserve the existing approved design tokens.

Important values include:

Sidebar:
248px

Header:
60–64px

Input controls:
minimum 44px effective touch target

EmptyState:
existing approved 28px heading
existing approved 15px supporting text

Colors:
- white/off-white surfaces
- dark slate text
- navy trust accent
- existing citation accent
- subtle borders

Do not introduce a new visual system.

==================================================
19. COMPONENT RESPONSIBILITY
==================================================

Keep components focused.

For example:

ChatInput:
- input UI
- input state
- submit interaction
- microphone/camera triggers

App:
- application state
- orchestration
- centralized message sending

CitationPanel:
- panel shell

PanelContent:
- reusable citation content

VoiceOverlay:
- voice state machine and voice UI

PhotoScanSheet:
- photo/OCR state machine and photo UI

SettingsPanel:
- settings UI

Do not put the entire application into one giant component.

==================================================
20. FRONTEND/BACKEND BOUNDARY
==================================================

This step is FRONTEND ONLY.

Do NOT implement:

- database
- authentication
- user accounts
- BIS API
- AI API
- real OCR
- real speech recognition
- analytics
- payment
- production document downloads

Create clean interfaces so these can be added later.

For example, keep simulated response generation behind a function that can later be replaced by an API service.

==================================================
21. CODE QUALITY
==================================================

Before finishing:

- run TypeScript checking
- run linting
- run the production build
- fix all compile errors
- fix hydration warnings
- remove duplicate types
- remove unused imports
- remove unnecessary console errors
- verify responsive behavior
- verify keyboard behavior

Do not hide TypeScript errors with `any`.

==================================================
22. FINAL QA CHECKLIST
==================================================

Verify:

[ ] Empty state works
[ ] Prompt cards send messages
[ ] ChatInput sends messages
[ ] Quick actions send messages
[ ] User messages render
[ ] Assistant messages render
[ ] Typing indicator works
[ ] Citations open correctly
[ ] Citation panel works on desktop
[ ] Citation panel works on mobile
[ ] Voice flow works
[ ] Voice transcript can be edited
[ ] Voice confirmation sends through handleSendMessage
[ ] Photo flow works
[ ] OCR result can be edited
[ ] OCR “Use Text” only prefills input
[ ] OCR does not auto-send
[ ] Settings works
[ ] EN/HI/TE works
[ ] Text size works
[ ] New Chat works
[ ] History interaction works
[ ] Voice/photo mutual exclusion works
[ ] Escape closes overlays
[ ] Focus returns correctly
[ ] Reduced motion works
[ ] Mobile layout works
[ ] Desktop layout works
[ ] TypeScript passes
[ ] Lint passes
[ ] Production build passes

==================================================
FINAL RULE
==================================================

Do not add features.

Do not redesign.

Do not change the approved UX.

Convert the existing Standards Mitra Figma prototype into a clean, working, maintainable Next.js + React + TypeScript frontend while preserving the exact architecture and interactions established in Steps 1–8.

STOP after the frontend implementation and QA are complete.