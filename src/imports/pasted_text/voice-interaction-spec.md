STEP 4 — VOICE INTERACTION FOR STANDARDS MITRA

IMPORTANT:
Continue from the existing Standards Mitra Figma design and React/Next.js-oriented component architecture created in Steps 1–3.

DO NOT redesign, replace, or restyle the existing approved work from Steps 1–3.

This step ONLY adds the voice interaction flow.

The existing visual system, spacing, typography, colors, components, responsive behavior, and interaction patterns must remain consistent.

==================================================
1. OBJECTIVE
==================================================

Add a complete voice-input interaction for Standards Mitra.

The user should be able to:

1. Click/tap the existing microphone button.
2. Enter a listening state.
3. See clear listening feedback.
4. See a live transcript preview.
5. Stop/pause recording.
6. Review/edit the transcript before sending.
7. Send the transcript as a normal chat message.
8. Return to the normal ChatInput state.

This is a FRONTEND PROTOTYPE.

Do NOT implement real speech-recognition APIs, microphone permissions, backend calls, or audio processing.

Use realistic simulated state transitions so the prototype demonstrates the intended UX.

==================================================
2. DO NOT CHANGE EXISTING FEATURES
==================================================

Keep these existing elements exactly as they currently exist:

- Sidebar
- New Chat
- Recent conversation list
- Header
- Standards Mitra branding
- EN / HI / TE language selector
- Online status
- Empty state
- Prompt cards
- UserMessage
- AssistantMessage
- TypingIndicator
- CitationBadge
- QuickActionChip
- ChatInput
- CitationPanel
- Existing responsive behavior
- Existing design tokens
- Existing accessibility patterns

Do NOT add:

- Camera/photo scanning
- OCR
- Settings redesign
- Authentication
- Backend/API
- Real speech recognition
- Real microphone recording
- User accounts
- New navigation
- Dark mode
- Export/share
- Feedback systems

Those belong to later steps.

==================================================
3. COMPONENT ARCHITECTURE
==================================================

Create the following reusable React-oriented components:

VoiceOverlay
VoiceStatus
VoiceWaveform
VoiceTranscript
VoiceControls
MicButton

Integrate them with the existing:

ChatInput
MessageList
UserMessage
AssistantMessage
TypingIndicator

Use component names exactly where practical so the design maps cleanly to React/Next.js.

Recommended hierarchy:

AppShell
 └── MainContent
      ├── Header
      ├── ChatArea
      │    └── MessageList
      └── ChatComposer
           ├── VoiceOverlay
           │    ├── VoiceStatus
           │    ├── VoiceWaveform
           │    ├── VoiceTranscript
           │    └── VoiceControls
           ├── QuickActionChips
           └── ChatInput

VoiceOverlay should be reusable and should not contain page-specific business logic.

==================================================
4. VOICE STATES
==================================================

Create explicit component/state variants.

Required states:

A. Idle
B. Listening
C. Transcript Preview
D. Processing
E. Cancelled
F. Error

The primary prototype flow should demonstrate:

Idle
→ Listening
→ Transcript Preview
→ Processing
→ Normal Chat

==================================================
5. IDLE STATE
==================================================

The normal ChatInput remains visible.

Existing microphone button:

- 40×40px visual button
- minimum 44×44px interactive target
- existing icon style
- existing border/radius system
- existing hover/focus behavior

On interaction:

MicButton → VoiceOverlay Listening state.

Do not redesign the microphone button.

==================================================
6. LISTENING STATE
==================================================

When the microphone is activated, show a focused voice interaction.

Desktop:

Display a compact voice panel/overlay positioned directly above the ChatInput area.

Mobile:

Use a bottom-sheet style voice interaction that respects the existing mobile layout.

The listening state must clearly communicate:

"Listening…"

Use:

- microphone icon
- subtle animated waveform
- clear status label
- short supporting text
- cancel control
- stop/done control

Suggested copy:

Listening…

Speak your question about Indian Standards.

Do not use excessive animation.

The animation should feel calm, trustworthy, and professional.

==================================================
7. VOICE WAVEFORM
==================================================

