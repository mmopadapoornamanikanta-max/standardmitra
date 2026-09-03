Continue from the existing Standards Mitra React/Next.js frontend.

IMPORTANT:
Do NOT redesign the UI.
Do NOT change the visual language.
Do NOT modify the completed Steps 1–6.

Treat Steps 1–6 as FROZEN.

STEP 7 GOAL:
Integrate the existing components into one coherent React frontend with clean shared state, predictable interactions, reusable data models, and responsive behavior.

This is an integration/refactoring step, NOT a new visual-design step.

==================================================
1. EXISTING FEATURES TO PRESERVE
==================================================

Preserve all existing functionality:

- App Shell
- Sidebar
- Header
- Empty State
- Prompt Cards
- Active Conversation
- UserMessage
- AssistantMessage
- TypingIndicator
- QuickActionChips
- ChatInput
- CitationBadge
- CitationPanel
- VoiceOverlay
- PhotoScanSheet
- SettingsPanel
- EN / HI / TE
- Default / Large text size
- Desktop responsive layout
- Mobile responsive layout
- Existing accessibility behavior

Do not replace working components with duplicated versions.

==================================================
2. APPLICATION STATE
==================================================

Create one clear application-level state model.

Conceptual state:

language:
"EN" | "HI" | "TE"

textSize:
"default" | "large"

inputValue:
string

messages:
Message[]

isTyping:
boolean

citationPanelOpen:
boolean

selectedCitation:
Citation | null

voiceState:
"closed" |
"listening" |
"preview" |
"processing" |
"error"

photoScanState:
"closed" |
"options" |
"preview" |
"scanning" |
"ocr" |
"error"

settingsOpen:
boolean

activeConversationId:
string | null

Use one source of truth for each state.

Do NOT create duplicate state inside multiple parent/child components when the state affects other components.

==================================================
3. MESSAGE DATA MODEL
==================================================

Use a reusable Message model.

Conceptual:

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Citation[]
}

Conceptual Citation:

type Citation = {
  id: string
  standardNumber: string
  title: string
  clause?: string
  snippet?: string
}

Do not hard-code separate message markup for every message.

MessageList should render messages from data.

==================================================
4. CONVERSATION FLOW
==================================================

Make the existing prototype behave like a real chat flow.

Flow:

Empty State
↓
User selects prompt OR enters text
↓
UserMessage appears
↓
TypingIndicator appears
↓
Simulated assistant response
↓
AssistantMessage appears
↓
CitationBadge appears when response contains citations
↓
QuickActionChips remain available
↓
ChatInput remains ready

Use the existing simulated-response system.

Do NOT add a backend or API.

Keep:

getSimulatedResponse()

as the single source for prototype assistant responses.

==================================================
5. SEND MESSAGE
==================================================

Centralize message submission.

Conceptual:

handleSendMessage(text)

Responsibilities:

1. Ignore empty/whitespace-only input.
2. Add user message.
3. Clear input.
4. Set isTyping = true.
5. Generate simulated response.
6. Add assistant response.
7. Set isTyping = false.

Prevent duplicate submission while processing.

Do not duplicate send logic inside:
- ChatInput
- VoiceOverlay
- PhotoScanSheet
- PromptCard

These components should call the shared parent-level action.

==================================================
6. PROMPT CARDS
==================================================

Prompt cards must use the same message submission function.

Example:

Prompt Card
→ handleSendMessage(promptText)

Do NOT create a separate conversation implementation for prompt cards.

After clicking a prompt card:

UserMessage
→ TypingIndicator
→ AssistantMessage

==================================================
7. QUICK ACTION CHIPS
==================================================

Quick action chips should also use:

handleSendMessage()

Each chip supplies predefined text.

Do not duplicate assistant-response logic.

Keep the existing visual placement directly above ChatInput.

==================================================
8. VOICE INTEGRATION
==================================================

Preserve the existing VoiceOverlay state machine.

Voice flow:

