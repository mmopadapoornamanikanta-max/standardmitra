# STANDARDS MITRA — STEP 3

# CITATION DETAIL PANEL + SOURCE EXPERIENCE

Continue from the existing Standards Mitra Figma/React frontend design.

DO NOT redesign the existing application.

Reuse the components and design system already created in Steps 1 and 2.

The goal of this step is to implement the **citation detail experience** required by the PRD.

==================================================

1. OBJECTIVE
   ==================================================

When a user clicks a CitationBadge inside an AssistantMessage:

Desktop:
CitationBadge → right-side CitationPanel opens.

Mobile:
CitationBadge → bottom-sheet CitationPanel opens.

The panel should help the user understand:

* Which Indian Standard is being referenced
* The relevant clause/source
* A short source snippet
* How to access the full standard

The experience should communicate trust and transparency without making the interface feel like a document-management system.

==================================================
2. EXISTING COMPONENTS TO REUSE
===============================

Reuse:

AppShell
Sidebar
Header
MessageList
UserMessage
AssistantMessage
CitationBadge
QuickActionChip
ChatInput

DO NOT duplicate these components.

Add:

CitationPanel

and supporting components only where necessary.

==================================================
3. COMPONENT STRUCTURE
======================

Use this conceptual structure:

CitationPanel
├── PanelHeader
│   ├── SourceIcon
│   ├── SourceLabel
│   └── CloseButton
│
├── StandardInformation
│   ├── StandardNumber
│   └── StandardTitle
│
├── ClauseSection
│   ├── ClauseLabel
│   └── ClauseSnippet
│
└── FullStandardAction
└── ViewFullStandardButton

Keep the component reusable.

==================================================
4. DESKTOP CITATION PANEL
=========================

Create a desktop screen at:

1440 × 900

When the citation is clicked, the panel slides in from the right.

Suggested width:

320–400px.

The underlying conversation remains visible.

Example:

┌─────────────────────────────────────────────┬───────────────────────┐
│                                             │ Source                │
│             Conversation                   │                       │
│                                             │ IS XXXX               │
│ User message                                │ Standard title        │
│                                             │                       │
│ Assistant response                          │ Relevant clause       │
│ [IS XXXX] ← clicked                         │                       │
│                                             │ Source snippet        │
│                                             │                       │
│                                             │ View full standard    │
│                                             │                       │
└─────────────────────────────────────────────┴───────────────────────┘

Do not completely replace the conversation with the panel.

The panel should behave as an overlay/sidebar.

==================================================
5. PANEL HEADER
===============

Create:

CitationPanelHeader

Contents:

Source icon

Text:

"Source"

Close button:

X

The close button must have:

* Default
* Hover
* Pressed
* Focus-visible
* Disabled if applicable

The close control should have a comfortable touch target.

==================================================
6. STANDARD NUMBER
==================

Display the selected citation's standard number prominently.

Example:

IS XXXX

Do not invent real standard numbers.

Use the existing placeholder format consistently.

Make the standard number visually prominent but not oversized.

==================================================
7. STANDARD TITLE
=================

Show a title below the standard number.

Because this is a prototype, use clearly placeholder/example wording.

Example:

"Indian Standard — Product Requirements"

Do not present fabricated information as an official BIS standard title.

If necessary, label prototype content appropriately.

==================================================
8. CLAUSE SECTION
=================

Create:

ClauseSection

Label:

"Relevant clause"

Below it, display a short source snippet.

Example placeholder:

"Relevant requirements are defined under the applicable provisions of this standard."

Keep the snippet short.

The purpose is to demonstrate the visual citation experience.

Do not fabricate a real BIS clause.

==================================================
9. VIEW FULL STANDARD
=====================

Create a primary action:

"View full standard"

This is a prototype action.

Do NOT create a fake URL.

Do NOT imply that the prototype already has access to the complete standard.

The button should be visually prominent but still consistent with the existing design system.

States:

* Default
* Hover
* Pressed
* Focused
* Disabled

==================================================
10. PANEL VISUAL DESIGN
=======================

Use the existing Standards Mitra design system.

Use:

* White/off-white surface
* Dark slate text
* Navy/muted blue accent
* Subtle border
* Very subtle shadow
* Existing corner-radius tokens
* Existing spacing tokens

Do not introduce a new visual language.

The panel should feel like part of the same application.

==================================================
11. PANEL OPEN/CLOSE STATES
===========================

Create explicit variants:

CitationPanel:

* Closed
* Opening
* Open
* Closing

Prototype animation:

CitationBadge clicked
→ panel slides in from right.

Close clicked
→ panel slides out.

Use a subtle transition.

Do not use exaggerated animation.

==================================================
12. BACKDROP
============

On desktop, the panel may use a subtle separation from the main conversation.

Do not heavily darken the entire page.

The conversation should remain readable.

If a backdrop is used, keep it very subtle.

==================================================
13. CITATION BADGE CONNECTION
=============================

Connect the existing:

CitationBadge

to:

CitationPanel

Prototype interaction:

Click CitationBadge
→ CitationPanel opens.

The selected citation should determine the information shown.

For the prototype, demonstrate at least two different citation examples.

Example:

Citation A:
IS XXXX

Citation B:
IS XXXX

