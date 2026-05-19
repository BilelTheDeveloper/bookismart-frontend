import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const STEP_ICONS = ["🏗️", "👥", "🚀"];
const STEP_COLORS = ["bg-indigo-600", "bg-cyan-500", "bg-emerald-500"];

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = t("howItWorks.steps", { returnObjects: true });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-50 to-white" />
        <motion.div
          className="absolute left-0 top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl"
          animate={{ x: [0, 28, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-44 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl"
          animate={{ x: [0, -26, 0], y: [0, -22, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-18">
          <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
            {t("howItWorks.badge")}
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {t("howItWorks.title")}
            <span className="block text-slate-400">{t("howItWorks.titleSub")}</span>
          </h2>
          <p className="mt-6 text-base font-medium text-slate-500 sm:text-lg">
            {t("howItWorks.description")}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="absolute left-0 top-1/2 -z-10 hidden h-0.5 w-full border-t-2 border-dashed border-slate-200 lg:block" />

          {Array.isArray(steps) && steps.map((step, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-[2rem] border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-9"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -top-5 left-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-base font-black text-white shadow-lg transition-colors group-hover:bg-indigo-600">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className={`mb-7 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white shadow-xl sm:h-20 sm:w-20 sm:text-4xl ${STEP_COLORS[index]}`}>
                {STEP_ICONS[index]}
              </div>

              <h3 className="mb-3 text-xl font-black text-slate-900 sm:text-2xl">{step.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                {step.desc}
              </p>

              {index !== steps.length - 1 && (
                <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-2xl text-slate-300 lg:block">
                  ➔
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-slate-900 p-8 text-white sm:p-10 md:mt-20 md:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black tracking-tight sm:text-3xl">{t("howItWorks.ctaTitle")}</h4>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-sm">
                {t("howItWorks.ctaSub")}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/signup"
                className="rounded-2xl bg-indigo-600 px-8 py-3.5 text-center text-sm font-black text-white transition-all hover:bg-indigo-500 active:scale-95"
              >
                {t("howItWorks.getStarted")}
              </Link>
              <Link
                to="/services"
                className="rounded-2xl border border-white/25 bg-white/10 px-8 py-3.5 text-center text-sm font-black text-white transition-all hover:bg-white/20 active:scale-95"
              >
                {t("howItWorks.viewServices")}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
