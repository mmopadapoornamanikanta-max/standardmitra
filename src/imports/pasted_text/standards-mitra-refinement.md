Refine the existing Standards Mitra desktop empty-state design. **Do not redesign it from scratch.** Preserve the existing structure, content, and overall visual direction.

The goal is to make the current screen cleaner, more balanced, more accessible, and more implementation-ready for React/Next.js.

## 1. SIDEBAR

Keep the existing sidebar, but reduce its visual weight slightly.

* Target width: approximately 240–260px.
* Keep the Standards Mitra branding at the top.
* Keep the “+ New Chat” button.
* Keep the RECENT conversation list.
* Keep Settings at the bottom.
* Preserve the existing conversation names.
* Do not add account/profile/dashboard features.

Make the sidebar feel like navigation, not a separate dashboard.

## 2. NEW CHAT BUTTON

Keep the existing navy “+ New Chat” button.

Refine it so that:

* Text is clearly readable.
* Plus icon is aligned consistently.
* Padding is balanced.
* Corner radius matches the design system.
* Hover state is subtle.
* Pressed state is subtle.
* Disabled state exists as a component variant.

Do not make the button larger than necessary.

## 3. MAIN CONTENT POSITION

Adjust the empty state vertically.

The current empty state feels slightly too low and disconnected from the chat input.

Move the main empty-state content slightly upward while maintaining generous whitespace.

The hierarchy should feel like:

```text
Header

        Ask anything about Indian Standards

        Supporting text

        Prompt cards


              remaining whitespace


              Chat input
```

The input should remain visually connected to the conversation area.

## 4. EMPTY STATE

Keep the exact existing heading:

“Ask anything about Indian Standards”

Keep the exact supporting text:

“Get clear answers about Indian Standards, BIS certification, hallmarking and consumer guidance.”

Do not rewrite this copy.

Make the heading strong but not oversized.

Recommended hierarchy:

* Heading: approximately 28–32px desktop
* Supporting text: approximately 15–16px
* Comfortable line height
* Maximum text width around 650–700px

Center the content within the main chat area.

## 5. PROMPT CARDS

Keep the four existing prompts:

1. “What is BIS certification?”
2. “How do I verify a hallmark?”
3. “What does an IS number mean?”
4. “How can I check a product standard?”

Improve their visual affordance.

Each prompt must clearly look clickable.

Use:

* Very subtle border
* Very subtle surface/background difference
* 12–16px corner radius
* Consistent internal padding
* Consistent icon size
* Consistent spacing
* Clear hover state
* Clear pressed state
* Keyboard focus state

Do not turn them into large colorful cards.

Keep them lightweight and conversational.

Use one consistent icon style.

## 6. PROMPT CARD LAYOUT

Maintain the current two-column arrangement on desktop.

Use a balanced grid:

```text
┌────────────────────────┐   ┌────────────────────────┐
│ icon  What is BIS      │   │ icon  How do I verify  │
│       certification?   │   │       a hallmark?      │
└────────────────────────┘   └────────────────────────┘

┌────────────────────────┐   ┌────────────────────────┐
│ icon  What does an IS  │   │ icon  How can I check  │
│       number mean?     │   │       a product...     │
└────────────────────────┘   └────────────────────────┘
```

Ensure both columns have equal width.

Do not allow icons or text to shift between cards.

## 7. CHAT INPUT

Keep the existing bottom chat input.

Make it more visually prominent without making it heavy.

Increase the contrast of:

* Placeholder text
* Microphone icon
* Camera icon
* Send/action area

Use a subtle border.

Maintain the rounded rectangular shape.

Keep the placeholder exactly:

“Ask about Indian Standards...”

The input should remain sticky/fixed to the bottom of the chat area.

## 8. CHAT INPUT STRUCTURE

Treat the input as reusable React components:

```text
ChatInput
├── TextInput
├── MicButton
├── CameraButton
└── SendButton
```

Make the component visually ready for these states:

* Empty
* Focused
* Typing
* Loading
* Disabled

Do not implement backend functionality.

## 9. HEADER

Keep:

“Standards Mitra”

and:

“● Online”

Keep:

EN | HI | TE

Do not add unnecessary navigation.

Ensure the header has consistent horizontal padding with the rest of the application.

## 10. LANGUAGE SELECTOR

Keep EN / HI / TE.

Make it a reusable component.

Create states:

* Default
* Hover
* Selected
* Open

Do not redesign the language system.

## 11. VISUAL STYLE

Preserve the existing visual direction:

* White/off-white background
* Dark slate text
* Navy/muted blue accent
* Subtle neutral borders
* Minimal shadows
* Professional public-service feel

Do not introduce:

* Gradients
* Neon colors
* Glassmorphism
* Large illustrations
* Decorative AI graphics
* Excessive shadows
* Excessive rounded cards

## 12. ACCESSIBILITY

Improve accessibility while refining the existing screen.

Ensure:

* Strong text contrast
* Clearly visible focus states
* Minimum approximately 44×44px touch targets for interactive controls
* Icons do not rely on color alone
* Text remains readable
* Hindi/Telugu text will fit without breaking layouts

## 13. REACT IMPLEMENTATION READINESS

Do not flatten the design into one large frame.

Preserve reusable components:

```text
AppShell
├── Sidebar
│   ├── Brand
│   ├── NewChatButton
│   └── SidebarItem
│
└── MainContent
    ├── Header
    │   └── LanguageSelector
    │
    ├── EmptyState
    │   └── PromptCard
    │
    └── ChatInput
        ├── TextInput
        ├── MicButton
        ├── CameraButton
        └── SendButton
```

Use consistent component naming.

## 14. DO NOT CHANGE THE PRODUCT SCOPE

This refinement is still Step 1.

Do NOT add:

* Active conversation
* Assistant messages
* Citation panel
* Voice overlay
* OCR
* Photo preview
* Settings screens
* Authentication
* Backend/API
* Admin dashboard
* Analytics

Those will be handled in later steps.

## 15. FINAL GOAL

The final result should look like a polished version of the current screen, not a completely different design.

Priorities:

1. Better spacing
2. Better visual hierarchy
3. Clearer prompt-card clickability
4. Better input visibility
5. Slightly lighter sidebar
6. Better accessibility
7. Strong React component structure

Keep the current Standards Mitra identity and PRD-approved content intact.