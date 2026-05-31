import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { resetPassword } from "../../../services/authService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const InputRow = ({ icon: Icon, children, focus }) => (
  <div className={`relative flex items-center bg-white dark:bg-slate-800 border rounded-2xl shadow-sm transition-all ${focus ? "border-indigo-600" : "border-slate-200 dark:border-slate-700"}`}>
    <div className="pl-5 text-slate-300 dark:text-slate-500"><Icon size={18} /></div>
    {children}
  </div>
);

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdFocus, setPwdFocus]       = useState(false);
  const [cfmFocus, setCfmFocus]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [done, setDone]               = useState(false);
  const [error, setError]             = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError(t("auth.reset.errMinLength"));
      return;
    }
    if (password !== confirm) {
      setError(t("auth.reset.errMismatch"));
      return;
    }
    if (!token) {
      setError(t("auth.reset.errNoToken"));
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
      toast.success(t("auth.reset.successToast"));
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      const msg = err.response?.data?.message || t("auth.reset.errInvalid");
      setError(msg);
    } finally {
      setLoading(false);
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
            {t("auth.reset.brandTitle")} <br /><span className="text-indigo-400">{t("auth.reset.brandTitleHighlight")}</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            {t("auth.reset.brandDesc")}
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">{t("auth.reset.hashed")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("auth.reset.hashedLabel")}</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">{t("auth.reset.secure")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("auth.reset.secureLabel")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md">

          {done ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-indigo-50 dark:bg-indigo-500/15 rounded-full">
                  <CheckCircle2 size={40} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{t("auth.reset.successTitle")}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed mb-8">
                {t("auth.reset.successDesc")}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 py-4 px-8 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                {t("auth.reset.goToLogin")} <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {!token && (
                <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-2xl text-sm font-bold text-rose-600 dark:text-rose-400">
                  {t("auth.reset.invalidLinkPre")}
                  <Link to="/forgot-password" className="underline">{t("auth.reset.requestNew")}</Link>.
                </div>
              )}

              <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{t("auth.reset.title")}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold">{t("auth.reset.subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New password */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{t("auth.reset.newPassword")}</label>
                  <InputRow icon={Lock} focus={pwdFocus}>
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={password}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-500"
                      placeholder={t("auth.reset.newPasswordPlaceholder")}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="pr-5 text-slate-300 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </InputRow>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{t("auth.reset.confirmPassword")}</label>
                  <InputRow icon={Lock} focus={cfmFocus}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirm}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-500"
                      placeholder={t("auth.reset.confirmPlaceholder")}
                      onFocus={() => setCfmFocus(true)}
                      onBlur={() => setCfmFocus(false)}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="pr-5 text-slate-300 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </InputRow>
                </div>

                {/* Inline error */}
                {error && (
                  <p className="text-sm font-bold text-rose-500 px-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>{t("auth.reset.setNewPassword")}</span><ArrowRight size={18} /></>}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline">{t("auth.reset.backToLogin")}</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
