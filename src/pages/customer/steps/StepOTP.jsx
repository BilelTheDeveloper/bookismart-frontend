import React, { useState, useRef, useEffect } from "react";
import { Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import CAPI from "../../../api/customerConfig";

const StepOTP = ({ token, email, onSuccess }) => {
  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [loading, setLoading]   = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError]       = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [countdown, setCountdown] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError("");
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      refs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter all 6 digits."); return; }
    setLoading(true);
    setError("");
    try {
      await CAPI.post(`/customer/register/${token}/verify-otp`, { otp: code });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMsg("");
    setError("");
    try {
      await CAPI.post(`/customer/register/${token}/resend-otp`);
      setResendMsg("A new code has been sent to your email.");
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="p-10">
      {/* Icon + heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-5">
          <ShieldCheck size={28} className="text-indigo-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Email Verification</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
          Enter the 6-digit code sent to<br />
          <strong className="text-slate-200">{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => refs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e.target.value, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className={`w-12 h-14 text-center text-2xl font-black rounded-xl border-2 outline-none transition-all bg-slate-800 text-white caret-indigo-500
                ${digit ? "border-indigo-500 shadow-lg shadow-indigo-500/20" : "border-slate-700"}
                ${error ? "border-rose-500 bg-rose-500/5" : "focus:border-indigo-500"}
              `}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-center text-rose-400 text-sm font-medium mb-4">{error}</p>}
        {resendMsg && <p className="text-center text-emerald-400 text-sm font-medium mb-4">{resendMsg}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || otp.join("").length < 6}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
          {loading ? "Verifying…" : "Verify Code"}
        </button>

        {/* Resend */}
        <div className="text-center mt-6">
          {countdown > 0 ? (
            <p className="text-slate-500 text-sm">Resend in <span className="text-indigo-400 font-bold">{countdown}s</span></p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-slate-400 hover:text-indigo-400 text-sm font-bold transition-colors flex items-center gap-2 mx-auto"
            >
              {resending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Didn't receive a code? Resend
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StepOTP;
