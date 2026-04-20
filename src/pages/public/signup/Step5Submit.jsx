import React, { useState } from "react";
import { registerUser } from "../../../services/authService";

const Step5Submit = ({ formData, onPrev }) => {
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Final Submission Handler
   * Triggers the Auth Service and handles the state transition
   */
  const handleFinalSubmit = async () => {
    if (!accepted || isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Logic: Calls the synchronized service which handles the FormData
      await registerUser(formData);
      setIsFinished(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(
        err.response?.data?.message || 
        "Submission failed. Please check your connection or try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS STATE UI ---
  if (isFinished) {
    return (
      <div className="text-center space-y-8 animate-in zoom-in duration-700">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-full h-full bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-5xl shadow-inner">
            ⏳
          </div>
        </div>
        
        <header>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Under Review</h2>
          <p className="text-slate-500 mt-2 font-medium">Your application is in the vault.</p>
        </header>

        <div className="space-y-4 max-w-sm mx-auto">
          <p className="text-slate-600 leading-relaxed">
            Thank you, <span className="text-indigo-600 font-bold">{formData.fullName}</span>. 
            Our compliance team is currently verifying your professional identity and business documents.
          </p>
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-[2rem] text-sm text-indigo-900 shadow-sm">
            📧 A confirmation was sent to <span className="font-black underline">{formData.email}</span>. 
            Expect a response within <span className="font-black">24 hours</span>.
          </div>
        </div>

        <button 
          onClick={() => window.location.href = "/"}
          className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-black transition-all active:scale-95"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  // --- REVIEW & SUBMIT UI ---
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1 w-8 bg-indigo-600 rounded-full"></span>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Step 5 of 5</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Final Confirmation</h2>
        <p className="text-slate-500">Please review your business details before submission.</p>
      </header>

      {/* --- BUSINESS SUMMARY CARD --- */}
      <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
            {formData.profilePic ? (
               <img src={URL.createObjectURL(formData.profilePic)} alt="profile" className="w-full h-full object-cover rounded-2xl" />
            ) : "🏢"}
          </div>
          <div>
            <p className="text-lg font-black text-slate-900 leading-tight">{formData.businessName}</p>
            <p className="text-sm font-bold text-indigo-600">{formData.category}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase">Location</p>
            <p className="text-xs font-bold text-slate-700">{formData.ville}, TN</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase">Documents</p>
            <p className="text-xs font-bold text-emerald-600">✓ KYC SECURED</p>
          </div>
        </div>
      </div>

      {/* --- ERROR FEEDBACK --- */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl animate-bounce">
          ⚠️ {error}
        </div>
      )}

      {/* --- POLICY CHECK --- */}
      <div className="space-y-4">
        <label className="flex items-start gap-4 cursor-pointer group bg-white p-4 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
          <div className="relative mt-1">
            <input 
              type="checkbox" 
              className="peer w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer appearance-none border-2 checked:bg-indigo-600 checked:border-indigo-600"
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none">✓</span>
          </div>
          <span className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors font-medium">
            I certify that the provided identification is authentic. I agree to the <span className="text-indigo-600 font-bold underline">Terms of Professional Service</span> and consent to identity processing.
          </span>
        </label>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex gap-4 pt-2">
        <button 
          onClick={onPrev} 
          disabled={isSubmitting}
          className="flex-1 py-5 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
        >
          BACK
        </button>
        <button 
          onClick={handleFinalSubmit}
          disabled={!accepted || isSubmitting}
          className={`flex-[2.5] py-5 rounded-2xl font-black transition-all shadow-xl flex items-center justify-center gap-2 ${
            accepted && !isSubmitting 
              ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-slate-900 active:scale-95" 
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>VERIFYING...</span>
            </>
          ) : (
            "SIGN UP & SUBMIT"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5Submit;