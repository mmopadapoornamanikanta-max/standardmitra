STEP 5 — PHOTO SCAN + OCR FOR STANDARDS MITRA

IMPORTANT:
Continue from the existing Standards Mitra Figma design and React/Next.js-oriented component architecture created in Steps 1–4.

DO NOT redesign, replace, or restyle the existing approved work from Steps 1–4.

This step ONLY adds the Photo Scan + OCR interaction.

The existing visual system, spacing, typography, colors, components, responsive behavior, accessibility patterns, voice interaction, citation panel, chat messages, and ChatInput must remain consistent.

==================================================
1. OBJECTIVE
==================================================

Add a complete photo scanning and OCR interaction for Standards Mitra.

The user should be able to:

1. Click/tap the existing camera button.
2. Open a photo capture/upload sheet.
3. Choose to capture or upload an image.
4. Preview the selected image.
5. Confirm the image for scanning.
6. See a scanning/progress state.
7. See extracted OCR text.
8. Review and edit the extracted text.
9. Send the confirmed text as a normal chat message.
10. Return to the normal ChatInput state.

This is a FRONTEND PROTOTYPE.

Do NOT implement:

- Real camera APIs
- Browser camera permissions
- Real OCR
- Image-processing APIs
- Backend/API calls
- File uploads to a server

Use simulated prototype states and sample image/OCR content.

==================================================
2. PRODUCT BEHAVIOR FROM PRD
==================================================

The intended flow is:

Camera
→ Upload/Capture Sheet
→ Image Preview
→ Scanning
→ OCR Result
→ User confirms/edits
→ Send
→ Normal Chat Message

IMPORTANT:

OCR must NOT automatically submit the question.

The extracted text must be placed into an editable input/review state so the user can verify and correct it before sending.

This is especially important because OCR may misread:

- Standard numbers
- Product names
- Certification marks
- Numbers
- Abbreviations
- Hindi/English text

==================================================
3. DO NOT CHANGE EXISTING FEATURES
==================================================

Keep these existing elements unchanged:

- Sidebar
- New Chat
- Recent conversation list
- Header
- Standards Mitra branding
- EN / HI / TE selector
- Online status
- Empty state
- Prompt cards
- UserMessage
- AssistantMessage
- TypingIndicator
- CitationBadge
- QuickActionChip
- ChatInput
- MicButton
- VoiceOverlay
- CitationPanel
- Existing design tokens
- Existing accessibility patterns
- Existing responsive behavior

Do NOT add:

- Real OCR
- Real camera functionality
- Backend
- API integration
- Authentication
- Account management
- Settings redesign
- Export/share
- Feedback
- Saved answers
- Dark mode
- Analytics
- Admin UI

Those belong to later phases.

==================================================
4. COMPONENT ARCHITECTURE
==================================================

Create the following reusable React-oriented components:

PhotoScanSheet
PhotoCaptureOptions
PhotoPreview
ScanProgress
OcrResult
ScanControls
CameraButton

Recommended hierarchy:

AppShell
 └── MainContent
      ├── Header
      ├── ChatArea
      │    └── MessageList
      └── ChatComposer
           ├── PhotoScanSheet
           │    ├── PhotoCaptureOptions
           │    ├── PhotoPreview
           │    ├── ScanProgress
           │    ├── OcrResult
           │    └── ScanControls
           ├── QuickActionChips
           └── ChatInput

Reuse the existing:

ChatInput
MessageList
UserMessage
AssistantMessage
TypingIndicator
CameraButton styling
Design tokens

The PhotoScanSheet should be reusable and should not contain page-specific business logic.

==================================================
5. PHOTO SCAN STATES
==================================================

Create explicit states:

A. Idle
B. Capture / Upload Options
C. Image Preview
D. Scanning
E. OCR Result
F. Editing
G. Processing
H. Error
I. Cancelled

Primary prototype flow:

Idle
→ Capture / Upload Options
→ Image Preview
→ Scanning
→ OCR Result
→ Editing / Confirm
→ Processing
→ Normal Chat

==================================================
6. IDLE STATE
==================================================

The normal ChatInput remains visible.

Reuse the existing camera button.

Do NOT redesign the camera button.

CameraButton should have variants:

- Default
- Hover
- Focus-visible
- Active
- Disabled
- Processing

Use the existing design tokens.

Interactive target:

minimum 44×44px.

On click/tap:

