import type { Language } from "../../types/chat";

const L = {
  online:   { EN: "Online",        HI: "ऑनलाइन",       TE: "ఆన్‌లైన్"      },
  openMenu: { EN: "Open menu",     HI: "मेनू खोलें",    TE: "మెనూ తెరవండి"  },
  langSelect: { EN: "Language selection", HI: "भाषा चुनें", TE: "భాష ఎంచుకోండి" },
} as const;

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "HI", label: "Hindi"   },
  { code: "TE", label: "Telugu"  },
];

type HeaderProps = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onMenuClick?: () => void;
  showMenu?: boolean;
};

export default function Header({
  language,
  onLanguageChange,
  onMenuClick,
  showMenu = false,
}: HeaderProps) {
  return (
    <header className="h-[60px] flex items-center justify-between px-5 bg-white border-b border-[var(--color-border)] shrink-0 z-10">
      <div className="flex items-center gap-2.5">
        {showMenu && (
          <button
            onClick={onMenuClick}
            aria-label={L.openMenu[language]}
            className={[
              "lg:hidden w-9 h-9 flex items-center justify-center rounded-lg",
              "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]",
              "transition-colors mr-1",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
            ].join(" ")}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <div>
          <div className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-none">
            Standards Mitra
          </div>
          <div className="flex items-center gap-1.5 mt-[5px]">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
            <span className="text-[11px] text-[var(--color-text-secondary)]">{L.online[language]}</span>
          </div>
        </div>
      </div>

      {/* Language selector */}
      <div
        className="flex items-center gap-0.5 bg-[var(--color-background)] rounded-lg p-0.5 border border-[var(--color-border)]"
        role="group"
        aria-label={L.langSelect[language]}
      >
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => onLanguageChange(code)}
            aria-label={`Switch language to ${label}`}
            aria-pressed={language === code}
            className={[
              "px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
              language === code
                ? "bg-white text-[var(--color-accent)] shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            {code}
          </button>
        ))}
      </div>
    </header>
  );
}
