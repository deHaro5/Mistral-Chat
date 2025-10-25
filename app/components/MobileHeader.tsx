// app/components/MobileHeader.tsx
"use client";
import React from "react";
import PixelCat from "./PixelCat";
import PixelClock from "./PixelClock";
import { translations, Language } from "../lib/translations";

interface MobileHeaderProps {
  historyOpen: boolean;
  setHistoryOpen: (open: boolean) => void;
  hasStarted: boolean;
  isTemporaryMode: boolean;
  onNewChat: () => void;
  onToggleTemporary: () => void;
  onCatClick: () => void;
  language: Language;
}

export default function MobileHeader({
  historyOpen,
  setHistoryOpen,
  hasStarted,
  isTemporaryMode,
  onNewChat,
  onToggleTemporary,
  onCatClick,
  language,
}: MobileHeaderProps) {
  const t = translations[language];
  
  // Lógica del botón derecho:
  // Si hay conversación iniciada Y NO estamos en modo temporal → mostrar "+"
  // Caso contrario → mostrar reloj
  const showNewChatButton = hasStarted && !isTemporaryMode;

  return (
    <header className="mobile-header">
      <button
        className="mobile-menu-btn"
        onClick={() => setHistoryOpen(!historyOpen)}
        aria-label={historyOpen ? t.closeHistory : t.openHistory}
        title={historyOpen ? t.closeHistory : t.openHistory}
      >
        {historyOpen ? '✕' : '☰'}
      </button>
      
      <div 
        className="mobile-header-center"
        onClick={onCatClick}
        style={{ cursor: 'pointer' }}
      >
        <PixelCat />
        <strong className="mobile-title">{t.chatTitle}</strong>
      </div>
      
      {showNewChatButton ? (
        <button
          className="mobile-action-btn"
          onClick={onNewChat}
          aria-label={t.newChatSidebar}
          title={t.newChatSidebar}
        >
          +
        </button>
      ) : (
        <button
          className={`mobile-action-btn ${isTemporaryMode ? 'active' : ''}`}
          onClick={onToggleTemporary}
          title={isTemporaryMode ? t.deactivateTemporary : t.activateTemporary}
          aria-label={isTemporaryMode ? t.deactivateTemporary : t.activateTemporary}
        >
          <PixelClock />
        </button>
      )}
    </header>
  );
}

