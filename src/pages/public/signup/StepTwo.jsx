import React from "react";

const StepTwo = ({ formData, handleChange }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* 📱 Phone Verification Section */}
      <div className="text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
            📱
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Verify Phone Number</h3>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-6">
          We've sent a 6-digit code to <span className="text-slate-900 font-bold">{formData.phone || "+216 -- --- ---"}</span>
        </p>
        
        <div className="relative">
          <input 
            type="text" 
            name="phoneOtp" 
            maxLength="6"
            value={formData.phoneOtp || ""}
            onChange={handleChange}
            placeholder="0 0 0 0 0 0" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-5 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder:opacity-20"
            required
          />
        </div>
        <button type="button" className="mt-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
          Resend Phone Code
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* 📧 Email Verification Section */}
      <div className="text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
            📧
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Verify Email Address</h3>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-6">
          Enter the security code sent to <span className="text-slate-900 font-bold">{formData.email || "your email"}</span>
        </p>
        
        <div className="relative">
          <input 
            type="text" 
            name="emailOtp" 
            maxLength="6"
            value={formData.emailOtp || ""}
            onChange={handleChange}
            placeholder="0 0 0 0 0 0" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-5 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:opacity-20"
            required
          />
        </div>
        <button type="button" className="mt-4 text-[10px] font-black text-cyan-600 uppercase tracking-widest hover:underline">
          Resend Email Code
        </button>
      </div>

      {/* Security Note */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
        <span className="text-xl">🛡️</span>
        <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
          Your security is our priority. These codes expire in 10 minutes. Check your spam folder if you don't see the email.
        </p>
      </div>
    </div>
  );
};

export default StepTwo;