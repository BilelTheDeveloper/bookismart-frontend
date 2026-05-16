import React, { useState, useRef } from "react";
import { X, UserPlus, Upload, Loader2, CheckCircle2, AlertCircle, Camera } from "lucide-react";
import API from "../../api/config";

const AddCustomerModal = ({ onClose, onSuccess }) => {
  const [step, setStep]       = useState("form"); // form | success
  const [form, setForm]       = useState({ fullName: "", phone: "", email: "" });
  const [preview, setPreview] = useState(null);
  const [base64, setBase64]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [result, setResult]   = useState(null);
  const fileRef               = useRef(null);

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      setBase64(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/merchant/customers/initiate", {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        profilePictureBase64: base64,
      });
      if (res.data?.success) {
        setResult(res.data);
        setStep("success");
        onSuccess?.();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
              <UserPlus size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white font-black text-base">Add Portal Client</h2>
              <p className="text-slate-500 text-xs">An invitation will be sent by email</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {step === "success" ? (
          <div className="px-8 py-10 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Invitation Sent!</h3>
              <p className="text-slate-400 mt-2">
                <strong className="text-slate-200">{form.email}</strong> will receive a secure link to complete their registration.
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-left space-y-2">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">What happens next</p>
              {["Customer receives OTP code + registration link", "They verify OTP and set a password", "They complete identity verification (liveness + ID)", "Admin reviews and approves their profile", "You grant portal access to specific pages"].map((txt, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="text-indigo-400 font-black mt-0.5">{i + 1}.</span>
                  {txt}
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* Profile picture */}
            <div className="flex flex-col items-center gap-3">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 hover:border-indigo-500 cursor-pointer flex items-center justify-center overflow-hidden transition-all group"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-500 group-hover:text-indigo-400 transition-colors">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold">Photo</span>
                  </div>
                )}
              </div>
              <p className="text-slate-500 text-xs">Optional profile photo</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>

            {/* Fields */}
            {[
              { name: "fullName", label: "Full Name",     type: "text",  placeholder: "Ahmed Ben Ali" },
              { name: "phone",    label: "Phone Number",  type: "tel",   placeholder: "+216 XX XXX XXX" },
              { name: "email",    label: "Email Address", type: "email", placeholder: "client@email.com" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            ))}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">
                <AlertCircle size={15} className="text-rose-400 shrink-0" />
                <p className="text-rose-300 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 font-black rounded-xl text-sm uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                {loading ? "Sending…" : "Send Invite"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddCustomerModal;
