import { useState, useEffect, useRef, useCallback } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { PhotoScanState, Language } from "../../types/chat";

const L = {
  /* Options screen */
  optionsTitle:  { EN: "Scan a product or document",       HI: "उत्पाद या दस्तावेज़ स्कैन करें",      TE: "ఉత్పత్తి లేదా పత్రాన్ని స్కాన్ చేయండి"    },
  optionsSub:    { EN: "Take a photo or upload an image to extract text.", HI: "टेक्स्ट निकालने के लिए फ़ोटो लें या छवि अपलोड करें।", TE: "టెక్స్ట్ వెలికితీయడానికి ఫోటో తీయండి లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి." },
  takePhoto:     { EN: "Take a photo",                     HI: "फ़ोटो लें",                             TE: "ఫోటో తీయండి"                              },
  uploadImage:   { EN: "Upload an image",                  HI: "छवि अपलोड करें",                        TE: "చిత్రాన్ని అప్‌లోడ్ చేయండి"              },
  /* Preview screen */
  previewTitle:  { EN: "Preview",                          HI: "पूर्वावलोकन",                           TE: "ప్రివ్యూ"                                  },
  previewSub:    { EN: "Check the image is clear, then scan.", HI: "जांचें कि छवि स्पष्ट है, फिर स्कैन करें।", TE: "చిత్రం స్పష్టంగా ఉందో తనిఖీ చేయండి, తర్వాత స్కాన్ చేయండి." },
  protoImage:    { EN: "Demo image",                       HI: "डेमो छवि",                              TE: "డెమో చిత్రం"                              },
  retake:        { EN: "Retake",                           HI: "दोबारा लें",                            TE: "మళ్లీ తీయండి"                             },
  scanImage:     { EN: "Scan image",                       HI: "छवि स्कैन करें",                        TE: "చిత్రాన్ని స్కాన్ చేయండి"                },
  /* Scanning screen */
  scanningTitle: { EN: "Scanning image…",                  HI: "छवि स्कैन हो रही है…",                  TE: "చిత్రాన్ని స్కాన్ చేస్తున్నాం…"           },
  scanningSub:   { EN: "Reading visible text from the image.", HI: "छवि से टेक्स्ट पढ़ रहे हैं।",       TE: "చిత్రం నుండి టెక్స్ట్ చదువుతున్నాం."      },
  readingText:   { EN: "Reading text…",                    HI: "टेक्स्ट पढ़ रहे हैं…",                  TE: "టెక్స్ట్ చదువుతున్నాం…"                   },
  /* OCR screen */
  ocrTitle:      { EN: "Text found",                       HI: "टेक्स्ट मिला",                          TE: "టెక్స్ట్ కనుగొనబడింది"                    },
  ocrSub:        { EN: "Review the extracted text before sending.", HI: "भेजने से पहले निकाले गए टेक्स्ट की समीक्षा करें।", TE: "పంపే ముందు వెలికితీసిన టెక్స్ట్‌ను సమీక్షించండి." },
  extractedLabel:{ EN: "Extracted text — edit if needed",  HI: "निकाला गया टेक्स्ट — आवश्यक हो तो संपादित करें", TE: "వెలికితీసిన టెక్స్ట్ — అవసరమైతే సవరించండి" },
  extractedAria: { EN: "Extracted text — edit before sending", HI: "निकाला गया टेक्स्ट — भेजने से पहले संपादित करें", TE: "వెలికితీసిన టెక్స్ట్ — పంపే ముందు సవరించండి" },
  useText:       { EN: "Use text",                         HI: "टेक्स्ट उपयोग करें",                    TE: "టెక్స్ట్ వాడండి"                          },
  /* Error screen */
  errorTitle:    { EN: "Couldn't read text from this image", HI: "इस छवि से टेक्स्ट नहीं पढ़ा जा सका", TE: "ఈ చిత్రం నుండి టెక్స్ట్ చదవలేకపోయాం"     },
  errorSub:      { EN: "Try a clearer photo or enter your question manually.", HI: "साफ फ़ोटो लें या अपना प्रश्न स्वयं दर्ज करें।", TE: "స్పష్టమైన ఫోటో తీయండి లేదా మీ ప్రశ్నను స్వయంగా నమోదు చేయండి." },
  errorDetail:   { EN: "The image may be too blurry, too dark, or at an angle. Try again with better lighting.", HI: "छवि बहुत धुंधली, बहुत अंधेरी या कोण पर हो सकती है। बेहतर रोशनी में फिर कोशिश करें।", TE: "చిత్రం చాలా అస్పష్టంగా, చాలా చీకటిగా లేదా వాలుగా ఉండవచ్చు. మెరుగైన వెలుతురులో మళ్లీ ప్రయత్నించండి." },
  /* Shared */
  cancel:        { EN: "Cancel",                           HI: "रद्द करें",                             TE: "రద్దు చేయండి"                            },
  tryAgain:      { EN: "Try again",                        HI: "फिर कोशिश करें",                        TE: "మళ్లీ ప్రయత్నించండి"                      },
  useTextInput:  { EN: "Use text input",                   HI: "टेक्स्ट इनपुट उपयोग करें",              TE: "టెక్స్ట్ ఇన్‌పుట్ వాడండి"                },
  /* Header / aria */
  photoScan:     { EN: "Photo Scan",                       HI: "फ़ोटो स्कैन",                           TE: "ఫోటో స్కాన్"                              },
  closeScanner:  { EN: "Close photo scanner",              HI: "फ़ोटो स्कैनर बंद करें",                  TE: "ఫోటో స్కానర్ మూసివేయండి"                },
  dialogLabel:   { EN: "Photo scan",                       HI: "फ़ोटो स्कैन",                           TE: "ఫోటో స్కాన్"                              },
} as const;

