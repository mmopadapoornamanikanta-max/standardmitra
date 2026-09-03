# STANDARDS MITRA — COMPLETE END-TO-END FIGMA MAKE PROMPT

Design and build a complete production-oriented responsive web frontend for **“Standards Mitra”**, an AI assistant focused on Indian Standards, BIS certification, hallmarking, and consumer guidance.

The design must be created as a **real frontend system**, not merely a visual mockup.

The final Figma structure should map cleanly to a **React + Next.js + TypeScript frontend**, with reusable components, explicit states, responsive layouts, and predictable component hierarchy.

Use the supplied PRD as the source of truth for product scope and UX.

---

# 1. PRODUCT VISION

Standards Mitra is a chatbot-first AI assistant for users who need simple, trustworthy information about:

* Indian Standards
* BIS certification
* BIS certification schemes
* Hallmarking
* Product standards
* Consumer guidance

The primary interaction is conversation.

The experience should feel familiar to modern AI chat products such as Claude-style conversational interfaces, while maintaining a clear Indian public-service/trust-oriented identity.

The interface must feel:

* Simple
* Trustworthy
* Accessible
* Modern
* Calm
* Minimal
* Professional
* Easy for low-literacy and non-English-first users

Do not make the UI look like a generic enterprise dashboard.

The chat conversation must remain the primary focus.

---

# 2. PRIMARY DESIGN PRINCIPLES

Follow these principles throughout the entire design:

1. Conversation is the primary UI.
2. Keep chrome minimal.
3. Make information easy to understand.
4. Use clear visual hierarchy.
5. Build trust through citations and source transparency.
6. Encourage voice interaction.
7. Encourage photo/product scanning.
8. Support English, Hindi, and Telugu.
9. Design for desktop and mobile.
10. Use reusable components rather than one-off elements.
11. Every important component must have meaningful states.
12. Keep the design implementation-friendly for React/Next.js.
13. Avoid unnecessary decoration.
14. Prioritize accessibility.
15. Do not introduce features outside the PRD scope.

---

# 3. TECHNOLOGY TARGET

Design the UI so it can be implemented directly using:

* React
* Next.js
* TypeScript
* Tailwind CSS or equivalent token-based styling
* Component-based architecture

Do not create visual structures that depend on impossible or unnecessarily complex implementation.

Use predictable component names.

Repeated UI must be represented as reusable components.

---

# 4. FIGMA FILE STRUCTURE

Organize the Figma file into these sections/pages:

## 01 — Foundations

Include:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Icons
* Layout tokens
* Responsive breakpoints
* Accessibility notes

## 02 — Layout

Include:

* Desktop app shell
* Mobile app shell
* Sidebar layout
* Main content layout
* Chat layout
* Citation panel layout
* Bottom sheet layout

## 03 — Components

Create reusable components and variants for:

* AppShell
* Sidebar
* SidebarItem
* NewChatButton
* Header
* LanguageSelector
* StatusIndicator
* EmptyState
* PromptCard
* MessageList
* UserMessage
* AssistantMessage
* CitationBadge
* QuickActionChip
* TypingIndicator
* ChatInput
* TextInput
* MicButton
* CameraButton
* SendButton
* CitationPanel
* VoiceOverlay
* PhotoScanSheet
* SettingsPanel

## 04 — Desktop Screens

Create:

1. Empty State
2. Active Conversation
3. Active Conversation + Citation Panel
4. Voice Listening
5. Voice Transcript
6. Photo Capture/Upload
7. Photo Preview
8. OCR Scanning
9. Settings

## 05 — Mobile Screens

Create mobile versions of all relevant screens:

1. Empty State
2. Active Conversation
3. Citation Bottom Sheet
4. Voice Listening
5. Voice Transcript
6. Photo Capture/Upload
7. Photo Preview
8. OCR Scanning
9. Settings

## 06 — Prototype Flows

Create connected prototype flows for:

* New conversation
* Prompt card → conversation
* User message → typing → assistant response
* Citation → citation panel
* Voice interaction
* Photo/OCR interaction
* Language selection
* Settings

## 07 — React Mapping

Create a documentation section showing:

Figma Component → React Component → Props → State

Example:

AppShell → `<AppShell />`

Sidebar → `<Sidebar />`

