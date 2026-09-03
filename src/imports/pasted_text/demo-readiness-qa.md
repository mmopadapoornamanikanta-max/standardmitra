STEP 13 — FINAL DEMO READINESS + FULL FRONTEND USABILITY QA

Continue from the existing Standards Mitra Vite + React + TypeScript project.

IMPORTANT:
- This is a FRONTEND-ONLY step.
- DO NOT create a `server/` folder.
- DO NOT create a backend.
- DO NOT add a database.
- DO NOT add authentication.
- DO NOT connect real AI services.
- DO NOT connect real BIS APIs.
- DO NOT migrate to Next.js.
- DO NOT redesign the product from scratch.
- DO NOT remove working functionality from Steps 1–12.
- Preserve the existing architecture and design language.
- Treat this as a final product-demo readiness pass.

GOAL

Review the entire Standards Mitra frontend as if a real user is testing it for the first time.

Fix usability problems, visual inconsistencies, broken states, accessibility issues, responsive problems, and prototype rough edges.

The final result should feel:

- Trustworthy
- Professional
- Simple
- Accessible
- Responsive
- Consistent
- Demo-ready


CURRENT ARCHITECTURE

Keep the existing structure:

src/
├── components/
├── config/
├── data/
├── services/
│   ├── apiClient.ts
│   ├── chatService.ts
│   └── bisService.ts
├── types/
└── App.tsx

Do not introduce a backend structure.


1. FULL USER JOURNEY TEST

Test the complete journey:

OPEN APP
↓
Empty state
↓
Select prompt card
↓
User message appears
↓
Thinking state
↓
Assistant response
↓
Citation badge
↓
Citation detail
↓
Follow-up chip
↓
Second user message
↓
Second assistant response
↓
New Chat
↓
Empty state again

Ensure every transition feels intentional and smooth.


2. EMPTY STATE QA

Verify:

Heading:
"Ask anything about Indian Standards"

Prompt cards should:

- Be clearly clickable
- Have hover state
- Have keyboard focus
- Work on mobile
- Trigger the normal send flow
- Disappear naturally once a conversation begins

Make sure the empty state remains vertically balanced on desktop and mobile.


3. CHAT QA

Check:

- User messages
- Assistant messages
- Bullet lists
- Paragraph spacing
- Citation badges
- Follow-up chips
- Thinking indicator
- Error messages
- Retry button

Ensure no message overlaps the sticky input.

Ensure long messages wrap correctly.

Ensure there is no horizontal scrolling.


4. CHAT INPUT QA

Verify:

- Text input
- Send button
- Microphone button
- Camera button

Behavior:

Empty input:
Send disabled

Text entered:
Send enabled

Sending:
Input remains usable according to the existing implementation

Thinking:
Waiting state is clear

After response:
Input returns to normal

Keyboard:

Enter:
Send message

Shift + Enter:
New line where supported

Do not change the existing service architecture.


5. FOLLOW-UP CHIP QA

Verify follow-up chips:

- Are contextually placed
- Do not overwhelm the response
- Wrap correctly on mobile
- Have hover state
- Have focus state
- Work with keyboard
- Trigger the existing send-message flow

Use approximately 2–4 chips per response.

Do not create an entirely new component if an existing QuickActionChip can be reused.


6. CITATION QA

Test citation interaction.

Citation badge:

Click
↓
Citation detail panel

Desktop:
Right-side panel

Mobile:
Bottom sheet

Verify:

- Standard number visible
- Title visible
- Clause visible
- Source snippet visible
- View Full Standard action visible
- Close button works
- Escape closes the panel
- Focus behavior is accessible

Do not create fake official links.

Keep prototype/demo wording where source information is simulated.


7. VOICE QA

Test all existing states:

Idle
Listening
Preview
Processing
Cancelled
Error

Expected flow:

Tap microphone
↓
Listening
↓
Transcript preview
↓
Edit or confirm
↓
Send

IMPORTANT:

Do not automatically send the transcript.

Verify:

