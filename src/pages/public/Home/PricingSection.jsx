import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, Sparkles, User, Layers } from "lucide-react";
import {
  PLAN_KEYS_BY_AUDIENCE,
  POPULAR_BY_AUDIENCE,
  PLAN_META,
  TRIAL_DAYS,
} from "../../../config/plans";

const POPULAR_ACCENT = {
  border: "border-indigo-400 dark:border-indigo-500 ring-2 ring-indigo-400/30 dark:ring-indigo-500/20",
  button: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white shadow-lg shadow-indigo-300/40 dark:shadow-indigo-900/40",
};
const PLAIN_ACCENT = {
  border: "border-slate-200 dark:border-slate-700",
  button: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100",
};

const PricingSection = () => {
  const { t } = useTranslation();
  const mostPopular = t("home.pricing.mostPopular");
  const [audience, setAudience] = useState("individual");

  const planKeys = PLAN_KEYS_BY_AUDIENCE[audience];
  const popularKey = POPULAR_BY_AUDIENCE[audience];
  // 2 plans → center them; 3 plans → full row.
  const gridCols = planKeys.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3";

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 md:py-28">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-900/20 to-violet-900/20 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-800 bg-indigo-900/40 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-5">
            <Sparkles size={12} />
            {t("home.pricing.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            {t("home.pricing.title")}{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {t("home.pricing.titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-slate-400 font-medium text-base sm:text-lg max-w-lg mx-auto">
            {t("home.pricing.desc")}
          </p>

          {/* Individual / Organization toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-900/70 p-1">
            {[
              { id: "individual", label: t("home.pricing.toggleIndividual"), icon: User },
              { id: "organization", label: t("home.pricing.toggleOrganization"), icon: Layers },
            ].map((opt) => {
              const OptIcon = opt.icon;
              const active = audience === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setAudience(opt.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-black transition-all ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <OptIcon size={15} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards */}
        <div className={`grid grid-cols-1 ${gridCols} gap-6 lg:gap-8 items-stretch`}>
          {planKeys.map((key, i) => {
            const plan = t(`home.pricing.${key}`, { returnObjects: true });
            const meta = PLAN_META[key] || {};
            const Icon = meta.icon;
            const isPopular = key === popularKey;
            const accent = isPopular ? POPULAR_ACCENT : PLAIN_ACCENT;
            const features = Array.isArray(plan.features) ? plan.features : [];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border p-7 sm:p-8 ${accent.border} ${
                  isPopular ? "bg-slate-900" : "bg-slate-900/60"
                } transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-indigo-500/30">
                      <Sparkles size={10} /> {mostPopular}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
                      isPopular ? "bg-indigo-600" : "bg-slate-800"
                    }`}>
                      {Icon && <Icon size={18} className={isPopular ? "text-white" : "text-slate-400"} />}
                    </div>
                    <h3 className="text-lg font-black text-white">{plan.name}</h3>
                    <p className="text-slate-400 text-sm font-medium mt-1">{plan.desc}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black tracking-tight ${
                      isPopular
                        ? "bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                        : "text-white"
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-slate-500 font-bold text-sm mb-2">{plan.duration}</span>
                  </div>
                </div>

                {/* Free-trial line */}
                <p className="mb-6 inline-flex items-center gap-1.5 text-xs font-black text-emerald-400">
                  <Sparkles size={11} /> {t("home.pricing.trialLine", { days: TRIAL_DAYS })}
                </p>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        isPopular ? "bg-indigo-600/20" : "bg-slate-800"
                      }`}>
                        <Check size={11} className={isPopular ? "text-indigo-400" : "text-slate-500"} />
                      </div>
                      <span className="text-sm font-medium text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/signup"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95 ${accent.button}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-600 text-sm font-medium mt-10"
        >
          🔒 {t("home.pricing.footnote")}
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
