Continue from the existing Standards Mitra React/Next.js frontend design.

IMPORTANT:
Do NOT redesign or modify Steps 1–5.
Preserve the existing:
- App Shell
- Sidebar
- Header
- Empty State
- Prompt Cards
- ChatInput
- Message components
- Citation Badge
- Citation Panel
- Voice Overlay
- Photo Scan Sheet
- Existing design tokens
- Existing responsive behavior
- Existing accessibility patterns

STEP 6 ONLY:
Implement Settings & Language.

GOAL:
Add a compact, production-ready Settings experience for:
1. Language selection: EN / HI / TE
2. Optional text-size adjustment

This should look and behave like a real React/Next.js frontend, not a static mockup.

==================================================
1. COMPONENT ARCHITECTURE
==================================================

Create reusable React-oriented components:

SettingsPanel
LanguageSelector
LanguageOption
TextSizeControl
SettingsSection
SettingsCloseButton

Recommended hierarchy:

SettingsPanel
 ├── SettingsHeader
 │    ├── SettingsTitle
 │    └── CloseButton
 ├── SettingsSection
 │    └── LanguageSelector
 │         ├── EN option
 │         ├── HI option
 │         └── TE option
 └── SettingsSection
      └── TextSizeControl

Keep repeated options data-driven.

Conceptual React state:

language: "EN" | "HI" | "TE"

textSize: "default" | "large"

settingsOpen: boolean

Do not add backend persistence.
Use local prototype state only.

==================================================
2. DESKTOP SETTINGS
==================================================

Desktop frame:
1440 × 900

The existing sidebar already contains the subtle settings icon/button.

When Settings is activated:

Open a compact settings popover/panel anchored near the settings control.

Do NOT create a large dashboard.

The main conversation should remain visible behind it.

Panel:
- approximately 320–360px wide
- white/off-white surface
- 12–16px rounded corners
- subtle border
- subtle shadow
- generous internal spacing

Hierarchy:

Settings
────────────────
Language

○ English
○ हिंदी
○ తెలుగు

Text size

A  Default
A  Large

Close / dismiss behavior

Use the existing Standards Mitra visual language.

==================================================
3. LANGUAGE SELECTOR
==================================================

Support exactly:

EN — English
HI — हिंदी
TE — తెలుగు

Use radio-style selection or segmented selection.

Selected language must be visually obvious.

Recommended:

[ English ] [ हिंदी ] [ తెలుగు ]

or a vertically stacked accessible radio list.

Selected state:
- trust/brand accent
- clear checkmark or selected indicator
- strong text contrast

Unselected state:
- neutral surface
- subtle border

Each option must have:
- minimum 44px touch target
- keyboard focus state
- visible selected state

Use aria labels appropriate for each option.

==================================================
4. LANGUAGE BEHAVIOR
==================================================

When the user selects a language:

Update the prototype language state.

Demonstrate the state change by translating a small set of existing UI labels.

For example:

EN:
"New Chat"
"Ask anything about Indian Standards"
"Settings"

HI:
"नई चैट"
"भारतीय मानकों के बारे में कुछ भी पूछें"
"सेटिंग्स"

TE:
"కొత్త చాట్"
"భారతీయ ప్రమాణాల గురించి ఏదైనా అడగండి"
"సెట్టింగ్‌లు"

Do NOT attempt to translate the entire application.

Only demonstrate enough UI labels to prove that language state works.

Do not change the meaning or structure of the application.

==================================================
5. TEXT SIZE
==================================================

Add a simple text-size preference.

Options:

Default
Large

Default:
Use the existing typography scale.

Large:
Increase primary readable text modestly.

Do NOT dramatically enlarge the entire interface.

Focus on:
- conversation text
- headings
- important labels

Keep controls and icons usable.

Show the currently selected option clearly.

Use a data-driven state:

textSize:
"default"
"large"

==================================================
6. HEADER LANGUAGE CONTROL
==================================================

The existing Header already contains:

EN / HI / TE

Connect this existing control to the same language state.

There must be ONE source of truth:

language

Do not create a second independent language state.

Selecting language from:
- Header
OR
- SettingsPanel

must update the same state.

The Header should reflect the current selection.

==================================================
7. SIDEBAR SETTINGS CONTROL
==================================================

Reuse the existing subtle settings icon/button from Step 1.

Do not redesign it.

Interaction:

Settings icon
→ opens SettingsPanel

Settings icon should have:

aria-label="Open settings"

Provide:
- hover state
- focus-visible ring
- active/pressed state

Minimum 44px interaction area.

