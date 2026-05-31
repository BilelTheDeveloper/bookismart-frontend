import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { passwordBlacklist } from "../../../utils/passwordBlacklist";

const Step3Password = ({ formData, setFormData, onPrev, onSubmit, submitting, submitError }) => {
  const { t } = useTranslation();
  const [strength, setStrength] = useState({ score: 0, key: "strengthEmpty", color: "bg-slate-200" });
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validatePassword = (pass) => {
    if (!pass) return { score: 0, key: "strengthEmpty", color: "bg-slate-200" };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (passwordBlacklist.includes(pass.toLowerCase())) {
      setError(t("signup.step3.blacklisted"));
      return { score: 0, key: "strengthUnauthorized", color: "bg-rose-600" };
    } else {
      setError("");
    }

    switch (score) {
      case 1: return { score: 25,  key: "strengthWeak",   color: "bg-rose-500"    };
      case 2: return { score: 50,  key: "strengthFair",   color: "bg-amber-500"   };
      case 3: return { score: 75,  key: "strengthGood",   color: "bg-blue-500"    };
      case 4: return { score: 100, key: "strengthStrong", color: "bg-emerald-500" };
      default: return { score: 0,  key: "strengthEmpty",  color: "bg-slate-200" };
    }
  };

  useEffect(() => {
    setStrength(validatePassword(formData.password));
  }, [formData.password]);

  const canSubmit = strength.score === 100 && !error && !submitting && termsAccepted;

  const reqItem = (ok, label) => (
    <li className={ok ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}>
      {ok ? "✓" : "○"} {label}
    </li>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t("signup.step3.title")}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{t("signup.step3.subtitle")}</p>
      </header>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="password"
            placeholder={t("signup.step3.placeholder")}
            className={`w-full p-5 bg-white dark:bg-slate-800 border-2 rounded-[2rem] outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
              error ? "border-rose-500" : "border-slate-100 dark:border-slate-700 focus:border-indigo-500"
            }`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {strength.score > 0 && (
            <div className="absolute end-6 top-5">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full text-white ${strength.color}`}>
                {t(`signup.step3.${strength.key}`)}
              </span>
            </div>
          )}
        </div>

        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${strength.color}`}
            style={{ width: `${strength.score}%` }}
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold uppercase tracking-tighter">
          {reqItem(formData.password.length >= 8, t("signup.step3.min8"))}
          {reqItem(/[0-9]/.test(formData.password), t("signup.step3.numbers"))}
          {reqItem(/[A-Z]/.test(formData.password), t("signup.step3.uppercase"))}
          {reqItem(/[^A-Za-z0-9]/.test(formData.password), t("signup.step3.special"))}
        </ul>

        {error && (
          <p className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-2xl border border-rose-100 dark:border-rose-500/30">
            ⚠ {error}
          </p>
        )}

        {submitError && (
          <p className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-2xl border border-rose-100 dark:border-rose-500/30">
            ⚠ {submitError}
          </p>
        )}
      </div>

      {/* Terms & Privacy acceptance */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 space-y-3">
        <label className="flex items-start gap-3.5 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className="peer w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer appearance-none checked:bg-indigo-600 checked:border-indigo-600"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-[10px] font-black">✓</span>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {t("signup.step3.agreePre")}{" "}
            <Link to="/terms" target="_blank" rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 font-black underline underline-offset-2 hover:text-indigo-500 transition-colors">
              {t("signup.step3.terms")}
            </Link>{" "}
            {t("signup.step3.and")}{" "}
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 font-black underline underline-offset-2 hover:text-indigo-500 transition-colors">
              {t("signup.step3.privacy")}
            </Link>
            {t("signup.step3.agreePost")}
          </span>
        </label>
        {!termsAccepted && strength.score === 100 && (
          <p className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/30 px-3 py-2 rounded-xl">
            <ShieldCheck size={13} />
            {t("signup.step3.acceptPrompt")}
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrev}
          disabled={submitting}
          className="flex-1 py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
        >
          {t("signup.step3.back")}
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex-[2] py-4 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 ${
            canSubmit
              ? "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-slate-900 dark:hover:bg-indigo-500"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          {submitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /><span>{t("signup.step3.creating")}</span></>
          ) : (
            t("signup.step3.create")
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3Password;
