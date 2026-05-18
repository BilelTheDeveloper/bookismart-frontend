import React, { useState } from "react";
import { Eye, EyeOff, Lock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import CAPI from "../../../api/customerConfig";

export const rules = [
  { id: "len",    label: "At least 8 characters",         check: p => p.length >= 8 },
  { id: "upper",  label: "One uppercase letter",          check: p => /[A-Z]/.test(p) },
  { id: "number", label: "One number",                    check: p => /\d/.test(p) },
  { id: "special",label: "One special character",         check: p => /[^A-Za-z0-9]/.test(p) },
];

const getStrength = (p) => {
  const passed = rules.filter(r => r.check(p)).length;
  if (!p) return { label: "", color: "", pct: 0 };
  if (passed <= 1) return { label: "Weak",     color: "bg-rose-500",   pct: 25 };
  if (passed === 2) return { label: "Fair",    color: "bg-amber-500",  pct: 50 };
  if (passed === 3) return { label: "Good",    color: "bg-blue-500",   pct: 75 };
  return              { label: "Strong",        color: "bg-emerald-500", pct: 100 };
};

const StepPassword = ({ token, onSuccess, api = CAPI, pathBase = "/customer/register" }) => {
  const [password, setPassword]   = useState("");
  const [confirm,  setConfirm]    = useState("");
  const [showPw,   setShowPw]     = useState(false);
  const [showCf,   setShowCf]     = useState(false);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState("");

  const strength = getStrength(password);
  const allPass  = rules.every(r => r.check(password));
  const matches  = password && confirm && password === confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allPass)   { setError("Please meet all password requirements."); return; }
    if (!matches)   { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post(`${pathBase}/${token}/set-password`, { password });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-violet-600/20 border border-violet-500/30 rounded-2xl flex items-center justify-center mb-5">
          <Lock size={28} className="text-violet-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Create Password</h2>
        <p className="text-slate-400 text-sm mt-2">Choose a strong password to secure your portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Password field */}
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3.5 pr-12 text-sm font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
            <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Strength bar */}
          {password && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">Strength</span>
                <span className={`font-black ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
              </div>
            </div>
          )}

          {/* Rules checklist */}
          {password && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {rules.map(r => {
                const ok = r.check(password);
                return (
                  <div key={r.id} className={`flex items-center gap-2 text-xs font-medium ${ok ? "text-emerald-400" : "text-slate-500"}`}>
                    {ok ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    {r.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showCf ? "text" : "password"}
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setError(""); }}
              placeholder="••••••••"
              className={`w-full bg-slate-800 border text-white placeholder-slate-600 rounded-xl px-4 py-3.5 pr-12 text-sm font-medium outline-none transition-all
                ${confirm ? (matches ? "border-emerald-500 focus:ring-emerald-500/20" : "border-rose-500 focus:ring-rose-500/20") : "border-slate-700 focus:border-violet-500 focus:ring-violet-500/20"}
              `}
            />
            <button type="button" onClick={() => setShowCf(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              {showCf ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {confirm && !matches && <p className="text-rose-400 text-xs font-medium mt-1.5">Passwords don't match</p>}
          {matches && <p className="text-emerald-400 text-xs font-medium mt-1.5 flex items-center gap-1"><CheckCircle2 size={12} /> Passwords match</p>}
        </div>

        {error && <p className="text-rose-400 text-sm font-medium text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading || !allPass || !matches}
          className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
          {loading ? "Saving…" : "Set Password"}
        </button>
      </form>
    </div>
  );
};

export default StepPassword;
