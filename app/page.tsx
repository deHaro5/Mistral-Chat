// app/page.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PixelCat from "./components/PixelCat";
import PixelBrain from "./components/PixelBrain";
import PixelClock from "./components/PixelClock";
import EasterEgg from "./components/EasterEgg";
import Settings from "./components/Settings";
import CodeBlock from "./components/CodeBlock";
import CopyIcon from "./components/CopyIcon";
import PixelArrow from "./components/PixelArrow";
import PixelStop from "./components/PixelStop";
import { Language, translations } from "./lib/translations";

type Role = "user" | "assistant" | "system";
type Msg = { 
  role: Role; 
  content: string; 
  thinking?: string; 
  id: string;
};

function TypingDots() {
  return (
    <span className="typing" aria-live="polite" aria-label="escribiendo">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </span>
  );
}

// Memoized MessageBubble to prevent unnecessary re-renders
const MessageBubble = React.memo(({ m, isStreaming, t }: { m: Msg; isStreaming: boolean; t: typeof translations.en }) => {
  if (m.role === "system") return null;
  const isUser = m.role === "user";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(m.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`message-container ${isUser ? "user-container" : "assistant-container"}`}>
      {/* Razonamiento ARRIBA del mensaje - collapsible */}
      {!isUser && m.thinking && (
        <details className="thinking-wrapper">
          <summary className="thinking-label pixel">{t.thinking}</summary>
          <pre className="thinking-panel">{m.thinking}</pre>
        </details>
      )}

      {/* Mensaje principal */}
      <div
        className={`bubble ${isUser ? "user" : "assistant"}`}
        aria-live={isStreaming ? "polite" : "off"}
      >
        {isUser ? (
          // User messages: plain text
          m.content
        ) : (
          // AI messages: render markdown
          <>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, className, children, ...props }) => (
                  <CodeBlock node={node} className={className} {...props}>
                    {children}
                  </CodeBlock>
                ),
              }}
            >
              {m.content}
            </ReactMarkdown>
            {isStreaming && <span className="blink-cursor" />}
            {isStreaming && <TypingDots />}
          </>
        )}
      </div>

      {/* Copy button */}
      <button
        className={`copy-btn ${copied ? "copied" : ""} ${!isUser && isStreaming ? "hidden" : ""}`}
        onClick={handleCopy}
        aria-label={t.copyMessage}
        title={t.copyMessage}
      >
        {copied ? "✓" : <CopyIcon size={14} />}
      </button>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

