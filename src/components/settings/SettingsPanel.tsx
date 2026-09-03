import { useEffect, useRef } from "react";
import type { Language, TextSize } from "../../types/chat";

/* Re-export so existing consumers (Sidebar, App) don't need to change */
export type { Language, TextSize };

type SettingsPanelProps = {
  open: boolean;
  language: Language;
  textSize: TextSize;
  onLanguageChange: (lang: Language) => void;
  onTextSizeChange: (size: TextSize) => void;
  onClose: () => void;
  /** Ref to the button that opened the panel — focus returns here on close */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

/* ── Translations ───────────────────────────────────────────── */
export const T = {
  settings: { EN: "Settings", HI: "सेटिंग्स", TE: "సెట్టింగ్‌లు" },
  language: { EN: "Language", HI: "भाषा", TE: "భాష" },
  textSize: { EN: "Text size", HI: "टेक्स्ट का आकार", TE: "వచన పరిమాణం" },
  defaultSize: { EN: "Default", HI: "डिफ़ॉल्ट", TE: "డిఫాల్ట్" },
  largeSize: { EN: "Large", HI: "बड़ा", TE: "పెద్ద" },
  close: { EN: "Close settings", HI: "सेटिंग्स बंद करें", TE: "సెట్టింగ్‌లు మూసివేయండి" },
  footnote: {
    EN: "Standards Mitra v1 — Information is for guidance only.",
    HI: "Standards Mitra v1 — जानकारी केवल मार्गदर्शन के लिए है।",
    TE: "Standards Mitra v1 — సమాచారం మార్గదర్శకత్వం కోసం మాత్రమే.",
  },
} as const;

const LANGUAGE_OPTIONS: { code: Language; nativeName: string; ariaLabel: string }[] = [
  { code: "EN", nativeName: "English",  ariaLabel: "Switch to English" },
  { code: "HI", nativeName: "हिंदी",   ariaLabel: "हिंदी में बदलें" },
  { code: "TE", nativeName: "తెలుగు",  ariaLabel: "తెలుగులోకి మార్చండి" },
];

const TEXT_SIZE_OPTIONS: { value: TextSize; labelKey: "defaultSize" | "largeSize" }[] = [
  { value: "default", labelKey: "defaultSize" },
  { value: "large",   labelKey: "largeSize"   },
];

/* ── SettingsSection ────────────────────────────────────────── */
function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

/* ── LanguageOption ─────────────────────────────────────────── */
function LanguageOption({
  option,
  selected,
  onSelect,
}: {
  option: (typeof LANGUAGE_OPTIONS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      aria-label={option.ariaLabel}
      onClick={onSelect}
      className={[
        "w-full flex items-center justify-between px-4 py-3 rounded-xl border min-h-[48px]",
        "text-[13.5px] transition-colors duration-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
        "active:scale-[0.98]",
        selected
          ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
          : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-background)]",
      ].join(" ")}
    >
      <span>{option.nativeName}</span>
      {selected && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7.5L5.5 11L12 4"
            stroke="var(--color-accent)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

/* ── TextSizeControl ────────────────────────────────────────── */
function TextSizeControl({
  textSize,
  language,
  onChange,
}: {
  textSize: TextSize;
  language: Language;
  onChange: (s: TextSize) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={T.textSize[language]}>
      {TEXT_SIZE_OPTIONS.map(({ value, labelKey }) => {
        const selected = textSize === value;
        const label = T[labelKey][language];
        return (
          <button
            key={value}
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => onChange(value)}
            className={[
              "flex items-center justify-center gap-2 py-3 px-4 rounded-xl border min-h-[48px]",
              "text-[13.5px] transition-colors duration-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
              "active:scale-[0.98]",
              selected
                ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
                : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-background)]",
            ].join(" ")}
          >
            {/* Visual size hint */}
            <span
              aria-hidden="true"
              className={value === "large" ? "text-[17px] font-semibold leading-none" : "text-[13px] leading-none"}
            >
              A
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Shared panel content ───────────────────────────────────── */
function PanelContent({
  language,
  textSize,
  onLanguageChange,
  onTextSizeChange,
  onClose,
  firstFocusRef,
}: {
  language: Language;
  textSize: TextSize;
  onLanguageChange: (l: Language) => void;
  onTextSizeChange: (s: TextSize) => void;
  onClose: () => void;
  firstFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] shrink-0">
        <h2 className="text-[14px] font-semibold text-[var(--color-text-primary)]">
          {T.settings[language]}
        </h2>
        <button
          ref={firstFocusRef}
          onClick={onClose}
          aria-label={T.close[language]}
          className={[
            "w-8 h-8 flex items-center justify-center rounded-lg",
            "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
            "transition-colors",
          ].join(" ")}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M10.5 2.5L2.5 10.5M2.5 2.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {/* Language */}
        <SettingsSection title={T.language[language]}>
          <div role="radiogroup" aria-label={T.language[language]} className="space-y-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <LanguageOption
                key={opt.code}
                option={opt}
                selected={language === opt.code}
                onSelect={() => onLanguageChange(opt.code)}
              />
            ))}
          </div>
        </SettingsSection>

        {/* Text size */}
        <SettingsSection title={T.textSize[language]}>
          <TextSizeControl
            textSize={textSize}
            language={language}
            onChange={onTextSizeChange}
          />
        </SettingsSection>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[var(--color-border)] shrink-0">
        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
          {T.footnote[language]}
        </p>
      </div>
    </>
  );
}

/* ── SettingsPanel ──────────────────────────────────────────── */
export default function SettingsPanel({
  open,
  language,
  textSize,
  onLanguageChange,
  onTextSizeChange,
  onClose,
  triggerRef,
}: SettingsPanelProps) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  /* Focus close button when panel opens */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFocusRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Escape closes */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleClose = () => {
    onClose();
    setTimeout(() => triggerRef?.current?.focus(), 50);
  };

  if (!open) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  /* ── Mobile: bottom sheet ─────────────────────────────────── */
  if (isMobile) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={T.settings[language]}
        className="fixed inset-0 z-50 flex flex-col justify-end"
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={handleClose}
          aria-hidden="true"
        />
        <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[75vh] flex flex-col animate-[slideUp_210ms_ease-out]">
          <div className="w-9 h-[3px] rounded-full bg-[var(--color-border)] mx-auto mt-3 shrink-0" aria-hidden="true" />
          <PanelContent
            language={language}
            textSize={textSize}
            onLanguageChange={onLanguageChange}
            onTextSizeChange={onTextSizeChange}
            onClose={handleClose}
            firstFocusRef={firstFocusRef}
          />
        </div>
      </div>
    );
  }

  /* ── Desktop: anchored panel above sidebar settings button ── */
  return (
    <>
      {/* Lightweight backdrop — does not dim heavily */}
      <div
        className="fixed inset-0 z-40"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label={T.settings[language]}
        className={[
          "fixed z-50 bottom-16 left-3",
          "w-[340px] bg-white rounded-2xl flex flex-col",
          "border border-[var(--color-border)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)]",
          "max-h-[520px]",
          "animate-[slideUp_200ms_ease-out]",
        ].join(" ")}
      >
        <PanelContent
          language={language}
          textSize={textSize}
          onLanguageChange={onLanguageChange}
          onTextSizeChange={onTextSizeChange}
          onClose={handleClose}
          firstFocusRef={firstFocusRef}
        />
      </div>
    </>
  );
}