Mic
↓
Listening
↓
Transcript Preview
↓
User confirms/edits
↓
Send
↓
handleSendMessage(transcript)
↓
VoiceOverlay closes
↓
Normal chat response flow

Important:

Voice must NOT create its own message system.

It must call the same:

handleSendMessage()

used by ChatInput and PromptCards.

If the user cancels:

VoiceOverlay
→ closed
→ input remains unchanged unless already edited

No real speech API.

==================================================
9. PHOTO/OCR INTEGRATION
==================================================

Preserve the existing PhotoScanSheet behavior.

Flow:

Camera
↓
Options
↓
Preview
↓
Scanning
↓
OCR Result
↓
Edit extracted text
↓
Use Text
↓
prefill ChatInput

IMPORTANT:

"Use text" must NOT send the message.

It only populates:

inputValue

Then the user decides whether to edit and send.

When the user eventually sends:

handleSendMessage(inputValue)

Do not create a separate OCR submission flow.

==================================================
10. CITATION INTEGRATION
==================================================

CitationBadge should use the shared:

selectedCitation

state.

Flow:

AssistantMessage
↓
CitationBadge
↓
setSelectedCitation(citation)
↓
citationPanelOpen = true

CitationPanel receives:

citation
open
onClose

Closing:

citationPanelOpen = false
selectedCitation = null

Do not duplicate citation information inside multiple components.

Keep the existing desktop right panel and mobile bottom sheet.

==================================================
11. SETTINGS INTEGRATION
==================================================

Settings must continue using:

language
textSize

as shared application state.

Header language selector
AND
SettingsPanel

must update the same:

setLanguage()

function.

Settings text-size control must update:

setTextSize()

Do not introduce a second settings state.

Preserve the completed Step 6 behavior.

==================================================
12. SIDEBAR INTEGRATION
==================================================

Keep existing sidebar behavior.

New Chat should reset the conversation appropriately.

Conceptual:

handleNewChat()

should:

- clear messages
- clear active conversation
- close citation panel
- close voice
- close photo scanner
- keep language
- keep text size

Do not reset user preferences when starting a new chat.

==================================================
13. CONVERSATION HISTORY
==================================================

Keep the existing prototype recent-conversation UI.

Use simple data-driven mock conversation entries.

Example:

type Conversation = {
  id: string
  title: string
}

Clicking a history item may switch the active conversation in the prototype.

Do not build persistence or backend storage.

If historical conversations are only visual placeholders, keep them clearly prototype-level.

==================================================
14. OVERLAY MUTUAL EXCLUSION
==================================================

Prevent conflicting overlays.

Rules:

Voice open
→ Photo scanner must be closed.

Photo scanner open
→ Voice must be closed.

Settings open
→ Voice/photo overlays should not remain simultaneously active.

Citation panel can remain independently controlled.

Do not allow multiple bottom sheets/dialogs to stack unnecessarily.

==================================================
15. FOCUS MANAGEMENT
==================================================

Preserve the accessibility behavior already implemented.

When:

Settings closes
→ focus settings trigger.

Citation panel closes
→ focus citation trigger where available.

Voice closes
→ focus microphone trigger.

Photo scanner closes
→ focus camera trigger.

Do not remove existing focus refs.

Escape should close the currently active dismissible overlay.

==================================================
16. RESPONSIVE BEHAVIOR
==================================================

Desktop:

1440 × 900

Mobile:

390 × 844

Verify that integration does not introduce:

- horizontal scrolling
- clipped chat messages
- overlapping sticky input
- broken panels
- inaccessible controls

Desktop:
- sidebar visible
- citation panel slides from right
- settings anchored
- voice inline

Mobile:
- sidebar becomes drawer
- citation becomes bottom sheet
- settings becomes bottom sheet
- voice becomes bottom sheet
- photo scanner becomes bottom sheet
- ChatInput remains accessible

==================================================
17. COMPONENT RESPONSIBILITY
==================================================

Keep responsibilities clean.

App / page-level layer:
- shared application state
- message submission
- conversation state
- overlay coordination