type ChatHistory = {
  id: string;
  name: string;
  messages: Msg[];
  timestamp: number;
};

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "system", content: "Eres un asistente útil.", id: "system-msg" },
  ]);
  const [input, setInput] = useState("");
  const [useReasoning, setUseReasoning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isTemporaryMode, setIsTemporaryMode] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ideasRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [showIdeasArrow, setShowIdeasArrow] = useState(false);
  
  const t = translations[language];

  // Auto-resize textarea when input changes
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    // Reset height to recalculate
    textarea.style.height = 'auto';
    
    // Calculate new height, capped at max
    const newHeight = Math.min(textarea.scrollHeight, 111);
    textarea.style.height = `${newHeight}px`;
    
    // Show scrollbar only when needed
    if (textarea.scrollHeight > 111) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [input]);

  // Detect if user is at bottom to show/hide scroll button
  useEffect(() => {
    const chatElement = chatRef.current;
    if (!chatElement) {
      console.log('❌ chatElement is null!');
      return;
    }
    
    console.log('✅ chatElement found:', chatElement);

    const checkScrollPosition = () => {
      const scrollTop = chatElement.scrollTop;
      const scrollHeight = chatElement.scrollHeight;
      const clientHeight = chatElement.clientHeight;
      const scrollBottom = scrollTop + clientHeight;
      const distanceFromBottom = scrollHeight - scrollBottom;
      
      // Show button if user is more than 200px away from bottom
      const shouldShowButton = distanceFromBottom > 200;
      
      console.log('📊 Scroll check:', { 
        scrollTop, 
        scrollHeight, 
        clientHeight, 
        scrollBottom,
        distanceFromBottom, 
        shouldShowButton,
        currentState: showScrollButton
      });
      
      if (shouldShowButton !== showScrollButton) {
        console.log('🔄 Changing button state to:', shouldShowButton);
        setShowScrollButton(shouldShowButton);
      }
    };

    // Add scroll listener
    chatElement.addEventListener("scroll", checkScrollPosition, { passive: true });
    
    console.log('👂 Scroll listener added');
    
    // Check immediately
    setTimeout(() => {
      console.log('⏰ Initial check after timeout');
      checkScrollPosition();
    }, 500);
    
    return () => {
      console.log('🧹 Cleanup: removing scroll listener');
      chatElement.removeEventListener("scroll", checkScrollPosition);
    };
  }, [showScrollButton]);

  // Also check when messages change
  useEffect(() => {
    const chatElement = chatRef.current;
    if (!chatElement) return;
    
    setTimeout(() => {
      const scrollTop = chatElement.scrollTop;
      const scrollHeight = chatElement.scrollHeight;
      const clientHeight = chatElement.clientHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const shouldShowButton = distanceFromBottom > 200;
      
      console.log('📬 Messages changed, checking scroll:', { distanceFromBottom, shouldShowButton });
      setShowScrollButton(shouldShowButton);
    }, 100);
  }, [messages]);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) containerRef.current?.classList.add("prefers-reduced-motion");
    else containerRef.current?.classList.remove("prefers-reduced-motion");
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Check if ideas list has more content to scroll
  useEffect(() => {
    const ideasList = ideasRef.current;
    if (!ideasList) return;

    const checkScroll = () => {
      const hasOverflow = ideasList.scrollWidth > ideasList.clientWidth;
      const isAtEnd = ideasList.scrollLeft + ideasList.clientWidth >= ideasList.scrollWidth - 5;
      setShowIdeasArrow(hasOverflow && !isAtEnd);
    };

    // Delay check to ensure DOM is rendered
    setTimeout(checkScroll, 100);
    ideasList.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      ideasList.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [messages]);

  // Save or update current chat in history (only if not in temporary mode)
  const saveToHistory = (msgs: Msg[]) => {
    if (isTemporaryMode) return; // Don't save if in temporary mode
    if (msgs.filter(m => m.role !== "system").length === 0) return;
    
    const firstUserMsg = msgs.find(m => m.role === "user");
    const chatName = firstUserMsg ? firstUserMsg.content.slice(0, 10) : "Nueva chat";
    
    if (currentChatId) {
      setChatHistories(prev => 
        prev.map(h => h.id === currentChatId 
          ? { ...h, name: chatName, messages: msgs, timestamp: Date.now() }
          : h
        )
      );
    } else {
      const newChatId = `chat-${Date.now()}`;
      setCurrentChatId(newChatId);
      setChatHistories(prev => {
        // Check if this ID already exists to prevent duplicates
        if (prev.some(h => h.id === newChatId)) {
          return prev;
        }
        // Add new conversations at the beginning (top) of the array
        return [
          {
            id: newChatId,
            name: chatName,
            messages: msgs,
            timestamp: Date.now()
          },
          ...prev
        ];
      });
    }
  };

  const cancelMessage = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setStreamingMsgId(null);
  };

  async function sendMessage(preset?: string) {
    const trimmed = (preset ?? input).trim();
    if (!trimmed || loading) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    const userId = `user-${Date.now()}`;
    const assistantId = `assistant-${Date.now()}`;
    const userMsg: Msg = { role: "user", content: trimmed, id: userId };
    const base = [...messages, userMsg];
    setMessages(base);
    setInput("");
    
    // Reset textarea height and overflow
    if (inputRef.current) {
      inputRef.current.style.height = '48px';
      inputRef.current.style.overflowY = 'hidden';
    }
    
    // Scroll to bottom when sending a new message
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    setLoading(true);
    setStreamingMsgId(assistantId);

    let ans = "";
    let think = "";
    
    // Add empty assistant message immediately
    setMessages((curr) => [
      ...curr,
      { role: "assistant", content: "", thinking: "", id: assistantId },
    ]);

    // Create AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: base.map(({ role, content }) => ({ role, content })),
          useReasoning,
          normalModel: "mistral-small-latest",
        }),
        signal: abortControllerRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let sep: number;
        while ((sep = buf.indexOf("\n\n")) !== -1) {
          const pkt = buf.slice(0, sep).trim();
          buf = buf.slice(sep + 2);

          if (!pkt) continue;

          const ev = /event:\s*(\w+)/.exec(pkt)?.[1] || "chunk";
          const dataLine = pkt.split("\n").find((l) => l.startsWith("data:"));
          if (!dataLine) continue;
          
          const jsonStr = dataLine.replace(/^data:\s*/, "").trim();
          if (!jsonStr || jsonStr === "[DONE]") continue;

          let payload: any;
          try {
            payload = JSON.parse(jsonStr);
          } catch (e) {
            console.error("JSON parse error:", e, "String:", jsonStr);
            continue;
          }

          if (ev === "chunk") {
            if (payload.kind === "answer") ans += payload.text || "";
            if (payload.kind === "thinking") think += payload.text || "";
            
            // Update only the streaming message by ID
            setMessages((curr) => 
              curr.map((msg) =>
                msg.id === assistantId
                  ? { ...msg, content: ans, thinking: think }
                  : msg
              )
            );
          } else if (ev === "done") {
            setMessages((curr) => 
              curr.map((msg) =>
                msg.id === assistantId
                  ? { ...msg, content: ans, thinking: think }
                  : msg
              )
            );
          }
        }
      }
    } catch (e: any) {
      // Don't show error if request was aborted
      if (e.name !== 'AbortError') {
        setMessages((curr) => [
          ...curr.filter((m) => m.id !== assistantId),
          { 
            role: "assistant", 
            content: `⚠️ Error: ${e?.message || e}`,
            id: `error-${Date.now()}`
          },
        ]);
      }
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
      setStreamingMsgId(null);
      // Save final state to history
      setMessages((curr) => {
        saveToHistory(curr);
        return curr;
      });
    }
  }

  // Load a chat from history
  const loadChat = (chatId: string) => {
    const chat = chatHistories.find(h => h.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setHasStarted(true);
      setIsTemporaryMode(false); // Exit temporary mode when loading a saved chat
    }
  };

  // Start a new chat
  const newChat = () => {
    setMessages([{ role: "system", content: "Eres un asistente útil.", id: "system-msg" }]);
    setCurrentChatId(null);
    setHasStarted(false);
    setIsTemporaryMode(false);
  };

  // Toggle temporary mode
  const toggleTemporaryMode = () => {
    if (!isTemporaryMode) {
      // Activating temporary mode - start fresh
      setMessages([{ role: "system", content: "Eres un asistente útil.", id: "system-msg" }]);
      setCurrentChatId(null);
      setHasStarted(false);
      setIsTemporaryMode(true);
    } else {
      // Deactivating temporary mode - clear and start new normal chat
      setMessages([{ role: "system", content: "Eres un asistente útil.", id: "system-msg" }]);
      setCurrentChatId(null);
      setHasStarted(false);
      setIsTemporaryMode(false);
    }
  };

  // Handle cat click for easter egg
  const handleCatClick = () => {
    setEasterEggActive(true);
  };

  const visibleMessages = useMemo(
    () => messages.filter((m) => m.role !== "system"),
    [messages]
  );
  const hasMessages = visibleMessages.length > 0;

  return (
    <main className={`app ${historyOpen ? 'history-open' : ''}`} ref={containerRef}>
      {/* Sidebar with history */}
      <aside className={`history-sidebar ${historyOpen ? 'open' : ''}`}>
        <button 
          className="history-toggle-btn"
          onClick={() => setHistoryOpen(!historyOpen)}
          aria-label={historyOpen ? t.closeHistory : t.openHistory}
          title={historyOpen ? t.closeHistory : t.openHistory}
        >
          {historyOpen ? '✕' : '☰'}
        </button>
        
        {!historyOpen && (
          <button
            className="new-chat-sidebar-btn"
            onClick={newChat}
            aria-label={t.newChatSidebar}
            title={t.newChatSidebar}
          >
            +
          </button>
        )}
        
        {historyOpen && (
          <div className="history-content">
            <div className="history-header">
              <h2 className="pixel">{t.history}</h2>
              <button 
                className="new-chat-btn pixel"
                onClick={newChat}
                title={t.newChatSidebar}
              >
                {t.newChat}
              </button>
            </div>
            <div className="history-list">
              {chatHistories.length === 0 ? (
                <div className="no-history">{t.noHistory}</div>
              ) : (
                chatHistories.map(chat => (
                  <button
                    key={chat.id}
                    className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
                    onClick={() => loadChat(chat.id)}
                    title={chat.name}
                  >
                    {chat.name}
                  </button>
                ))
              )}
            </div>
            <div className="history-footer">
              <button
                className="settings-btn pixel"
                onClick={() => setSettingsOpen(true)}
                title={t.settings}
              >
                <span style={{ fontSize: '16px' }}>⚙</span> {t.settings}
              </button>
            </div>
          </div>
        )}
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <div 
              onClick={handleCatClick} 
              style={{ cursor: 'pointer', display: 'inline-flex' }}
              title="🐱"
            >
              <PixelCat />
            </div>
            <strong className="title">{t.chatTitle}</strong>
            <span className="badge pixel">{t.beta}</span>
          </div>
          <button
            className={`temporary-mode-btn ${isTemporaryMode ? 'active' : ''}`}
            onClick={toggleTemporaryMode}
            title={isTemporaryMode ? t.deactivateTemporary : t.activateTemporary}
            aria-label={isTemporaryMode ? t.deactivateTemporary : t.activateTemporary}
          >
            <PixelClock />
          </button>
        </header>

      <section ref={chatRef} className={`chat ${hasMessages ? 'has-messages' : ''}`}>
        <div className="messages-wrapper">
          {/* Temporary mode message when no messages */}
          {isTemporaryMode && visibleMessages.length === 0 && !loading && (
            <div className="temporary-mode-info">
              <div className="temporary-mode-title pixel">{t.temporaryModeTitle}</div>
              <div className="temporary-mode-subtitle">
                {t.temporaryModeSubtitle}
              </div>
            </div>
          )}
          
          {visibleMessages.map((m) => (
            <MessageBubble 
              key={m.id} 
              m={m} 
              isStreaming={loading && m.id === streamingMsgId}
              t={t}
            />
          ))}
          {loading && visibleMessages.length === 0 && (
            <div className="muted pixel">{t.generating}</div>
          )}
        </div>
        <div ref={bottomRef} />
      </section>

      <div className={`chat-container ${hasStarted ? 'active' : 'centered'}`}>
        <div className="input-box">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={t.inputPlaceholder}
              rows={1}
            />
            <div className="buttons-row">
              <button 
                className={`brain-btn ${useReasoning ? 'active' : ''}`}
                onClick={() => setUseReasoning(!useReasoning)}
                title={useReasoning ? "Deactivate reasoner" : "Activate reasoner"}
                aria-label={useReasoning ? "Deactivate reasoner" : "Activate reasoner"}
                disabled={loading}
              >
                <PixelBrain />
              </button>
              {loading ? (
                <button 
                  className="btn cancel-btn" 
                  onClick={cancelMessage}
                  aria-label={t.cancel}
                  title={t.cancel}
                >
                  <PixelStop size={18} />
                </button>
              ) : (
                <button className="btn pixel" onClick={() => sendMessage()}>
                  {t.send}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Quick Ideas when no messages - outside, below the textbox */}
        {visibleMessages.length === 0 && !loading && (
          <div className="quick-ideas">
            <div className="quick-ideas-title pixel">Idea:</div>
            <div className="quick-ideas-wrapper">
              <div className="quick-ideas-list" ref={ideasRef}>
                {[
                  "Create a Snake game in Python",
                  "Write a croissant recipe",
                  "Build a todo app with React",
                  "Explain binary search",
                  "Generate a personal portfolio in Next.js",
                  "Optimize an SQL query",
                  "Design a REST API spec",
                  "Write unit tests with Jest",
                  "Create a CSS grid layout",
                ].map((idea) => (
                  <button
                    key={idea}
                    className="quick-idea"
                    onClick={() => sendMessage(idea)}
                    disabled={loading}
                    title={idea}
                  >
                    {idea}
                  </button>
                ))}
              </div>
              {showIdeasArrow && (
                <div className="quick-ideas-arrow">
                  &gt;
                </div>
              )}
            </div>
          </div>
        )}
        {hasStarted && (
          <div className="disclaimer pixel">
            {t.disclaimer}
          </div>
        )}
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          className="scroll-to-bottom-btn"
          onClick={scrollToBottom}
          aria-label={t.goToBottom}
          title={t.goToBottom}
        >
          ↓
        </button>
      )}
      
      {/* Easter Egg */}
      <EasterEgg 
        active={easterEggActive} 
        onComplete={() => setEasterEggActive(false)} 
      />
      
      {/* Settings */}
      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />
      </div>
    </main>
  );
}