CameraButton
→ PhotoScanSheet

==================================================
7. CAPTURE / UPLOAD OPTIONS
==================================================

When the camera button is activated, open:

PhotoScanSheet

Desktop:

Use a compact panel/sheet anchored near the ChatInput.

Do not cover the entire conversation.

Mobile:

Use a bottom-sheet interaction similar to the existing voice interaction.

The sheet should contain:

Title:

"Scan a product or document"

Supporting text:

"Take a photo or upload an image to extract text."

Provide two primary options:

1. Take a photo
2. Upload an image

Also provide:

Cancel

Use clear icons:

- Camera
- Image/upload
- Close

Buttons must have:

- clear labels
- visible focus state
- minimum 44×44px interactive area
- accessible names

==================================================
8. DESKTOP PHOTO SHEET
==================================================

Desktop size:

1440 × 900

Keep the existing:

248px sidebar
Header
Chat width
Quick action area
ChatInput

The photo sheet should appear naturally above or adjacent to the composer.

Recommended structure:

┌─────────────────────────────────────┐
│ Scan a product or document          │
│ Take a photo or upload an image     │
│                                     │
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Camera       │ │ Upload       │  │
│ │ Take photo   │ │ Image        │  │
│ └──────────────┘ └──────────────┘  │
│                                     │
│ Cancel                              │
└─────────────────────────────────────┘

Use the existing Standards Mitra visual language.

Do not introduce a completely new modal style.

==================================================
9. MOBILE PHOTO SHEET
==================================================

Create mobile version at:

390 × 844

Use a bottom-sheet pattern consistent with VoiceOverlay.

Requirements:

- fixed bottom sheet
- subtle backdrop
- rounded top corners
- drag handle
- safe-area spacing
- max height approximately 70–75vh
- accessible dialog semantics
- Escape/cancel behavior
- focus management

Mobile hierarchy:

┌──────────────────────────┐
│        drag handle       │
│                          │
│ Scan a product or        │
│ document                 │
│                          │
│ ┌──────────────────────┐ │
│ │  Take a photo        │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │  Upload an image     │ │
│ └──────────────────────┘ │
│                          │
│ Cancel                   │
└──────────────────────────┘

==================================================
10. IMAGE PREVIEW
==================================================

After:

Take a photo

or

Upload an image

transition to:

PhotoPreview

Use a realistic prototype image representing a consumer product/document with visible text.

IMPORTANT:

This is only prototype imagery.

Do not use or imply an official BIS certificate.

Do not invent a real BIS certificate or official document.

The preview should show:

- image
- filename or simple label
- image dimensions/metadata only if useful
- Retake
- Continue / Scan
- Cancel

Primary action:

"Scan image"

Secondary:

"Retake"

or

"Choose another"

==================================================
11. IMAGE PREVIEW LAYOUT
==================================================

Desktop:

Display the image in a centered preview container.

Recommended:

max-width 520px
max-height 420px

Maintain image aspect ratio.

Use:

- rounded 12–16px corners
- subtle border
- restrained shadow
- neutral background

Controls below the image.

Mobile:

Image should fit within available width.

Do not crop the image unnecessarily.

Allow enough space for controls without creating an unusable sheet.

==================================================
12. SCANNING STATE
==================================================

After:

"Scan image"

transition to:

ScanProgress

Show:

"Scanning image…"

Supporting text:

"Reading visible text from the image."

Use a subtle scanning animation.

Possible visual:

- image preview remains visible
- animated horizontal scan line
- subtle progress indicator
- small scanning icon

Do NOT use excessive animation.

Do NOT imply that a real OCR engine is running.

This is a simulated prototype state.

Recommended duration:

approximately 1–2 seconds in prototype.

==================================================
13. SCAN ANIMATION
==================================================

Create a reusable scanning animation.

Component:

ScanProgress

Use:

- subtle scan line
- opacity/position animation
- restrained trust accent
- smooth motion

Respect:

prefers-reduced-motion

For reduced motion:

- remove moving scan line
- show static progress indicator

Do not use flashy effects.

==================================================
14. OCR RESULT
==================================================

After scanning:

show:

OcrResult

Title:

"Text found"

Supporting text:

"Review the extracted text before sending."

Show extracted text in an editable field.

Example prototype OCR result:

"Check BIS certification requirements for this product"

The text should look like normal user input, not like a final submitted message.

