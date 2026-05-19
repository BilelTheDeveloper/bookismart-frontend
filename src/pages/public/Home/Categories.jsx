import React, { useState } from "react";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const CATEGORY_META = [
  { id: 1, title: "SmartStyle", catKey: "style", icon: "✂️", color: "bg-rose-500" },
  { id: 2, title: "SmartDoc",   catKey: "doc",   icon: "🏥", color: "bg-blue-500" },
  { id: 8, title: "SmartPro",   catKey: "pro",   icon: "⚖️", color: "bg-amber-600" },
  { id: 5, title: "SmartAuto",  catKey: "auto",  icon: "🚗", color: "bg-slate-700" },
  { id: 10, title: "SmartPet",  catKey: "pet",   icon: "🐾", color: "bg-teal-500" },
  { id: 3, title: "SmartFit",   catKey: "fit",   icon: "🏋️", color: "bg-emerald-500" },
  { id: 4, title: "SmartLens",  catKey: "lens",  icon: "📸", color: "bg-violet-500" },
  { id: 6, title: "SmartHome",  catKey: "home",  icon: "🏠", color: "bg-orange-500" },
  { id: 7, title: "SmartEdu",   catKey: "edu",   icon: "🎓", color: "bg-indigo-600" },
  { id: 9, title: "SmartEvent", catKey: "event", icon: "🎉", color: "bg-pink-500" },
];

const Categories = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const visibleMeta = showAll ? CATEGORY_META : CATEGORY_META.slice(0, 5);

  return (
    <section className="relative bg-white pb-24 pt-12 sm:pt-14 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
            <Sparkles size={14} />
            {t("home.categories.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {t("home.categories.title")} <span className="text-indigo-600">{t("home.categories.titleHighlight")}</span> {t("home.categories.titleSuffix")}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium text-slate-500 sm:text-lg">
            {t("home.categories.description")}
          </p>
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {visibleMeta.map((cat) => (
            <motion.button
              layout
              key={cat.id}
              onClick={() => setSelectedCat(cat)}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/40 transition-all sm:p-7"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-x-6 top-0 h-20 rounded-b-[2rem] bg-gradient-to-b from-slate-50 to-transparent" />
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white shadow-lg sm:mb-6 sm:h-16 sm:w-16 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-base font-black leading-tight text-slate-900 sm:text-lg">{cat.title}</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
                {t(`home.categories.cats.${cat.catKey}.sub`)}
              </p>
              <div className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700">
                {t("home.categories.explore")}
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95"
          >
            {showAll ? t("home.categories.showLess") : t("home.categories.showAll")}
            <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedCat && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
              onClick={() => setSelectedCat(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 230, damping: 24 }}
              className="relative w-full max-w-lg rounded-[2rem] border border-slate-100 bg-white p-6 shadow-2xl sm:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                onClick={() => setSelectedCat(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl text-white shadow-lg ${selectedCat.color}`}>
                {selectedCat.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900">{selectedCat.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                {t(`home.categories.cats.${selectedCat.catKey}.sub`)}
              </p>

              <div className="mt-6 space-y-2.5">
                {(t(`home.categories.cats.${selectedCat.catKey}.details`, { returnObjects: true }) || []).map((item) => (
                  <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Categories;
