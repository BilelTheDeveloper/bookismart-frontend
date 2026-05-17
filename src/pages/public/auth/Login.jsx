import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff,
  Loader2, KeyRound, ArrowLeft,
} from "lucide-react";
import { login, twoFaVerify } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

/* ─── tiny reusable input wrapper ─── */
const InputRow = ({ icon: Icon, children, focus }) => (
  <div className={`relative flex items-center bg-white border rounded-2xl shadow-sm transition-all ${focus ? "border-indigo-600" : "border-slate-200"}`}>
    <div className="pl-5 text-slate-300"><Icon size={18} /></div>
    {children}
  </div>
);

const Login = () => {
  const navigate   = useNavigate();
  const { loginUser } = useAuth();

  /* ── credential form ── */
  const [formData, setFormData]     = useState({ email: "", password: "" });
  const [showPassword, setShowPwd]  = useState(false);
  const [loading, setLoading]       = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus]     = useState(false);

  /* ── 2FA step ── */
  const [twoFaRequired, setTwoFaRequired] = useState(false);
  const [twoFaToken, setTwoFaToken]       = useState("");
  const [totpDigits, setTotpDigits]       = useState(["", "", "", "", "", ""]);
  const [twoFaLoading, setTwoFaLoading]   = useState(false);
  const [twoFaError, setTwoFaError]       = useState("");
  const digitRefs = useRef([]);

  /* focus first digit box when 2FA screen appears */
  useEffect(() => {
    if (twoFaRequired) {
      setTimeout(() => digitRefs.current[0]?.focus(), 100);
    }
  }, [twoFaRequired]);

  /* ── Login submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({
        email:    formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (data.requires2FA) {
        setTwoFaToken(data.twoFaToken);
        setTwoFaRequired(true);
        return;
      }

      loginUser(data.user);
      toast.success(`Welcome back, ${data.user.fullName.split(" ")[0]}`);

      setTimeout(() => {
        const { role, accountStatus } = data.user;
        if (accountStatus === "on_boarding") {
          navigate("/onboarding-status");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/owner/dashboard");
        }
      }, 600);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  /* ── TOTP digit input ── */
  const handleDigit = (idx, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next  = [...totpDigits];
    next[idx]   = digit;
    setTotpDigits(next);
    setTwoFaError("");
    if (digit && idx < 5) digitRefs.current[idx + 1]?.focus();
  };

  const handleDigitKey = (idx, e) => {
    if (e.key === "Backspace" && !totpDigits[idx] && idx > 0) {
      digitRefs.current[idx - 1]?.focus();
    }
    if (e.key === "Enter") handleTwoFaSubmit();
  };

  const handleDigitPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setTotpDigits(pasted.split(""));
      digitRefs.current[5]?.focus();
    }
  };

  /* ── 2FA verify ── */
  const handleTwoFaSubmit = async () => {
    const totpCode = totpDigits.join("");
    if (totpCode.length !== 6) {
      setTwoFaError("Enter the full 6-digit code from your authenticator app.");
      return;
    }
    setTwoFaLoading(true);
    setTwoFaError("");
    try {
      const data = await twoFaVerify(twoFaToken, totpCode);
      loginUser(data.user);
      toast.success(`Welcome back, ${data.user.fullName.split(" ")[0]}`);
      setTimeout(() => {
        const { role, accountStatus } = data.user;
        if (accountStatus === "on_boarding") {
          navigate("/onboarding-status");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/owner/dashboard");
        }
      }, 600);
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid code. Try again.";
      setTwoFaError(msg);
      setTotpDigits(["", "", "", "", "", ""]);
      setTimeout(() => digitRefs.current[0]?.focus(), 50);
    } finally {
      setTwoFaLoading(false);
    }
  };

  /* ─── RENDER ─── */
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
            Welcome <br /><span className="text-indigo-400">Back.</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            Log in to manage your bookings and grow your business today.
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">1.2k+</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Users</p>
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

        {/* ── 2FA STEP ── */}
        {twoFaRequired ? (
          <div className="w-full max-w-md">
            <button
              onClick={() => { setTwoFaRequired(false); setTotpDigits(["","","","","",""]); setTwoFaError(""); }}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-bold mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to login
            </button>

            {/* Icon + title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <KeyRound size={28} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">Two-Factor Auth</h2>
                <p className="text-slate-500 font-bold text-sm mt-0.5">Enter the 6-digit code from your authenticator app.</p>
              </div>
            </div>

            {/* 6 digit boxes */}
            <div className="flex gap-3 justify-center mb-6" onPaste={handleDigitPaste}>
              {totpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (digitRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleDigitKey(i, e)}
                  className={`w-12 h-14 text-center text-2xl font-black rounded-2xl border-2 bg-white outline-none transition-all
                    ${twoFaError ? "border-rose-400 text-rose-600" : d ? "border-indigo-500 text-indigo-700" : "border-slate-200 text-slate-900"}
                    focus:border-indigo-600 focus:shadow-sm`}
                />
              ))}
            </div>

            {/* Error */}
            {twoFaError && (
              <p className="text-center text-sm font-bold text-rose-500 mb-4">{twoFaError}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleTwoFaSubmit}
              disabled={twoFaLoading || totpDigits.join("").length !== 6}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {twoFaLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>VERIFY</span><ArrowRight size={18} /></>}
            </button>

            <p className="mt-6 text-center text-xs text-slate-400 font-medium leading-relaxed">
              Open <strong>Google Authenticator</strong>, <strong>Authy</strong>, or any TOTP app<br />and enter the current 6-digit code for Bookiify.
            </p>
          </div>

        ) : (
          /* ── LOGIN FORM ── */
          <div className="w-full max-w-md">
            <div className="mb-10 text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-2">Sign In</h2>
              <p className="text-slate-500 font-bold">Enter your details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <InputRow icon={Mail} focus={emailFocus}>
                  <input
                    type="email"
                    required
                    className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                    placeholder="name@email.com"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </InputRow>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between px-1">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</Link>
                </div>
                <InputRow icon={Lock} focus={pwdFocus}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                    placeholder="Your password"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPassword)}
                    className="pr-5 text-slate-300 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </InputRow>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>LOG IN</span><ArrowRight size={18} /></>}
              </button>
            </form>

            <p className="mt-8 text-center text-slate-500 font-bold text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-black hover:underline">Sign Up Now</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