- Active microphone uses navy trust accent
- Error uses appropriate error styling
- Cancel works
- Preview can be edited
- Mobile layout works
- Desktop layout works
- Escape closes the voice UI where appropriate


8. PHOTO / OCR QA

Test:

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
Chat input populated

IMPORTANT:

Do not automatically submit OCR text.

Verify:

- Preview is clear
- Scanning state is understandable
- OCR result is editable
- Use Text works
- Cancel works
- Mobile layout works
- Desktop layout works
- Reduced motion works


9. SETTINGS QA

Test:

Language:
EN
HI
TE

Text size:
Default
Large

Changing language must update all currently translated UI strings.

Changing text size must visibly affect chat content.

Verify:

- Chat messages scale
- Prompt cards remain readable
- Citation panel remains readable
- Sidebar remains readable
- Chat input remains readable
- No horizontal overflow

Do not shrink text to compensate for Large mode.


10. LANGUAGE QA

Test the entire visible interface in:

EN
HI
TE

Look for untranslated user-visible strings.

Check:

- Sidebar
- Header
- Empty state
- Prompt cards where appropriate
- Chat input
- Thinking state
- Retry
- Citation panel
- Voice controls
- Photo/OCR controls
- Settings
- Accessibility labels where relevant

If a phrase does not have a reliable translation in the existing prototype, do not invent complex terminology.

Keep terminology simple and understandable.


11. CONVERSATION HISTORY QA

Test:

- Selecting a conversation
- Active conversation highlighting
- New Chat
- Switching conversations
- Opening history on mobile
- Closing history drawer

When New Chat is selected:

- Messages reset
- Citation closes
- Voice state resets
- Photo/OCR state resets
- Language remains unchanged
- Text size remains unchanged

Do not add persistence.


12. OVERLAY QA

Verify only one major overlay is active at a time.

Potential overlays:

- Mobile sidebar
- Citation panel
- Settings
- Voice
- Photo/OCR

Ensure:

- Escape closes active overlay
- Outside click dismisses dismissible overlays
- Opening another major overlay closes conflicting overlays
- Background does not become accidentally interactive
- Focus remains accessible


13. MOBILE QA

Test approximately:

390 × 844

Check every major screen/state.

Specifically verify:

- Header
- Sidebar
- Empty state
- Chat
- Input
- Keyboard interaction
- Citation bottom sheet
- Settings bottom sheet
- Voice bottom sheet
- Photo/OCR bottom sheet
- Follow-up chips
- Large text mode

There must be:

- No horizontal scrolling
- No clipped text
- No inaccessible buttons
- No elements hidden behind the input


14. TABLET QA

Test approximately:

768 × 1024

Ensure the interface transitions naturally between mobile and desktop behavior.

Do not create unnecessary breakpoints.


15. DESKTOP QA

Test approximately:

1440 × 900

Check:

- Sidebar proportions
- Header
- Chat column width
- Empty state
- Message width
- Input width
- Citation panel
- Settings panel
- Voice panel
- Photo/OCR panel

Avoid excessive empty space.


16. ACCESSIBILITY QA

Verify:

- Keyboard navigation
- Visible focus indicators
- Semantic buttons
- Accessible dialog labels
- Accessible aria-labels
- Logical tab order
- Escape behavior
- Touch target sizes
- Text contrast

Do not rely solely on color to communicate state.

Ensure screen-reader labels make sense.

Respect:

prefers-reduced-motion


17. REDUCED MOTION QA

When:

prefers-reduced-motion: reduce

Verify:

- Message fade-in becomes effectively static
- Loading animation becomes static/subtle
- Panel transitions are reduced
- Scanning animation is reduced
- No unnecessary movement remains

Do not remove useful state information.


18. VISUAL CONSISTENCY

Audit all components for:

- Border radius
- Spacing
- Typography
- Button height
- Icon sizing
- Shadows
- Borders
- Colors
- Focus states

Use the existing design tokens wherever possible.

Do not introduce random one-off values.

Maintain:

