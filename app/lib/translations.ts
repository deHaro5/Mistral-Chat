// app/lib/translations.ts

export type Language = 'en' | 'es' | 'fr';

export const translations = {
  en: {
    // Header
    chatTitle: 'Mistral Chat',
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
    cancel: 'Cancel',
    generating: 'generating…',
    thinking: 'REASONING',
    
    // Buttons
    copyMessage: 'Copy message',
    copyCode: 'Copy code',
    goToBottom: 'Go to bottom',
    activateReasoner: 'Activate reasoner',
    deactivateReasoner: 'Deactivate reasoner',
    
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
    
    // Quick Ideas
    ideaLabel: 'Idea:',
    idea1: 'Create a Snake game in Python',
    idea2: 'Write a croissant recipe',
    idea3: 'Build a todo app with React',
    idea4: 'Explain binary search',
    idea5: 'Generate a personal portfolio in Next.js',
    idea6: 'Optimize an SQL query',
    idea7: 'Design a REST API spec',
    idea8: 'Write unit tests with Jest',
    idea9: 'Create a CSS grid layout',
  },
  es: {
    // Header
    chatTitle: 'Mistral Chat',
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
    cancel: 'Cancelar',
    generating: 'generando…',
    thinking: 'RAZONAMIENTO',
    
    // Buttons
    copyMessage: 'Copiar mensaje',
    copyCode: 'Copiar código',
    goToBottom: 'Ir al final',
    activateReasoner: 'Activar razonador',
    deactivateReasoner: 'Desactivar razonador',
    
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
    
    // Quick Ideas
    ideaLabel: 'Idea:',
    idea1: 'Crear un juego Snake en Python',
    idea2: 'Escribir una receta de croissant',
    idea3: 'Construir una app de tareas con React',
    idea4: 'Explicar búsqueda binaria',
    idea5: 'Generar un portafolio personal en Next.js',
    idea6: 'Optimizar una consulta SQL',
    idea7: 'Diseñar una especificación REST API',
    idea8: 'Escribir pruebas unitarias con Jest',
    idea9: 'Crear un diseño CSS grid',
  },
  fr: {
    // Header
    chatTitle: 'Mistral Chat',
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
    cancel: 'Annuler',
    generating: 'génération…',
    thinking: 'RAISONNEMENT',
    
    // Buttons
    copyMessage: 'Copier le message',
    copyCode: 'Copier le code',
    goToBottom: 'Aller en bas',
    activateReasoner: 'Activer le raisonneur',
    deactivateReasoner: 'Désactiver le raisonneur',
    
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
    
    // Quick Ideas
    ideaLabel: 'Idée :',
    idea1: 'Créer un jeu Snake en Python',
    idea2: 'Écrire une recette de croissant',
    idea3: 'Construire une app de tâches avec React',
    idea4: 'Expliquer la recherche binaire',
    idea5: 'Générer un portfolio personnel en Next.js',
    idea6: 'Optimiser une requête SQL',
    idea7: 'Concevoir une spécification REST API',
    idea8: 'Écrire des tests unitaires avec Jest',
    idea9: 'Créer une mise en page CSS grid',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key];
}