Header → `<Header />`

PromptCard → `<PromptCard />`

UserMessage → `<UserMessage />`

AssistantMessage → `<AssistantMessage />`

CitationBadge → `<CitationBadge />`

ChatInput → `<ChatInput />`

---

# 5. DESIGN SYSTEM

## Color direction

Use a neutral public-service/trust-oriented palette.

Primary background:

* White
* Very light off-white

Primary text:

* Dark slate

Secondary text:

* Muted slate/gray

Primary accent:

* Navy / muted blue

Optional supporting accent:

* Muted saffron

Citation colors:

* Subtle blue/green pills

Borders:

* Very light neutral gray

Do not use:

* Neon colors
* Excessive gradients
* Glassmorphism
* Heavy shadows
* Highly saturated backgrounds
* Gaming-style UI

---

# 6. TYPOGRAPHY

Use:

**Inter** or a close system sans-serif equivalent.

Create typography tokens for:

* Display heading
* Page heading
* Section heading
* Body
* Body small
* Caption
* Button
* Input
* Citation
* Navigation

Maintain clear readability.

Avoid overly small text.

Support Hindi and Telugu text without breaking layout.

---

# 7. SPACING

Create a consistent spacing system.

Use predictable spacing values such as:

* 4
* 8
* 12
* 16
* 20
* 24
* 32
* 40
* 48
* 64

Avoid arbitrary spacing values unless necessary.

---

# 8. BORDER RADIUS

Use rounded but professional components.

Suggested system:

* Small: 8px
* Medium: 12px
* Large: 16px
* Pill: 999px

Do not make everything excessively rounded.

---

# 9. DESKTOP APP SHELL

Create a desktop frame:

**1440 × 900**

Structure:

```text
AppShell
├── Sidebar
└── MainContent
    ├── Header
    ├── ChatArea
    │   ├── EmptyState OR MessageList
    │   └── QuickActions
    └── ChatInput
```

Sidebar width:

Approximately 240–280px.

Main chat area should have a comfortable maximum reading width around 700–800px.

The UI should have generous whitespace.

---

# 10. SIDEBAR

Create a collapsible desktop sidebar.

Contents:

### Top

Brand/product area.

Show:

**Standards Mitra**

Use a placeholder/product mark rather than inventing an official BIS logo.

### New Chat

Create a prominent:

**+ New Chat**

button.

States:

* Default
* Hover
* Pressed
* Disabled

### Conversation history

Create a list of recent conversations.

Example:

* BIS certification basics
* Hallmark verification
* Product standard query
* IS number explanation

These are sample UI data only.

Create reusable:

`SidebarItem`

States:

* Default
* Hover
* Active

### Bottom area

Keep space available for future settings.

Do not add account management or other out-of-scope features.

---

# 11. HEADER

Create a compact header approximately 60–64px high.

Left:

**Standards Mitra**

Status:

**● Online**

Use a subtle status indicator.

Right:

Language selector:

**EN | HI | TE**

Create a reusable:

`LanguageSelector`

States:

* Default
* Open
* Selected
* Hover

The language selector should be accessible and easy to understand.

---

# 12. DESKTOP EMPTY STATE

This is the initial screen when no conversation exists.

Center the content in the main chat area.

Heading:

**Ask anything about Indian Standards**

Supporting text:

**Get clear answers about Indian Standards, BIS certification, hallmarking and consumer guidance.**

Below this, create 4 prompt cards.

### Prompt 1

**What is BIS certification?**

### Prompt 2

**How do I verify a hallmark?**

### Prompt 3

**What does an IS number mean?**

### Prompt 4

**How can I check a product standard?**

Each card should be clickable.

Create:

`PromptCard`

States:

* Default
* Hover
* Pressed
* Disabled

Cards should feel lightweight and helpful.

---

# 13. CHAT INPUT

Create a sticky chat input at the bottom of the main content.

Structure:

```text
ChatInput
├── TextInput
├── MicButton
├── CameraButton
└── SendButton
```

Input placeholder:

**Ask about Indian Standards...**

Buttons:

* Microphone
* Camera
* Send

Create variants for:

### Empty

No text.

### Focused

Input focused.

### Typing

Text entered.

### Loading

Assistant processing.

