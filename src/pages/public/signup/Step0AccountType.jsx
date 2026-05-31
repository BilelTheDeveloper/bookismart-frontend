import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Building2, Check, ArrowRight } from "lucide-react";

/**
 * Step 0 — choose account type before the rest of signup.
 *  - individual  → solo professional, single location
 *  - organization → clinic / salon / chain with team + branches
 */
const Step0AccountType = ({ formData, setFormData, onNext }) => {
  const { t } = useTranslation();
  const selected = formData.accountType || "";

  const choose = (type) => setFormData({ ...formData, accountType: type });

  const OPTIONS = [
    {
      id: "individual",
      icon: User,
      name: t("signup.accountType.individualName"),
      desc: t("signup.accountType.individualDesc"),
      points: [
        t("signup.accountType.individualPoint1"),
        t("signup.accountType.individualPoint2"),
        t("signup.accountType.individualPoint3"),
      ],
    },
    {
      id: "organization",
      icon: Building2,
      name: t("signup.accountType.organizationName"),
      desc: t("signup.accountType.organizationDesc"),
      badge: t("signup.accountType.recommended"),
      points: [
        t("signup.accountType.organizationPoint1"),
        t("signup.accountType.organizationPoint2"),
        t("signup.accountType.organizationPoint3"),
      ],
    },
  ];

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t("signup.accountType.title")}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{t("signup.accountType.subtitle")}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => choose(opt.id)}
              whileTap={{ scale: 0.98 }}
              className={`relative text-start rounded-3xl border-2 p-5 transition-all ${
                active
                  ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-500/10 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {opt.badge && (
                <span className="absolute -top-2.5 end-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow">
                  {opt.badge}
                </span>
              )}

              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  active ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                }`}>
                  <Icon size={22} />
                </div>
                <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                  active ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 dark:border-slate-600 text-transparent"
                }`}>
                  <Check size={13} strokeWidth={3} />
                </div>
              </div>

              <h3 className="mt-4 text-base font-black text-slate-900 dark:text-white">{opt.name}</h3>
              <p className="mt-1 text-[13px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">{opt.desc}</p>

              <ul className="mt-4 space-y-1.5">
                {opt.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Check size={13} className="flex-shrink-0 text-indigo-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className={`w-full py-5 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 ${
          selected
            ? "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-indigo-200 dark:shadow-indigo-900/40 active:scale-95"
            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
        }`}
      >
        {selected ? t("signup.accountType.continue") : t("signup.accountType.selectPrompt")}
        {selected && <ArrowRight size={18} />}
      </button>
    </div>
  );
};

export default Step0AccountType;
