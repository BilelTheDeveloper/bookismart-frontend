import React, { useState, useRef } from "react";
import { User, Phone, Camera, Loader2, ArrowRight, RefreshCw } from "lucide-react";
import CAPI from "../../../api/customerConfig";

const StepProfile = ({
  token,
  initialData = {},
  onSuccess,
  api = CAPI,
  pathBase = "/customer/register",
}) => {
  const [fullName, setFullName]     = useState(initialData.fullName || "");
  const [phone, setPhone]           = useState(initialData.phone || "");
  const [preview, setPreview]       = useState(initialData.profilePicture || null);
  const [picBase64, setPicBase64]   = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      setPicBase64(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) { setError("Full name is required."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post(`${pathBase}/${token}/profile`, {
        fullName: fullName.trim(),
        phone: phone.trim(),
        profilePicBase64: picBase64,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-5">
          <User size={28} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Profile</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
          Confirm your details and add a photo. A verification code will be sent to your email after.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar upload */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 cursor-pointer group"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera size={28} className="text-slate-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {preview ? <RefreshCw size={20} className="text-white" /> : <Camera size={20} className="text-white" />}
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-xs text-slate-400 hover:text-blue-400 font-bold transition-colors"
          >
            {preview ? "Change Photo" : "Add Profile Photo"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        {/* Full name */}
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={fullName}
              onChange={e => { setFullName(e.target.value); setError(""); }}
              placeholder="Your full name"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+216 XX XXX XXX"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="text-rose-400 text-sm font-medium text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !fullName.trim()}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          {loading ? "Saving…" : "Confirm & Continue"}
        </button>
      </form>
    </div>
  );
};

export default StepProfile;
