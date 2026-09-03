STANDARDS MITRA — STEP 2
ACTIVE CONVERSATION + REUSABLE MESSAGE COMPONENTS

Continue from the existing Standards Mitra Figma design.

DO NOT redesign the existing AppShell, Sidebar, Header, EmptyState, PromptCard, or ChatInput.

The goal of this step is to add the ACTIVE CONVERSATION experience using reusable components that map directly to React/Next.js components.

This must remain faithful to the Standards Mitra PRD.

==================================================
1. OBJECTIVE
==================================================

Create the active chat screen that appears after a user submits a question.

The flow should be:

Empty State
→ User enters/selects question
→ User message appears
→ Typing indicator
→ Assistant response
→ Citation badge

The conversation must remain the primary UI.

Do not add backend/API functionality.

Use realistic placeholder conversation content, but do not invent authoritative BIS standard numbers.

Use placeholders such as:

IS XXXX

when a standard number is required.

==================================================
2. REUSE EXISTING APP SHELL
==================================================

Keep the existing:

AppShell
Sidebar
Header
LanguageSelector
ChatInput

Do not create duplicate versions.

The active conversation should use the same:

- spacing tokens
- typography
- colors
- border radius
- button styles
- input styles
- responsive rules

created in Step 1.

==================================================
3. ACTIVE CONVERSATION STRUCTURE
==================================================

Create:

MainContent
├── Header
├── ChatArea
│   └── MessageList
│       ├── UserMessage
│       ├── AssistantMessage
│       └── TypingIndicator
└── ChatInput

The chat area should have a maximum readable content width of approximately 700–800px.

Center the conversation column within the available main content area.

Keep generous vertical spacing between messages.

==================================================
4. USER MESSAGE
==================================================

Create reusable component:

UserMessage

Example content:

"What is BIS certification?"

The user message should visually distinguish itself from the assistant response without becoming overly colorful.

Use:

- clear readable text
- subtle background
- appropriate padding
- rounded corners
- maximum readable width
- proper spacing

Do not make the user bubble excessively large.

Create variants:

- Default
- Long text
- Focused/selected if needed

==================================================
5. ASSISTANT MESSAGE
==================================================

Create reusable:

AssistantMessage

Example:

"BIS certification indicates that a product conforms to the applicable Indian Standard and relevant BIS certification requirements."

Keep the assistant response visually lightweight.

Do not put the entire assistant response inside a heavy card.

The assistant message should support:

- text
- citations
- follow-up actions in the future

Create appropriate spacing between paragraphs.

==================================================
6. CITATION BADGE
==================================================

Create reusable:

CitationBadge

Example:

[IS XXXX]

The citation should look clearly clickable.

Use:

- subtle blue/green treatment
- compact pill
- readable text
- consistent iconography if an icon is used

States:

- Default
- Hover
- Focus
- Pressed

Clicking the citation will eventually open the CitationPanel in the next interaction step.

For now, connect it conceptually to the citation interaction.

==================================================
7. MESSAGE LIST
==================================================

Create:

MessageList

Messages should be represented as reusable repeated components.

Conceptual structure:

MessageList
├── UserMessage
├── AssistantMessage
├── UserMessage
└── AssistantMessage

Do not manually design every message as a separate unique component.

The Figma structure should communicate that messages are repeated data-driven items.

==================================================
8. TYPING INDICATOR
==================================================

Create reusable:

TypingIndicator

Visual:

Three subtle animated dots.

Text may optionally say:

"Standards Mitra is thinking..."

Keep it subtle.

States:

- Hidden
- Visible

Prototype flow:

User sends message
→ UserMessage appears
→ TypingIndicator appears
→ AssistantMessage replaces typing state

Do not add excessive animation.

==================================================
9. QUICK ACTION CHIPS
==================================================

Add reusable:

QuickActionChip

Examples:

"BIS certification"
"Hallmark"
"Product standard"
"IS number"

These should be visually lightweight.

Place them appropriately around the conversation/input area according to the existing design system.

States:

- Default
- Hover
- Pressed
- Focused
- Disabled

Do not allow the chips to dominate the conversation.

==================================================
10. CHAT INPUT
==================================================

Reuse the existing ChatInput from Step 1.

Do not create a new input.

It should remain sticky at the bottom.

Keep:

TextInput
MicButton
CameraButton
SendButton

