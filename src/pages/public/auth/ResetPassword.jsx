import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { resetPassword } from "../../../services/authService";
import { toast } from "react-hot-toast";

const InputRow = ({ icon: Icon, children, focus }) => (
  <div className={`relative flex items-center bg-white border rounded-2xl shadow-sm transition-all ${focus ? "border-indigo-600" : "border-slate-200"}`}>
    <div className="pl-5 text-slate-300"><Icon size={18} /></div>
    {children}
  </div>
);

const ResetPassword = () => {
  const navigate = useNavigate();
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
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
      toast.success("Password reset! You can now log in.");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      const msg = err.response?.data?.message || "Reset link is invalid or expired.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">

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
            New <br /><span className="text-indigo-400">Password.</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            Choose a strong password. All existing sessions will be logged out.
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">bcrypt</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Hashed</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">Secure</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md">

          {done ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-indigo-50 rounded-full">
                  <CheckCircle2 size={40} className="text-indigo-600" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">Password Updated!</h2>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
                Your password has been reset. All previous sessions have been logged out. Redirecting to login…
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 py-4 px-8 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Go to Login <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {!token && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm font-bold text-rose-600">
                  This reset link is invalid or has already been used. Please{" "}
                  <Link to="/forgot-password" className="underline">request a new one</Link>.
                </div>
              )}

              <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Reset Password</h2>
                <p className="text-slate-500 font-bold">Choose a new password for your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New password */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <InputRow icon={Lock} focus={pwdFocus}>
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={password}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                      placeholder="At least 8 characters"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="pr-5 text-slate-300 hover:text-indigo-600 transition-colors"
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </InputRow>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <InputRow icon={Lock} focus={cfmFocus}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirm}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                      placeholder="Repeat your password"
                      onFocus={() => setCfmFocus(true)}
                      onBlur={() => setCfmFocus(false)}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="pr-5 text-slate-300 hover:text-indigo-600 transition-colors"
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
                  className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>SET NEW PASSWORD</span><ArrowRight size={18} /></>}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500 font-bold text-sm">
                <Link to="/login" className="text-indigo-600 font-black hover:underline">Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
