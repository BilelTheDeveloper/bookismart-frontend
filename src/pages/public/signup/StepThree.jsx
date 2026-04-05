import React, { useState } from "react";

const StepThree = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Simple logic to check password strength for the UI
  const getStrength = () => {
    const password = formData.password || "";
    if (password.length === 0) return { width: "0%", color: "bg-slate-200" };
    if (password.length < 6) return { width: "33%", color: "bg-rose-500" };
    if (password.length < 10) return { width: "66%", color: "bg-amber-500" };
    return { width: "100%", color: "bg-emerald-500" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="text-center lg:text-left mb-8">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm">
          🔐
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Create Password</h3>
        <p className="text-slate-500 text-sm font-medium mt-2">
          Secure your business dashboard with a strong password.
        </p>
      </div>

      {/* Main Password Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">New Password</label>
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            value={formData.password || ""} 
            onChange={handleChange} 
            placeholder="••••••••••••" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold" 
            required 
          />
        </div>
        
        {/* Strength Meter */}
        <div className="pt-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${strength.color}`} 
              style={{ width: strength.width }}
            ></div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
            Password Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.width === "100%" ? "Strong" : strength.width === "66%" ? "Medium" : "Weak"}</span>
          </p>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block">Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword || ""} 
          onChange={handleChange} 
          placeholder="••••••••••••" 
          className={`w-full bg-slate-50 border rounded-2xl py-4 px-5 text-sm focus:outline-none transition-all font-bold ${
            formData.confirmPassword && formData.password !== formData.confirmPassword 
            ? "border-rose-200 ring-1 ring-rose-500" 
            : "border-slate-100 focus:ring-2 focus:ring-indigo-600"
          }`} 
          required 
        />
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">Passwords do not match</p>
        )}
      </div>

      {/* Security Checklist */}
      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mt-8">
        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.2em]">Security Requirements</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-xs font-bold text-slate-600">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${formData.password?.length >= 8 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>✓</div>
            Minimum 8 characters
          </li>
          <li className="flex items-center gap-3 text-xs font-bold text-slate-600">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${/[0-9]/.test(formData.password) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>✓</div>
            At least one number
          </li>
          <li className="flex items-center gap-3 text-xs font-bold text-slate-600">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${/[A-Z]/.test(formData.password) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>✓</div>
            At least one uppercase letter
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StepThree;