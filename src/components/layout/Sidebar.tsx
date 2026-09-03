import type { Conversation, Language } from "../../types/chat";

/* Sidebar-specific translations */
const ST = {
  newChat:   { EN: "New Chat",  HI: "नई चैट",    TE: "కొత్త చాట్" },
  recent:    { EN: "Recent",    HI: "हाल के",     TE: "ఇటీవల"       },
  settings:  { EN: "Settings",  HI: "सेटिंग्स",  TE: "సెట్టింగ్‌లు" },
  tagline:   { EN: "BIS · Indian Standards", HI: "BIS · भारतीय मानक", TE: "BIS · భారతీయ ప్రమాణాలు" },
} as const;

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  language: Language;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onOpenSettings: () => void;
  settingsBtnRef?: React.RefObject<HTMLButtonElement | null>;
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  language,
  onNewChat,
  onSelectConversation,
  onOpenSettings,
  settingsBtnRef,
  mobile = false,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={[
        "flex flex-col h-full bg-[#fafaf9] border-r border-[var(--color-border)]",
        mobile ? "w-full" : "w-[248px] shrink-0",
      ].join(" ")}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-md bg-[var(--color-accent)] flex items-center justify-center shrink-0">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1L1 4V9L6.5 12L12 9V4L6.5 1Z" stroke="white" strokeWidth="1.35" strokeLinejoin="round" />
              <circle cx="6.5" cy="6.5" r="1.4" fill="white" />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-none">
              Standards Mitra
            </div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-[3px] leading-none">
              {ST.tagline[language]}
            </div>
          </div>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className={[
              "w-8 h-8 flex items-center justify-center rounded-lg",
              "text-[var(--color-text-secondary)] hover:bg-white transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
            ].join(" ")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* New Chat */}
      <div className="px-4 pt-4">
        <button
          onClick={onNewChat}
          aria-label={ST.newChat[language]}
          className={[
            "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
            "bg-[var(--color-accent)] text-white text-[13px] font-medium",
            "hover:bg-[var(--color-accent-hover)] active:scale-[0.98]",
            "transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
          ].join(" ")}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 1.5V11.5M1.5 6.5H11.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          {ST.newChat[language]}
        </button>
      </div>

      {/* Conversation history */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          {ST.recent[language]}
        </div>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={[
              "w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-colors truncate",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset",
              activeConversationId === conv.id
                ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
                : "text-[var(--color-text-primary)] hover:bg-white",
            ].join(" ")}
          >
            {conv.title}
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="px-3 pb-4 border-t border-[var(--color-border)] pt-3">
        <button
          ref={settingsBtnRef}
          onClick={onOpenSettings}
          aria-label={`${ST.settings[language]} — open settings panel`}
          className={[
            "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg",
            "text-[13px] text-[var(--color-text-secondary)]",
            "hover:bg-white hover:text-[var(--color-text-primary)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset",
            "min-h-[44px]",
          ].join(" ")}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M7.5 1v1.5M7.5 12.5V14M14 7.5h-1.5M2.5 7.5H1M11.7 3.3l-1.06 1.06M4.36 10.64L3.3 11.7M11.7 11.7l-1.06-1.06M4.36 4.36L3.3 3.3"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
            />
          </svg>
          {ST.settings[language]}
        </button>
      </div>
    </aside>
  );
}
