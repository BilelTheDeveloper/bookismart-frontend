import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../../../services/authService";

const InputRow = ({ icon: Icon, children, focus }) => (
  <div className={`relative flex items-center bg-white border rounded-2xl shadow-sm transition-all ${focus ? "border-indigo-600" : "border-slate-200"}`}>
    <div className="pl-5 text-slate-300"><Icon size={18} /></div>
    {children}
  </div>
);

const ForgotPassword = () => {
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
            Reset Your <br /><span className="text-indigo-400">Password.</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            We'll send a secure link to your email. It expires in 15 minutes.
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">Secure</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Reset Flow</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">15 min</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Link Expiry</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md">

          <Link
            to="/login"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to login
          </Link>

          {submitted ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-5 bg-indigo-50 rounded-full">
                  <CheckCircle2 size={40} className="text-indigo-600" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">Check your inbox</h2>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">
                If <span className="text-slate-700">{email}</span> is registered, you'll receive a password reset link shortly. Check your spam folder if it doesn't arrive.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 py-4 px-8 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Back to Login <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            /* ── Email form ── */
            <>
              <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Forgot Password?</h2>
                <p className="text-slate-500 font-bold">Enter your email and we'll send a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <InputRow icon={Mail} focus={focus}>
                    <input
                      type="email"
                      required
                      value={email}
                      className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                      placeholder="name@email.com"
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputRow>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>SEND RESET LINK</span><ArrowRight size={18} /></>}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500 font-bold text-sm">
                Remembered it?{" "}
                <Link to="/login" className="text-indigo-600 font-black hover:underline">Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
