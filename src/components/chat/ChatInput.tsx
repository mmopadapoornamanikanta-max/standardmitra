import { useState, useRef, useEffect } from "react";
import type { Language } from "../../types/chat";

const L = {
  placeholder: {
    EN: "Ask about Indian Standards…",
    HI: "भारतीय मानकों के बारे में पूछें…",
    TE: "భారతీయ ప్రమాణాల గురించి అడగండి…",
  },
  waiting: {
    EN: "Waiting for response…",
    HI: "उत्तर की प्रतीक्षा में…",
    TE: "సమాధానం కోసం వేచి ఉంది…",
  },
  send: {
    EN: "Send message",
    HI: "संदेश भेजें",
    TE: "సందేశం పంపండి",
  },
  micStart: {
    EN: "Start voice input",
    HI: "वॉइस इनपुट शुरू करें",
    TE: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
  },
  micStop: {
    EN: "Stop voice input",
    HI: "वॉइस इनपुट बंद करें",
    TE: "వాయిస్ ఇన్‌పుట్ ఆపండి",
  },
  camOpen: {
    EN: "Scan product image",
    HI: "उत्पाद छवि स्कैन करें",
    TE: "ఉత్పత్తి చిత్రాన్ని స్కాన్ చేయండి",
  },
  camClose: {
    EN: "Close photo scanner",
    HI: "फ़ोटो स्कैनर बंद करें",
    TE: "ఫోటో స్కానర్ మూసివేయండి",
  },
  disclaimer: {
    EN: "Information is for guidance only. Verify with official BIS sources.",
    HI: "जानकारी केवल मार्गदर्शन के लिए है। आधिकारिक BIS स्रोतों से सत्यापित करें।",
    TE: "సమాచారం మార్గదర్శకత్వం కోసం మాత్రమే. అధికారిక BIS మూలాలతో ధృవీకరించండి.",
  },
} as const;

type ChatInputState = "empty" | "focused" | "typing" | "loading" | "disabled";

type ChatInputProps = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  onMic: () => void;
  onCamera: () => void;
  state?: ChatInputState;
  language?: Language;
  micListening?: boolean;
  camActive?: boolean;
  micBtnRef?: React.RefObject<HTMLButtonElement | null>;
  camBtnRef?: React.RefObject<HTMLButtonElement | null>;
  prefillOnce?: string | null;
  onPrefillConsumed?: () => void;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  onMic,
  onCamera,
  state = "empty",
  language = "EN",
  micListening = false,
  camActive = false,
  micBtnRef,
  camBtnRef,
  prefillOnce,
  onPrefillConsumed,
}: ChatInputProps) {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefillOnce) {
      onChange(prefillOnce);
      textareaRef.current?.focus();
      onPrefillConsumed?.();
    }
  }, [prefillOnce]);

  const disabled = state === "loading" || state === "disabled";
  const canSend = value.trim().length > 0 && !disabled;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && canSend) {
      e.preventDefault();
      onSend();
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [value]);

  const iconBtnBase =
    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1";

  return (
    <div className="border-t border-[var(--color-border)] bg-white px-5 py-4">
      <div className="max-w-[720px] mx-auto">
        {/* Input shell */}
        <div
          className={[
            "flex items-end gap-1 rounded-xl border px-3.5 py-2.5 transition-all",
            focused
              ? "border-[var(--color-accent)] shadow-[0_0_0_3px_rgba(30,58,95,0.1)]"
              : "border-[#c8c8c2]",
            disabled ? "opacity-60 bg-[var(--color-background)]" : "bg-white",
          ].join(" ")}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={state === "loading" ? L.waiting[language] : L.placeholder[language]}
            aria-label={L.placeholder[language]}
            className={[
              "flex-1 resize-none bg-transparent outline-none leading-relaxed",
              "min-h-[24px] max-h-[120px] overflow-y-auto",
              "text-[var(--color-text-primary)]",
              "placeholder:text-[#9a9a96]",
            ].join(" ")}
          />

          <div className="flex items-center gap-0.5 shrink-0 pb-0.5">
            {/* Mic */}
            <button
              ref={micBtnRef}
              onClick={onMic}
              disabled={disabled && !micListening}
              aria-label={micListening ? L.micStop[language] : L.micStart[language]}
              aria-pressed={micListening}
              className={[
                iconBtnBase,
                micListening
                  ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                  : disabled
                    ? "cursor-not-allowed opacity-30 text-[#9a9a96]"
                    : "text-[#6b6b6b] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)]",
              ].join(" ")}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="6" y="1" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M3 9.5a6 6 0 0012 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line x1="9" y1="15.5" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6.5" y1="17" x2="11.5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Camera */}
            <button
              ref={camBtnRef}
              onClick={onCamera}
              disabled={disabled && !camActive}
              aria-label={camActive ? L.camClose[language] : L.camOpen[language]}
              aria-pressed={camActive}
              className={[
                iconBtnBase,
                camActive
                  ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
                  : disabled
                    ? "cursor-not-allowed opacity-30 text-[#9a9a96]"
                    : "text-[#6b6b6b] hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)]",
              ].join(" ")}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M12 3.5l1.5 2H16a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1v-7a1 1 0 011-1h2.5L6 3.5h6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="9.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-[var(--color-border)] mx-1" />

            {/* Send */}
            <button
              onClick={onSend}
              disabled={!canSend}
              aria-label={L.send[language]}
              className={[
                iconBtnBase,
                canSend
                  ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] active:scale-95"
                  : "bg-[var(--color-background)] text-[#b4b4b0] cursor-not-allowed",
              ].join(" ")}
            >
              {state === "loading" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" className="animate-spin" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.75" strokeDasharray="24 10" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2 14L14 8 2 2v4.5l8 1.5-8 1.5V14z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#9a9a96] text-center mt-2.5">
          {L.disclaimer[language]}
        </p>
      </div>
    </div>
  );
}
