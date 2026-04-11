import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react"; 
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../api/config.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔍 Debug: Verify where the request is going
      console.log("📡 Attempting login to:", API.defaults.baseURL);

      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      // 📥 Debug: See the full object returned by your Render backend
      console.log("📥 Server Response:", res.data);

      if (res.data.success) {
        /**
         * 🛡️ SECURE UPDATE:
         * We call login() to save the token and keep user in memory.
         */
        login(res.data.user, res.data.token);

        const userRole = res.data.user?.role;
        console.log("👤 User Role detected:", userRole);

        // 🚀 NAVIGATION LOGIC
        if (userRole === "admin") {
          console.log("➡️ Navigating to Admin Dashboard...");
          navigate("/admin/dashboard");
        } else if (userRole === "owner") {
          console.log("➡️ Navigating to Merchant Hub...");
          navigate("/merchant");
        } else {
          console.log("⚠️ Role not recognized or missing. Navigating to Home.");
          navigate("/");
        }
      }
    } catch (err) {
      console.error("🔥 Login Error Object:", err);
      // ⚠️ Handle specific errors like 401 (Wrong Pass) or 403 (Locked)
      setError(err.response?.data?.error || "Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row pt-20 lg:pt-0">
      
      {/* 🌌 LEFT SIDE: The "Control Center" Inspiration */}
      <div className="lg:w-5/12 bg-indigo-600 text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-[80px]" />
        <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] bg-cyan-400 opacity-20 rounded-full blur-[100px]" />
        
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-indigo-600 font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">
            Booki<span className="text-cyan-300">smart</span>
          </span>
        </Link>

        <div className="relative z-10 my-20 lg:my-0">
          <span className="text-indigo-100 font-black text-sm uppercase tracking-[0.3em]">Welcome Back</span>
          <h1 className="text-4xl lg:text-6xl font-black mt-4 leading-tight tracking-tighter">
            Manage Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">Business Hub.</span>
          </h1>
          <p className="text-indigo-100/80 mt-6 text-lg font-medium leading-relaxed max-w-md">
            Log in to access your real-time dashboard, manage staff schedules, and track your Flouci earnings.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">📈</div>
              <p className="font-bold text-sm">View Today's Performance</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">👥</div>
              <p className="font-bold text-sm">Coordinate Your Team</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-indigo-200/50 text-xs font-bold uppercase tracking-widest">
          Secure Enterprise Login v2.0
        </div>
      </div>

      {/* 📝 RIGHT SIDE: The Login Form */}
      <div className="lg:w-7/12 flex items-center justify-center p-8 lg:p-20 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 lg:p-14 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Owner Login</h2>
            <p className="text-slate-500 font-medium mt-2">Enter your credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in fade-in zoom-in duration-300">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">📧</span>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmed@example.com" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 block">Password</label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔑</span>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all"
              />
              <label htmlFor="rememberMe" className="text-xs font-bold text-slate-500 cursor-pointer select-none">
                Remember this device for 30 days
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm uppercase tracking-widest mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-cyan-300" />
                  Verifying...
                </>
              ) : (
                "Access Dashboard 🔓"
              )}
            </button>

            <div className="pt-8 text-center border-t border-slate-100 mt-8">
              <p className="text-sm font-bold text-slate-400">
                Don't have a business account?
              </p>
              <Link to="/join-as-owner" className="inline-block mt-2 text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors">
                Register Your Shop Now →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;