import type { Citation, Language } from "../../types/chat";

const L = {
  viewSource: {
    EN: "View source",
    HI: "स्रोत देखें",
    TE: "మూలం చూడండి",
  },
} as const;

type CitationBadgeProps = {
  citation: Citation;
  language?: Language;
  onClick: (citation: Citation) => void;
};

export default function CitationBadge({ citation, language = "EN", onClick }: CitationBadgeProps) {
  return (
    <button
      onClick={() => onClick(citation)}
      aria-label={`${L.viewSource[language]}: ${citation.standardNumber} — ${citation.title}`}
      className={[
        "inline-flex items-center gap-1.5",
        "px-2.5 py-[3px] rounded-full",
        "text-[11.5px] font-medium leading-none",
        "bg-[var(--color-citation-bg)] text-[var(--color-citation)]",
        "border border-[var(--color-citation-border)]",
        "hover:brightness-95 hover:shadow-sm",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-citation)] focus-visible:ring-offset-1",
        "transition-all duration-100",
      ].join(" ")}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5V5.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {citation.standardNumber}
    </button>
  );
}