The active conversation should demonstrate the:

- Empty state
- Typing state
- Loading state

Do not redesign the input.

==================================================
11. EXAMPLE ACTIVE CONVERSATION
==================================================

Create a polished example screen:

USER:

"What is BIS certification?"

ASSISTANT:

"BIS certification indicates that a product conforms to the applicable Indian Standard and relevant BIS certification requirements."

Then show:

[IS XXXX]

Then a second user message:

"How do I know if a product is covered by BIS certification?"

Then an assistant response with another:

[IS XXXX]

Use placeholder standard numbers only.

Do not make claims that require real BIS verification.

==================================================
12. MESSAGE WIDTH
==================================================

Keep the conversation readable.

Suggested:

Desktop:
Maximum message/content width approximately 700–800px.

User messages:
Can be narrower than the full conversation width.

Assistant messages:
Can use most of the readable conversation width.

Avoid extremely wide paragraphs.

==================================================
13. DESKTOP LAYOUT
==================================================

Maintain the existing 1440×900 desktop design.

Structure:

┌──────────────┬────────────────────────────────────┐
│              │ Header                             │
│   Sidebar    ├────────────────────────────────────┤
│              │                                    │
│              │ User message                       │
│              │                                    │
│              │ Assistant response                 │
│              │ [IS XXXX]                          │
│              │                                    │
│              │ User message                       │
│              │                                    │
│              │ Assistant response                 │
│              │                                    │
│              │                                    │
│              ├────────────────────────────────────┤
│              │ ChatInput                          │
└──────────────┴────────────────────────────────────┘

Keep the conversation visually centered.

==================================================
14. MOBILE ACTIVE CONVERSATION
==================================================

Create a mobile version around:

390 × 844

Do not simply scale down the desktop.

Mobile structure:

MobileShell
├── MobileHeader
├── MessageList
└── StickyChatInput

Requirements:

- Full-width conversation
- Comfortable horizontal padding
- Sticky input
- Messages remain readable
- No horizontal overflow
- QuickActionChip row can horizontally scroll

The sidebar should remain a drawer as established in Step 1.

==================================================
15. ACCESSIBILITY
==================================================

Ensure:

- Strong text contrast
- Visible keyboard focus
- Interactive citation badges have focus states
- Touch targets remain comfortable
- Messages remain readable at larger text sizes
- Hindi/Telugu text does not break the layout

Do not rely only on color to communicate states.

==================================================
16. REACT COMPONENT MAPPING
==================================================

Document the following:

MessageList
→ <MessageList />

UserMessage
→ <UserMessage />

AssistantMessage
→ <AssistantMessage />

CitationBadge
→ <CitationBadge />

TypingIndicator
→ <TypingIndicator />

QuickActionChip
→ <QuickActionChip />

The components should conceptually support props such as:

UserMessage:
- content

AssistantMessage:
- content
- citations

CitationBadge:
- standardNumber
- title

QuickActionChip:
- label
- onClick

==================================================
17. DATA-DRIVEN MESSAGE MODEL
==================================================

Document this conceptual model:

Message {
  id
  role
  content
  citations[]
}

Citation {
  id
  standardNumber
  title
  clause
  snippet
}

Do not implement backend logic.

This is to make the design directly translatable into React.

==================================================
18. PROTOTYPE FLOW
==================================================

Create this prototype:

Empty State
→ Click PromptCard
→ UserMessage
→ TypingIndicator
→ AssistantMessage
→ CitationBadge

Also create:

ChatInput
→ type message
→ Send
→ UserMessage
→ TypingIndicator
→ AssistantMessage

==================================================
19. DO NOT ADD YET
==================================================

Do NOT build:

- Citation detail panel
- Voice overlay
- OCR
- Photo scanning
- Settings screen
- Authentication
- Backend/API
- Admin dashboard
- Analytics

Those belong to later steps.

==================================================
20. FINAL REQUIREMENT
==================================================

The active conversation must look like a natural continuation of the existing Standards Mitra empty state.

Do not redesign the product.

Reuse the existing components and design tokens.

The goal is to establish the complete reusable conversation foundation for the future React/Next.js frontend.

Prioritize:

1. Reusable components
2. Clean message hierarchy
3. Citation support
4. Typing state
5. Responsive behavior
6. Accessibility
7. React implementation readiness