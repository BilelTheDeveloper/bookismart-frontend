import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowRight, Check, Sparkles,
  Building2, Users, UserCheck, Clock, Link2, TrendingUp,
} from "lucide-react";

/* ── Step icon for each of the 6 steps ── */
const STEP_ICONS = [Building2, UserCheck, Sparkles, Users, Link2, TrendingUp];
const STEP_GRADIENTS = [
  "from-indigo-600 to-violet-600",
  "from-violet-600 to-purple-600",
  "from-purple-600 to-pink-600",
  "from-pink-600 to-rose-600",
  "from-rose-500 to-orange-500",
  "from-emerald-600 to-teal-600",
];
const STEP_COLORS = ["indigo", "violet", "purple", "pink", "orange", "emerald"];

/* ── Accordion item ── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-snug">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180 text-indigo-500" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-50 dark:border-slate-800/50">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main component ── */
const HowItWorks = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState("owner");

  const steps   = t("howItWorks.steps", { returnObjects: true }) || [];
  const faqList = t("howItWorks.faq",   { returnObjects: true }) || [];

  const ownerPoints  = t("howItWorks.ownerPoints",  { returnObjects: true }) || [];
  const clientPoints = t("howItWorks.clientPoints", { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pb-0 pt-28 sm:pt-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950" />
          <motion.div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-300/20 dark:bg-indigo-700/15 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-300/15 dark:bg-violet-700/10 blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400 mb-6"
            >
              <Sparkles size={12} /> {t("howItWorks.badge")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              {t("howItWorks.title")}{" "}
              <span className="text-slate-400 dark:text-slate-500">{t("howItWorks.titleSub")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base font-medium text-slate-500 dark:text-slate-400 sm:text-lg"
            >
              {t("howItWorks.description")}
            </motion.p>
          </div>

          {/* ═══════════════════════════════════════════════════════
              6-STEP TIMELINE
          ═══════════════════════════════════════════════════════ */}
          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Vertical connector line (lg) */}
            <div className="absolute hidden lg:block top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-violet-200 to-emerald-200 dark:from-indigo-900 dark:via-violet-900 dark:to-emerald-900" />

            {Array.isArray(steps) && steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const grad = STEP_GRADIENTS[index];
              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                  className="group relative rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-sm hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Step number badge */}
                  <div className={`absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-sm font-black text-white shadow-lg transition-transform group-hover:scale-110`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className={`mb-5 mt-3 w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="mb-2 text-lg font-black text-slate-900 dark:text-white leading-tight">{step.title}</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{step.desc}</p>

                  {step.detail && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 leading-relaxed">{step.detail}</p>
                    </div>
                  )}

                  {/* Arrow between cards on lg */}
                  {index % 3 !== 2 && index !== steps.length - 1 && (
                    <div className="absolute -right-4 top-10 hidden lg:flex items-center justify-center z-10">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center shadow-md`}>
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OWNER vs CLIENT PERSPECTIVE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-1 p-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
              <button
                onClick={() => setActiveView("owner")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeView === "owner"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <Building2 size={15} /> {t("howItWorks.ownerView")}
              </button>
              <button
                onClick={() => setActiveView("client")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeView === "client"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <Users size={15} /> {t("howItWorks.clientView")}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeView === "owner" ? (
              <motion.div key="owner" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {t("howItWorks.ownerTitle")}{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t("howItWorks.ownerTitleHighlight")}
                    </span>
                  </h2>
                  <ul className="space-y-3">
                    {ownerPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
                  <div className="text-5xl mb-4">🏢</div>
                  <p className="text-lg font-black mb-2">{t("howItWorks.ownerTitle")}</p>
                  <p className="text-indigo-200 text-sm font-medium">{t("howItWorks.ownerTitleHighlight")}</p>
                  <div className="mt-6 pt-5 border-t border-white/20">
                    <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-black text-sm px-5 py-3 rounded-xl hover:bg-indigo-50 transition-all">
                      {t("howItWorks.getStarted")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="client" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white order-2 md:order-1">
                  <div className="text-5xl mb-4">📱</div>
                  <p className="text-lg font-black mb-2">{t("howItWorks.clientTitle")}</p>
                  <p className="text-emerald-200 text-sm font-medium">{t("howItWorks.clientTitleHighlight")}</p>
                  <div className="mt-6 pt-5 border-t border-white/20">
                    <Link to="/professionals" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black text-sm px-5 py-3 rounded-xl hover:bg-emerald-50 transition-all">
                      {t("professionals.heroTitle") || "Find a Professional"} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {t("howItWorks.clientTitle")}{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      {t("howItWorks.clientTitleHighlight")}
                    </span>
                  </h2>
                  <ul className="space-y-3">
                    {clientPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t("howItWorks.faqTitle")}
            </h2>
          </motion.div>
          <div className="space-y-3">
            {Array.isArray(faqList) && faqList.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="pb-20 px-4 sm:px-6 xl:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-[2rem] bg-slate-900 dark:bg-slate-900 p-10 sm:p-14 text-white">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black tracking-tight sm:text-3xl">{t("howItWorks.ctaTitle")}</h4>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{t("howItWorks.ctaSub")}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link to="/signup"
                  className="relative inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-black text-white overflow-hidden shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  {t("howItWorks.getStarted")} <ArrowRight size={15} />
                </Link>
                <Link to="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-black text-white transition-all hover:bg-white/20 active:scale-95">
                  {t("howItWorks.viewServices")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