Create a reusable:

VoiceWaveform

component.

Visual requirements:

- 5–9 vertical bars
- rounded ends
- subtle movement
- muted BIS trust accent
- no flashy neon effects
- no excessive gradients
- no distracting motion

The waveform should communicate that voice input is active.

Use a prototype animation concept rather than actual audio visualization.

Respect:

prefers-reduced-motion

When reduced motion is enabled, use a static waveform.

==================================================
8. LIVE TRANSCRIPT
==================================================

During Listening, display a live transcript preview.

Example prototype text:

"How do I check whether this product has BIS certification?"

The transcript should update visually during the prototype.

Show:

Live transcript

above or within the voice interaction area.

Important:

The transcript must be visually distinct from the final submitted chat message.

Use readable text size and strong contrast.

Do not automatically send partial transcript text.

==================================================
9. TRANSCRIPT PREVIEW STATE
==================================================

After listening stops, transition to:

Transcript Preview

Show:

"Review your question"

Then display the recognized transcript in an editable text area.

Example:

How do I check whether this product has BIS certification?

Controls:

- Edit transcript
- Send
- Cancel / Try again

Primary action:

Send

Secondary action:

Try again

The user should have an opportunity to correct the transcript before it becomes a chat message.

This is important for accessibility and speech-recognition accuracy.

==================================================
10. EDITABLE TRANSCRIPT
==================================================

Create a reusable transcript input component.

Recommended component:

VoiceTranscript

States:

- Listening
- Preview
- Editing
- Empty
- Error

When editing:

- Use the existing ChatInput typography
- Preserve existing border/radius system
- Show visible focus ring
- Allow normal keyboard editing
- Keep Send and Cancel actions visible

Do not introduce a completely new text-field visual language.

==================================================
11. PROCESSING STATE
==================================================

When the user selects Send:

Show a short processing state.

Suggested copy:

Processing…

Then transition back to the existing chat experience.

The transcript should become a normal:

UserMessage

in the MessageList.

Do not create a separate "voice message" bubble.

Voice input should ultimately behave exactly like typed input.

==================================================
12. SIMULATED MESSAGE FLOW
==================================================

Use prototype data.

Example voice transcript:

"How do I check whether this product has BIS certification?"

After Send:

UserMessage:

How do I check whether this product has BIS certification?

Then:

TypingIndicator

Then:

AssistantMessage

Use the existing assistant message design from Step 2.

Example response:

"You can check whether a product is covered by a BIS certification requirement by identifying the applicable Indian Standard and checking the relevant BIS certification scheme."

Include an existing-style:

CitationBadge

using the existing placeholder format:

IS XXXX

Do not invent real BIS standards or fake external URLs.

Use prototype-only citation content.

==================================================
13. ERROR STATE
==================================================

Create an accessible error variant.

Example:

"Voice input couldn't be completed."

Supporting text:

"Please try again or type your question instead."

Actions:

Try again
Use text input

Keep the error calm and non-technical.

Do not show browser/system microphone errors as fake technical messages.

==================================================
14. CANCELLED STATE
==================================================

If the user cancels voice input:

- Close VoiceOverlay
- Restore normal ChatInput
- Preserve any existing typed input
- Do not create a message
- Do not change the conversation

Cancellation should feel immediate.

==================================================
15. MICROPHONE BUTTON STATES
==================================================

Create explicit variants for:

MicButton:

1. Default
2. Hover
3. Focus-visible
4. Listening
5. Disabled
6. Processing

Use the existing design tokens.

Listening state may use the existing trust accent to communicate active recording.

Do not introduce a new color palette.

==================================================
16. VOICE CONTROLS
==================================================

Create:

VoiceControls

with:

Primary:
Stop / Done

Secondary:
Cancel

For Transcript Preview:

Primary:
Send

Secondary:
Try again

Buttons must have:

- clear labels
- visible focus states
- minimum 44×44px interactive target
- accessible names
- sufficient contrast

Avoid icon-only controls unless the accessible label is explicit.

==================================================
17. DESKTOP DESIGN
==================================================

Create a desktop prototype at:

