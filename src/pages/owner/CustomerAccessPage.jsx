import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Shield, Calendar, FileText, Gift, BookOpen,
  Loader2, CheckCircle2, AlertCircle, Save, Eye, Zap
} from "lucide-react";
import API from "../../api/config";

const PAGE_DEFS = [
  {
    key: "appointments",
    label: "Appointments",
    icon: Calendar,
    description: "Client can view their booking history and upcoming appointments.",
    color: "blue",
  },
  {
    key: "invoices",
    label: "Invoices",
    icon: FileText,
    description: "Client can view their invoice history and payment records.",
    color: "violet",
  },
  {
    key: "loyalty",
    label: "Loyalty Points",
    icon: Gift,
    description: "Client can view their loyalty points, stamps and tier status.",
    color: "amber",
  },
  {
    key: "booking",
    label: "Book a Service",
    icon: BookOpen,
    description: "Client can browse services and schedule new appointments.",
    color: "emerald",
  },
];

const COLOR_MAP = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/30",    icon: "text-blue-400",    activeBorder: "border-blue-500",    ring: "ring-blue-500/20"    },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/30",  icon: "text-violet-400",  activeBorder: "border-violet-500",  ring: "ring-violet-500/20"  },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: "text-amber-400",   activeBorder: "border-amber-500",   ring: "ring-amber-500/20"   },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "text-emerald-400", activeBorder: "border-emerald-500", ring: "ring-emerald-500/20" },
};

const CustomerAccessPage = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [access, setAccess]     = useState({}); // { pageKey: 'read' | 'full' | false }
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    API.get(`/merchant/customers/${id}/access`)
      .then(res => {
        const c = res.data?.data;
        setCustomer(c);
        const initial = {};
        PAGE_DEFS.forEach(p => { initial[p.key] = false; });
        (c?.allowedPages || []).forEach(p => { initial[p.pageKey] = p.accessLevel; });
        setAccess(initial);
      })
      .catch(() => setError("Failed to load customer access configuration."))
      .finally(() => setLoading(false));
  }, [id]);

  const togglePage = (key) => {
    setAccess(prev => {
      if (!prev[key]) return { ...prev, [key]: "read" };
      if (prev[key] === "read") return { ...prev, [key]: "full" };
      return { ...prev, [key]: false };
    });
    setSaved(false);
  };

  const setLevel = (key, level) => {
    setAccess(prev => ({ ...prev, [key]: level }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const allowedPages = Object.entries(access)
        .filter(([, val]) => val !== false && val !== undefined)
        .map(([pageKey, accessLevel]) => ({ pageKey, accessLevel }));

      await API.put(`/merchant/customers/${id}/access`, { allowedPages });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 size={32} className="animate-spin text-indigo-500" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Back + header */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="mt-1 p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Portal Access Control</p>
          <h2 className="text-2xl font-black text-slate-900">
            {customer?.fullName || "Client"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">{customer?.email}</p>
        </div>
      </div>

      {/* Customer card */}
      {customer && (
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 flex items-center gap-5 shadow-sm">
          {customer.profilePicture ? (
            <img src={customer.profilePicture} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-100" />
          ) : (
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-black text-indigo-600">{customer.fullName?.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-black text-slate-900 text-lg">{customer.fullName}</h3>
            <p className="text-slate-500 text-sm">{customer.email}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-emerald-700 text-xs font-black uppercase tracking-wider">Active</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
        <Shield size={18} className="text-indigo-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-indigo-900 font-black text-sm">Access Control</p>
          <p className="text-indigo-700 text-xs mt-1 leading-relaxed">
            Click a page card to toggle access. Each enabled page can be set to <strong>View Only</strong> (client reads data) or <strong>Full Access</strong> (client can also interact/book).
          </p>
        </div>
      </div>

      {/* Page cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PAGE_DEFS.map(({ key, label, icon: Icon, description, color }) => {
          const c = COLOR_MAP[color];
          const val = access[key];
          const isEnabled = val !== false && val !== undefined;

          return (
            <div
              key={key}
              onClick={() => togglePage(key)}
              className={`relative bg-white rounded-[1.75rem] border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md
                ${isEnabled ? `${c.activeBorder} ring-4 ${c.ring} shadow-sm` : "border-slate-100 hover:border-slate-200"}
              `}
            >
              {/* Enabled badge */}
              {isEnabled && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>
              )}

              <div className={`w-12 h-12 ${c.bg} border ${c.border} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon size={22} className={c.icon} />
              </div>

              <h3 className={`font-black text-base mb-1 ${isEnabled ? "text-slate-900" : "text-slate-500"}`}>{label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">{description}</p>

              {/* Access level toggle (only when enabled) */}
              {isEnabled && (
                <div
                  onClick={e => e.stopPropagation()}
                  className="flex bg-slate-100 rounded-xl p-1 gap-1"
                >
                  {[["read", Eye, "View Only"], ["full", Zap, "Full Access"]].map(([lvl, LvlIcon, lvlLabel]) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(key, lvl)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-black transition-all
                        ${val === lvl ? `bg-white shadow-sm ${c.icon} border ${c.border}` : "text-slate-400 hover:text-slate-600"}
                      `}
                    >
                      <LvlIcon size={12} /> {lvlLabel}
                    </button>
                  ))}
                </div>
              )}

              {!isEnabled && (
                <div className="py-2 text-center text-slate-300 text-xs font-black uppercase tracking-widest">
                  Click to enable
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary strip */}
      <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-3 flex-wrap">
        <p className="text-slate-400 text-xs font-bold mr-2">Enabled:</p>
        {PAGE_DEFS.filter(p => access[p.key]).map(p => (
          <span key={p.key} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-black rounded-lg">
            {p.label} · {access[p.key] === "full" ? "Full" : "Read"}
          </span>
        ))}
        {!PAGE_DEFS.some(p => access[p.key]) && (
          <span className="text-slate-600 text-xs">No pages enabled — client will see profile only</span>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl p-4">
          <AlertCircle size={16} className="text-rose-500 shrink-0" />
          <p className="text-rose-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-8 py-4 font-black rounded-2xl text-sm uppercase tracking-widest transition-all shadow-lg
            ${saved ? "bg-emerald-600 text-white shadow-emerald-600/30" : "bg-slate-900 text-white hover:bg-black shadow-slate-900/30"}
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Access"}
        </button>
      </div>
    </div>
  );
};

export default CustomerAccessPage;
