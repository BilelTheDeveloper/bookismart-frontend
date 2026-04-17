import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AlertCircle, Loader2, ShieldCheck, Mail, Lock } from "lucide-react"; 
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../api/config.js";
import Navbar from "../../components/Navbar.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, loading: authLoading } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🛡️ REDIRECT IF ALREADY LOGGED IN
  // If the user is already authenticated, don't let them see the login page.
  useEffect(() => {
    if (!authLoading && user) {
      const destination = user.role === 'admin' ? '/admin' : 
                          user.role === 'owner' ? '/merchant' : '/';
      navigate(destination, { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 📡 POST request sends credentials. 
      // The backend responds with a 'Set-Cookie' header which the browser locks.
      const res = await API.post("/auth/login", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      });

      if (res.data.success) {
        // 📥 Update RAM State via AuthContext
        login(res.data.user); 

        const userRole = res.data.user?.role;
        
        // 🚀 SMART NAVIGATION
        // Check if the user was redirected here from a specific page (via ProtectedRoute state)
        const origin = location.state?.from?.pathname;
        
        if (origin) {
          navigate(origin, { replace: true });
        } else {
          // Default role-based routing
          if (userRole === "admin") navigate("/admin");
          else if (userRole === "owner") navigate("/merchant");
          else navigate("/");
        }
      }
    } catch (err) {
      console.error("🔒 Login failure:", err.response?.data?.error || err.message);
      // Security: We use the specific error from backend (Account Status/Invalid Creds)
      setError(err.response?.data?.error || "Authentication failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row pt-20 lg:pt-0">
      <Navbar />
      
      {/* 🌌 LEFT SIDE: Branding & Identity */}
      <div className="lg:w-5/12 bg-indigo-600 text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-[80px]" />
        <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] bg-cyan-400 opacity-20 rounded-full blur-[100px]" />
        
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-indigo-600 font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">
            Book<span className="text-cyan-300">ify</span>
          </span>
        </Link>

        <div className="relative z-10 my-20 lg:my-0">
          <span className="text-indigo-100 font-black text-sm uppercase tracking-[0.3em] flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-300" /> Secure Access
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mt-4 leading-tight tracking-tighter">
            Manage Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">Business Hub.</span>
          </h1>
          <p className="text-indigo-100/80 mt-6 text-lg font-medium leading-relaxed max-w-md">
            The most advanced booking infrastructure in Tunisia. Access your real-time dashboard and stay in control.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-white/10">📈</div>
              <p className="font-bold text-sm tracking-tight">Real-time Performance Analytics</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-white/10">🔐</div>
              <p className="font-bold text-sm tracking-tight">End-to-End Encrypted Sessions</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-indigo-200/50 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
           System Online: AES-256 Bit Encryption
        </div>
      </div>

      {/* 📝 RIGHT SIDE: The Form */}
      <div className="lg:w-7/12 flex items-center justify-center p-8 lg:p-20 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 transition-all duration-500">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 font-bold mt-2 text-sm">Enter your business credentials to login.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-black animate-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} />
              {error.toUpperCase()}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 ml-1">Business Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@business.tn" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Password</label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
                  Reset Secret?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input 
                type="checkbox" 
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-[11px] font-black text-slate-400 cursor-pointer select-none uppercase tracking-tighter">
                Trust this workstation
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] text-xs uppercase tracking-[0.2em] mt-4 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-cyan-400" />
                  Decrypting...
                </>
              ) : (
                "Authorize Access 🔓"
              )}
            </button>

            <div className="pt-8 text-center border-t border-slate-100 mt-8">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                New Merchant?
              </p>
              <Link to="/join-as-owner" className="inline-block mt-3 text-xs font-black text-indigo-600 hover:text-indigo-800 transition-all underline underline-offset-4 decoration-indigo-200">
                REGISTER YOUR BUSINESS PROFILE →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;