### Disabled

Input unavailable.

Make the input large enough for comfortable touch interaction.

---

# 14. ACTIVE CONVERSATION SCREEN

Create a realistic example conversation.

Use sample content only.

Example structure:

```text
User:
What is BIS certification?

Assistant:
BIS certification indicates that a product conforms
to the relevant Indian Standard under the applicable
BIS certification requirements.

[Citation: IS XXXX]
```

Do not invent authoritative real-world standard numbers.

If an example standard number is required visually, use:

**IS XXXX**

or clearly marked placeholder data.

---

# 15. MESSAGE COMPONENTS

Create reusable:

`MessageList`

`UserMessage`

`AssistantMessage`

User message:

* Right-aligned or appropriate conversational alignment
* Clear bubble
* Comfortable padding
* Easy readability

Assistant message:

* Left-aligned
* Minimal/no heavy bubble styling
* Strong readability
* Citation support

Each message should support:

* Text
* Loading state
* Citation
* Timestamp if needed

Avoid unnecessary metadata.

---

# 16. TYPING INDICATOR

Create:

`TypingIndicator`

Use a subtle three-dot animation concept.

States:

* Visible
* Hidden

Prototype:

User sends message →

Typing indicator appears →

Assistant response appears.

Keep animation subtle.

---

# 17. CITATION BADGE

Assistant answers can contain citation badges.

Example:

**[IS XXXX]**

Create:

`CitationBadge`

Visual style:

* Small pill
* Subtle blue/green treatment
* Clear text
* Clickable

States:

* Default
* Hover
* Pressed

Purpose:

Allow users to understand where information comes from.

---

# 18. CITATION DETAIL PANEL

When a citation is selected, open a source detail panel.

Desktop:

Right-side slide-in panel.

Suggested width:

320–400px.

Structure:

```text
CitationPanel
├── Close
├── Standard Number
├── Title
├── Clause / Source Snippet
└── View Full Standard
```

Content example:

**IS XXXX**

**Relevant clause**

Show a short placeholder source snippet.

Primary action:

**View full standard**

Do not create a fake external URL.

The button can be prototype-only.

States:

* Closed
* Opening
* Open

Desktop interaction:

CitationBadge → CitationPanel opens.

---

# 19. MOBILE CITATION PANEL

On mobile, do not use a side panel.

Use a:

**Bottom Sheet**

Structure:

```text
BottomSheet
├── Drag Handle
├── Close
├── Standard Number
├── Source Snippet
└── View Full Standard
```

Make it touch-friendly.

---

# 20. QUICK ACTION CHIPS

Create reusable:

`QuickActionChip`

Examples:

* BIS certification
* Hallmark
* Product standard
* IS number

These should appear where appropriate below or around the conversation/input.

Support horizontal scrolling on mobile.

States:

* Default
* Hover
* Pressed
* Disabled

---

# 21. VOICE INTERACTION

Create a voice interaction flow.

Flow:

```text
Idle
↓
Mic clicked
↓
Listening
↓
Transcript preview
↓
User confirms/edits
↓
Message submitted
```

Do not blindly submit unreviewed speech.

---

# 22. VOICE LISTENING OVERLAY

Create:

`VoiceOverlay`

Show:

**Listening...**

Include:

* Microphone icon
* Subtle listening animation
* Stop/cancel control
* Transcript preview area

Do not use excessive animation.

Create states:

* Idle
* Listening
* Processing
* Transcript Ready
* Cancelled

---

# 23. LIVE TRANSCRIPT

During voice input, show transcript preview above the input.

Example:

**“How can I verify a BIS mark?”**

Allow the user to:

* Review
* Edit
* Send
* Cancel

Keep this interaction simple.

---

# 24. PHOTO SCAN FLOW

Create a photo/product scanning interaction.

Flow:

```text
Camera button
↓
Capture / Upload Sheet
↓
Photo selected
↓
Preview
↓
Scanning
↓
OCR result
↓
Text inserted into input
↓
User confirms/edits
↓
Send
```

---

# 25. PHOTO CAPTURE / UPLOAD SHEET

Create:

`PhotoScanSheet`

Options:

* Take photo
* Upload photo
* Cancel

Keep the sheet simple.

Mobile-first design.