==================================================
8. MOBILE SETTINGS
==================================================

Create a responsive mobile version.

Frame:
390 × 844

On mobile, Settings should open as a bottom sheet.

Structure:

Backdrop
  ↓
Bottom Sheet
  ├── Drag Handle
  ├── Settings Header
  ├── Language
  ├── Language Options
  ├── Text Size
  └── Controls

Bottom sheet:
- max-height approximately 70–75vh
- rounded top corners
- white/off-white surface
- subtle backdrop
- same PanelContent principles as desktop

Use the same SettingsPanel content.

Only the shell changes between desktop and mobile.

==================================================
9. ACCESSIBILITY
==================================================

Follow the accessibility patterns already established in Steps 1–5.

Settings must support:

- keyboard navigation
- visible focus-visible states
- Escape to close
- focus management
- screen-reader-friendly labels
- semantic dialog behavior where appropriate
- aria-modal for mobile dialog
- minimum 44px interactive targets

When opened:
focus the first meaningful settings control.

When closed:
return focus to the settings trigger.

Do not trap focus incorrectly.

==================================================
10. RESPONSIVE BEHAVIOR
==================================================

Desktop:
- compact anchored settings panel

Mobile:
- bottom sheet

Do not introduce horizontal overflow.

Do not modify the existing ChatInput behavior.

Do not modify VoiceOverlay.

Do not modify PhotoScanSheet.

Do not modify CitationPanel.

==================================================
11. VISUAL DESIGN
==================================================

Use the existing Standards Mitra design system.

Colors:
- white/off-white surfaces
- dark slate text
- existing navy/trust accent
- existing muted borders
- existing citation/green accent where appropriate

Typography:
- existing Inter/system sans
- reuse existing typography tokens

Spacing:
- reuse existing spacing scale

Radius:
- reuse existing 12–16px radius system

Do not introduce a new visual language.

==================================================
12. REACT / NEXT.JS STRUCTURE
==================================================

Keep the implementation easy to translate into:

components/
  settings/
    SettingsPanel
    SettingsHeader
    LanguageSelector
    LanguageOption
    TextSizeControl

Use props/state rather than hard-coded duplicated UI.

Conceptual usage:

<SettingsPanel
  open={settingsOpen}
  language={language}
  textSize={textSize}
  onLanguageChange={setLanguage}
  onTextSizeChange={setTextSize}
  onClose={closeSettings}
/>

The exact implementation may differ, but the component boundaries should remain clear.

==================================================
13. FIGMA ORGANIZATION
==================================================

Create a new Figma section:

STEP 6 — SETTINGS & LANGUAGE

Inside it:

1. Settings Components
2. Desktop Settings
3. Mobile Settings
4. Language States
5. Text Size States
6. Interaction States

Component variants should include:

Settings:
- Closed
- Open

Language:
- EN selected
- HI selected
- TE selected

Text size:
- Default selected
- Large selected

Interaction:
- Default
- Hover
- Focus
- Active
- Disabled where appropriate

==================================================
14. PROTOTYPE INTERACTIONS
==================================================

Prototype:

Settings icon
→ Open Settings

EN
→ language becomes EN

HI
→ language becomes HI

TE
→ language becomes TE

Default text size
→ textSize = default

Large text size
→ textSize = large

Close
→ Settings closes

Escape
→ Settings closes

Header language selector
↔ same language state as Settings

Desktop:
Settings appears as anchored panel.

Mobile:
Settings appears as bottom sheet.

==================================================
15. DO NOT ADD
==================================================

Do NOT add:

- Account management
- Profile page
- Authentication
- Notifications
- Privacy dashboard
- Theme settings
- Dark mode
- Backend
- API
- Database
- Analytics
- Admin dashboard
- Subscription
- Saved answers
- Export/share
- Feedback system

Those are outside this step.

==================================================
16. ACCEPTANCE CHECKLIST
==================================================

Step 6 is complete only when:

✓ EN / HI / TE are selectable
✓ Header language control uses the same language state
✓ Settings icon opens Settings
✓ Desktop uses compact settings panel
✓ Mobile uses bottom sheet
✓ Text size has Default and Large states
✓ Selected states are visually clear
✓ Keyboard navigation works
✓ Focus-visible states exist
✓ Escape closes Settings
✓ Focus returns to trigger after close
✓ 44px minimum interaction targets
✓ Existing Steps 1–5 remain unchanged
✓ No backend/API added
✓ React component boundaries are clear
✓ UI remains responsive

STOP after implementing Step 6.

Do not continue to Step 7 automatically.