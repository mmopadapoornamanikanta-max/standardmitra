import { useState, useEffect, useRef, useCallback } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { VoiceState, Language } from "../../types/chat";

const L = {
  /* State labels */
  listening:   { EN: "Listening…",                 HI: "सुन रहे हैं…",              TE: "వింటున్నాం…"                           },
  review:      { EN: "Review your question",        HI: "अपना प्रश्न समीक्षा करें",  TE: "మీ ప్రశ్నను సమీక్షించండి"             },
  processing:  { EN: "Processing…",                 HI: "प्रक्रिया हो रही है…",       TE: "ప్రక్రియలో ఉంది…"                     },
  error:       { EN: "Voice input couldn't be completed", HI: "वॉइस इनपुट पूरा नहीं हो सका", TE: "వాయిస్ ఇన్‌పుట్ పూర్తి కాలేదు" },
  /* Sub-labels */
  speakSub:    { EN: "Speak your question about Indian Standards", HI: "भारतीय मानकों के बारे में अपना प्रश्न बोलें", TE: "భారతీయ ప్రమాణాల గురించి మీ ప్రశ్న చెప్పండి" },
  editSub:     { EN: "Edit if needed, then send",   HI: "आवश्यक हो तो संपादित करें, फिर भेजें", TE: "అవసరమైతే సవరించండి, తర్వాత పంపండి" },
  sendingSub:  { EN: "Sending your question…",      HI: "आपका प्रश्न भेजा जा रहा है…", TE: "మీ ప్రశ్న పంపబడుతోంది…"            },
  errorSub:    { EN: "Please try again or type your question instead", HI: "कृपया फिर कोशिश करें या अपना प्रश्न टाइप करें", TE: "దయచేసి మళ్లీ ప్రయత్నించండి లేదా మీ ప్రశ్నను టైప్ చేయండి" },
  /* Transcript labels */
  yourQuestion:  { EN: "Your question",             HI: "आपका प्रश्न",               TE: "మీ ప్రశ్న"                            },
  detectedSpeech: { EN: "Detected speech",          HI: "पहचाना गया भाषण",           TE: "గుర్తించబడిన ప్రసంగం"                },
  transcriptLabel: { EN: "Transcript — edit before sending", HI: "प्रतिलेख — भेजने से पहले संपादित करें", TE: "ట్రాన్స్‌క్రిప్ట్ — పంపే ముందు సవరించండి" },
  /* Buttons */
  cancel:       { EN: "Cancel",                     HI: "रद्द करें",                  TE: "రద్దు చేయండి"                        },
  stopReview:   { EN: "Stop & Review",              HI: "रोकें और समीक्षा करें",      TE: "ఆపు మరియు సమీక్షించు"               },
  tryAgain:     { EN: "Try again",                  HI: "फिर कोशिश करें",             TE: "మళ్లీ ప్రయత్నించండి"                 },
  send:         { EN: "Send",                       HI: "भेजें",                      TE: "పంపు"                                },
  useTextInput: { EN: "Use text input",             HI: "टेक्स्ट इनपुट उपयोग करें",   TE: "టెక్స్ట్ ఇన్‌పుట్ వాడండి"           },
  /* Header / aria */
  voiceInput:   { EN: "Voice Input",                HI: "वॉइस इनपुट",                TE: "వాయిస్ ఇన్‌పుట్"                     },
  closeVoice:   { EN: "Close voice input",          HI: "वॉइस इनपुट बंद करें",        TE: "వాయిస్ ఇన్‌పుట్ మూసివేయండి"         },
  cancelAria:   { EN: "Cancel voice input",         HI: "वॉइस इनपुट रद्द करें",       TE: "వాయిస్ ఇన్‌పుట్ రద్దు చేయండి"      },
  stopAria:     { EN: "Stop recording and review transcript", HI: "रिकॉर्डिंग रोकें और ट्रांसक्रिप्ट देखें", TE: "రికార్డింగ్ ఆపి ట్రాన్స్‌క్రిప్ట్ చూడండి" },
  sendAria:     { EN: "Send this question",         HI: "यह प्रश्न भेजें",            TE: "ఈ ప్రశ్న పంపండి"                    },
  tryAgainAria: { EN: "Try voice input again",      HI: "वॉइस इनपुट फिर कोशिश करें",  TE: "వాయిస్ ఇన్‌పుట్ మళ్లీ ప్రయత్నించండి" },
  errorDetail:  { EN: "Voice input was interrupted. Your typed input has been preserved.", HI: "वॉइस इनपुट बाधित हुआ। आपका टाइप किया इनपुट सुरक्षित है।", TE: "వాయిస్ ఇన్‌పుట్ అంతరాయం కలిగింది. మీ టైప్ చేసిన ఇన్‌పుట్ భద్రపరచబడింది." },
} as const;

