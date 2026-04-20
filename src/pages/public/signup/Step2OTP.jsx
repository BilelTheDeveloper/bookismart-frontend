import React, { useState, useEffect, useCallback } from "react";
import { sendOTP, verifyOTP } from "../../../services/authService";

const Step2OTP = ({ formData, onNext, onPrev }) => {
  const [verifying, setVerifying] = useState({ email: false, phone: false });
  const [status, setStatus] = useState({ email: "idle", phone: "idle" }); // idle, sent, verified
  const [codes, setCodes] = useState({ email: "", phone: "" });
  const [error, setError] = useState(null);

  // 1. Automatic Send Logic on Mount
  const triggerInitialSends = useCallback(async () => {
    try {
      // Trigger both simultaneously for speed
      await Promise.all([
        sendOTP("email", formData.email),
        sendOTP("phone", formData.phone)
      ]);
      setStatus({ email: "sent", phone: "sent" });
    } catch (err) {
      setError("We couldn't send the codes. Please go back and check your details.");
    }
  }, [formData.email, formData.phone]);

  useEffect(() => {
    triggerInitialSends();
  }, [triggerInitialSends]);

  // 2. Handle Verification Logic
  const handleVerify = async (type) => {
    if (codes[type].length !== 8) return;

    try {
      setVerifying((prev) => ({ ...prev, [type]: true }));
      setError(null);
      
      await verifyOTP(type, type === "email" ? formData.email : formData.phone, codes[type]);
      
      setStatus((prev) => ({ ...prev, [type]: "verified" }));
    } catch (err) {
      setError(`The ${type} code you entered is incorrect.`);
    } finally {
      setVerifying((prev) => ({ ...prev, [type]: false }));
    }
  };

  const canContinue = status.email === "verified" && status.phone === "verified";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1 w-8 bg-indigo-600 rounded-full"></span>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 2 of 5</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Security Check</h2>
        <p className="text-slate-500">We've sent 8-character codes to your registered contacts.</p>
      </header>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl animate-shake">
          ⚠️ {error}
        </div>
      )}

      {/* --- PHONE VERIFICATION BOX --- */}
      <div className={`group p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
        status.phone === 'verified' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-white shadow-sm'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Mobile Number</p>
            <p className="text-sm font-bold text-slate-700">{formData.phone}</p>
          </div>
          {status.phone === 'verified' && (
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg shadow-emerald-200">✓</div>
          )}
        </div>
        
        {status.phone !== 'verified' && (
          <div className="relative">
            <input 
              type="text" 
              maxLength={8}
              placeholder="••••••••"
              value={codes.phone}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-xl font-black tracking-[0.5em] focus:border-indigo-600 focus:bg-white transition-all outline-none"
              onChange={(e) => setCodes({...codes, phone: e.target.value.toUpperCase()})}
            />
            {codes.phone.length === 8 && (
              <button 
                onClick={() => handleVerify('phone')}
                disabled={verifying.phone}
                className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {verifying.phone ? "..." : "CHECK"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* --- EMAIL VERIFICATION BOX --- */}
      <div className={`group p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${
        status.email === 'verified' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-white shadow-sm'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email Address</p>
            <p className="text-sm font-bold text-slate-700">{formData.email}</p>
          </div>
          {status.email === 'verified' && (
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg shadow-emerald-200">✓</div>
          )}
        </div>

        {status.email !== 'verified' && (
          <div className="relative">
            <input 
              type="text" 
              maxLength={8}
              placeholder="••••••••"
              value={codes.email}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-xl font-black tracking-[0.5em] focus:border-indigo-600 focus:bg-white transition-all outline-none"
              onChange={(e) => setCodes({...codes, email: e.target.value.toUpperCase()})}
            />
            {codes.email.length === 8 && (
              <button 
                onClick={() => handleVerify('email')}
                disabled={verifying.email}
                className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {verifying.email ? "..." : "CHECK"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* --- NAVIGATION --- */}
      <div className="flex gap-4 pt-4">
        <button onClick={onPrev} className="flex-1 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95">
          BACK
        </button>
        <button 
          onClick={onNext}
          disabled={!canContinue}
          className={`flex-[2] py-5 rounded-2xl font-black transition-all shadow-xl ${
            canContinue 
              ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-slate-900 active:scale-95" 
              : "bg-slate-50 text-slate-300 cursor-not-allowed"
          }`}
        >
          {canContinue ? "CONTINUE TO STEP 3" : "AWAITING VERIFICATION"}
        </button>
      </div>
      
      <p className="text-center text-[10px] text-slate-400 font-medium">
        Didn't receive codes? <button onClick={triggerInitialSends} className="text-indigo-600 font-bold hover:underline">Resend all</button>
      </p>
    </div>
  );
};

export default Step2OTP;