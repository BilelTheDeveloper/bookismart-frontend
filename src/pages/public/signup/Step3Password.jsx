import React, { useState, useEffect } from "react";
import { passwordBlacklist } from "../../../utils/passwordBlacklist";

const Step3Password = ({ formData, setFormData, onNext, onPrev }) => {
  const [strength, setStrength] = useState({ score: 0, label: "Empty", color: "bg-slate-200" });
  const [error, setError] = useState("");

  const validatePassword = (pass) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200" };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (passwordBlacklist.includes(pass.toLowerCase())) {
        setError("This password is blacklisted for security.");
        return { score: 0, label: "Unauthorized", color: "bg-rose-600" };
    } else {
        setError("");
    }

    switch (score) {
      case 1: return { score: 25, label: "Weak", color: "bg-rose-500" };
      case 2: return { score: 50, label: "Fair", color: "bg-amber-500" };
      case 3: return { score: 75, label: "Good", color: "bg-blue-500" };
      case 4: return { score: 100, label: "Strong", color: "bg-emerald-500" };
      default: return { score: 0, label: "Empty", color: "bg-slate-200" };
    }
  };

  useEffect(() => {
    setStrength(validatePassword(formData.password));
  }, [formData.password]);

  const canContinue = strength.score === 100 && !error;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Secure Your Account</h2>
        <p className="text-slate-500 mt-2">Create a "Power Password" to protect your business data.</p>
      </header>

      <div className="space-y-4">
        <div className="relative">
          <input 
            type="password"
            placeholder="Enter your password"
            className={`w-full p-5 bg-white border-2 rounded-[2rem] outline-none transition-all ${
              error ? "border-rose-500" : "border-slate-100 focus:border-indigo-500"
            }`}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {strength.score > 0 && (
            <div className="absolute right-6 top-5">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full text-white ${strength.color}`}>
                {strength.label}
              </span>
            </div>
          )}
        </div>

        {/* --- Strength Indicator Bar --- */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${strength.color}`} 
            style={{ width: `${strength.score}%` }}
          />
        </div>

        {/* --- Rule Checklist --- */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold uppercase tracking-tighter">
          <li className={formData.password.length >= 8 ? "text-emerald-600" : "text-slate-400"}>
            {formData.password.length >= 8 ? "✓" : "○"} Min 8 Characters
          </li>
          <li className={/[0-9]/.test(formData.password) ? "text-emerald-600" : "text-slate-400"}>
            {/[0-9]/.test(formData.password) ? "✓" : "○"} Contains Numbers
          </li>
          <li className={/[A-Z]/.test(formData.password) ? "text-emerald-600" : "text-slate-400"}>
            {/[A-Z]/.test(formData.password) ? "✓" : "○"} Uppercase Letter
          </li>
          <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-emerald-600" : "text-slate-400"}>
            {/[^A-Za-z0-9]/.test(formData.password) ? "✓" : "○"} Special Character
          </li>
        </ul>

        {error && (
          <p className="p-4 bg-rose-50 text-rose-600 text-sm font-bold rounded-2xl border border-rose-100">
             ⚠ {error}
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onPrev} className="flex-1 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-all">
          BACK
        </button>
        <button 
          onClick={onNext}
          disabled={!canContinue}
          className={`flex-[2] py-4 rounded-2xl font-black transition-all shadow-lg ${
            canContinue ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-slate-900" : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          CREATE PASSWORD
        </button>
      </div>
    </div>
  );
};

export default Step3Password;