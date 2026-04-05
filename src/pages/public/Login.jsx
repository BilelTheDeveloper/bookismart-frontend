import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Integration logic for authentication goes here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row pt-20 lg:pt-0">
      
      {/* 🌌 LEFT SIDE: The "Control Center" Inspiration */}
      <div className="lg:w-5/12 bg-indigo-600 text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-[80px]" />
        <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] bg-cyan-400 opacity-20 rounded-full blur-[100px]" />
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-indigo-600 font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">
            Booki<span className="text-cyan-300">smart</span>
          </span>
        </Link>

        {/* Welcome Back Text */}
        <div className="relative z-10 my-20 lg:my-0">
          <span className="text-indigo-100 font-black text-sm uppercase tracking-[0.3em]">Welcome Back</span>
          <h1 className="text-4xl lg:text-6xl font-black mt-4 leading-tight tracking-tighter">
            Manage Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">Business Hub.</span>
          </h1>
          <p className="text-indigo-100/80 mt-6 text-lg font-medium leading-relaxed max-w-md">
            Log in to access your real-time dashboard, manage staff schedules, and track your Flouci earnings.
          </p>

          {/* Quick Stats/Features for Owners */}
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

        {/* Footer info */}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
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
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
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
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
                  required
                />
              </div>
            </div>

            {/* Remember Me Toggle */}
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

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm uppercase tracking-widest mt-4"
            >
              Access Dashboard 🔓
            </button>

            {/* Redirect to Join */}
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