// app/lib/translations.ts

export type Language = 'en' | 'es' | 'fr';

export const translations = {
  en: {
    // Header
    chatTitle: 'Chat Mistral',
    beta: 'beta',
    
    // History sidebar
    history: 'History',
    newChat: '+ New',
    noHistory: 'No history',
    closeHistory: 'Close history',
    openHistory: 'Open history',
    newChatSidebar: 'New chat',
    settings: 'Settings',
    
    // Temporary mode
    temporaryMode: 'Temporary mode',
    activateTemporary: 'Activate temporary mode',
    deactivateTemporary: 'Deactivate temporary mode',
    temporaryModeTitle: '⏱ Temporary mode activated',
    temporaryModeSubtitle: 'This chat will not be saved in history. Perfect for private conversations or quick tests.',
    
    // Chat
    inputPlaceholder: 'Write your message…',
    send: 'Send',
    generating: 'generating…',
    thinking: 'REASONING',
    
    // Buttons
    copyMessage: 'Copy message',
    goToBottom: 'Go to bottom',
    
    // Footer
    disclaimer: 'Mistral can make mistakes',
    
    // Settings
    settingsTitle: 'Settings',
    language: 'Language',
    selectLanguage: 'Select language',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    close: 'Close',
  },
  es: {
    // Header
    chatTitle: 'Chat Mistral',
    beta: 'beta',
    
    // History sidebar
    history: 'Historial',
    newChat: '+ Nuevo',
    noHistory: 'Sin historiales',
    closeHistory: 'Cerrar historial',
    openHistory: 'Abrir historial',
    newChatSidebar: 'Nuevo chat',
    settings: 'Ajustes',
    
    // Temporary mode
    temporaryMode: 'Modo temporal',
    activateTemporary: 'Activar modo temporal',
    deactivateTemporary: 'Desactivar modo temporal',
    temporaryModeTitle: '⏱ Modo temporal activado',
    temporaryModeSubtitle: 'Este chat no se guardará en el historial. Perfecto para conversaciones privadas o pruebas rápidas.',
    
    // Chat
    inputPlaceholder: 'Escribe tu mensaje…',
    send: 'Enviar',
    generating: 'generando…',
    thinking: 'RAZONAMIENTO',
    
    // Buttons
    copyMessage: 'Copiar mensaje',
    goToBottom: 'Ir al final',
    
    // Footer
    disclaimer: 'Mistral puede cometer errores',
    
    // Settings
    settingsTitle: 'Ajustes',
    language: 'Idioma',
    selectLanguage: 'Seleccionar idioma',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    close: 'Cerrar',
  },
  fr: {
    // Header
    chatTitle: 'Chat Mistral',
    beta: 'bêta',
    
    // History sidebar
    history: 'Historique',
    newChat: '+ Nouveau',
    noHistory: 'Aucun historique',
    closeHistory: 'Fermer l\'historique',
    openHistory: 'Ouvrir l\'historique',
    newChatSidebar: 'Nouveau chat',
    settings: 'Paramètres',
    
    // Temporary mode
    temporaryMode: 'Mode temporaire',
    activateTemporary: 'Activer le mode temporaire',
    deactivateTemporary: 'Désactiver le mode temporaire',
    temporaryModeTitle: '⏱ Mode temporaire activé',
    temporaryModeSubtitle: 'Ce chat ne sera pas enregistré dans l\'historique. Parfait pour les conversations privées ou les tests rapides.',
    
    // Chat
    inputPlaceholder: 'Écrivez votre message…',
    send: 'Envoyer',
    generating: 'génération…',
    thinking: 'RAISONNEMENT',
    
    // Buttons
    copyMessage: 'Copier le message',
    goToBottom: 'Aller en bas',
    
    // Footer
    disclaimer: 'Mistral peut faire des erreurs',
    
    // Settings
    settingsTitle: 'Paramètres',
    language: 'Langue',
    selectLanguage: 'Sélectionner la langue',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    close: 'Fermer',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key];
}

