import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

/* ── Icons for each feature card ── */
const ITEM_ICONS = [
  "📅", "📺", "⏱️", "🔔",   // Booking & Operations
  "👥", "💬", "⚡", "📧",   // Team & Communication
  "💰", "🧾", "⭐", "💼",   // Finance & Revenue
  "🤖", "📊", "🎨", "🛡️",  // Intelligence & Online Presence
];

/* ── Gradient for each card ── */
const ITEM_GRADIENTS = [
  "from-indigo-600 to-blue-500",   "from-cyan-600 to-teal-500",
  "from-blue-600 to-indigo-500",   "from-sky-500 to-cyan-400",
  "from-violet-600 to-purple-500", "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",  "from-teal-600 to-cyan-500",
  "from-amber-500 to-orange-400",  "from-orange-500 to-red-400",
  "from-yellow-500 to-amber-400",  "from-rose-600 to-pink-500",
  "from-purple-700 to-indigo-600", "from-pink-600 to-rose-500",
  "from-indigo-500 to-violet-400", "from-slate-700 to-slate-600",
];

/* ── Group config: indices of items per group ── */
const GROUPS = [
  { keyBase: "groupBooking",      indices: [0, 1, 2, 3],  accent: "indigo"  },
  { keyBase: "groupTeam",         indices: [4, 5, 6, 7],  accent: "violet"  },
  { keyBase: "groupFinance",      indices: [8, 9, 10, 11], accent: "amber"  },
  { keyBase: "groupIntelligence", indices: [12,13,14,15], accent: "emerald" },
];

const GROUP_COLORS = {
  indigo:  { pill: "bg-indigo-50  dark:bg-indigo-900/20 text-indigo-700  dark:text-indigo-400  border-indigo-100  dark:border-indigo-800",  icon: "text-indigo-500",  bar: "bg-indigo-500" },
  violet:  { pill: "bg-violet-50  dark:bg-violet-900/20 text-violet-700  dark:text-violet-400  border-violet-100  dark:border-violet-800",  icon: "text-violet-500",  bar: "bg-violet-500" },
  amber:   { pill: "bg-amber-50   dark:bg-amber-900/20  text-amber-700   dark:text-amber-400   border-amber-100   dark:border-amber-800",   icon: "text-amber-500",   bar: "bg-amber-500"  },
  emerald: { pill: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800", icon: "text-emerald-500", bar: "bg-emerald-500" },
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(null);

  const items = t("services.items", { returnObjects: true }) || [];

  const displayGroups = activeGroup !== null
    ? GROUPS.filter((_, i) => i === activeGroup)
    : GROUPS;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-slate-950 pb-24 pt-28 sm:pt-36">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"
            animate={{ x: [0, 25, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "35px 35px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-700/50 bg-indigo-900/40 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-indigo-400"
          >
            <Sparkles size={12} /> {t("services.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("services.title")}
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {t("services.titleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base font-medium text-slate-400 sm:text-lg"
          >
            {t("services.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/signup"
              className="relative inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-black text-white overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/30"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              {t("services.startFreeTrial")}
              <ArrowRight size={15} />
            </Link>
            <Link to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-black text-white transition-all hover:bg-white/20"
            >
              {t("services.seeHowItWorks")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── GROUP FILTER TABS ── */}
      <div className="sticky top-[72px] z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
          <div className="flex items-center gap-2 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setActiveGroup(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${
                activeGroup === null
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              All 16
            </button>
            {GROUPS.map((g, gi) => {
              const col = GROUP_COLORS[g.accent];
              return (
                <button
                  key={gi}
                  onClick={() => setActiveGroup(activeGroup === gi ? null : gi)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide border transition-all ${
                    activeGroup === gi ? col.pill : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {t(`services.${g.keyBase}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FEATURE GROUPS ── */}
      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10 py-16 sm:py-20 space-y-20">
        {displayGroups.map((group, gi) => {
          const col = GROUP_COLORS[group.accent];
          const realGi = GROUPS.indexOf(group);
          return (
            <div key={group.keyBase}>
              {/* Group header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-1 w-8 rounded-full ${col.bar}`} />
                  <span className={`text-xs font-black uppercase tracking-[0.2em] ${col.icon}`}>
                    0{realGi + 1}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t(`services.${group.keyBase}`)}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 text-base">
                  {t(`services.${group.keyBase}Desc`)}
                </p>
              </motion.div>

              {/* 4-card grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {group.indices.map((itemIndex, cardIndex) => {
                  const item = items[itemIndex] || {};
                  const features = Array.isArray(item.features) ? item.features : [];
                  const globalDelay = cardIndex * 0.08;

                  return (
                    <motion.article
                      key={itemIndex}
                      initial={{ opacity: 0, y: 24, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: globalDelay }}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-slate-900/50 hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      {/* Gradient accent line */}
                      <div className={`h-1 bg-gradient-to-r ${ITEM_GRADIENTS[itemIndex]} flex-shrink-0`} />

                      <div className="flex flex-col flex-1 p-6">
                        {/* Icon */}
                        <div className={`mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${ITEM_GRADIENTS[itemIndex]} flex items-center justify-center text-2xl shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                          {ITEM_ICONS[itemIndex]}
                        </div>

                        {/* Title + desc */}
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                          {item.desc}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                          {features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${ITEM_GRADIENTS[itemIndex]}`}>
                                <Check size={9} className="text-white" />
                              </div>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      {/* ── CTA ── */}
      <section className="px-4 pb-20 sm:px-6 xl:px-10 lg:pb-28">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] p-10 text-center text-white sm:p-14 lg:p-20"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #0ea5e9 100%)" }}>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {t("services.ctaTitle")}
              <span className="block italic text-cyan-200">{t("services.ctaTitleHighlight")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium text-indigo-100 sm:text-lg">
              {t("services.ctaDesc")}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-4 text-sm font-black text-indigo-600 transition-all hover:bg-slate-50 active:scale-95 shadow-lg">
                {t("services.createAccount")} <ArrowRight size={15} />
              </Link>
              <Link to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-10 py-4 text-sm font-black text-white transition-all hover:bg-white/20 active:scale-95">
                {t("services.signIn")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