Each can show different placeholder titles/snippets.

==================================================
14. DATA-DRIVEN STRUCTURE
=========================

The panel should conceptually receive a selected citation object.

Use:

Citation {
id
standardNumber
title
clause
snippet
}

Conceptual React usage:

<CitationPanel
citation={selectedCitation}
open={citationPanelOpen}
onClose={handleClose}
/>

Do not implement actual backend retrieval.

==================================================
15. MOBILE CITATION EXPERIENCE
==============================

Create a mobile frame:

390 × 844

Do NOT use the desktop right-side panel on mobile.

Use a bottom sheet.

Flow:

CitationBadge
↓
Bottom Sheet opens

The conversation remains visible behind the sheet.

==================================================
16. MOBILE BOTTOM SHEET
=======================

Structure:

CitationBottomSheet
├── DragHandle
├── Header
├── StandardNumber
├── StandardTitle
├── RelevantClause
├── SourceSnippet
└── ViewFullStandard

Use comfortable mobile spacing.

The bottom sheet should have rounded top corners.

Do not make it full-screen unless content requires it.

==================================================
17. MOBILE CLOSE BEHAVIOR
=========================

Support:

* Close button
* Drag/dismiss concept
* Backdrop interaction

For the prototype, prioritize:

Citation clicked
→ sheet opens

Close
→ sheet closes

Keep the interaction simple.

==================================================
18. RESPONSIVE BEHAVIOR
=======================

Desktop:

CitationPanel:

* right-side panel
* approximately 320–400px
* conversation remains visible

Mobile:

CitationBottomSheet:

* bottom aligned
* full available width
* rounded top corners

Tablet:

Use the desktop panel behavior where sufficient width exists.

==================================================
19. ACCESSIBILITY
=================

The citation experience must be accessible.

Ensure:

* CitationBadge has a visible focus state
* CitationBadge has an accessible label
* Close button has an accessible label
* Panel has an appropriate semantic dialog/region concept
* Keyboard users can reach the panel controls
* Focus should conceptually move into the panel when opened
* Escape should conceptually close the panel
* Do not rely only on color

Maintain the existing citation focus-ring treatment.

==================================================
20. SCROLLING
=============

If the panel content becomes longer:

Desktop:
Panel content can scroll independently.

Mobile:
Bottom sheet content can scroll.

Do not allow the underlying conversation to become difficult to use.

==================================================
21. EMPTY / LOADING STATES
==========================

Create minimal states only where useful:

Closed:
No panel visible.

Open:
Citation content visible.

Do not create backend loading behavior yet.

Do not create complex source search.

==================================================
22. REACT COMPONENT MAPPING
===========================

Document:

CitationPanel
→ <CitationPanel />

CitationPanelHeader
→ <CitationPanelHeader />

StandardInformation
→ <StandardInformation />

ClauseSection
→ <ClauseSection />

FullStandardAction
→ <FullStandardAction />

Mobile version may use the same logical component:

<CitationPanel />

with responsive presentation rather than creating completely separate logic.

==================================================
23. FRONTEND STATE
==================

Add conceptually:

citationPanelOpen
selectedCitation

Example:

citationPanelOpen: boolean

selectedCitation: Citation | null

Interaction:

setSelectedCitation(citation)
setCitationPanelOpen(true)

Close:

setCitationPanelOpen(false)

Do not implement backend state.

==================================================
24. PROTOTYPE FLOW
==================

Create:

Active Conversation
↓
Assistant Response
↓
CitationBadge
↓
Click CitationBadge
↓
CitationPanel opens
↓
Read source
↓
Click Close
↓
Return to conversation

Mobile:

Active Conversation
↓
CitationBadge
↓
Bottom Sheet opens
↓
Close
↓
Return to conversation

==================================================
25. VISUAL HIERARCHY
====================

Panel hierarchy should be:

1. Source
2. Standard number
3. Standard title
4. Relevant clause
5. Source snippet
6. View full standard

Do not make the source snippet visually overwhelming.

The panel should be easy to scan.

==================================================
26. DO NOT ADD
==============

Do NOT add:

* Real BIS documents
* Fake official URLs
* Document viewer
* PDF viewer
* Search inside standards
* Bookmarking
* Export
* Sharing
* Authentication
* Backend/API
* Admin functionality
* Analytics

These are outside this step.

==================================================
27. FINAL QUALITY CHECK
=======================

Verify:

✓ CitationBadge opens CitationPanel.

✓ Desktop uses a right-side panel.

✓ Mobile uses a bottom sheet.

✓ Conversation remains visible.

✓ Standard number is clearly displayed.

✓ Clause/snippet is clearly separated.

✓ "View full standard" action exists.

✓ Close interaction works.

✓ Focus states exist.

✓ Components remain reusable.

✓ Citation data is conceptually data-driven.

✓ Existing Step 1 and Step 2 visual design remains unchanged.

==================================================
28. FINAL GOAL
==============

The final result should make Standards Mitra feel trustworthy by showing users exactly where an answer's information comes from.

Keep the experience:

* Clear
* Calm
* Minimal
* Accessible
* Trustworthy
* React/Next.js implementation-ready

Do not redesign anything that was already approved in Steps 1 and 2.