==================================================
15. OCR RESULT STRUCTURE
==================================================

Recommended:

┌─────────────────────────────────────┐
│ Text found                          │
│ Review the extracted text           │
│ before sending.                     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Check BIS certification         │ │
│ │ requirements for this product   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ Try again ]        [ Use text ]   │
└─────────────────────────────────────┘

Primary action:

"Use text"

Secondary:

"Try again"

The user should be able to edit the extracted text before selecting Use text.

==================================================
16. EDITABLE OCR TEXT
==================================================

Create:

OcrResult

with states:

- Reading
- Preview
- Editing
- Empty
- Error

Use a real editable text area in the design.

When editing:

- reuse existing ChatInput typography
- existing border/radius system
- visible focus ring
- clear cursor
- readable text
- sufficient height for multiple lines

Do not introduce a completely new text-input design.

==================================================
17. OCR CONFIDENCE
==================================================

Do NOT display fake numeric confidence percentages.

Do NOT show:

"98% accurate"

or similar fabricated metrics.

Instead use simple language:

"Review the extracted text before sending."

This keeps the prototype trustworthy.

==================================================
18. USE TEXT BEHAVIOR
==================================================

When the user selects:

"Use text"

the OCR text should be transferred into the existing ChatInput.

It should NOT immediately become a message.

Example:

OcrResult
→ ChatInput populated with:

"Check BIS certification requirements for this product"

The user can then:

- edit
- add text
- remove text
- send normally

This makes OCR behave as an input method rather than a separate chat system.

==================================================
19. NORMAL CHAT SUBMISSION
==================================================

When the user sends the OCR-derived text:

Close PhotoScanSheet.

Create a normal:

UserMessage

using the existing message component.

Then:

TypingIndicator

Then:

AssistantMessage

Use the existing Step 2 simulated response system.

Do NOT create:

OcrMessage
PhotoMessage
ScanMessage

OCR input must use the same normal chat message pipeline.

==================================================
20. SIMULATED RESPONSE
==================================================

Use the existing:

getSimulatedResponse

architecture.

Do not create a second response-generation system.

The OCR-derived question should work exactly like typed or voice input.

Example:

UserMessage:

"Check BIS certification requirements for this product"

Then:

TypingIndicator

Then:

AssistantMessage

with an existing-style placeholder citation:

IS XXXX

Do not invent real BIS standards or fake BIS document URLs.

==================================================
21. RETAKE / TRY AGAIN
==================================================

From:

Image Preview

"Retake"

should return to:

Capture / Upload Options

From:

OCR Result

"Try again"

should return to:

Image Preview

or allow the user to select another image.

Keep transitions predictable.

Do not lose the rest of the conversation.

==================================================
22. ERROR STATE
==================================================

Create an accessible error state.

Example:

"Couldn't read text from this image."

Supporting text:

"Try a clearer photo or enter your question manually."

Actions:

"Try again"

"Use text input"

Keep the error calm and non-technical.

Do not display fake technical OCR errors.

==================================================
23. CANCELLED STATE
==================================================

If the user cancels at any stage:

- close PhotoScanSheet
- return to normal ChatInput
- preserve existing typed input
- do not create a message
- do not change the conversation

Cancellation should feel immediate.

==================================================
24. CAMERA BUTTON STATES
==================================================

Create explicit variants:

CameraButton:

1. Default
2. Hover
3. Focus-visible
4. Active
5. Disabled
6. Processing

Use the existing camera icon.

Do not change the existing ChatInput layout.

If PhotoScanSheet is open:

CameraButton may show an active state.

==================================================
25. DESKTOP RESPONSIVE DESIGN
==================================================

Desktop frame:

1440 × 900

Keep:

Sidebar = approximately 248px
Existing Header
Existing ChatArea
Existing QuickActionChips
Existing ChatInput

The PhotoScanSheet should visually connect to the composer.

Do not cover the entire screen.

The conversation should remain visible.

==================================================
26. MOBILE RESPONSIVE DESIGN
==================================================

Mobile frame:

390 × 844

Use the existing mobile shell.

PhotoScanSheet:

- fixed bottom sheet
- max height 70–75vh
- rounded top corners
- drag handle
- backdrop
- safe-area spacing
- accessible dialog
- reachable buttons

The image preview must remain readable without forcing excessive scrolling.

==================================================
27. ACCESSIBILITY
==================================================

Follow the existing accessibility approach.

Requirements:

