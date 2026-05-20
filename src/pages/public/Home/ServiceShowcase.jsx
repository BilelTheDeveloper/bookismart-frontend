import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ServiceShowcase = () => {
  const { t } = useTranslation();

  const featureKeys = ["web", "booking", "waiting"];
  const featureIcons = { web: "🌐", booking: "⚡", waiting: "🔔" };

  return (
    <section className="overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 sm:gap-14 lg:flex-row lg:gap-20">
          <div className="relative order-2 w-full lg:order-1 lg:flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-xl rounded-[2rem] border-[8px] border-slate-900 bg-slate-900 p-2 shadow-[0_35px_80px_-20px_rgba(15,23,42,0.35)]"
              style={{ transform: "perspective(1300px) rotateY(-7deg) rotateX(3deg)" }}
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-white">
                <div className="flex h-10 items-center gap-2 border-b border-slate-100 px-5">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-4 bg-slate-50 p-5 sm:p-7">
                  <div className="h-4 w-28 rounded-full bg-slate-200" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-2xl border border-indigo-100 bg-indigo-50" />
                    <div className="h-20 rounded-2xl border border-indigo-100 bg-indigo-50" />
                    <div className="h-20 rounded-2xl border border-indigo-100 bg-indigo-50" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 rounded-xl border border-slate-100 bg-white" />
                    <div className="h-12 rounded-xl border border-slate-100 bg-white/70" />
                    <div className="h-12 rounded-xl border border-slate-100 bg-white/50" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="absolute -bottom-7 right-0 rounded-3xl border-4 border-white bg-cyan-300 px-5 py-4 text-slate-900 shadow-2xl"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em]">{t("home.showcase.liveStatus")}</p>
              <p className="mt-1 text-sm font-black">{t("home.showcase.waitingActive")}</p>
            </motion.div>
          </div>

          <div className="order-1 w-full space-y-8 text-center lg:order-2 lg:flex-1 lg:text-left">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600">
                {t("home.showcase.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
                {t("home.showcase.title")}
                <span className="block text-slate-400">{t("home.showcase.titleSub")}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base font-medium text-slate-500 md:text-xl lg:mx-0">
                {t("home.showcase.description")}
              </p>
            </div>

            <div className="space-y-5 text-left sm:space-y-7">
              {featureKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:gap-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl transition-all group-hover:bg-indigo-600 group-hover:text-white md:h-14 md:w-14">
                    {featureIcons[key]}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 md:text-xl">{t(`home.showcase.features.${key}.title`)}</h3>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                      {t(`home.showcase.features.${key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <button className="w-full rounded-2xl bg-indigo-600 px-10 py-4 text-sm font-black text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700 active:scale-95 sm:w-auto md:text-base">
                {t("home.showcase.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
