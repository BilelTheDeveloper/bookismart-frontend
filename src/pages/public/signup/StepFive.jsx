import React from "react";

const StepFive = ({ formData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="text-center lg:text-left mb-8">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg shadow-indigo-200">
          🚀
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Final Review</h3>
        <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
          Almost there! Please verify your information before submitting your application.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 space-y-5">
          
          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-200/60">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center shadow-sm">
              {formData.profilePic ? (
                <img src={URL.createObjectURL(formData.profilePic)} alt="Business" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl text-slate-200">🏪</span>
              )}
            </div>
            <div>
              <h4 className="font-black text-slate-900 leading-none">{formData.businessName || "Your Business"}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{formData.category} • {formData.city}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Owner Name</label>
              <p className="text-xs font-bold text-slate-700">{formData.fullName}</p>
            </div>
            <div>
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Phone</label>
              <p className="text-xs font-bold text-slate-700">{formData.phone}</p>
            </div>
            <div className="col-span-2">
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Email Address</label>
              <p className="text-xs font-bold text-slate-700">{formData.email}</p>
            </div>
          </div>

          {/* Verification Status */}
          <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Identity Documents</span>
            <div className="flex gap-1.5">
              <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${formData.idFront ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>CIN</div>
              <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${formData.livePhoto ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>Facial</div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Box */}
      <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
        <label className="flex gap-4 cursor-pointer">
          <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-600 mt-1" required />
          <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
            I certify that the information provided is accurate and I agree to the 
            <span className="text-indigo-600 underline ml-1">Merchant Terms of Service</span> and privacy policy of Bookismart Tunisia.
          </p>
        </label>
      </div>

      {/* Submit Info */}
      <div className="text-center px-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
          Submitting will begin the 24h review process
        </p>
      </div>
    </div>
  );
};

export default StepFive;