Sidebar:
- conversations
- new chat
- settings trigger

Header:
- branding
- language control
- mobile menu

MessageList:
- render messages

UserMessage:
- display user message

AssistantMessage:
- display assistant response + citations

CitationBadge:
- trigger citation selection

CitationPanel:
- display selected citation

ChatInput:
- collect/send text
- open voice
- open photo

VoiceOverlay:
- voice state machine only

PhotoScanSheet:
- photo/OCR state machine only

SettingsPanel:
- language/text-size controls only

Do not allow presentation components to own unrelated application state.

==================================================
18. REMOVE DUPLICATED LOGIC
==================================================

Audit the existing implementation for duplicated:

- send-message logic
- language state
- text-size state
- citation state
- overlay state
- simulated response generation

Consolidate where necessary.

Do not change behavior while refactoring.

==================================================
19. TYPESCRIPT
==================================================

Use clear TypeScript types/interfaces for:

Message
Citation
Conversation
Language
TextSize
VoiceState
PhotoScanState

Avoid:

any

where a proper type can be used.

Use discriminated unions for complex state machines where appropriate.

==================================================
20. FRONTEND CODE STRUCTURE
==================================================

Keep the structure developer-friendly.

Conceptual:

components/
  layout/
    AppShell
    Sidebar
    Header

  chat/
    MessageList
    UserMessage
    AssistantMessage
    TypingIndicator
    QuickActionChip
    ChatInput

  citations/
    CitationBadge
    CitationPanel

  voice/
    VoiceOverlay
    VoiceWaveform
    VoiceTranscript

  photo/
    PhotoScanSheet
    PhotoCaptureOptions
    PhotoPreview
    ScanProgress
    OcrResult

  settings/
    SettingsPanel
    LanguageSelector
    TextSizeControl

lib/
  mockResponses
  mockConversations

types/
  chat

Exact folder structure may differ based on the existing project, but maintain equivalent separation.

==================================================
21. DESIGN FREEZE
==================================================

Do NOT change:

- colors
- typography
- spacing
- border radii
- component dimensions
- panel widths
- animations
- icon style
- existing copy

unless required to fix an actual integration bug.

This step is about architecture and behavior.

==================================================
22. FINAL QA FLOWS
==================================================

Verify these complete flows:

FLOW A:
Empty State
→ Prompt Card
→ UserMessage
→ Typing
→ AssistantMessage

FLOW B:
ChatInput
→ UserMessage
→ Typing
→ AssistantMessage

FLOW C:
Assistant Citation
→ CitationBadge
→ CitationPanel
→ Close
→ Focus returns

FLOW D:
Mic
→ Listening
→ Transcript
→ Preview
→ Send
→ Normal chat response

FLOW E:
Camera
→ Preview
→ Scanning
→ OCR
→ Edit
→ Use Text
→ ChatInput
→ Send

FLOW F:
Settings
→ Change HI
→ UI labels update
→ Change TE
→ UI labels update
→ Change text size
→ UI text size updates

FLOW G:
New Chat
→ conversation clears
→ preferences remain

FLOW H:
Mobile
→ all above flows remain usable

==================================================
23. ACCEPTANCE CHECKLIST
==================================================

Step 7 is complete only when:

✓ One shared application state model exists
✓ One shared send-message function exists
✓ Prompt cards use shared send logic
✓ ChatInput uses shared send logic
✓ Voice uses shared send logic
✓ OCR uses ChatInput/shared send logic
✓ Citation selection is shared
✓ Language state is shared
✓ Text-size state is shared
✓ New Chat resets conversation without resetting preferences
✓ Voice/photo/settings overlays do not conflict
✓ Existing focus management remains functional
✓ Existing responsive layouts remain intact
✓ TypeScript models are clear
✓ Repeated UI is data-driven
✓ No backend/API added
✓ No new visual features added
✓ Steps 1–6 remain visually unchanged

STOP HERE.

Do not implement Step 8.
Do not add new product features.
Only complete the integration and cleanup described above.