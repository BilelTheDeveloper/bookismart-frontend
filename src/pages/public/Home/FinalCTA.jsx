import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  const { t } = useTranslation();

  const FEATURES = [
    { icon: "🚀", text: "90-day free trial" },
    { icon: "🔒", text: "Enterprise-grade security" },
    { icon: "📱", text: "Mobile-first design" },
    { icon: "🤖", text: "AI-powered assistant" },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 dark:bg-[#0a0e1a] px-8 py-16 sm:px-14 sm:py-20 text-center"
          style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
        >
          {/* Animated blobs */}
          <motion.div
            className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
            animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"
            animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-indigo-900/20 blur-3xl rounded-full pointer-events-none"
          />

          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-xs font-black uppercase tracking-[0.2em] text-indigo-300 mb-6">
              <Sparkles size={12} />
              {t("home.finalCta.badge")}
            </span>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
              {t("home.finalCta.title")}
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {t("home.finalCta.titleHighlight")}
              </span>
            </h2>

            {/* Description */}
            <p className="text-slate-400 font-medium text-base sm:text-lg max-w-xl mx-auto mb-10">
              {t("home.finalCta.desc")}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                to="/signup"
                className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base text-white shadow-2xl shadow-indigo-500/30 overflow-hidden transition-all hover:scale-[1.03] active:scale-95"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #0ea5e9)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {t("home.finalCta.primary")}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                {t("home.finalCta.secondary")}
              </Link>
            </div>

            {/* Trust features */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-400">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Fine print */}
            <p className="text-xs text-slate-600 font-medium">
              {t("home.finalCta.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
