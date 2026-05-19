/**
 * i18n — multi-language support
 *
 * ENABLED when VITE_I18N_ENABLED=true in .env
 * Supports: French (fr), Arabic (ar), English (en)
 *
 * Usage in components:
 *   import { useTranslation } from 'react-i18next'
 *   const { t, i18n } = useTranslation()
 *   t('professionals.bookNow')
 *
 * Switch language:
 *   i18n.changeLanguage('ar') // triggers RTL via document.dir
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import ar from './locales/ar.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('bookiify_lang') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: savedLang,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

// Persist language choice + toggle RTL for Arabic
i18n.on('languageChanged', (lang) => {
  localStorage.setItem('bookiify_lang', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
});

// Apply on first load
document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLang;

export default i18n;
