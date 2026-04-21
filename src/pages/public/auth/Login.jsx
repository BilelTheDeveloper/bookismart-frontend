import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { login } from "../../../services/authService";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sanitizedData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password
    };

    try {
      // 🛡️ AUTHENTICATION VIA COOKIES
      // The 'login' service call now triggers the Backend to set HttpOnly cookies.
      const data = await login(sanitizedData);

      /**
       * 🛡️ UI PERSISTENCE
       * We NO LONGER save 'accessToken' here. It is handled by the browser's 
       * secure cookie storage. We only save the user profile for UI logic.
       */
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Access Granted: Welcome back, ${data.user.fullName.split(' ')[0]}`);

      // Wait for toast and state synchronization
      setTimeout(() => {
        // 1. Role-Based Navigation Logic
        if (data.user.role === "admin" || data.user.role === "owner") {
          
          // Check for account status constraints
          if (data.user.accountStatus === "on_boarding" || data.user.accountStatus === "review") {
             navigate("/onboarding-status");
          } else if (data.user.role === "admin") {
             navigate("/admin/dashboard");
          } else {
             navigate("/owner/dashboard");
          }
        } 
        // 2. Specific Review Statuses for standard users
        else if (data.user.accountStatus === "review" || data.user.accountStatus === "on_boarding") {
          navigate("/onboarding-status");
        } 
        // 3. Default workspace redirect
        else {
          navigate("/owner/dashboard");
        }
      }, 800);
    } catch (err) {
      // Logic: If backend rejects due to cookies or credentials, show error
      toast.error(err.response?.data?.message || "Authentication failed. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans selection:bg-indigo-100">
      {/* --- LEFT SIDE: THE AUTHORITY PANEL --- */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-[#0F172A] p-16 flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-[-0.05em]">BOOKIIFY</span>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-7xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              The Vault <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Protocol.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-md font-medium leading-relaxed border-l-2 border-indigo-500/30 pl-6">
              Encrypted session management for 2026 booking professionals. Secure, decentralized, and modular.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0F172A] bg-slate-800 shadow-xl" />
                ))}
              </div>
              <p className="text-white text-sm font-bold tracking-tight">
                Join <span className="text-indigo-400">1.2k+</span> Experts
              </p>
            </div>
            <Sparkles className="text-indigo-400 w-6 h-6 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* --- RIGHT SIDE: THE LOGIN VAULT --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20 bg-slate-50/50 relative">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[460px] space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">System Login</h2>
            <p className="text-slate-500 text-lg font-medium">Verify your identity to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Terminal Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-14 pr-4 py-5 bg-white border-2 border-slate-100 rounded-[1.5rem] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all font-semibold text-lg shadow-sm"
                  placeholder="name@company.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Key</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Reset Key?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-14 pr-14 py-5 bg-white border-2 border-slate-100 rounded-[1.5rem] text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all font-semibold text-lg shadow-sm"
                  placeholder="••••••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-slate-600 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {showPassword ? (
                      <motion.div key="hide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Lock className="h-6 w-6" /> 
                      </motion.div>
                    ) : (
                      <motion.div key="show" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Eye className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-slate-900 text-white font-black rounded-[1.5rem] shadow-2xl shadow-indigo-200/50 hover:bg-black transition-all flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="tracking-widest">INITIATE SESSION</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="pt-8 text-center flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-slate-200" />
            <p className="text-slate-400 font-bold text-sm">
              No account?{" "}
              <Link to="/signup" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">
                Apply for Credentials
              </Link>
            </p>
            <div className="h-px w-12 bg-slate-200" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;