- White/off-white surfaces
- Dark slate text
- Navy trust accent
- Muted BIS-inspired accent colors
- Subtle borders
- Restrained shadows


19. PROTOTYPE CONTENT QA

Make sure demo content is clearly distinguishable from verified live BIS information.

Do not display claims such as:

"Verified by BIS"

unless actually verified.

Do not invent:

- Standards
- Clauses
- Certification requirements
- Hallmarking rules
- Legal requirements
- Official BIS URLs

When appropriate, use:

"Demo response — verified BIS source information will appear when the live knowledge service is connected."


20. REMOVE PROTOTYPE ROUGH EDGES

Look for and fix:

- Placeholder-looking UI
- Duplicate controls
- Dead buttons
- Broken hover states
- Inconsistent capitalization
- Inconsistent spacing
- Unnecessary borders
- Excessive animations
- Console errors
- Unused imports
- Unused variables
- Duplicate types
- Dead code

Do not remove intentionally simulated functionality.


21. ICON QA

Use the existing icon system consistently.

Do not mix unrelated icon styles.

Every icon-only button should have an accessible aria-label.

Icons should not be unnecessarily large.


22. ERROR QA

Verify error states do not break the layout.

Errors should:

- Be understandable
- Be visually distinct
- Have retry where appropriate
- Not expose technical details
- Not leave the interface permanently stuck in Thinking state


23. LOADING QA

Verify:

Thinking → Response

and:

Thinking → Error

and:

Thinking → New Chat

all clear correctly.

There must be no stale loading indicators.


24. API-READY ARCHITECTURE QA

Keep:

src/services/apiClient.ts
src/services/chatService.ts
src/services/bisService.ts

Do not add direct network requests inside React components.

Do not remove the mock mode.

Do not add backend infrastructure.

The frontend must remain ready for future API integration.


25. PERFORMANCE QA

Avoid unnecessary:

- Re-renders
- Large dependencies
- Repeated calculations
- Duplicate state
- Heavy animations

Do not introduce a new state-management library.

Keep the application lightweight.


26. TYPESCRIPT QA

Before finishing:

- Run TypeScript checks
- Remove unused imports
- Remove unused variables
- Avoid `any`
- Resolve type inconsistencies
- Keep canonical types in `src/types/chat.ts`

There must be ZERO TypeScript errors.


27. PRODUCTION BUILD QA

Run the production build.

The build must succeed.

Do not leave build warnings caused by this step unresolved if they can reasonably be fixed without restructuring the project.


28. FINAL DEMO CHECKLIST

Before declaring this step complete, verify:

[ ] Empty state works
[ ] Prompt cards work
[ ] User messages work
[ ] Assistant messages work
[ ] Bullet lists render correctly
[ ] Thinking state works
[ ] Error state works
[ ] Retry works
[ ] Citation badges work
[ ] Citation panel works
[ ] Follow-up chips work
[ ] Conversation history works
[ ] New Chat works
[ ] Voice flow works
[ ] Photo/OCR flow works
[ ] EN works
[ ] HI works
[ ] TE works
[ ] Default text size works
[ ] Large text size works
[ ] Desktop works
[ ] Tablet works
[ ] Mobile works
[ ] Keyboard navigation works
[ ] Escape closes overlays
[ ] Reduced motion works
[ ] No horizontal scrolling
[ ] No broken controls
[ ] No direct fetch calls in components
[ ] No backend/server folder exists
[ ] Zero TypeScript errors
[ ] Production build succeeds


FINAL INSTRUCTION

This is a QA and refinement step, NOT a feature expansion step.

Do not add major new functionality.

Do not create backend infrastructure.

Do not redesign Standards Mitra.

Preserve the existing product vision and architecture.

Fix only what is necessary to make the current frontend feel polished, consistent, accessible, responsive, and ready for a professional product demonstration.

At the end, provide a concise implementation summary containing:

1. What was fixed
2. What was improved
3. Any intentional prototype limitations
4. TypeScript result
5. Production build result