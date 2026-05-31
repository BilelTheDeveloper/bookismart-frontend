import React, { useEffect, useState } from "react";
import {
  Users, CheckCircle2, XCircle, AlertCircle, Loader2,
  ScanFace, CreditCard, Building2, Mail, Phone, Calendar,
  Briefcase, Shield, X, Filter
} from "lucide-react";
import API from "../../api/config";

const STATUS_TABS = [
  { key: "under_review", label: "Pending Review", color: "text-amber-500" },
  { key: "active",       label: "Approved",       color: "text-emerald-500" },
  { key: "rejected",     label: "Rejected",       color: "text-rose-500" },
  { key: "all",          label: "All Staff",      color: "text-slate-400" },
];

const ROLE_COLORS = {
  manager:     "bg-violet-500/20 text-violet-300",
  staff:       "bg-indigo-500/20 text-indigo-300",
  receptionist:"bg-emerald-500/20 text-emerald-300",
};

/* ── Image lightbox ── */
const ImageModal = ({ src, label, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90" onClick={onClose}>
    <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-slate-300 flex items-center gap-1 text-sm">
        <X size={16} /> Close
      </button>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">{label}</p>
      <img src={src} alt={label} className="w-full rounded-2xl shadow-2xl" />
    </div>
  </div>
);

/* ── Review Modal ── */
const ReviewModal = ({ member, onClose, onDone }) => {
  const [action, setAction]     = useState("");
  const [reason, setReason]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [lightbox, setLightbox] = useState(null);

  const handleSubmit = async () => {
    if (action === "reject" && reason.trim().length < 5) {
      setError("Please provide a detailed rejection reason (min 5 characters).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.put(`/admin/staff/${member._id}/review`, { action, reason });
      onDone();
    } catch (err) {
      setError(err.response?.data?.message || "Review failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {lightbox && <ImageModal src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between z-10 rounded-t-[2rem]">
            <div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Staff Identity Review</p>
              <h3 className="text-white font-black text-lg">{member.fullName}</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white p-1 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Mail,      val: member.email },
                { icon: Phone,     val: member.phone || "—" },
                { icon: Building2, val: member.ownerId?.businessName || "—" },
                { icon: Calendar,  val: member.createdAt ? new Date(member.createdAt).toLocaleDateString("en-GB") : "—" },
              ].map(({ icon: Icon, val }, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                  <Icon size={14} className="text-slate-400 shrink-0" />
                  <span className="text-slate-300 text-sm font-medium truncate">{val}</span>
                </div>
              ))}
            </div>

            {/* Role badge */}
            <div className="flex items-center gap-3">
              <Briefcase size={14} className="text-slate-400" />
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest ${ROLE_COLORS[member.role] || 'bg-slate-700 text-slate-300'}`}>
                {member.role}
              </span>
              <span className="text-slate-500 text-xs">from {member.ownerId?.businessName}</span>
            </div>

            {/* KYC documents */}
            <div className="space-y-5">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Identity Documents</p>

              {/* Selfie */}
              <div>
                <p className="text-slate-500 text-xs font-bold mb-2 flex items-center gap-1.5"><ScanFace size={13} /> Live Selfie</p>
                {member.livenessPhoto ? (
                  <div
                    className="relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer border border-slate-700 hover:border-indigo-500/50 transition-all aspect-[4/3]"
                    onClick={() => setLightbox({ src: member.livenessPhoto, label: "Live Selfie" })}
                  >
                    <img src={member.livenessPhoto} alt="selfie" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-bold">View Full</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center">
                    <p className="text-slate-600 dark:text-slate-300 text-xs font-bold">Not submitted</p>
                  </div>
                )}
              </div>

              {/* ID front + back */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ID Front", src: member.idFront },
                  { label: "ID Back",  src: member.idBack },
                ].map(({ label, src }) => (
                  <div key={label}>
                    <p className="text-slate-500 text-xs font-bold mb-2 flex items-center gap-1.5"><CreditCard size={13} /> {label}</p>
                    {src ? (
                      <div
                        className="relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer border border-slate-700 hover:border-indigo-500/50 transition-all aspect-[4/3]"
                        onClick={() => setLightbox({ src, label })}
                      >
                        <img src={src} alt={label} className="w-full h-full object-contain p-2" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-bold">View Full</div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center">
                        <p className="text-slate-600 dark:text-slate-300 text-xs font-bold">Not submitted</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Decision */}
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Decision</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "approve", label: "Approve", icon: CheckCircle2, color: action === "approve" ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50" },
                  { key: "reject",  label: "Reject",  icon: XCircle,      color: action === "reject"  ? "bg-rose-600 border-rose-600 text-white"    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-rose-500/50" },
                ].map(({ key, label, icon: Icon, color }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAction(key)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border font-black text-sm transition-all ${color}`}
                  >
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </div>

              {action === "reject" && (
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Rejection Reason *</label>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={3}
                    placeholder="Explain why this identity could not be verified…"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-rose-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
                <AlertCircle size={16} className="text-rose-400 shrink-0" />
                <p className="text-rose-300 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3.5 bg-slate-800 border border-slate-700 text-white font-black rounded-xl text-sm hover:bg-slate-700 transition-all">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!action || loading}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                {loading ? "Submitting…" : "Confirm Decision"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Main Component ─── */
const AdminStaff = () => {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("under_review");
  const [reviewing, setReviewing] = useState(null);

  const fetchMembers = async (tab) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/admin/staff?status=${tab}`);
      setMembers(data.data || []);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(activeTab); }, [activeTab]);

  const handleDone = () => {
    setReviewing(null);
    fetchMembers(activeTab);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Staff Verification</h2>
          <p className="text-slate-500 text-sm mt-0.5">Review and approve team member identity documents</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-300 text-xs font-black uppercase tracking-widest">
            {members.filter(m => m.status === 'under_review').length} pending
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
              activeTab === tab.key
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={28} className="animate-spin text-indigo-500" />
        </div>
      ) : members.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-16 text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-slate-600 dark:text-slate-300" />
          </div>
          <h3 className="text-white font-black mb-2">No records found</h3>
          <p className="text-slate-500 text-sm">No staff members match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {members.map(member => (
            <div key={member._id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-[2rem] p-6 transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center shrink-0">
                    {member.profilePic
                      ? <img src={member.profilePic} alt="" className="w-full h-full object-cover" />
                      : <span className="text-white font-black">{member.fullName?.charAt(0)}</span>
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-black truncate">{member.fullName}</p>
                    <p className="text-slate-500 text-xs truncate">{member.email}</p>
                  </div>
                </div>
                <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  member.status === 'active' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' :
                  member.status === 'rejected' ? 'bg-rose-500/15 text-rose-300 border-rose-500/20' :
                  'bg-amber-500/15 text-amber-300 border-amber-500/20'
                }`}>
                  {member.status?.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Building2 size={12} />
                  <span className="truncate">{member.ownerId?.businessName || '—'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Briefcase size={12} />
                  <span className="capitalize">{member.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 col-span-2">
                  <Calendar size={12} />
                  <span>Submitted {new Date(member.createdAt).toLocaleDateString("en-GB")}</span>
                </div>
              </div>

              {/* Doc previews */}
              <div className="flex gap-2 mb-4">
                {[
                  { src: member.livenessPhoto, label: "Selfie" },
                  { src: member.idFront,       label: "ID Front" },
                  { src: member.idBack,        label: "ID Back" },
                ].map(({ src, label }) => (
                  <div key={label} className={`flex-1 aspect-square rounded-xl border overflow-hidden ${src ? 'border-slate-700 bg-slate-800' : 'border-dashed border-slate-700 bg-slate-800/50'}`}>
                    {src ? (
                      <img src={src} alt={label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-slate-600 dark:text-slate-300 text-[9px] font-bold text-center px-1">{label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setReviewing(member)}
                className="w-full py-3 bg-indigo-600/10 border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-600/20 text-indigo-300 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Shield size={14} /> Review Identity
              </button>
            </div>
          ))}
        </div>
      )}

      {reviewing && (
        <ReviewModal member={reviewing} onClose={() => setReviewing(null)} onDone={handleDone} />
      )}
    </div>
  );
};

export default AdminStaff;