type PhotoScanSheetProps = {
  onClose: () => void;
  onTextExtracted: (text: string) => void;
  language?: Language;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

const PROTOTYPE_IMAGE =
  "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=640&h=420&fit=crop&auto=format";

const PROTOTYPE_OCR = "Check BIS certification requirements for this product";

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M14 4l1.5 2.5H19a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1h3.5L8 4h6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="11" cy="10.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M4 14v3a1 1 0 001 1h12a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ScanIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5V3h3M17 3h-3M3 15v2h3M17 17h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="5.5" y="5.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7.5 10h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const btnBase = [
  "flex-1 py-2.5 rounded-xl text-[13px] font-medium min-h-[44px]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
  "active:scale-[0.98] transition-all",
].join(" ");
const primaryBtn   = btnBase + " bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]";
const secondaryBtn = btnBase + " border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]";
const ghostBtn     = "w-full text-[12px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded";

function PhotoCaptureOptions({ lang, onTakePhoto, onUpload, onCancel, fileInputRef }: {
  lang: Language; onTakePhoto: () => void; onUpload: () => void; onCancel: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { const t = setTimeout(() => firstBtnRef.current?.focus(), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="p-5 space-y-4">
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-snug">{L.optionsTitle[lang]}</h2>
        <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{L.optionsSub[lang]}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <button ref={firstBtnRef} onClick={onTakePhoto} aria-label={L.takePhoto[lang]}
          className="flex flex-col items-center gap-2.5 p-4 rounded-xl min-h-[80px] border border-[var(--color-border)] bg-white text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 active:scale-[0.97] transition-all duration-100">
          <CameraIcon />
          <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{L.takePhoto[lang]}</span>
        </button>
        <button onClick={onUpload} aria-label={L.uploadImage[lang]}
          className="flex flex-col items-center gap-2.5 p-4 rounded-xl min-h-[80px] border border-[var(--color-border)] bg-white text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 active:scale-[0.97] transition-all duration-100">
          <UploadIcon />
          <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{L.uploadImage[lang]}</span>
        </button>
      </div>
      <button onClick={onCancel} aria-label={L.cancel[lang]}
        className="w-full py-2.5 rounded-xl border border-[var(--color-border)] text-[13px] text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 min-h-[44px]">
        {L.cancel[lang]}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" aria-hidden="true" />
    </div>
  );
}

function PhotoPreview({ lang, onScan, onRetake, onCancel }: {
  lang: Language; onScan: () => void; onRetake: () => void; onCancel: () => void;
}) {
  return (
    <div className="p-5 space-y-4">
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">{L.previewTitle[lang]}</h2>
        <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-0.5">{L.previewSub[lang]}</p>
      </div>
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] aspect-[4/3] relative">
        <img src={PROTOTYPE_IMAGE} alt="Prototype product label for OCR demonstration" className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/40 text-white text-[10px] px-2 py-0.5 rounded-full">{L.protoImage[lang]}</div>
      </div>
      <div className="flex gap-2.5">
        <button onClick={onRetake} aria-label={L.retake[lang]} className={secondaryBtn}>{L.retake[lang]}</button>
        <button onClick={onScan}   aria-label={L.scanImage[lang]} className={primaryBtn}>{L.scanImage[lang]}</button>
      </div>
      <button onClick={onCancel} className={ghostBtn}>{L.cancel[lang]}</button>
    </div>
  );
}

function ScanProgress({ lang }: { lang: Language }) {
  return (
    <div className="p-5 space-y-4">
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">{L.scanningTitle[lang]}</h2>
        <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-0.5">{L.scanningSub[lang]}</p>
      </div>
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] aspect-[4/3] relative">
        <img src={PROTOTYPE_IMAGE} alt="Scanning product label" className="w-full h-full object-cover opacity-70" />
        <div className="absolute left-0 right-0 h-[2px] bg-[var(--color-accent)] opacity-80" style={{ animation: "scanLine 1.4s ease-in-out infinite" }} aria-hidden="true" />
        {["top-2 left-2 border-t-2 border-l-2","top-2 right-2 border-t-2 border-r-2","bottom-2 left-2 border-b-2 border-l-2","bottom-2 right-2 border-b-2 border-r-2"].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 border-[var(--color-accent)] ${cls}`} aria-hidden="true" />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden="true" />
            <span className="text-[12px] font-medium text-[var(--color-accent)]">{L.readingText[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OcrResult({ lang, text, onChange, onUseText, onTryAgain, onCancel, textareaRef }: {
  lang: Language; text: string; onChange: (v: string) => void;
  onUseText: () => void; onTryAgain: () => void; onCancel: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-snug">{L.ocrTitle[lang]}</h2>
          <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">{L.ocrSub[lang]}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="ocr-text" className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          {L.extractedLabel[lang]}
        </label>
        <textarea
          id="ocr-text"
          ref={textareaRef}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          aria-label={L.extractedAria[lang]}
          className="w-full resize-none rounded-xl px-3.5 py-2.5 text-[14px] text-[var(--color-text-primary)] leading-relaxed border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10"
        />
      </div>
      <div className="flex gap-2.5">
        <button onClick={onTryAgain} aria-label={L.tryAgain[lang]} className={secondaryBtn}>{L.tryAgain[lang]}</button>
        <button onClick={onUseText} disabled={!text.trim()} aria-label={L.useText[lang]}
          className={text.trim() ? primaryBtn : btnBase + " bg-[var(--color-background)] text-[var(--color-text-secondary)] cursor-not-allowed opacity-50"}>
          {L.useText[lang]}
        </button>
      </div>
      <button onClick={onCancel} className={ghostBtn}>{L.cancel[lang]}</button>
    </div>
  );
}

function ScanError({ lang, onTryAgain, onCancel }: { lang: Language; onTryAgain: () => void; onCancel: () => void }) {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">{L.errorTitle[lang]}</h2>
          <p className="text-[12.5px] text-[var(--color-text-secondary)] mt-1 leading-relaxed">{L.errorSub[lang]}</p>
        </div>
      </div>
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-3 text-[13px] text-amber-800 leading-relaxed">
        {L.errorDetail[lang]}
      </div>
      <div className="flex gap-2.5">
        <button onClick={onCancel}   aria-label={L.useTextInput[lang]} className={secondaryBtn}>{L.useTextInput[lang]}</button>
        <button onClick={onTryAgain} aria-label={L.tryAgain[lang]}     className={primaryBtn}>{L.tryAgain[lang]}</button>
      </div>
    </div>
  );
}

export default function PhotoScanSheet({ onClose, onTextExtracted, language = "EN", triggerRef }: PhotoScanSheetProps) {
  const [scanState, setScanState] = useState<PhotoScanState>("options");
  const [ocrText, setOcrText]     = useState(PROTOTYPE_OCR);

  const fileInputRef   = useRef<HTMLInputElement>(null);
  const ocrTextareaRef = useRef<HTMLTextAreaElement>(null);
  const sheetCloseRef  = useRef<HTMLButtonElement>(null);
  const lang = language;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (scanState === "ocr") {
      const t = setTimeout(() => ocrTextareaRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [scanState]);

  const handleScan    = () => { setScanState("scanning"); setTimeout(() => setScanState("ocr"), 1800); };
  const handleCancel  = useCallback(() => { onClose(); setTimeout(() => triggerRef?.current?.focus(), 50); }, [onClose, triggerRef]);
  const handleUseText = () => { onTextExtracted(ocrText.trim()); onClose(); setTimeout(() => triggerRef?.current?.focus(), 50); };

  const handleFileChange = () => setScanState("preview");

  const hiddenInput = (
    <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" aria-hidden="true" onChange={handleFileChange} />
  );

  const content = (() => {
    switch (scanState) {
      case "options":  return <PhotoCaptureOptions lang={lang} onTakePhoto={() => fileInputRef.current?.click()} onUpload={() => fileInputRef.current?.click()} onCancel={handleCancel} fileInputRef={fileInputRef} />;
      case "preview":  return <PhotoPreview lang={lang} onScan={handleScan} onRetake={() => setScanState("options")} onCancel={handleCancel} />;
      case "scanning": return <ScanProgress lang={lang} />;
      case "ocr":      return <OcrResult lang={lang} text={ocrText} onChange={setOcrText} onUseText={handleUseText} onTryAgain={() => setScanState("preview")} onCancel={handleCancel} textareaRef={ocrTextareaRef} />;
      case "error":    return <ScanError lang={lang} onTryAgain={() => setScanState("options")} onCancel={handleCancel} />;
    }
  })();

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div role="dialog" aria-modal="true" aria-label={L.dialogLabel[lang]} className="fixed inset-0 z-50 flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={handleCancel} aria-hidden="true" />
        <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[75vh] flex flex-col animate-[slideUp_220ms_ease-out]">
          <div className="w-9 h-[3px] rounded-full bg-[var(--color-border)] mx-auto mt-3 shrink-0" aria-hidden="true" />
          <div className="overflow-y-auto">{content}{hiddenInput}</div>
        </div>
      </div>
    );
  }

  return (
    <div role="dialog" aria-label={L.dialogLabel[lang]} className="w-full border-t border-[var(--color-border)] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] animate-[slideUp_200ms_ease-out]">
      <div className="max-w-[720px] mx-auto">
        {/* Desktop header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <div className="flex items-center gap-2">
            <ScanIcon />
            <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">{L.photoScan[lang]}</span>
          </div>
          <button ref={sheetCloseRef} onClick={handleCancel} aria-label={L.closeScanner[lang]}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-colors">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M10.5 2.5L2.5 10.5M2.5 2.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {content}
        {hiddenInput}
      </div>
    </div>
  );
}
