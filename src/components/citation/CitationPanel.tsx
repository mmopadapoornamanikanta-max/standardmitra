import { useEffect, useRef } from "react";
import type { Citation, Language } from "../../types/chat";

const L = {
  source:         { EN: "Source",          HI: "स्रोत",             TE: "మూలం"                   },
  relevantClause: { EN: "Relevant clause", HI: "संबंधित खंड",        TE: "సంబంధిత నిబంధన"          },
  viewFull:       { EN: "View full standard", HI: "पूरा मानक देखें",  TE: "పూర్తి ప్రమాణం చూడండి"  },
  protoNote:      {
    EN: "Demo only — link will be connected to verified BIS sources.",
    HI: "केवल डेमो — लिंक सत्यापित BIS स्रोतों से जोड़ा जाएगा।",
    TE: "డెమో మాత్రమే — లింక్ ధృవీకరించిన BIS మూలాలకు అనుసంధానించబడుతుంది.",
  },
  close:          { EN: "Close",           HI: "बंद करें",            TE: "మూసివేయండి"              },
  citationDetail: { EN: "Citation detail", HI: "उद्धरण विवरण",        TE: "ఉల్లేఖన వివరాలు"        },
} as const;

type CitationPanelProps = {
  citation: Citation | null;
  open: boolean;
  onClose: () => void;
  language?: Language;
  mobile?: boolean;
};

/* ── Shared inner content ──────────────────────────────────── */
function PanelContent({
  citation,
  lang,
  onClose,
  closeBtnRef,
}: {
  citation: Citation;
  lang: Language;
  onClose: () => void;
  closeBtnRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <>
      {/* ── Panel header ──────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md bg-[var(--color-citation-bg)] border border-[var(--color-citation-border)] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M2 10L9 1M9 1H5M9 1V5"
                stroke="var(--color-citation)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[11.5px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
            {L.source[lang]}
          </span>
        </div>

        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label={L.close[lang]}
          className={[
            "w-8 h-8 flex items-center justify-center rounded-lg",
            "text-[var(--color-text-secondary)]",
            "hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]",
            "active:scale-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
            "transition-all duration-100",
          ].join(" ")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M11 3L3 11M3 3L11 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Scrollable body ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

        {/* Standard information */}
        <section aria-label="Standard information">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-lg bg-[var(--color-citation-bg)] border border-[var(--color-citation-border)] mb-2.5">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <path
                d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5V5.5"
                stroke="var(--color-citation)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[12px] font-semibold text-[var(--color-citation)] leading-none">
              {citation.standardNumber}
            </span>
          </div>

          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-snug">
            {citation.title}
          </h2>
        </section>

        <div className="border-t border-[var(--color-border)]" role="separator" />

        {/* Clause section */}
        <section aria-label={L.relevantClause[lang]}>
          <div className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">
            {L.relevantClause[lang]}
          </div>
          {citation.clause && (
            <p className="text-[12.5px] font-medium text-[var(--color-text-primary)] mb-2.5">
              {citation.clause}
            </p>
          )}
          <blockquote
            className={[
              "relative pl-3.5 pr-2 py-3 rounded-lg",
              "bg-[var(--color-background)] border-l-2 border-[var(--color-citation-border)]",
              "text-[13px] text-[var(--color-text-secondary)] leading-relaxed italic",
            ].join(" ")}
          >
            "{citation.snippet}"
          </blockquote>
        </section>
      </div>

      {/* ── Footer action ──────────────────────────────────── */}
      <div className="px-5 py-4 border-t border-[var(--color-border)] shrink-0">
        <button
          onClick={onClose}
          aria-label={`${L.viewFull[lang]} (prototype action)`}
          className={[
            "w-full flex items-center justify-center gap-2",
            "py-2.5 rounded-xl",
            "border border-[var(--color-accent)] text-[var(--color-accent)]",
            "text-[13.5px] font-medium",
            "hover:bg-[var(--color-accent-light)]",
            "active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
            "transition-all duration-100",
          ].join(" ")}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path
              d="M1.5 11.5L11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {L.viewFull[lang]}
        </button>
        <p className="text-[10.5px] text-[var(--color-text-secondary)] text-center mt-2">
          {L.protoNote[lang]}
        </p>
      </div>
    </>
  );
}

/* ── CitationPanel ─────────────────────────────────────────── */
export default function CitationPanel({
  citation,
  open,
  onClose,
  language = "EN",
  mobile = false,
}: CitationPanelProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!citation) return null;

  const lang = language;

  /* ── Mobile: bottom sheet ────────────────────────────────── */
  if (mobile) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={L.citationDetail[lang]}
        className="fixed inset-0 z-50 flex flex-col justify-end"
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          className={[
            "relative bg-white rounded-t-2xl flex flex-col shadow-2xl",
            "max-h-[72vh]",
            open ? "animate-[slideUp_220ms_ease-out]" : "",
          ].join(" ")}
        >
          <div
            className="w-9 h-[3px] rounded-full bg-[var(--color-border)] mx-auto mt-3 mb-0.5 shrink-0"
            aria-hidden="true"
          />
          <PanelContent
            citation={citation}
            lang={lang}
            onClose={onClose}
            closeBtnRef={closeBtnRef}
          />
        </div>
      </div>
    );
  }

  /* ── Desktop: right-side slide-in panel ──────────────────── */
  return (
    <aside
      role="complementary"
      aria-label={L.citationDetail[lang]}
      className={[
        "w-[352px] shrink-0 flex flex-col",
        "bg-white border-l border-[var(--color-border)]",
        "shadow-[-4px_0_16px_rgba(0,0,0,0.04)]",
        "h-full overflow-hidden",
        open ? "animate-[slideInRight_200ms_ease-out]" : "",
      ].join(" ")}
    >
      <PanelContent
        citation={citation}
        lang={lang}
        onClose={onClose}
        closeBtnRef={closeBtnRef}
      />
    </aside>
  );
}
