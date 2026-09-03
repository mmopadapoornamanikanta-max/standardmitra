import type { Language } from "../../types/chat";

const L = {
  groupLabel: {
    EN: "Follow-up suggestions",
    HI: "अनुवर्ती सुझाव",
    TE: "అనుసరణ సూచనలు",
  },
} as const;

type FollowUpChipsProps = {
  suggestions: string[];
  language?: Language;
  onSelect: (text: string) => void;
};

export default function FollowUpChips({ suggestions, language = "EN", onSelect }: FollowUpChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label={L.groupLabel[language]}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className={[
            "inline-flex items-center gap-1.5",
            "px-3 py-1.5 rounded-full",
            "text-[12.5px] font-medium leading-none",
            "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
            "border border-transparent",
            "hover:border-[var(--color-accent)] hover:shadow-[0_1px_4px_rgba(30,58,95,0.1)]",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
            "transition-all duration-100",
          ].join(" ")}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            aria-hidden="true"
            className="shrink-0 opacity-60"
          >
            <path
              d="M1.5 4.5H7.5M7.5 4.5L5 2M7.5 4.5L5 7"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {suggestion}
        </button>
      ))}
    </div>
  );
}