Desktop can use a modal/sheet treatment.

---

# 26. PHOTO PREVIEW

After image selection:

Show:

* Image preview
* Retake
* Continue scanning
* Cancel

Do not automatically submit.

---

# 27. OCR SCANNING STATE

Create scanning state:

**Scanning image...**

Use subtle progress/processing animation.

Do not imply real OCR functionality in the Figma prototype.

This is a frontend interaction representation.

---

# 28. OCR RESULT

After scanning:

Display extracted text.

Example:

**Detected text**

“BIS ...”

Allow:

* Edit
* Cancel
* Send

Insert the extracted text into the normal `ChatInput`.

---

# 29. SETTINGS

Create a lightweight settings panel.

Only include PRD-approved settings.

### Language

Options:

* English
* Hindi
* Telugu

### Text size

Optional.

Options:

* Default
* Larger

Do not add:

* Account management
* Billing
* Authentication
* Analytics
* Admin settings
* Backend configuration

These are outside v1 scope.

---

# 30. LANGUAGE SUPPORT

The UI must support:

* EN
* HI
* TE

Create layout-safe examples in English, Hindi, and Telugu.

Ensure:

* Text does not overflow
* Buttons can expand
* Cards can accommodate longer labels
* Input can accommodate regional-language text

Do not create separate completely different layouts for each language.

Use one responsive system.

---

# 31. RESPONSIVE DESIGN

Create responsive layouts.

Desktop:

* Sidebar visible
* Main chat centered
* Citation panel on right

Mobile:

* Sidebar becomes drawer
* Full-width chat
* Sticky input
* Quick chips horizontally scrollable
* Citation panel becomes bottom sheet

Do not simply scale desktop down.

Design intentional mobile layouts.

Suggested breakpoints:

* Mobile: <768px
* Tablet: 768–1023px
* Desktop: ≥1024px

---

# 32. MOBILE APP SHELL

Create a mobile frame such as:

**390 × 844**

Structure:

```text
MobileShell
├── MobileHeader
├── ChatArea
└── StickyChatInput
```

Header should include:

* Menu/sidebar trigger
* Standards Mitra
* Language selector/status where appropriate

Keep the top bar compact.

---

# 33. MOBILE SIDEBAR

Create a drawer.

Contents:

* Standards Mitra
* New Chat
* Recent conversations
* Close/dismiss

Drawer should overlay the conversation.

Use a subtle backdrop.

---

# 34. ACCESSIBILITY

Design with accessibility in mind.

Ensure:

* Strong text contrast
* Clear focus states
* Minimum comfortable touch targets
* Do not rely only on color
* Icons should have understandable labels
* Buttons must be visually identifiable
* Text should remain readable at larger sizes
* Hindi and Telugu should remain legible
* Keyboard navigation should be possible conceptually
* Screen-reader-friendly naming should be documented in component notes

Suggested touch target:

At least approximately 44×44px.

---

# 35. ICONS

Use a consistent icon family.

Suggested icons:

* Plus
* Menu
* Send
* Microphone
* Camera
* X/Close
* Chevron
* Settings
* File/source
* Search if required
* More if required

Do not use random mixed icon styles.

---

# 36. COMPONENT VARIANTS

Every interactive component should have explicit variants.

Create variants for:

### Button

* Default
* Hover
* Pressed
* Disabled
* Loading

### SidebarItem

* Default
* Hover
* Active

### PromptCard

* Default
* Hover
* Pressed
* Disabled

### CitationBadge

* Default
* Hover
* Pressed

### ChatInput

* Empty
* Focused
* Typing
* Loading
* Disabled

### MicButton

* Idle
* Listening
* Disabled

### CameraButton

* Idle
* Scanning
* Disabled

### LanguageSelector

* Closed
* Open
* Selected

### CitationPanel

* Closed
* Open

---

# 37. FRONTEND COMPONENT ARCHITECTURE

Use this conceptual React hierarchy:

```text
App
└── AppShell
    ├── Sidebar
    │   ├── Brand
    │   ├── NewChatButton
    │   └── SidebarItem[]
    │
    └── MainContent
        ├── Header
        │   ├── StatusIndicator
        │   └── LanguageSelector
        │
        ├── ChatArea
        │   ├── EmptyState
        │   │   └── PromptCard[]
        │   │
        │   └── MessageList
        │       ├── UserMessage
        │       └── AssistantMessage
        │           └── CitationBadge[]
        │
        ├── QuickActionChip[]
        │
        └── ChatInput
            ├── TextInput
            ├── MicButton
            ├── CameraButton
            └── SendButton

Overlays:
├── CitationPanel
├── VoiceOverlay
├── PhotoScanSheet
└── SettingsPanel
```

---

# 38. REACT DATA-DRIVEN STRUCTURE

Repeated UI should conceptually be driven by data.

Example message model:

```text
Message
{
  id
  role
  content
  citations[]
}
```

Citation model:

```text
Citation
{
  id
  standardNumber
  title
  clause
  snippet
}
```

Conversation model:

```text
Conversation
{
  id
  title
  messages[]
}
```

Do not duplicate individual message components unnecessarily.

---

# 39. FRONTEND STATE MODEL

Document these conceptual UI states:

```text
activeConversation
messages
isTyping
citationPanelOpen
selectedCitation
voiceState
photoScanState
language
inputValue
sidebarOpen
settingsOpen
```

The Figma design should make these states visually clear.

Do not design hidden backend logic.

---

# 40. PROTOTYPE FLOW 1 — NEW CHAT

Prototype:

```text
Empty State
↓
User clicks Prompt Card
↓
Input/message appears
↓
Typing Indicator
↓
Assistant Response
↓
Citation Badge
```

---

# 41. PROTOTYPE FLOW 2 — FREEFORM CHAT

```text
Empty State
↓
User clicks ChatInput
↓
Types question
↓
Send
↓
User Message
↓
Typing Indicator
↓
Assistant Message
↓
Citation Badge
```

---

# 42. PROTOTYPE FLOW 3 — CITATION

```text
Assistant Message
↓
Citation Badge
↓
Click Citation
↓
Citation Panel
↓
View Full Standard
```

For prototype purposes, the final button does not need a real destination.

---

# 43. PROTOTYPE FLOW 4 — VOICE

```text
Chat Input
↓
Mic
↓
Listening Overlay
↓
Transcript
↓
Edit / Confirm
↓
User Message
↓
Typing
↓
Assistant Response
```

---

# 44. PROTOTYPE FLOW 5 — PHOTO

```text
Chat Input
↓
Camera
↓
Photo Sheet
↓
Upload/Capture
↓
Preview
↓
Scanning
↓
OCR Result
↓
Input Filled
↓
Edit/Confirm
↓
Send
```

---

# 45. PROTOTYPE FLOW 6 — LANGUAGE

```text
Language Selector
↓
EN / HI / TE
↓
Selected Language
↓
UI content updates visually
```

Only demonstrate the language-selection behavior visually.

Do not create backend translation functionality.

---

# 46. EMPTY / LOADING / ERROR / DISABLED STATES

Where relevant, design:

* Empty
* Loading
* Disabled
* Processing
* Success
* Cancelled

Do not create elaborate error systems unless required for the interaction.

The design should still make it possible to add future error states.

---

# 47. FRONTEND IMPLEMENTATION NOTES

For every major component, add a small Figma description containing:

### Component name

### Purpose

### Props

### Variants

### Responsive behavior

### Interaction

Example:

```text
Component: PromptCard

Props:
- title
- icon
- onClick

Variants:
- default
- hover
- pressed
- disabled

Responsive:
- Desktop: card grid
- Mobile: stacked/horizontally arranged depending on available width

Interaction:
- Clicking inserts/selects the prompt into the conversation
```

Do this for all major reusable components.

---

# 48. DESIGN TOKENS

Create reusable Figma variables/styles for:

### Colors

* background
* surface
* text-primary
* text-secondary
* border
* accent
* success
* citation

### Typography

* heading
* body
* caption
* button
* input

### Spacing

* xs
* sm
* md
* lg
* xl
* 2xl

### Radius

* sm
* md
* lg
* pill

### Shadows

Use very subtle shadows only where needed.

This allows the React implementation to translate tokens into CSS variables/Tailwind tokens.

---

# 49. VISUAL QUALITY

The final design should feel like a polished modern AI assistant.

Reference qualities:

* Clean conversational layout
* Generous whitespace
* Strong readability
* Minimal navigation
* Clear source citations
* Calm public-service visual language
* High-quality interaction states

Avoid:

* Dashboard-heavy layout
* Excessive cards
* Excessive borders
* Excessive icons
* Huge decorative illustrations
* Neon gradients
* Glassmorphism
* Fake AI robot imagery
* Unnecessary animations

---

# 50. DO NOT INVENT OFFICIAL BIS BRAND ASSETS

Do not create or fabricate an official BIS logo.

Use:

* Text-based Standards Mitra branding
* Neutral placeholder mark
* Generic icon treatment

Any official logo can be replaced later with approved assets.

---

# 51. CONTENT RULES

Use the exact product heading:

**Ask anything about Indian Standards**

Use the exact supporting text:

**Get clear answers about Indian Standards, BIS certification, hallmarking and consumer guidance.**

Use the approved prompt examples:

**What is BIS certification?**

**How do I verify a hallmark?**

**What does an IS number mean?**

**How can I check a product standard?**

Do not introduce unrelated product features.

---

# 52. OUT OF SCOPE

Do NOT design:

* Backend/API screens
* Admin dashboards
* Analytics dashboards
* User account management
* Billing
* Authentication flows
* Full account settings
* Database management
* Developer console
* API configuration
* Complex search dashboards

These are outside the v1 frontend scope.

---

# 53. FUTURE-READY STRUCTURE

Keep the component architecture extensible for future:

* Follow-up chips
* Dark mode
* Export/share
* Feedback
* Saved answers
* Standards comparison

Do not fully design these features now.

Only ensure the architecture can accommodate them later.

---

# 54. FINAL SCREEN INVENTORY

The completed Figma file must contain:

## Desktop

1. Desktop Empty State
2. Desktop Active Conversation
3. Desktop Citation Panel
4. Desktop Voice Listening
5. Desktop Voice Transcript
6. Desktop Photo Sheet
7. Desktop Photo Preview
8. Desktop OCR Scanning
9. Desktop OCR Result
10. Desktop Settings

## Mobile

11. Mobile Empty State
12. Mobile Active Conversation
13. Mobile Sidebar Drawer
14. Mobile Citation Bottom Sheet
15. Mobile Voice Listening
16. Mobile Voice Transcript
17. Mobile Photo Sheet
18. Mobile Photo Preview
19. Mobile OCR Scanning
20. Mobile OCR Result
21. Mobile Settings

## Components

Create all reusable components and variants required by these screens.

---

# 55. FINAL QUALITY CHECK

Before finishing, verify:

### Product

* The UI clearly represents Standards Mitra.
* Conversation is the primary experience.
* The product focuses on Indian Standards/BIS/hallmarking/consumer guidance.

### Design

* Consistent colors
* Consistent typography
* Consistent spacing
* Consistent radius
* Professional public-service feel

### Components

* Components are reusable.
* Variants exist.
* Interactive states exist.
* Repeated content is data-driven conceptually.

### Responsive

* Desktop works at 1440×900.
* Mobile works around 390×844.
* Sidebar becomes a drawer.
* Citation panel becomes bottom sheet.
* Input remains sticky.
* Quick actions can scroll horizontally.

### Accessibility

* Contrast is strong.
* Controls are touch-friendly.
* Focus states exist.
* Hindi and Telugu do not break layout.

### React readiness

* Component names are clear.
* Component hierarchy is documented.
* State variations are explicit.
* Tokens are reusable.
* No unnecessary one-off UI structures.

---

# 56. FINAL IMPLEMENTATION MINDSET

Do not think of this as a collection of Figma screens.

Think of it as a **React component system represented visually in Figma**.

Every screen should be constructed from reusable components.

Every interaction should correspond to a predictable UI state.

Every repeated item should be represented as reusable/data-driven content.

Every responsive change should be intentional.

The final result should allow a frontend developer to inspect the Figma file and understand:

* What components to build
* How components are nested
* What props/states exist
* What changes on mobile
* What interactions exist
* What tokens/styles to use
* What screens need to be implemented

The final output must feel like a **production-ready frontend design specification for a React/Next.js implementation**, while remaining faithful to the Standards Mitra PRD.

Do not add features outside the defined v1 scope.
