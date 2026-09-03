import { useEffect, useRef } from "react";
import type { Message, Citation, Language } from "../../types/chat";
import CitationBadge from "./CitationBadge";
import FollowUpChips from "./FollowUpChips";

const L = {
  senderLabel: { EN: "Standards Mitra", HI: "Standards Mitra", TE: "Standards Mitra" },
  thinking:    { EN: "Thinking…",        HI: "सोच रहे हैं…",   TE: "ఆలోచిస్తున్నారు…" },
  tryAgain:    { EN: "Try again",        HI: "फिर कोशिश करें",  TE: "మళ్లీ ప్రయత్నించండి" },
  source:      { EN: "Source",           HI: "स्रोत",           TE: "మూలం" },
} as const;

type MessageListProps = {
  messages: Message[];
  isTyping: boolean;
  language?: Language;
  onCitationClick: (citation: Citation) => void;
  onRetry?: (text: string) => void;
  onFollowUp?: (text: string) => void;
};

/* ── Shared avatar ─────────────────────────────────────────── */
function AssistantAvatar() {
  return (
    <div
      className={[
        "w-7 h-7 rounded-lg shrink-0 mt-0.5",
        "bg-[var(--color-accent-light)] border border-[var(--color-border)]",
        "flex items-center justify-center",
      ].join(" ")}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
        <path
          d="M6.5 1L1 4V9L6.5 12L12 9V4L6.5 1Z"
          stroke="var(--color-accent)"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <circle cx="6.5" cy="6.5" r="1.4" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}

/* ── User message ──────────────────────────────────────────── */
function UserMessage({ message }: { message: Message }) {
  return (
    <div className="flex justify-end">
      <div
        className={[
          "max-w-[72%] sm:max-w-[60%]",
          "bg-[#eef2f8] text-[var(--color-text-primary)]",
          "rounded-2xl rounded-br-md",
          "px-4 py-3",
        ].join(" ")}
      >
        {/* Inherits font-size from root (respects textSize setting) */}
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}

/* ── Assistant error message ───────────────────────────────── */
function AssistantErrorMessage({
  message,
  lang,
  onRetry,
}: {
  message: Message;
  lang: Language;
  onRetry?: (text: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <AssistantAvatar />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
          {L.senderLabel[lang]}
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 space-y-2.5">
          <p className="leading-relaxed text-amber-900">
            {message.content}
          </p>
          {message.retryText && onRetry && (
            <button
              onClick={() => onRetry(message.retryText!)}
              aria-label={L.tryAgain[lang]}
              className={[
                "text-[12.5px] font-medium text-[var(--color-accent)]",
                "hover:underline underline-offset-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded",
              ].join(" ")}
            >
              {L.tryAgain[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Paragraph / bullet renderer ──────────────────────────── */
function renderParagraph(para: string, key: number) {
  const lines = para.split("\n").filter(Boolean);
  const isBulletBlock = lines.length > 0 && lines.every((l) => /^[•\-]\s/.test(l));

  if (isBulletBlock) {
    return (
      <ul key={key} className="space-y-1.5">
        {lines.map((line, j) => (
          <li key={j} className="flex items-start gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 mt-[0.6em]"
              aria-hidden="true"
            />
            {/* Inherits font-size from root */}
            <span className="leading-relaxed text-[var(--color-text-primary)]">
              {line.replace(/^[•\-]\s+/, "")}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    /* Inherits font-size from root */
    <p
      key={key}
      className="leading-relaxed text-[var(--color-text-primary)] whitespace-pre-line"
    >
      {para}
    </p>
  );
}

/* ── Assistant message ─────────────────────────────────────── */
function AssistantMessage({
  message,
  lang,
  onCitationClick,
  onRetry,
  onFollowUp,
  isLast,
  isTyping,
}: {
  message: Message;
  lang: Language;
  onCitationClick: (c: Citation) => void;
  onRetry?: (text: string) => void;
  onFollowUp?: (text: string) => void;
  isLast: boolean;
  isTyping: boolean;
}) {
  if (message.isError) {
    return <AssistantErrorMessage message={message} lang={lang} onRetry={onRetry} />;
  }

  const paragraphs = message.content.split(/\n\n+/).filter(Boolean);
  const showChips =
    isLast && !isTyping && onFollowUp && message.suggestions && message.suggestions.length > 0;

  return (
    <div className="flex gap-3">
      <AssistantAvatar />

      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
          {L.senderLabel[lang]}
        </div>

        <div className="space-y-3">
          {paragraphs.map((para, i) => renderParagraph(para, i))}
        </div>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              {L.source[lang]}:
            </span>
            {message.citations.map((c) => (
              <CitationBadge key={c.id} citation={c} language={lang} onClick={onCitationClick} />
            ))}
          </div>
        )}

        {/* Contextual follow-up chips — only on last assistant message */}
        {showChips && (
          <FollowUpChips suggestions={message.suggestions!} language={lang} onSelect={onFollowUp!} />
        )}
      </div>
    </div>
  );
}

/* ── Typing indicator ──────────────────────────────────────── */
function TypingIndicator({ lang }: { lang: Language }) {
  return (
    <div className="flex gap-3">
      <AssistantAvatar />
      <div className="flex flex-col justify-center">
        <div className="text-[11px] font-semibold text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
          {L.senderLabel[lang]}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[5px]">
            <span
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-text-secondary)] animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "900ms" }}
            />
            <span
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-text-secondary)] animate-bounce"
              style={{ animationDelay: "160ms", animationDuration: "900ms" }}
            />
            <span
              className="w-[6px] h-[6px] rounded-full bg-[var(--color-text-secondary)] animate-bounce"
              style={{ animationDelay: "320ms", animationDuration: "900ms" }}
            />
          </div>
          <span className="text-[12px] text-[var(--color-text-secondary)] italic">
            {L.thinking[lang]}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Message list ──────────────────────────────────────────── */
export default function MessageList({
  messages,
  isTyping,
  language = "EN",
  onCitationClick,
  onRetry,
  onFollowUp,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const lastMsgIndex = messages.length - 1;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[740px] mx-auto px-5 py-8 space-y-8">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className="animate-[messageFadeIn_240ms_ease-out_both]"
          >
            {msg.role === "user" ? (
              <UserMessage message={msg} />
            ) : (
              <AssistantMessage
                message={msg}
                lang={language}
                onCitationClick={onCitationClick}
                onRetry={onRetry}
                onFollowUp={onFollowUp}
                isLast={idx === lastMsgIndex}
                isTyping={isTyping}
              />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator lang={language} />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
