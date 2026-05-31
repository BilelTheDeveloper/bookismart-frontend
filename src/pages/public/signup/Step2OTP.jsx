import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { sendOTP, verifyOTP } from "../../../services/authService";

const Step2OTP = ({ formData, onNext, onPrev }) => {
  const { t } = useTranslation();
  const [verifying, setVerifying] = useState({ email: false, phone: false });
  const [status, setStatus] = useState({ email: "idle", phone: "idle" }); // idle, sent, verified
  const [codes, setCodes] = useState({ email: "", phone: "" });
  const [error, setError] = useState(null);

  // 1. Automatic Send Logic on Mount
  const triggerInitialSends = useCallback(async () => {
    try {
      await Promise.all([
        sendOTP("email", formData.email),
        sendOTP("phone", formData.phone)
      ]);
      setStatus({ email: "sent", phone: "sent" });
    } catch (err) {
      setError(t("signup.step2.sendError"));
    }
  }, [formData.email, formData.phone, t]);

  useEffect(() => {
    triggerInitialSends();
  }, [triggerInitialSends]);

  // 2. Handle Verification Logic
  const handleVerify = async (type) => {
    if (codes[type].length !== 8) return;

    try {
      setVerifying((prev) => ({ ...prev, [type]: true }));
      setError(null);

      await verifyOTP(type, type === "email" ? formData.email : formData.phone, codes[type]);

      setStatus((prev) => ({ ...prev, [type]: "verified" }));
    } catch (err) {
      setError(t("signup.step2.codeError", { type }));
    } finally {
      setVerifying((prev) => ({ ...prev, [type]: false }));
    }
  };

  const canContinue = status.email === "verified" && status.phone === "verified";

  const renderBox = (type, label) => (
    <div className={`group p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
      status[type] === 'verified'
        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10'
        : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{type === "phone" ? formData.phone : formData.email}</p>
        </div>
        {status[type] === 'verified' && (
          <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40">✓</div>
        )}
      </div>

      {status[type] !== 'verified' && (
        <div className="relative">
          <input
            type="text"
            maxLength={8}
            placeholder="••••••••"
            value={codes[type]}
            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-center text-xl font-black tracking-[0.5em] text-slate-900 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
            onChange={(e) => setCodes({ ...codes, [type]: e.target.value.toUpperCase() })}
          />
          {codes[type].length === 8 && (
            <button
              onClick={() => handleVerify(type)}
              disabled={verifying[type]}
              className="absolute end-2 top-2 bottom-2 px-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {verifying[type] ? "..." : t("signup.step2.check")}
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1 w-8 bg-indigo-600 rounded-full" />
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{t("signup.step2.stepLabel")}</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t("signup.step2.title")}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t("signup.step2.subtitle")}</p>
      </header>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-2xl animate-shake">
          ⚠️ {error}
        </div>
      )}

      {renderBox("phone", t("signup.step2.mobile"))}
      {renderBox("email", t("signup.step2.emailAddr"))}

      {/* --- NAVIGATION --- */}
      <div className="flex gap-4 pt-4">
        <button onClick={onPrev} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
          {t("signup.step2.back")}
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`flex-[2] py-5 rounded-2xl font-black transition-all shadow-xl ${
            canContinue
              ? "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-slate-900 dark:hover:bg-indigo-500 active:scale-95"
              : "bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          {canContinue ? t("signup.step2.continue") : t("signup.step2.awaiting")}
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 font-medium">
        {t("signup.step2.resendPrompt")} <button onClick={triggerInitialSends} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">{t("signup.step2.resendAll")}</button>
      </p>
    </div>
  );
};

export default Step2OTP;
