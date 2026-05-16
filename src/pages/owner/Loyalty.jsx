import React, { useEffect, useState, useCallback } from "react";
import {
  Star, Stamp, Gift, Tag, Plus, X, ToggleLeft, ToggleRight, Trash2,
  Users, TrendingUp, AlertCircle, CheckCircle2, Edit2, Copy, Check,
  Zap, Heart, Award, Calendar
} from "lucide-react";
import API from "../../api/config";

const fmt = (n) => (n ?? 0).toLocaleString("en", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

// ── Discount Code Form Modal ──────────────────────────────────────────────────
function CodeModal({ onClose, onSave }) {
  const [form, setForm] = useState({ code: "", type: "fixed", value: "", maxUses: "", expiresAt: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code.trim()) { setError("Code is required."); return; }
    if (!form.value || parseFloat(form.value) <= 0) { setError("Value must be greater than 0."); return; }
    if (form.type === "percent" && parseFloat(form.value) > 100) { setError("Percent cannot exceed 100."); return; }
    setError(""); setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create code.");
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors">
          <X size={22} />
        </button>
        <h2 className="text-2xl font-black text-slate-900 mb-6">New Discount Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Code (auto-uppercased)</label>
            <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "") }))}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-black text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="SUMMER25" maxLength={30} required />
            <p className="text-xs text-slate-400 font-bold mt-1">Letters, numbers, dashes and underscores only.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Discount Type</label>
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                {["fixed", "percent"].map(t => (
                  <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2 rounded-lg font-black text-xs capitalize transition-all ${
                      form.type === t ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-800"
                    }`}>{t === "fixed" ? "TND" : "%"} {t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                Value ({form.type === "fixed" ? "TND" : "%"})
              </label>
              <input type="number" min="0.01" step="0.01" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder={form.type === "fixed" ? "10.000" : "15"} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Max Uses (0 = unlimited)</label>
              <input type="number" min="0" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Expires At</label>
              <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Description (optional)</label>
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Summer promotion code" maxLength={200} />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-3 rounded-xl text-sm font-bold">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <button type="submit" disabled={saving}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60">
            {saving ? "Creating..." : "Create Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Loyalty Page ─────────────────────────────────────────────────────────
const Loyalty = () => {
  const [program, setProgram] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loadingProgram, setLoadingProgram] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState("program"); // program | codes | customers

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProgram = async () => {
    setLoadingProgram(true);
    try {
      const res = await API.get("/merchant/loyalty/program");
      if (res.data?.success) setProgram(res.data.data);
    } catch { /* silent */ } finally { setLoadingProgram(false); }
  };

  const loadCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const res = await API.get("/merchant/loyalty/customers?limit=100");
      if (res.data?.success) setCustomers(res.data.data);
    } catch { /* silent */ } finally { setLoadingCustomers(false); }
  };

  useEffect(() => { loadProgram(); loadCustomers(); }, []);

  const handleSaveProgram = async () => {
    if (!program) return;
    setSaving(true);
    try {
      const res = await API.put("/merchant/loyalty/program", program);
      if (res.data?.success) { setProgram(res.data.data); showToast("Program settings saved."); }
    } catch { showToast("Failed to save.", "error"); } finally { setSaving(false); }
  };

  const handleAddCode = async (form) => {
    await API.post("/merchant/loyalty/program/codes", form);
    showToast("Discount code created.");
    loadProgram();
  };

  const handleToggleCode = async (codeId) => {
    try {
      await API.patch(`/merchant/loyalty/program/codes/${codeId}/toggle`);
      loadProgram();
    } catch { showToast("Failed to toggle code.", "error"); }
  };

  const handleDeleteCode = async (codeId) => {
    if (!window.confirm("Delete this discount code?")) return;
    try {
      await API.delete(`/merchant/loyalty/program/codes/${codeId}`);
      showToast("Code deleted."); loadProgram();
    } catch { showToast("Failed to delete.", "error"); }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const setProp = (k, v) => setProgram(p => ({ ...p, [k]: v }));

  if (loadingProgram) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-bold">
        Loading loyalty program...
      </div>
    );
  }

  const activeCodes = program?.discountCodes?.filter(c => c.isActive) || [];
  const totalPointsAwarded = customers.reduce((s, c) => s + (c.points || 0), 0);
  const totalStampsAwarded = customers.reduce((s, c) => s + (c.stamps || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${
          toast.type === "error" ? "bg-rose-500" : "bg-emerald-500"
        }`}>
          {toast.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Loyalty & Rewards</h1>
          <p className="text-slate-500 font-medium mt-1">Build customer loyalty with points, stamps & discount codes.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Master toggle */}
          <button onClick={() => { setProp("isActive", !program?.isActive); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
              program?.isActive
                ? "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700"
                : "bg-slate-200 text-slate-600 hover:bg-slate-300"
            }`}>
            {program?.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            {program?.isActive ? "Program Active" : "Program Inactive"}
          </button>
          <button onClick={handleSaveProgram} disabled={saving}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Enrolled Customers", value: customers.length, icon: <Users size={18} />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Codes", value: activeCodes.length, icon: <Tag size={18} />, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Total Points Given", value: totalPointsAwarded.toLocaleString(), icon: <Star size={18} />, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Stamps", value: totalStampsAwarded.toLocaleString(), icon: <Award size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className={`inline-flex p-3 ${s.bg} ${s.color} rounded-2xl mb-4`}>{s.icon}</div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { key: "program",   label: "Program Setup",   icon: <Zap size={16} /> },
          { key: "codes",     label: "Discount Codes",  icon: <Tag size={16} /> },
          { key: "customers", label: "Customer Points",  icon: <Users size={16} /> },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all ${
              activeTab === t.key ? "bg-white text-indigo-600 shadow-md" : "text-slate-500 hover:text-slate-800"
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Program Setup Tab ── */}
      {activeTab === "program" && program && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Program Info */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
            <h3 className="text-xl font-black text-slate-900">Program Details</h3>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Program Name</label>
              <input value={program.programName || ""} onChange={e => setProp("programName", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="My Loyalty Rewards" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Program Description</label>
              <textarea value={program.programDescription || ""} onChange={e => setProp("programDescription", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={3} placeholder="Earn rewards on every visit..." />
            </div>

            {/* Mode selector */}
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-3">Reward Mode</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { mode: "points", icon: <Star size={20} />, label: "Points System", desc: "Customers earn points per booking" },
                  { mode: "stamps", icon: <Stamp size={20} />, label: "Stamp Card", desc: "N visits = free reward" },
                ].map(m => (
                  <button key={m.mode} onClick={() => setProp("mode", m.mode)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                      program.mode === m.mode
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}>
                    <div className={`mt-0.5 ${program.mode === m.mode ? "text-indigo-600" : "text-slate-400"}`}>{m.icon}</div>
                    <div>
                      <p className={`font-black text-sm ${program.mode === m.mode ? "text-indigo-700" : "text-slate-700"}`}>{m.label}</p>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mode-specific settings */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-5">
            {program.mode === "points" ? (
              <>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Star size={20} className="text-amber-500" /> Points Configuration
                </h3>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Points per Booking</label>
                  <input type="number" min="1" value={program.pointsPerBooking || 10} onChange={e => setProp("pointsPerBooking", parseInt(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <p className="text-xs text-slate-400 font-bold mt-1">Points awarded automatically after each completed booking</p>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Points Needed to Redeem Reward</label>
                  <input type="number" min="1" value={program.pointsToRedeem || 100} onChange={e => setProp("pointsToRedeem", parseInt(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Reward Value</label>
                    <input type="number" min="0" step="0.5" value={program.rewardValue || 5} onChange={e => setProp("rewardValue", parseFloat(e.target.value))}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Reward Type</label>
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-xl h-[46px]">
                      {["fixed", "percent"].map(t => (
                        <button key={t} type="button" onClick={() => setProp("rewardType", t)}
                          className={`flex-1 rounded-lg font-black text-xs capitalize transition-all ${
                            program.rewardType === t ? "bg-indigo-600 text-white shadow" : "text-slate-500"
                          }`}>{t === "fixed" ? "TND off" : "% off"}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-3">
                  <Star size={18} className="text-amber-500 shrink-0" />
                  <p className="text-sm text-amber-800 font-bold">
                    Every {program.pointsPerBooking} points per booking → {program.pointsToRedeem} points = {program.rewardValue}{program.rewardType === "percent" ? "%" : " TND"} discount
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Stamp size={20} className="text-violet-500" /> Stamp Card Configuration
                </h3>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Stamps Needed for Reward</label>
                  <input type="number" min="2" max="50" value={program.stampsNeeded || 10} onChange={e => setProp("stampsNeeded", parseInt(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <p className="text-xs text-slate-400 font-bold mt-1">One stamp is awarded per completed booking</p>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Reward Description</label>
                  <input value={program.stampReward || ""} onChange={e => setProp("stampReward", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Free haircut of your choice" maxLength={200} />
                </div>
                {/* Visual stamp card preview */}
                <div className="bg-violet-50 rounded-2xl p-5">
                  <p className="text-xs font-black text-violet-400 uppercase tracking-widest mb-3">Stamp Card Preview</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: Math.min(program.stampsNeeded || 10, 15) }, (_, i) => (
                      <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black border-2 transition-all ${
                        i < 3 ? "bg-violet-600 border-violet-600 text-white shadow-md" : "border-violet-200 text-violet-200"
                      }`}>
                        {i < 3 ? <Stamp size={16} /> : i + 1}
                      </div>
                    ))}
                    {(program.stampsNeeded || 10) > 15 && (
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black border-2 border-violet-200 text-violet-300">
                        +{(program.stampsNeeded || 10) - 15}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-violet-700 font-bold mt-3">
                    🎁 After {program.stampsNeeded} visits: "{program.stampReward || 'Free reward'}"
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Discount Codes Tab ── */}
      {activeTab === "codes" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">Discount Codes</h3>
              <p className="text-slate-400 text-sm font-medium mt-0.5">Create promo codes customers can apply at booking.</p>
            </div>
            <button onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
              <Plus size={16} /> New Code
            </button>
          </div>

          {!program?.discountCodes?.length ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <Tag size={40} className="mb-3 opacity-30" />
              <p className="font-bold">No discount codes yet</p>
              <p className="text-sm mt-1">Create your first promo code to boost bookings.</p>
            </div>
          ) : (
            <div className="p-6 space-y-3">
              {program.discountCodes.map(code => {
                const isExpired = code.expiresAt && new Date(code.expiresAt) < new Date();
                const isMaxed = code.maxUses > 0 && code.usedCount >= code.maxUses;
                return (
                  <div key={code._id} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    !code.isActive || isExpired || isMaxed
                      ? "border-slate-100 bg-slate-50 opacity-60"
                      : "border-indigo-100 bg-indigo-50/50 hover:border-indigo-200"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xl text-slate-900 tracking-widest font-mono">{code.code}</span>
                          <button onClick={() => copyCode(code.code)} className="text-slate-300 hover:text-indigo-500 transition-colors">
                            {copiedCode === code.code ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-black text-indigo-600">
                            {code.type === "fixed" ? `−${code.value} TND` : `−${code.value}%`}
                          </span>
                          {code.description && <span className="text-xs text-slate-400 font-bold">{code.description}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs">
                        <p className="font-black text-slate-600">{code.usedCount} / {code.maxUses || "∞"} uses</p>
                        {code.expiresAt && (
                          <p className={`font-bold mt-0.5 ${isExpired ? "text-rose-500" : "text-slate-400"}`}>
                            {isExpired ? "Expired" : `Expires ${new Date(code.expiresAt).toLocaleDateString("en-GB")}`}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          code.isActive && !isExpired && !isMaxed
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-200 text-slate-500"
                        }`}>{code.isActive && !isExpired && !isMaxed ? "Active" : "Inactive"}</span>
                        <button onClick={() => handleToggleCode(code._id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                          {code.isActive ? <ToggleRight size={20} className="text-indigo-500" /> : <ToggleLeft size={20} />}
                        </button>
                        <button onClick={() => handleDeleteCode(code._id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Customers Tab ── */}
      {activeTab === "customers" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-900">Customer Loyalty Points</h3>
            <p className="text-slate-400 text-sm font-medium mt-0.5">Track each customer's points, stamps and visit history.</p>
          </div>

          {loadingCustomers ? (
            <div className="flex items-center justify-center h-40 text-slate-400 font-bold">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <Heart size={40} className="mb-3 opacity-30" />
              <p className="font-bold">No loyalty customers yet</p>
              <p className="text-sm mt-1">Award points after completing bookings to see them here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/70">
                    {["Customer","Points","Stamps","Visits","Total Spend","Last Visit"].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {customers.map(c => (
                    <tr key={c._id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-900 text-sm">{c.customerName}</p>
                        <p className="text-xs text-slate-400 font-bold">{c.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 font-black text-amber-600">
                          <Star size={14} className="fill-amber-400 text-amber-400" /> {c.points}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 font-black text-violet-600">
                          <Stamp size={14} /> {c.stamps}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-700">{c.totalVisits}</td>
                      <td className="px-6 py-4 font-black text-emerald-600">{fmt(c.totalSpend)} TND</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-500">
                        {c.lastVisitAt ? new Date(c.lastVisitAt).toLocaleDateString("en-GB") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCodeModal && (
        <CodeModal onClose={() => setShowCodeModal(false)} onSave={handleAddCode} />
      )}
    </div>
  );
};

export default Loyalty;
