// app/components/Settings.tsx
"use client";
import React from "react";
import { Language, translations } from "../lib/translations";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Settings({ open, onClose, language, onLanguageChange }: SettingsProps) {
  const t = translations[language];
  
  if (!open) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-sidebar">
          <h3 className="pixel settings-section-title">{t.language}</h3>
        </div>
        
        <div className="settings-content">
          <div className="settings-header">
            <h2 className="pixel">{t.settingsTitle}</h2>
            <button className="settings-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          
          <div className="settings-body">
            <h4 className="settings-label">{t.selectLanguage}</h4>
            <div className="language-options">
              <button
                className={`language-option ${language === 'en' ? 'active' : ''}`}
                onClick={() => onLanguageChange('en')}
              >
                <span className="language-flag">🇬🇧</span>
                <span>{t.english}</span>
              </button>
              <button
                className={`language-option ${language === 'es' ? 'active' : ''}`}
                onClick={() => onLanguageChange('es')}
              >
                <span className="language-flag">🇪🇸</span>
                <span>{t.spanish}</span>
              </button>
              <button
                className={`language-option ${language === 'fr' ? 'active' : ''}`}
                onClick={() => onLanguageChange('fr')}
              >
                <span className="language-flag">🇫🇷</span>
                <span>{t.french}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

