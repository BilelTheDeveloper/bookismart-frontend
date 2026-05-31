import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { passwordBlacklist } from "../../../utils/passwordBlacklist";

const Step3Password = ({ formData, setFormData, onPrev, onSubmit, submitting, submitError }) => {
  const [strength, setStrength] = useState({ score: 0, label: "Empty", color: "bg-slate-200" });
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

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
      case 1: return { score: 25, label: "Weak",   color: "bg-rose-500"    };
      case 2: return { score: 50, label: "Fair",   color: "bg-amber-500"   };
      case 3: return { score: 75, label: "Good",   color: "bg-blue-500"    };
      case 4: return { score: 100, label: "Strong", color: "bg-emerald-500" };
      default: return { score: 0, label: "Empty", color: "bg-slate-200" };
    }
  };

  useEffect(() => {
    setStrength(validatePassword(formData.password));
  }, [formData.password]);

  const canSubmit = strength.score === 100 && !error && !submitting && termsAccepted;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Secure Your Account</h2>
        <p className="text-slate-500 mt-2">Create a strong password to protect your business data.</p>
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {strength.score > 0 && (
            <div className="absolute right-6 top-5">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full text-white ${strength.color}`}>
                {strength.label}
              </span>
            </div>
          )}
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${strength.color}`}
            style={{ width: `${strength.score}%` }}
          />
        </div>

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

        {submitError && (
          <p className="p-4 bg-rose-50 text-rose-600 text-sm font-bold rounded-2xl border border-rose-100">
            ⚠ {submitError}
          </p>
        )}
      </div>

      {/* Terms & Privacy acceptance */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-3">
        <label className="flex items-start gap-3.5 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className="peer w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer appearance-none checked:bg-indigo-600 checked:border-indigo-600"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-[10px] font-black">✓</span>
          </div>
          <span className="text-sm text-slate-600 leading-relaxed font-medium">
            I have read and agree to the{" "}
            <Link to="/terms" target="_blank" rel="noopener noreferrer"
              className="text-indigo-600 font-black underline underline-offset-2 hover:text-indigo-500 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer"
              className="text-indigo-600 font-black underline underline-offset-2 hover:text-indigo-500 transition-colors">
              Privacy Policy
            </Link>
            . I certify that the information I provided is accurate and authentic.
          </span>
        </label>
        {!termsAccepted && strength.score === 100 && (
          <p className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-2 rounded-xl">
            <ShieldCheck size={13} />
            Please accept the terms to create your account.
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrev}
          disabled={submitting}
          className="flex-1 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-all disabled:opacity-50"
        >
          BACK
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex-[2] py-4 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 ${
            canSubmit
              ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-slate-900"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {submitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /><span>CREATING ACCOUNT...</span></>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3Password;