- keyboard accessible
- visible focus-visible rings
- semantic buttons
- accessible names
- appropriate dialog semantics
- aria-modal="true" when using modal/bottom-sheet behavior
- Escape closes/cancels
- focus moves into the active sheet
- focus returns to CameraButton after cancellation
- OCR text uses a real textarea/input
- minimum 44×44px interactive targets
- sufficient contrast
- do not rely only on color
- reduced-motion support

Suggested accessible labels:

"Photo scan"

"Take a photo"

"Upload an image"

"Scan image"

"Retake photo"

"Try again"

"Use extracted text"

"Cancel photo scan"

==================================================
28. FOCUS MANAGEMENT
==================================================

When PhotoScanSheet opens:

Move focus to the first meaningful control.

When entering OCR editing:

Move focus to the OCR textarea.

When PhotoScanSheet closes:

Return focus to the CameraButton.

Do not leave keyboard focus behind an overlay.

==================================================
29. ANIMATION
==================================================

Use restrained animation.

Desktop opening:

180–220ms ease-out

Mobile bottom sheet:

220ms slide-up

Closing:

150–200ms ease-in

Scanning:

subtle scan-line movement

OCR result:

small opacity/translate transition

Respect:

prefers-reduced-motion

Do not animate the entire conversation.

==================================================
30. VISUAL STYLE
==================================================

Follow the existing Standards Mitra design system.

Use:

- neutral white/off-white surfaces
- dark slate text
- existing navy / muted saffron / blue trust accent
- subtle borders
- 12–16px radius
- generous spacing
- Inter/system sans
- restrained shadows
- accessible contrast

Photo scanning should feel:

Trustworthy
Simple
Calm
Useful
Accessible
Professional

It should feel like a government-service assistant, not a social media camera interface.

==================================================
31. REACT STATE ARCHITECTURE
==================================================

Use an explicit discriminated-union-style state model.

Conceptual:

photoScanState:
"idle"
| "options"
| "preview"
| "scanning"
| "ocr"
| "editing"
| "processing"
| "error"
| "cancelled"

Additional conceptual state:

selectedImage
ocrText
isEditing

Example:

<PhotoScanSheet
  state={photoScanState}
  image={selectedImage}
  ocrText={ocrText}
  onCancel={...}
  onCapture={...}
  onUpload={...}
  onScan={...}
  onRetry={...}
  onUseText={...}
/>

Do not implement actual camera/OCR APIs.

The design should make real implementation straightforward later.

==================================================
32. DATA MODEL
==================================================

Use simple prototype data.

Conceptual:

type PhotoScanState =
  | "idle"
  | "options"
  | "preview"
  | "scanning"
  | "ocr"
  | "editing"
  | "processing"
  | "error"
  | "cancelled"

Conceptual OCR data:

{
  text: "Check BIS certification requirements for this product",
  source: "photo"
}

Do not introduce unnecessary backend-specific models.

==================================================
33. PROTOTYPE INTERACTIONS
==================================================

FLOW A — OPEN SCANNER

CameraButton
→ PhotoScanSheet Options

FLOW B — TAKE PHOTO

Take a photo
→ Image Preview

FLOW C — UPLOAD

Upload an image
→ Image Preview

FLOW D — PREVIEW

Scan image
→ Scanning

FLOW E — SCANNING

Scanning
→ OCR Result

FLOW F — OCR RESULT

OCR Result
→ Editable text

FLOW G — USE TEXT

Use text
→ ChatInput populated

FLOW H — EDIT

Edit OCR text
→ Editable textarea

FLOW I — SEND

ChatInput Send
→ PhotoScanSheet closes
→ UserMessage
→ TypingIndicator
→ AssistantMessage

FLOW J — RETAKE

Retake
→ Capture / Upload Options

FLOW K — TRY AGAIN

Try again
→ Image Preview

FLOW L — CANCEL

Cancel
→ Close PhotoScanSheet
→ Restore ChatInput

FLOW M — ESCAPE

Escape
→ Cancel / close scanner

==================================================
34. PROTOTYPE IMAGE
==================================================

Use one realistic but generic prototype image.

The image should depict a consumer product package or label with visible printed text.

Do NOT use:

- real user documents
- identity documents
- payment cards
- personal information
- real certificates
- fake official BIS certificates
- fabricated official BIS logos

The purpose is to demonstrate the OCR workflow visually.

=====================