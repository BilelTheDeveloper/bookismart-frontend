import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../../../services/authService";
import { useTranslation } from "react-i18next";

const InputRow = ({ icon: Icon, children, focus }) => (
  <div className={`relative flex items-center bg-white dark:bg-slate-800 border rounded-2xl shadow-sm transition-all ${focus ? "border-indigo-600" : "border-slate-200 dark:border-slate-700"}`}>
    <div className="pl-5 text-slate-300 dark:text-slate-500"><Icon size={18} /></div>
    {children}
  </div>
);

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail]       = useState("");
  const [focus, setFocus]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email.trim().toLowerCase());
    } catch {
      // Always show success to prevent email enumeration
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 font-sans">

      {/* LEFT BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-slate-900/80 z-10" />
        <div className="relative z-20 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">BOOKIIFY</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-6">
            {t("auth.forgot.brandTitle")} <br /><span className="text-indigo-400">{t("auth.forgot.brandTitleHighlight")}</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            {t("auth.forgot.brandDesc")}
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">{t("auth.forgot.secureFlow")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("auth.forgot.secureFlowLabel")}</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">{t("auth.forgot.expiry")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("auth.forgot.expiryLabel")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md">

          <Link
            to="/login"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> {t("auth.forgot.backToLogin")}
          </Link>

          {submitted ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-indigo-50 dark:bg-indigo-500/15 rounded-full">
                  <CheckCircle2 size={40} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{t("auth.forgot.checkInbox")}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed mb-8">
                {t("auth.forgot.inboxDesc", { email })}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 py-4 px-8 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                {t("auth.forgot.backToLoginBtn")} <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            /* ── Email form ── */
            <>
              <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{t("auth.forgot.title")}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold">{t("auth.forgot.subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{t("auth.emailLabel")}</label>
                  <InputRow icon={Mail} focus={focus}>
                    <input
                      type="email"
                      required
                      value={email}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-500"
                      placeholder={t("auth.emailPlaceholder")}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputRow>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>{t("auth.forgot.sendLink")}</span><ArrowRight size={18} /></>}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                {t("auth.forgot.remembered")}{" "}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline">{t("auth.signInShort", "Sign In")}</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
