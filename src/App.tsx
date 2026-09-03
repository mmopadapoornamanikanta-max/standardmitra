import { useState, useCallback, useRef } from "react";
import WaveGrid from "./components/originkit/ui/wave-grid";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import EmptyState from "./components/prompts/EmptyState";
import MessageList from "./components/chat/MessageList";
import ChatInput from "./components/chat/ChatInput";
import CitationPanel from "./components/citation/CitationPanel";
import VoiceOverlay from "./components/voice/VoiceOverlay";
import PhotoScanSheet from "./components/photo/PhotoScanSheet";
import SettingsPanel from "./components/settings/SettingsPanel";
import { sendChatMessage } from "./services/chatService";
import { ApiClientError } from "./services/apiClient";
import { DEMO_CONVERSATIONS } from "./data/mock";
import type { Message, Citation, Conversation, Language, TextSize } from "./types/chat";

let msgCounter = 100;
const newId = () => `m${++msgCounter}`;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversations] = useState<Conversation[]>(DEMO_CONVERSATIONS);

  const [citationPanelOpen, setCitationPanelOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [language, setLanguage] = useState<Language>("EN");
  const [textSize, setTextSize] = useState<TextSize>("default");

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [prefillText, setPrefillText] = useState<string | null>(null);

  /* Focus-return refs */
  const micBtnRef      = useRef<HTMLButtonElement>(null);
  const camBtnRef      = useRef<HTMLButtonElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  /* In-flight request controller — lets New Chat cancel a pending response */
  const abortRef = useRef<AbortController | null>(null);

  const hasMessages  = messages.length > 0;
  const composerBusy = voiceOpen || photoOpen;
  const textSizeClass = textSize === "large" ? "text-[1.0625rem]" : "text-[0.9375rem]";

  /* ── Central message send ────────────────────────────────── */
  const handleSendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    /* Cancel any previous in-flight request */
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const userMsg: Message = {
      id: newId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActiveConversationId((prev) => prev ?? "conv-active");

    try {
      const response = await sendChatMessage(
        {
          message: trimmed,
          conversationId: activeConversationId ?? undefined,
          language,
        },
        ctrl.signal,
      );

      /* Guard: if New Chat was clicked while awaiting, discard the response */
      if (ctrl.signal.aborted) return;

      /* Persist the conversationId the backend assigned */
      if (response.conversationId) {
        setActiveConversationId(response.conversationId);
      }

      const assistantMsg: Message = {
        id: newId(),
        role: "assistant",
        content: response.message,
        citations: response.citations,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      /* Cancelled by the user — silently discard, no error UI */
      if (ctrl.signal.aborted) return;
      if (err instanceof ApiClientError && err.code === "ABORTED") return;

      const errorMsg: Message = {
        id: newId(),
        role: "assistant",
        content: "Sorry, I couldn't process that request. Please try again.",
        timestamp: new Date(),
        isError: true,
        retryText: trimmed,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      if (!ctrl.signal.aborted) {
        setIsTyping(false);
      }
    }
  }, [isTyping, language, activeConversationId]);

  /* ── Input send (clears the textarea before dispatching) ─── */
  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    handleSendMessage(text);
  }, [inputValue, handleSendMessage]);

  /* ── Prompt cards ────────────────────────────────────────── */
  const handleSelectPrompt = (prompt: string) => handleSendMessage(prompt);

  /* ── Citation selection ──────────────────────────────────── */
  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
    setCitationPanelOpen(true);
  };

  /* ── New Chat ────────────────────────────────────────────── */
  const handleNewChat = () => {
    /* Cancel any in-flight request so stale responses don't appear */
    abortRef.current?.abort();
    abortRef.current = null;

    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    setActiveConversationId(null);
    setCitationPanelOpen(false);
    setSelectedCitation(null);
    setVoiceOpen(false);
    setPhotoOpen(false);
    setSettingsOpen(false);
    setMobileSidebarOpen(false);
  };

  /* ── OCR prefill ─────────────────────────────────────────── */
  const handlePhotoText = (text: string) => {
    setPhotoOpen(false);
    setPrefillText(text);
  };

  /* ── Conversation selection (loads demo messages, closes overlays) */
  const handleSelectConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    setActiveConversationId(id);
    setMessages(conv?.messages ?? []);
    setIsTyping(false);
    setCitationPanelOpen(false);
    setSelectedCitation(null);
    setVoiceOpen(false);
    setPhotoOpen(false);
    setSettingsOpen(false);
  };

  const sidebarProps = {
    conversations,
    activeConversationId,
    language,
    onNewChat: handleNewChat,
    onSelectConversation: handleSelectConversation,
    onOpenSettings: () => setSettingsOpen(true),
    settingsBtnRef,
  };

  return (
    <div
      className={["h-full flex bg-[var(--color-background)]", textSizeClass].join(" ")}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-[280px] bg-white h-full shadow-xl">
            <Sidebar
              {...sidebarProps}
              mobile
              onClose={() => setMobileSidebarOpen(false)}
              onSelectConversation={(id) => {
                handleSelectConversation(id);
                setMobileSidebarOpen(false);
              }}
              onOpenSettings={() => {
                setSettingsOpen(true);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-white">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          showMenu
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Chat + citation split */}
        <div className="flex-1 flex overflow-hidden">

          {/* Chat column */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white relative">

            {/* Wave grid background — canvas is pointer-events:none; events bound to window */}
            <div className="absolute inset-0" style={{ opacity: 0.32 }}>
              <WaveGrid
                base="#b8cfe8"
                crest="#1e3a5f"
                grid={16}
                gap={3}
                amplitude={16}
                waveSpeed={7}
                tilt={4}
                trail={11}
                shadows={true}
                sizePercent={200}
              />
            </div>

            <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
            {!hasMessages ? (
              <EmptyState onSelectPrompt={handleSelectPrompt} language={language} />
            ) : (
              <MessageList
                messages={messages}
                isTyping={isTyping}
                language={language}
                onCitationClick={handleCitationClick}
                onRetry={handleSendMessage}
                onFollowUp={handleSendMessage}
              />
            )}

            {/* Inline composer overlays */}
            {voiceOpen && (
              <VoiceOverlay
                onClose={() => setVoiceOpen(false)}
                onConfirm={handleSendMessage}
                triggerRef={micBtnRef}
                language={language}
              />
            )}

            {photoOpen && (
              <PhotoScanSheet
                onClose={() => setPhotoOpen(false)}
                onTextExtracted={handlePhotoText}
                triggerRef={camBtnRef}
                language={language}
              />
            )}

            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              onMic={() => { setPhotoOpen(false); setSettingsOpen(false); setVoiceOpen((v) => !v); }}
              onCamera={() => { setVoiceOpen(false); setSettingsOpen(false); setPhotoOpen((v) => !v); }}
              language={language}
              state={
                composerBusy ? "disabled"
                  : isTyping  ? "loading"
                  : inputValue ? "typing"
                  : "empty"
              }
              micListening={voiceOpen}
              camActive={photoOpen}
              micBtnRef={micBtnRef}
              camBtnRef={camBtnRef}
              prefillOnce={prefillText}
              onPrefillConsumed={() => setPrefillText(null)}
            />
            </div>{/* end relative z-10 */}
          </div>

          {/* Desktop citation panel */}
          {citationPanelOpen && selectedCitation && (
            <div className="hidden lg:flex">
              <CitationPanel
                citation={selectedCitation}
                open={citationPanelOpen}
                language={language}
                onClose={() => {
                  setCitationPanelOpen(false);
                  setSelectedCitation(null);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile citation bottom sheet */}
      {citationPanelOpen && selectedCitation && (
        <div className="lg:hidden">
          <CitationPanel
            citation={selectedCitation}
            open={citationPanelOpen}
            language={language}
            onClose={() => {
              setCitationPanelOpen(false);
              setSelectedCitation(null);
            }}
            mobile
          />
        </div>
      )}

      {/* Settings panel */}
      <SettingsPanel
        open={settingsOpen}
        language={language}
        textSize={textSize}
        onLanguageChange={setLanguage}
        onTextSizeChange={setTextSize}
        onClose={() => setSettingsOpen(false)}
        triggerRef={settingsBtnRef}
      />
    </div>
  );
}