1440 × 900

Keep the existing:

248px sidebar
Header
Chat width
Chat input
Quick action area

VoiceOverlay should visually connect to the ChatInput.

Do not cover the entire screen with a giant modal.

The voice interaction should feel like a natural extension of the composer.

Recommended desktop structure:

┌────────────── Sidebar ──────────────┐
│                                     │
│            Chat Area                │
│                                     │
│                                     │
│        Voice interaction            │
│        appears above composer       │
│                                     │
│     ┌──────────────────────────┐    │
│     │ VoiceOverlay             │    │
│     │ Listening…               │    │
│     │ waveform                 │    │
│     │ transcript               │    │
│     └──────────────────────────┘    │
│                                     │
│       Quick Action Chips            │
│       ChatInput + Mic               │
└─────────────────────────────────────┘

==================================================
18. MOBILE DESIGN
==================================================

Create a mobile prototype at:

390 × 844

Use the existing mobile layout from previous steps.

When voice starts:

- VoiceOverlay becomes a bottom-sheet interaction
- Background content remains visually present but subdued
- Use a subtle backdrop
- Sheet should have rounded top corners
- Include a drag handle
- Respect safe-area spacing
- Keep primary controls reachable

Mobile voice sheet should not exceed approximately 70–75% of viewport height.

Do not create a completely different visual language.

==================================================
19. MOBILE VOICE FLOW
==================================================

Mobile:

Idle
→ tap microphone
→ Listening bottom sheet
→ live transcript
→ Stop
→ Transcript Preview
→ Edit / Send
→ normal ChatInput
→ UserMessage
→ TypingIndicator
→ AssistantMessage

Ensure the keyboard does not create unusable layouts when editing the transcript.

==================================================
20. ACCESSIBILITY
==================================================

Follow the accessibility approach already established.

Requirements:

- keyboard accessible
- visible focus-visible rings
- semantic buttons
- accessible names
- appropriate dialog semantics
- aria-modal where appropriate
- Escape closes/cancels the voice interaction
- focus moves into the active voice interaction
- focus returns to MicButton when cancelled
- transcript editing uses a real text input/textarea
- do not rely only on color
- sufficient text contrast
- minimum 44×44px interactive target
- reduced-motion support

For desktop:

VoiceOverlay may use:

role="dialog"

For mobile:

role="dialog"
aria-modal="true"

Provide an accessible label such as:

"Voice input"

==================================================
21. ANIMATION
==================================================

Keep animations subtle.

Listening:

- waveform animation
- microphone active-state transition

Opening:

- 180–220ms ease-out

Closing:

- 150–200ms ease-in

Processing:

- subtle transition

Do not animate large portions of the page.

Do not use excessive bouncing, pulsing, glowing, or particle effects.

Support prefers-reduced-motion.

==================================================
22. VISUAL STYLE
==================================================

Follow the existing Standards Mitra visual system.

Use:

- neutral white/off-white surfaces
- dark slate text
- navy / muted saffron / blue trust accent already established
- subtle borders
- 12–16px corner radius
- generous spacing
- Inter/system sans
- restrained shadows
- accessible contrast

Voice UI should feel:

Trustworthy
Simple
Calm
Government-service appropriate
Accessible
Professional

Do not make it look like a consumer social-media voice assistant.

==================================================
23. REACT/FRONTEND MAPPING
==================================================

Make the Figma structure map cleanly to React components.

Conceptual state:

voiceState:
"idle"
| "listening"
| "preview"
| "processing"
| "cancelled"
| "error"

Additional state:

transcript: string

Use a data-driven approach.

Conceptual component:

<VoiceOverlay
  state={voiceState}
  transcript={transcript}
  onCancel={...}
  onStop={...}
  onSend={...}
  onRetry={...}
/>

Do not generate actual API or browser speech-recognition implementation.

The design should make this easy to implement later.

==================================================
24. PROTOTYPE INTERACTIONS
==================================================

Create these Figma prototype interactions:

FLOW A — START VOICE

MicButton
→ VoiceOverlay Listening

FLOW B — LISTENING

