import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ITEM_ICONS = ["📅", "📊", "🔔", "💳", "👤", "📈"];
const ITEM_COLORS = [
  "from-indigo-600 to-blue-500",
  "from-cyan-500 to-blue-400",
  "from-purple-600 to-indigo-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-400",
  "from-rose-500 to-pink-400",
];

const ServicesPage = () => {
  const { t } = useTranslation();

  const items = t("services.items", { returnObjects: true });

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-28 text-white sm:pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, 24, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            {t("services.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t("services.title")}
            <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              {t("services.titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium text-slate-300 sm:text-lg md:text-xl">
            {t("services.description")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="w-full rounded-2xl bg-indigo-600 px-8 py-3.5 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-500 sm:w-auto"
            >
              {t("services.startFreeTrial")}
            </Link>
            <Link
              to="/how-it-works"
              className="w-full rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-black text-white transition-all hover:bg-white/20 sm:w-auto"
            >
              {t("services.seeHowItWorks")}
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
            >
              <div className="absolute inset-x-8 top-0 h-16 rounded-b-3xl bg-gradient-to-b from-slate-50 to-transparent" />
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl text-white shadow-lg ${ITEM_COLORS[i]}`}>
                {ITEM_ICONS[i]}
              </div>
              <h3 className="mb-3 text-xl font-black text-slate-900 sm:text-2xl">{item.title}</h3>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                {item.desc}
              </p>

              <ul className="space-y-2.5 border-t border-slate-100 pt-6">
                {Array.isArray(item.features) && item.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] border border-transparent transition-colors group-hover:border-indigo-100" />
            </motion.article>
          ))}
        </div>
      </main>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-center text-white shadow-2xl shadow-indigo-200 sm:p-12 lg:p-16">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

          <h2 className="relative z-10 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {t("services.ctaTitle")}
            <span className="block italic text-cyan-200">{t("services.ctaTitleHighlight")}</span>
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-xl text-base font-medium text-indigo-100 sm:text-lg">
            {t("services.ctaDesc")}
          </p>

          <div className="relative z-10 mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/signup" className="rounded-2xl bg-white px-10 py-3.5 text-sm font-black text-indigo-600 transition-all hover:bg-slate-50 active:scale-95">
              {t("services.createAccount")}
            </Link>
            <Link to="/login" className="rounded-2xl border border-white/30 bg-white/10 px-10 py-3.5 text-sm font-black text-white transition-all hover:bg-white/20 active:scale-95">
              {t("services.signIn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
