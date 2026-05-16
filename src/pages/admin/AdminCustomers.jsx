import React, { useEffect, useState } from "react";
import {
  Users, CheckCircle2, XCircle, AlertCircle, Loader2,
  ScanFace, CreditCard, Building2, Mail, Phone, Calendar,
  Filter, ChevronDown, ZoomIn, X
} from "lucide-react";
import API from "../../api/config";

const STATUS_TABS = [
  { key: "under_review", label: "Pending Review", color: "text-amber-500" },
  { key: "active",       label: "Approved",       color: "text-emerald-500" },
  { key: "rejected",     label: "Rejected",       color: "text-rose-500" },
  { key: "all",          label: "All Clients",    color: "text-slate-400" },
];

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

/* ── Review modal ── */
const ReviewModal = ({ customer, onClose, onDone }) => {
  const [action, setAction]   = useState(""); // approve | reject
  const [reason, setReason]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [lightbox, setLightbox] = useState(null);

  const handleSubmit = async () => {
    if (action === "reject" && reason.trim().length < 5) {
      setError("Please provide a detailed rejection reason (min 5 characters).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.put(`/admin/customers/${customer._id}/review`, { action, reason });
      onDone();
    } catch (err) {
      setError(err.response?.data?.message || "Review failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Identity Review</p>
            <h3 className="text-white font-black text-lg">{customer.fullName}</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Client info */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Mail,      val: customer.email },
              { icon: Phone,     val: customer.phone },
              { icon: Building2, val: customer.businessName || customer.ownerId?.businessName },
              { icon: Calendar,  val: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString("en-GB") : "—" },
            ].map(({ icon: Icon, val }, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                <Icon size={15} className="text-slate-400 shrink-0" />
                <span className="text-slate-300 text-sm font-medium truncate">{val || "—"}</span>
              </div>
            ))}
          </div>

          {/* KYC images */}
          <div>
            <h4 className="text-white font-black text-sm mb-4 flex items-center gap-2">
              <ScanFace size={16} className="text-indigo-400" /> Identity Documents
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { src: customer.livenessPhoto, label: "Live Selfie" },
                { src: customer.idFront,       label: "ID Front" },
                { src: customer.idBack,        label: "ID Back" },
              ].map(({ src, label }) => (
                <div key={label} className="space-y-2">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
                  {src ? (
                    <div
                      className="relative aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden cursor-pointer group border border-slate-700 hover:border-indigo-500 transition-all"
                      onClick={() => setLightbox({ src, label })}
                    >
                      <img src={src} alt={label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-slate-800 rounded-xl border border-dashed border-slate-700 flex items-center justify-center">
                      <CreditCard size={24} className="text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action selector */}
          <div>
            <h4 className="text-white font-black text-sm mb-4">Decision</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "approve", label: "Approve", icon: CheckCircle2, active: "border-emerald-500 bg-emerald-500/10", inactive: "border-slate-700 hover:border-slate-600", text: "active" },
                { id: "reject",  label: "Reject",  icon: XCircle,      active: "border-rose-500 bg-rose-500/10",     inactive: "border-slate-700 hover:border-slate-600", text: "rose" },
              ].map(({ id, label, icon: Icon, active, inactive }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setAction(id); setError(""); }}
                  className={`flex items-center justify-center gap-2 py-4 border-2 rounded-xl font-black text-sm transition-all
                    ${action === id ? active : inactive}
                    ${id === "approve" ? "text-emerald-400" : "text-rose-400"}
                  `}
                >
                  <Icon size={18} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rejection reason */}
          {action === "reject" && (
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                Rejection Reason <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={reason}
                onChange={e => { setReason(e.target.value); setError(""); }}
                rows={3}
                placeholder="Explain clearly why the identity cannot be approved…"
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
              />
              <p className="text-slate-600 text-xs mt-1">{reason.length} / 500 chars</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">
              <AlertCircle size={15} className="text-rose-400 shrink-0" />
              <p className="text-rose-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Confirm */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 border border-slate-700 text-slate-400 hover:text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!action || loading}
              className={`flex-1 py-3.5 font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                ${action === "approve" ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30" : ""}
                ${action === "reject"  ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30" : ""}
                ${!action ? "bg-slate-800 text-slate-500" : ""}
              `}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : action === "approve" ? <CheckCircle2 size={16} /> : action === "reject" ? <XCircle size={16} /> : null}
              {loading ? "Processing…" : action === "approve" ? "Approve Client" : action === "reject" ? "Reject Client" : "Select an action"}
            </button>
          </div>
        </div>
      </div>

      {lightbox && <ImageModal src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />}
    </div>
  );
};

/* ── Main Page ── */
const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [statusFilter, setFilter] = useState("under_review");
  const [selected, setSelected]   = useState(null);

  const fetchCustomers = (status) => {
    setLoading(true);
    API.get(`/admin/customers?status=${status}`)
      .then(res => setCustomers(res.data?.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCustomers(statusFilter); }, [statusFilter]);

  const handleFilterChange = (key) => {
    setFilter(key);
    setCustomers([]);
  };

  const handleDone = () => {
    setSelected(null);
    fetchCustomers(statusFilter);
  };

  const pendingCount = customers.filter(c => c.status === "under_review").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Client Verification</p>
          <h2 className="text-2xl font-black text-slate-900">Customer Review Queue</h2>
        </div>
        {statusFilter === "under_review" && pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-xl">
            <AlertCircle size={15} className="text-amber-600" />
            <span className="text-amber-700 text-sm font-black">{pendingCount} awaiting review</span>
          </div>
        )}
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all border
              ${statusFilter === key
                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            <span className={statusFilter === key ? "text-white" : color}>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-32 gap-3">
          <Loader2 size={28} className="animate-spin text-indigo-500" />
          <span className="text-slate-400 font-medium">Loading…</span>
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] py-24 flex flex-col items-center gap-4 shadow-sm">
          <Users size={56} className="text-slate-200" />
          <p className="text-slate-400 font-bold text-lg">No clients found</p>
          <p className="text-slate-300 text-sm">
            {statusFilter === "under_review" ? "No pending KYC reviews at this time." : "No records in this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {customers.map(c => {
            const cfg = {
              under_review: { badge: "bg-amber-100 text-amber-700 border-amber-200",   label: "Under Review" },
              active:       { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Approved" },
              rejected:     { badge: "bg-rose-100 text-rose-700 border-rose-200",       label: "Rejected" },
              invited:      { badge: "bg-blue-100 text-blue-700 border-blue-200",        label: "Invited" },
              pending_kyc:  { badge: "bg-slate-100 text-slate-700 border-slate-200",    label: "Pending KYC" },
            }[c.status] || { badge: "bg-slate-100 text-slate-600", label: c.status };

            return (
              <div key={c._id} className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:border-slate-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-5 flex-wrap">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {c.profilePicture ? (
                      <img src={c.profilePicture} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100" />
                    ) : (
                      <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 font-black text-xl">
                        {c.fullName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wide ${cfg.badge}`}>
                      {cfg.label}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 text-lg leading-tight">{c.fullName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-slate-400 text-xs font-medium">
                      <span className="flex items-center gap-1"><Mail size={11} /> {c.email}</span>
                      <span className="flex items-center gap-1"><Phone size={11} /> {c.phone}</span>
                      <span className="flex items-center gap-1"><Building2 size={11} /> {c.businessName || c.ownerId?.businessName || "—"}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB") : "—"}</span>
                    </div>

                    {/* KYC thumbnails */}
                    <div className="flex gap-2 mt-3">
                      {[
                        { src: c.livenessPhoto, label: "Selfie" },
                        { src: c.idFront,       label: "ID Front" },
                        { src: c.idBack,        label: "ID Back" },
                      ].map(({ src, label }) => (
                        <div key={label} className="text-center">
                          {src ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-slate-200">
                              <img src={src} alt={label} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-dashed border-slate-200 flex items-center justify-center">
                              <CreditCard size={16} className="text-slate-300" />
                            </div>
                          )}
                          <p className="text-slate-400 text-[9px] font-bold mt-1 uppercase">{label}</p>
                        </div>
                      ))}
                    </div>

                    {c.rejectionReason && (
                      <div className="mt-3 flex items-start gap-2 bg-rose-50 border border-rose-100 rounded-xl p-3">
                        <XCircle size={13} className="text-rose-400 mt-0.5 shrink-0" />
                        <p className="text-rose-700 text-xs font-medium">{c.rejectionReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {c.status === "under_review" && (
                    <button
                      onClick={() => setSelected(c)}
                      className="shrink-0 px-5 py-3 bg-slate-900 hover:bg-black text-white font-black text-xs rounded-xl uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <ScanFace size={14} /> Review
                    </button>
                  )}
                  {c.status !== "under_review" && (
                    <button
                      onClick={() => setSelected(c)}
                      className="shrink-0 px-5 py-3 border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 font-black text-xs rounded-xl uppercase tracking-widest transition-all"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review modal */}
      {selected && (
        <ReviewModal
          customer={selected}
          onClose={() => setSelected(null)}
          onDone={handleDone}
        />
      )}
    </div>
  );
};

export default AdminCustomers;
