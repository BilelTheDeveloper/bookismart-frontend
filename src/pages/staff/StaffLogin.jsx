import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader2, AlertCircle, Users } from "lucide-react";
import SAPI from "../../api/staffConfig";
import { useStaffAuth } from "../../context/StaffAuthContext";

const StaffLogin = () => {
  const navigate            = useNavigate();
  const [params]            = useSearchParams();
  const { loginStaff, isAuthenticated } = useStaffAuth();

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/staff/portal", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const reason = params.get("reason");
    if (reason === "session_expired") setError("Your session expired. Please log in again.");
    if (reason === "security_violation") setError("A security issue was detected. Please log in again.");
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Email and password are required."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await SAPI.post("/staff/login", { email, password });
      if (res.data.csrfToken) sessionStorage.setItem("csrf_token", res.data.csrfToken);
      loginStaff(res.data.staff);
      navigate("/staff/portal", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message;
      const code = err.response?.data?.code;
      if (code === "REGISTRATION_INCOMPLETE") {
        setError("Please complete your registration first.");
      } else if (code === "UNDER_REVIEW") {
        setError("Your profile is under review. You'll receive an email once approved.");
      } else if (code === "ACCOUNT_INACTIVE") {
        setError("Your account has been deactivated. Contact your manager.");
      } else {
        setError(msg || "Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-violet-600/20 border border-violet-500/30 rounded-2xl flex items-center justify-center">
              <Users size={22} className="text-violet-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-black text-lg tracking-tight">BOOKIIFY</p>
              <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">Staff Portal</p>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your team account</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
          {error && (
            <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-6">
              <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <p className="text-rose-300 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Work Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-10 pr-12 py-3.5 text-sm font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Don't have an account yet?{" "}
          <span className="text-slate-400">Check your email for an invitation link from your manager.</span>
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