type VoiceOverlayProps = {
  onClose: () => void;
  onConfirm: (text: string) => void;
  language?: Language;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

const SAMPLE_TRANSCRIPT =
  "How do I check whether this product has BIS certification?";

const BAR_DELAYS = [0, 120, 60, 200, 80, 160, 40];
const BAR_DURATIONS = [900, 760, 1020, 840, 950, 780, 1100];

function VoiceWaveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[4px] h-8" aria-hidden="true" role="presentation">
      {BAR_DELAYS.map((delay, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-[var(--color-accent)] origin-center"
          style={
            active
              ? { height: "100%", animation: `waveBar ${BAR_DURATIONS[i]}ms ease-in-out ${delay}ms infinite` }
              : { height: "35%" }
          }
        />
      ))}
    </div>
  );
}

function VoiceStatus({ voiceState, elapsed, lang }: { voiceState: VoiceState; elapsed: number; lang: Language }) {
  const label =
    voiceState === "listening"   ? L.listening[lang]  :
    voiceState === "preview"     ? L.review[lang]     :
    voiceState === "processing"  ? L.processing[lang] :
    L.error[lang];

  const sub =
    voiceState === "listening"   ? L.speakSub[lang]   :
    voiceState === "preview"     ? L.editSub[lang]    :
    voiceState === "processing"  ? L.sendingSub[lang] :
    L.errorSub[lang];

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center shrink-0">
        {voiceState === "listening" && (
          <span className="absolute w-10 h-10 rounded-full bg-[var(--color-accent-light)] animate-ping opacity-60" />
        )}
        <div
          className={[
            "w-9 h-9 rounded-full flex items-center justify-center",
            voiceState === "listening"
              ? "bg-[var(--color-accent)] text-white"
              : voiceState === "error"
                ? "bg-amber-100 text-amber-600"
                : "bg-[var(--color-accent-light)] text-[var(--color-accent)]",
          ].join(" ")}
        >
          {voiceState === "processing" ? (
            <svg width="14" height="14" viewBox="0 0 14 14" className="animate-spin" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.75" strokeDasharray="20 10" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="6" y="1" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 9.5a6 6 0 0012 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="15.5" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6.5" y1="17" x2="11.5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-none">{label}</p>
          {voiceState === "listening" && (
            <span className="text-[12px] text-[var(--color-text-secondary)] tabular-nums">
              {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[var(--color-text-secondary)] mt-1 leading-snug">{sub}</p>
      </div>
    </div>
  );
}

function VoiceTranscript({
  text, editable, onChange, inputRef, lang,
}: {
  text: string; editable: boolean; onChange: (v: string) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>; lang: Language;
}) {
  if (!text) return null;
  return (
    <div className="space-y-1.5">
      <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
        {editable ? L.yourQuestion[lang] : L.detectedSpeech[lang]}
      </p>
      {editable ? (
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          aria-label={L.transcriptLabel[lang]}
          className={[
            "w-full resize-none rounded-xl px-3.5 py-2.5",
            "text-[14px] text-[var(--color-text-primary)] leading-relaxed",
            "border border-[var(--color-border)]",
            "focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10",
            "bg-[var(--color-background)]",
          ].join(" ")}
        />
      ) : (
        <p className="text-[14px] text-[var(--color-text-primary)] leading-relaxed italic">"{text}"</p>
      )}
    </div>
  );
}

function VoiceControls({
  voiceState, canSend, lang, onStop, onSend, onRetry, onCancel,
}: {
  voiceState: VoiceState; canSend: boolean; lang: Language;
  onStop: () => void; onSend: () => void; onRetry: () => void; onCancel: () => void;
}) {
  const btnBase =
    "flex-1 py-2.5 px-4 rounded-xl text-[13px] font-medium transition-all duration-100 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 active:scale-[0.98]";
  const primary   = btnBase + " bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]";
  const secondary = btnBase + " border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]";

  if (voiceState === "listening") {
    return (
      <div className="flex gap-2">
        <button onClick={onCancel} className={secondary} aria-label={L.cancelAria[lang]}>{L.cancel[lang]}</button>
        <button onClick={onStop}   className={primary}   aria-label={L.stopAria[lang]}>{L.stopReview[lang]}</button>
      </div>
    );
  }
  if (voiceState === "preview") {
    return (
      <div className="flex gap-2">
        <button onClick={onRetry} className={secondary} aria-label={L.tryAgainAria[lang]}>{L.tryAgain[lang]}</button>
        <button
          onClick={onSend}
          disabled={!canSend}
          aria-label={L.sendAria[lang]}
          className={canSend ? primary : btnBase + " bg-[var(--color-background)] text-[var(--color-text-secondary)] cursor-not-allowed opacity-50"}
        >
          {L.send[lang]}
        </button>
      </div>
    );
  }
  if (voiceState === "error") {
    return (
      <div className="flex gap-2">
        <button onClick={onCancel} className={secondary} aria-label={L.useTextInput[lang]}>{L.useTextInput[lang]}</button>
        <button onClick={onRetry}  className={primary}   aria-label={L.tryAgainAria[lang]}>{L.tryAgain[lang]}</button>
      </div>
    );
  }
  return null;
}

export default function VoiceOverlay({ onClose, onConfirm, language = "EN", triggerRef }: VoiceOverlayProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("listening");
  const [transcript, setTranscript]   = useState("");
  const [elapsed, setElapsed]         = useState(0);

  const transcriptInputRef = useRef<HTMLTextAreaElement>(null);
  const firstFocusRef      = useRef<HTMLButtonElement>(null);
  const lang = language;

  useEffect(() => {
    const t = setTimeout(() => firstFocusRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (voiceState !== "listening") return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [voiceState]);

  useEffect(() => {
    if (voiceState !== "listening") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTranscript(SAMPLE_TRANSCRIPT.slice(0, i));
      if (i >= SAMPLE_TRANSCRIPT.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [voiceState]);

  useEffect(() => {
    if (voiceState === "preview") {
      const t = setTimeout(() => transcriptInputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [voiceState]);

  const handleStop  = () => setVoiceState("preview");
  const handleRetry = () => { setTranscript(""); setElapsed(0); setVoiceState("listening"); };
  const handleSend  = () => {
    if (!transcript.trim()) return;
    setVoiceState("processing");
    setTimeout(() => { onConfirm(transcript.trim()); onClose(); }, 700);
  };
  const handleCancel = useCallback(() => {
    onClose();
    setTimeout(() => triggerRef?.current?.focus(), 50);
  }, [onClose, triggerRef]);

  const inner = (
    <div className="flex flex-col gap-4 p-5">
      <VoiceStatus voiceState={voiceState} elapsed={elapsed} lang={lang} />

      {voiceState === "listening" && (
        <div className="flex items-center justify-center py-1">
          <VoiceWaveform active />
        </div>
      )}

      {(voiceState === "preview" || (voiceState === "listening" && transcript)) && (
        <VoiceTranscript
          text={transcript}
          editable={voiceState === "preview"}
          onChange={setTranscript}
          inputRef={transcriptInputRef}
          lang={lang}
        />
      )}

      {voiceState === "error" && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-3 text-[13px] text-amber-800">
          {L.errorDetail[lang]}
        </div>
      )}

      <VoiceControls
        voiceState={voiceState}
        canSend={transcript.trim().length > 0}
        lang={lang}
        onStop={handleStop}
        onSend={handleSend}
        onRetry={handleRetry}
        onCancel={handleCancel}
      />
    </div>
  );

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div role="dialog" aria-modal="true" aria-label={L.voiceInput[lang]} className="fixed inset-0 z-50 flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={handleCancel} aria-hidden="true" />
        <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[72vh] flex flex-col animate-[slideUp_200ms_ease-out]">
          <div className="w-9 h-[3px] rounded-full bg-[var(--color-border)] mx-auto mt-3 shrink-0" aria-hidden="true" />
          <div className="overflow-y-auto">{inner}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={L.voiceInput[lang]}
      className="w-full border-t border-[var(--color-border)] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] animate-[slideUp_200ms_ease-out]"
    >
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
            {L.voiceInput[lang]}
          </span>
          <button
            ref={firstFocusRef}
            onClick={handleCancel}
            aria-label={L.closeVoice[lang]}
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
        {inner}
      </div>
    </div>
  );
}
