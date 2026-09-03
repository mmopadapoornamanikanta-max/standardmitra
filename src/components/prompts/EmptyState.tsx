import { PROMPT_CARDS } from "../../data/mock";

type EmptyStateProps = {
  onSelectPrompt: (prompt: string) => void;
  language: "EN" | "HI" | "TE";
};

const HEADINGS = {
  EN: {
    heading: "Ask anything about Indian Standards",
    sub: "Get clear answers about Indian Standards, BIS certification, hallmarking and consumer guidance.",
  },
  HI: {
    heading: "भारतीय मानकों के बारे में कुछ भी पूछें",
    sub: "भारतीय मानकों, BIS प्रमाणन, हॉलमार्किंग और उपभोक्ता मार्गदर्शन के बारे में स्पष्ट उत्तर पाएं।",
  },
  TE: {
    heading: "భారతీయ ప్రమాణాల గురించి ఏదైనా అడగండి",
    sub: "భారతీయ ప్రమాణాలు, BIS ధృవీకరణ, హాల్‌మార్కింగ్ మరియు వినియోగదారు మార్గదర్శకత్వం గురించి స్పష్టమైన సమాధానాలు పొందండి.",
  },
};

/* Single consistent icon style: outlined, 16×16, 1.4px stroke */
const CARD_ICONS: Record<string, React.ReactNode> = {
  badge: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5l1.854 3.757L14 5.993l-3 2.922.708 4.128L8 11l-3.708 2.043L5 8.915 2 5.993l4.146-.736L8 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  file: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.5 1.5H4a1 1 0 00-1 1v11a1 1 0 001 1h8a1 1 0 001-1V5L9.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9.5 1.5V5H13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5.5 9h5M5.5 11.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 8.5L7 11L11.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function EmptyState({ onSelectPrompt, language }: EmptyStateProps) {
  const copy = HEADINGS[language];

  return (
    /* Bias toward top-center: justify-start with padding-top creates the
       "content sits closer to header than input" balance the PRD wants */
    <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 pt-16 pb-6">
      <div className="w-full max-w-[660px]">
        {/* Heading block */}
        <div className="text-center mb-8">
          <h1 className="text-[1.75rem] leading-tight font-semibold text-[var(--color-text-primary)] mb-3">
            {copy.heading}
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)] max-w-[560px] mx-auto">
            {copy.sub}
          </p>
        </div>

        {/* Prompt cards — 2-col equal-width grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {PROMPT_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onSelectPrompt(card.title)}
              className={[
                "group text-left p-4 rounded-xl",
                "bg-white border border-[var(--color-border)]",
                "hover:border-[var(--color-accent)] hover:shadow-[0_1px_6px_rgba(30,58,95,0.08)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
                "active:scale-[0.985] active:bg-[var(--color-accent-light)]",
                "transition-all duration-150",
              ].join(" ")}
              aria-label={card.title}
            >
              <div className="flex items-start gap-3">
                {/* Icon container: fixed 32×32 so text never shifts */}
                <div
                  className={[
                    "w-8 h-8 rounded-lg shrink-0",
                    "flex items-center justify-center",
                    "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
                    "group-hover:bg-[var(--color-accent)] group-hover:text-white",
                    "transition-colors duration-150",
                  ].join(" ")}
                >
                  {CARD_ICONS[card.icon]}
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)] leading-snug mt-0.5">
                  {card.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
