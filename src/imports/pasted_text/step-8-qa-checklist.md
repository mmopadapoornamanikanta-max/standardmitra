Continue from the existing Standards Mitra React/Next.js frontend.

IMPORTANT:
Steps 1–7 are COMPLETE and FROZEN.

Do NOT redesign the application.
Do NOT introduce new product features.
Do NOT change the established visual system.

STEP 8 GOAL:
Perform a final frontend QA and production-readiness pass across the existing implementation.

This step is about:
- consistency
- bugs
- responsive behavior
- accessibility
- state handling
- loading/error states
- component quality
- React/Next.js readiness

==================================================
1. DESIGN FREEZE
==================================================

Preserve:

- existing colors
- typography
- spacing
- border radii
- icons
- component dimensions
- animations
- copy
- sidebar layout
- header layout
- chat layout
- citation panel
- voice UI
- photo/OCR UI
- settings UI

Only make changes when necessary to fix:
- broken behavior
- accessibility issues
- responsive issues
- inconsistent states
- obvious implementation bugs

Do not visually redesign working components.

==================================================
2. DESKTOP QA
==================================================

Test the primary desktop viewport:

1440 × 900

Verify:

✓ Sidebar does not overlap MainContent
✓ Header remains aligned
✓ Chat content stays centered
✓ Messages remain readable
✓ ChatInput stays accessible
✓ QuickActionChips do not overflow
✓ CitationPanel does not break conversation width
✓ SettingsPanel does not overlap incorrectly
✓ VoiceOverlay remains inside intended layout
✓ PhotoScanSheet remains inside intended layout
✓ No horizontal scrolling
✓ No clipped controls
✓ Long messages wrap correctly

==================================================
3. MOBILE QA
==================================================

Test:

390 × 844

Verify:

✓ Sidebar becomes drawer
✓ Header remains usable
✓ Chat takes full available width
✓ Messages wrap correctly
✓ ChatInput remains accessible
✓ QuickActionChips scroll horizontally when necessary
✓ CitationPanel becomes bottom sheet
✓ Settings becomes bottom sheet
✓ Voice becomes bottom sheet
✓ Photo scanner becomes bottom sheet
✓ Bottom sheets do not exceed viewport
✓ Keyboard/input area does not create obvious overflow
✓ No horizontal scrolling

Also verify responsive behavior when viewport changes dynamically.

==================================================
4. CHAT STATES
==================================================

Verify all states:

Empty
Focused input
Typing
User message
Assistant response
Assistant response with citation
Long assistant response
Disabled input
Processing

TypingIndicator must disappear after response.

The send button must not submit empty whitespace.

Repeated clicks must not create accidental duplicate messages.

==================================================
5. CITATION QA
==================================================

Verify:

Assistant response
→ CitationBadge
→ CitationPanel

Desktop:
- right-side panel

Mobile:
- bottom sheet

Verify:

✓ Correct citation selected
✓ Correct title displayed
✓ Clause section works
✓ Source snippet remains readable
✓ Close works
✓ Escape works
✓ Focus returns to citation trigger where available
✓ Multiple citation badges select the correct citation

Do not introduce real BIS document URLs.

Keep prototype citation content clearly marked as prototype content.

==================================================
6. VOICE QA
==================================================

Verify state machine:

Idle
→ Listening
→ Transcript Preview
→ Processing
→ Normal Chat

Also verify:

Listening
→ Cancel

Listening
→ Escape

Preview
→ Edit
→ Send

Error
→ Retry / Close

Verify:

✓ Voice cannot conflict with Photo Scanner
✓ Voice cannot conflict with Settings
✓ ChatInput disabled appropriately while voice is active
✓ Focus returns to microphone after closing
✓ Reduced-motion behavior remains functional
✓ No real microphone API is introduced

==================================================
7. PHOTO / OCR QA
==================================================

Verify:

Idle
→ Options
→ Preview
→ Scanning
→ OCR
→ Edit
→ Use Text
→ ChatInput
→ Send

Important:

"Use Text" must ONLY populate ChatInput.

It must never auto-submit.

Verify:

✓ Camera and Voice remain mutually exclusive
✓ Escape closes scanner
✓ Cancel works
✓ Focus returns to camera
✓ OCR textarea is editable
✓ Long OCR text remains usable
✓ Scanning animation respects reduced motion
✓ No real camera/OCR API is introduced

==================================================
8. SETTINGS QA
==================================================

Verify:

Settings trigger
→ SettingsPanel

Language:

EN
HI
TE

Text size:

Default
Large

Verify:

✓ Header and Settings use the same language state
✓ Language changes update demonstrated UI labels
✓ Text size updates readable content
✓ Icons and controls remain correctly sized
✓ Escape closes Settings
✓ Focus returns to Settings trigger
✓ Settings cannot unnecessarily stack with Voice/Photo

==================================================
9. NEW CHAT QA
==================================================

Verify:

New Chat

resets:

- messages
- active conversation
- selected citation
- citation panel
- temporary voice state
- temporary photo state
- settings state

But preserves:

- language
- text size

Do not reset user preferences when creating a new conversation.

==================================================
10. CONVERSATION HISTORY
==================================================

Verify existing mock conversation history remains usable.

Clicking a conversation must not:

- corrupt current state
- duplicate messages
- break ChatInput
- leave an unrelated citation panel open
- leave Voice/Photo overlays open

Keep history prototype-level.

Do not add persistence or backend storage.

==================================================
11. ACCESSIBILITY AUDIT
==================================================

Audit all interactive components.

