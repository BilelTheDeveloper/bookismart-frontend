import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import API from "../../../api/config";

/* ── Animated counter ── */
function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - elapsed, 3);
            setCount(Math.floor(ease * target));
            if (elapsed < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const StatsSection = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ businesses: 0, cities: 0, reviews: 0, completed: 0 });

  useEffect(() => {
    API.get("/public/discovery/stats")
      .then(r => {
        if (r.data?.success) {
          setStats({
            businesses: r.data.data.businesses || 0,
            cities:     r.data.data.cities     || 0,
            reviews:    r.data.data.reviews    || 0,
            completed:  r.data.data.completed  || 0,
          });
        }
      })
      .catch(() => {
        setStats({ businesses: 500, cities: 24, reviews: 4800, completed: 12000 });
      });
  }, []);

  const METRICS = [
    { label: t("home.stats.businesses"), value: stats.businesses || 500,  suffix: "+",  gradient: "from-indigo-500 to-violet-500",   icon: "🏢" },
    { label: t("home.stats.bookings"),   value: stats.completed  || 12000, suffix: "+",  gradient: "from-cyan-500 to-blue-500",       icon: "📅" },
    { label: t("home.stats.cities"),     value: stats.cities     || 24,    suffix: "",   gradient: "from-emerald-500 to-teal-500",    icon: "🗺️" },
    { label: t("home.stats.rating"),     value: 4.9,                        suffix: "★",  gradient: "from-amber-500 to-orange-500",    icon: "⭐", decimal: true },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-28">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400 mb-5">
            {t("home.stats.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("home.stats.title")}{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              {t("home.stats.titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg max-w-xl mx-auto">
            {t("home.stats.desc")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-indigo-950/30 hover:-translate-y-1"
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.gradient}`} />
              {/* Soft glow on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${m.gradient} rounded-3xl`} />

              <div className="text-3xl mb-3">{m.icon}</div>
              <div className={`text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r ${m.gradient} bg-clip-text text-transparent mb-2`}>
                {m.decimal
                  ? <span>{(4.9).toFixed(1)}{m.suffix}</span>
                  : <CountUp target={m.value} suffix={m.suffix} />
                }
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
