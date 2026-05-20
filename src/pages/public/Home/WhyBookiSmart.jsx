import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WhyBookiSmart = () => {
  const { t } = useTranslation();

  const ownerBenefits = [
    { key: "dashboard", icon: "📊" },
    { key: "noShow",    icon: "🚫" },
    { key: "payment",   icon: "💳" },
  ];

  const clientBenefits = [
    { key: "accountFree", icon: "✨" },
    { key: "alerts",      icon: "📱" },
    { key: "discovery",   icon: "🔍" },
  ];

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            {t("home.why.title")} <span className="text-indigo-600">{t("home.why.pros")}</span>,<br />
            {t("home.why.titleBreak")} <span className="text-cyan-500">{t("home.why.clients")}</span>
          </h2>
          <p className="mt-5 text-base font-medium text-slate-500 sm:text-lg">
            {t("home.why.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative overflow-hidden rounded-[2.2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-indigo-900/10 md:p-10"
          >
            <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="rounded-full border border-indigo-400/30 bg-indigo-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-300">
                {t("home.why.ownersBadge")}
              </span>
              <h3 className="mb-8 mt-6 text-3xl font-black md:text-4xl">{t("home.why.ownersTitle")}</h3>

              <div className="space-y-8">
                {ownerBenefits.map((b) => (
                  <div key={b.key} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{t(`home.why.benefits.${b.key}.title`)}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{t(`home.why.benefits.${b.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/50 md:p-10"
          >
            <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="rounded-full border border-cyan-200 bg-cyan-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-600">
                {t("home.why.clientsBadge")}
              </span>
              <h3 className="mb-8 mt-6 text-3xl font-black text-slate-900 md:text-4xl">{t("home.why.clientsTitle")}</h3>

              <div className="space-y-8">
                {clientBenefits.map((b) => (
                  <div key={b.key} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-2xl shadow-sm">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{t(`home.why.benefits.${b.key}.title`)}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{t(`home.why.benefits.${b.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-bold text-slate-400">
            {t("home.why.joinCount")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyBookiSmart;
