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
      const data = await login(sanitizedData);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.fullName.split(' ')[0]}`);

      setTimeout(() => {
        if (data.user.role === "admin" || data.user.role === "owner") {
          if (data.user.accountStatus === "on_boarding" || data.user.accountStatus === "review") {
             navigate("/onboarding-status");
          } else if (data.user.role === "admin") {
             navigate("/admin/dashboard");
          } else {
             navigate("/owner/dashboard");
          }
        } else {
          navigate("/owner/dashboard");
        }
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error: Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* --- LEFT SIDE: BRANDING (Matches Signup) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center p-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-slate-900/80 z-10" />

        <div className="relative z-20 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">BOOKIIFY</span>
          </div>
          
          <h1 className="text-6xl font-black leading-tight mb-6">
            Welcome <br />
            <span className="text-indigo-400">Back.</span>
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

      {/* --- RIGHT SIDE: LOGIN FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-500 font-bold">Enter your details below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-indigo-600 transition-all">
                <div className="pl-5 text-slate-300">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="name@email.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-indigo-600 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-indigo-600 transition-all">
                <div className="pl-5 text-slate-300">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full py-4 px-4 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="Your password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-5 text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>LOG IN</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-bold text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-black hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;