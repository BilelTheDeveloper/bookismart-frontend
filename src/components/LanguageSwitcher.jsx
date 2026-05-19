/**
 * LanguageSwitcher
 *
 * Only rendered when VITE_I18N_ENABLED=true.
 * Cycles through: FR → AR → EN → FR
 * Can be dropped into <Navbar /> or any header.
 */
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const LANGS = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية',  flag: '🇹🇳' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);

  // Lazy-load i18n only when this component is actually used
  const [i18n, setI18n] = useState(null);
  React.useEffect(() => {
    if (import.meta.env.VITE_I18N_ENABLED !== 'true') return;
    import('../i18n/index.js').then((mod) => setI18n(mod.default));
  }, []);

  if (import.meta.env.VITE_I18N_ENABLED !== 'true' || !i18n) return null;

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  return (
    <div className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
      >
        <Globe size={13} />
        <span>{current.flag} {current.label}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-slate-100 bg-white shadow-xl overflow-hidden z-50"
          >
            <div className="p-1.5">
              {LANGS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