Listening
→ simulated transcript update

Example:

"How do I check whether this product has BIS certification?"

FLOW C — STOP

Stop / Done
→ Transcript Preview

FLOW D — EDIT

Edit transcript
→ editable transcript state

FLOW E — SEND

Send
→ Processing
→ close VoiceOverlay
→ UserMessage
→ TypingIndicator
→ AssistantMessage

FLOW F — CANCEL

Cancel
→ close VoiceOverlay
→ restore ChatInput

FLOW G — RETRY

Try again
→ Listening

FLOW H — ESCAPE

Escape
→ Cancel / close voice interaction

==================================================
25. FIGMA COMPONENT ORGANIZATION
==================================================

Organize the new components under:

Components
 └── Voice
      ├── VoiceOverlay
      ├── VoiceStatus
      ├── VoiceWaveform
      ├── VoiceTranscript
      ├── VoiceControls
      └── MicButton

Create variants for:

VoiceOverlay:
- Listening
- Transcript Preview
- Processing
- Error

VoiceWaveform:
- Active
- Reduced Motion

VoiceTranscript:
- Live
- Preview
- Editing
- Error

MicButton:
- Default
- Hover
- Focus
- Listening
- Disabled
- Processing

==================================================
26. SCREEN ORGANIZATION
==================================================

Add a new Figma section:

STEP 4 — VOICE INTERACTION

Inside it create:

01 Voice Idle
02 Voice Listening — Desktop
03 Voice Transcript Preview — Desktop
04 Voice Processing — Desktop
05 Voice Error — Desktop
06 Voice Listening — Mobile
07 Voice Transcript Preview — Mobile
08 Voice Processing — Mobile
09 Voice Components
10 Voice Prototype Flow

Keep previous Step 1–3 sections untouched.

==================================================
27. DEVELOPER-FRIENDLY NAMING
==================================================

Use clear names matching React component names.

Examples:

VoiceOverlay
VoiceStatus
VoiceWaveform
VoiceTranscript
VoiceControls
MicButton

Avoid vague names such as:

Frame 123
Group 44
Rectangle 12
Untitled Component

Use Auto Layout consistently.

Use variables/tokens for:

spacing
radius
typography
colors
borders
shadows
motion timing

Do not hard-code unnecessary values when an existing design token can be reused.

==================================================
28. IMPORTANT PRODUCT BEHAVIOR
==================================================

Voice input must NOT create a special message type.

After the transcript is confirmed and sent:

voice input becomes a normal UserMessage.

This keeps the React architecture simple and allows:

typed input
voice input
future OCR input

to all feed the same chat message pipeline.

==================================================
29. FINAL ACCEPTANCE CHECK
==================================================

Before finishing, verify:

✓ Step 1 design is unchanged
✓ Step 2 design is unchanged
✓ Step 3 CitationPanel is unchanged
✓ Existing ChatInput is reused
✓ Existing MicButton is reused
✓ VoiceOverlay is reusable
✓ Listening state exists
✓ Live transcript exists
✓ Transcript Preview exists
✓ Transcript can be edited
✓ Processing state exists
✓ Error state exists
✓ Cancel works
✓ Retry works
✓ Send creates a normal UserMessage
✓ TypingIndicator follows
✓ Existing AssistantMessage follows
✓ Desktop design exists at 1440×900
✓ Mobile design exists at 390×844
✓ Keyboard accessibility is defined
✓ Focus-visible states exist
✓ Escape behavior exists
✓ Reduced-motion behavior exists
✓ Components have React-friendly names
✓ No backend/API implementation
✓ No real microphone implementation
✓ No camera/OCR
✓ No settings redesign
✓ No unrelated features

==================================================
30. STOP CONDITION
==================================================

STOP after completing the Voice Interaction feature.

Do NOT proceed to:

- Photo Scan
- OCR
- Settings
- Backend
- API integration
- Authentication
- Account management
- Analytics
- Dark mode
- Export/share
- Feedback
- Saved answers

Those will be handled in later steps.

The final result should look like a production-ready Figma design that can be translated directly into reusable React/Next.js components without requiring a redesign.