Verify:

✓ Keyboard navigation
✓ Visible focus-visible rings
✓ Minimum 44px interaction targets
✓ Buttons have accessible names
✓ Icon-only buttons have aria-labels
✓ Dialogs have appropriate semantics
✓ Mobile bottom sheets use aria-modal where appropriate
✓ Escape closes dismissible overlays
✓ Focus moves into opened dialogs
✓ Focus returns after closing
✓ Form controls have labels
✓ Language options expose selected state
✓ No keyboard-only dead ends

Do not remove existing accessibility work.

==================================================
12. REDUCED MOTION
==================================================

Verify existing animations respect:

prefers-reduced-motion

This includes:

- typing indicator
- voice waveform
- panel transitions
- bottom-sheet transitions
- OCR scanning animation

When reduced motion is enabled:

Use static or significantly reduced animation.

Do not remove functional state feedback.

==================================================
13. ERROR / EDGE STATES
==================================================

Ensure the UI behaves safely for:

- empty input
- very long input
- very long assistant response
- very long OCR result
- rapid send clicks
- opening/closing overlays rapidly
- switching language while settings is open
- changing viewport while an overlay is open

Do not invent backend error handling.

Use prototype-level error states already established.

==================================================
14. REACT STATE AUDIT
==================================================

Review the state architecture.

Ensure there is no unnecessary duplication of:

- language
- textSize
- messages
- inputValue
- citation state
- voice state
- photo state
- settings state

Prefer one source of truth.

Ensure child components receive clear props and callbacks.

Avoid unnecessary global state.

==================================================
15. TYPESCRIPT AUDIT
==================================================

Verify shared types exist for:

Message
Citation
Conversation
Language
TextSize
VoiceState
PhotoScanState

Avoid unnecessary:

any

Avoid duplicated type definitions.

Use discriminated unions where state machines require them.

Ensure props have clear types.

==================================================
16. COMPONENT AUDIT
==================================================

Verify reusable components are actually reused.

Look for duplicated JSX for:

- messages
- language options
- citation content
- settings content
- mobile/desktop panel content
- buttons
- chips

Desktop/mobile should share content components where appropriate.

Only the responsive shell should differ.

==================================================
17. MOCK DATA AUDIT
==================================================

Verify mock data remains separate from UI components.

Keep:

- mock responses
- mock conversations
- prototype citation data

in appropriate data modules.

Do not embed large mock datasets directly inside presentation components.

Keep:

getSimulatedResponse()

as the single prototype response generator.

==================================================
18. FRONTEND / BACKEND BOUNDARY
==================================================

IMPORTANT:

Do not add:

- API calls
- database
- authentication
- real speech recognition
- real OCR
- server actions
- external BIS integrations
- analytics

The application remains a frontend prototype.

Keep integration points easy to replace later.

For example:

handleSendMessage()

can later call an API without changing ChatInput, VoiceOverlay, or PhotoScanSheet.

==================================================
19. NEXT.JS READINESS
==================================================

Review the implementation for clean migration into a Next.js application.

Prefer:

- reusable React components
- typed props
- isolated UI components
- data-driven rendering
- clear state ownership
- no unnecessary browser-only assumptions

For browser-dependent behavior such as:

window
matchMedia
document

ensure the implementation is safe for a Next.js environment.

The existing useIsMobile() hook should remain reactive and safe.

Do not introduce unnecessary dependencies.

==================================================
20. FINAL VISUAL CONSISTENCY
==================================================

Perform one final visual consistency pass.

Check:

- button heights
- icon sizes
- spacing
- border colors
- text hierarchy
- corner radius
- shadows
- focus states
- disabled states
- selected states

Reuse existing design tokens.

Do not introduce new colors or styles unless fixing an inconsistency.

==================================================
21. FINAL USER FLOWS
==================================================

Verify these complete journeys:

FLOW 1:
Prompt Card
→ User Message
→ Thinking
→ Assistant Response
→ Citation
→ Citation Panel

FLOW 2:
Chat Input
→ User Message
→ Assistant Response

FLOW 3:
Voice
→ Transcript
→ Edit
→ Send
→ Assistant Response

FLOW 4:
Photo
→ OCR
→ Edit
→ Use Text
→ Send
→ Assistant Response

FLOW 5:
Settings
→ HI
→ UI updates
→ TE
→ UI updates
→ Large text

FLOW 6:
New Chat
→ conversation reset
→ preferences preserved

FLOW 7:
Mobile
→ repeat the important flows without layout failures

==================================================
22. FINAL ACCEPTANCE CHECKLIST
==================================================

Step 8 is complete only when:

✓ Desktop QA passes
✓ Mobile QA passes
✓ No horizontal overflow
✓ Chat flow works
✓ Citation flow works
✓ Voice flow works
✓ Photo/OCR flow works
✓ Settings flow works
✓ New Chat works
✓ Overlay conflicts are prevented
✓ Focus management works
✓ Keyboard navigation works
✓ Reduced motion works
✓ Edge states are handled
✓ TypeScript types are centralized
✓ No unnecessary duplicated state
✓ Components remain reusable
✓ Mock data remains separated
✓ No backend/API introduced
✓ No new product features introduced
✓ Steps 1–7 remain visually frozen

==================================================
23. FINAL OUTPUT
==================================================

After completing the audit, provide a concise implementation summary containing:

1. Issues found
2. Issues fixed
3. Accessibility fixes
4. Responsive fixes
5. React/state fixes
6. Any remaining known limitations

Do not implement additional features.

STOP after Step 8.