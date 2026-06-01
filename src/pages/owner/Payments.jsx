import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  CreditCard, Wallet, Loader2, ShieldCheck, Percent, Coins,
  CheckCircle2, XCircle, Clock, DollarSign, Check,
} from "lucide-react";
import API from "../../api/config";

const STATUS_STYLE = {
  paid:      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  pending:   "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  failed:    "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  cancelled: "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
};

const Payments = () => {
  const [providers, setProviders] = useState({ enabled: false, flouci: false, konnect: false, default: "flouci" });
  const [policy, setPolicy] = useState({ depositEnabled: false, depositType: "fixed", depositValue: 0, provider: "flouci" });
  const [payments, setPayments] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, l] = await Promise.all([API.get("/payments/status"), API.get("/payments/list")]);
      setProviders(s.data.providers || {});
      setPolicy(s.data.policy || {});
      setPayments(l.data.payments || []);
      setTotalPaid(l.data.totalPaid || 0);
    } catch { toast.error("Could not load payments."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const savePolicy = async () => {
    setSaving(true);
    try { await API.put("/payments/deposit-policy", policy); toast.success("Deposit policy saved"); }
    catch (e) { toast.error(e.response?.data?.message || "Save failed"); }
    finally { setSaving(false); }
  };

  const upd = (k, v) => setPolicy((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-7">
      <div>
        <h1 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white"><CreditCard className="text-indigo-600 dark:text-indigo-400" /> Payments & Deposits</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Take deposits at booking to stop no-shows — paid via Tunisian gateways.</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3"><DollarSign size={18} /></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collected</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{loading ? "—" : `${totalPaid.toFixed(0)} TND`}</p>
        </div>
        <ProviderCard name="Flouci" on={providers.flouci} />
        <ProviderCard name="Konnect" on={providers.konnect} />
        <div className={`rounded-3xl border p-5 shadow-sm ${providers.enabled ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10" : "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10"}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${providers.enabled ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400"}`}><ShieldCheck size={18} /></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payments</p>
          <p className="text-sm font-black text-slate-900 dark:text-white mt-1">{providers.enabled ? "Enabled" : "Not enabled"}</p>
        </div>
      </div>

      {!providers.enabled && (
        <div className="rounded-3xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5 text-sm font-medium text-amber-800 dark:text-amber-300">
          Add your gateway keys to the server <code className="font-black">.env</code> (<code>PAYMENTS_ENABLED</code>, <code>FLOUCI_APP_TOKEN/SECRET</code> or <code>KONNECT_API_KEY/WALLET_ID</code>) to start collecting deposits. You can configure your policy below in the meantime.
        </div>
      )}

      {/* Deposit policy */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2"><ShieldCheck size={18} className="text-indigo-500" /> Deposit policy</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Require a deposit to confirm a booking.</p>
          </div>
          <button onClick={() => upd("depositEnabled", !policy.depositEnabled)} className={`relative w-14 h-8 rounded-full transition-all ${policy.depositEnabled ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`}>
            <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${policy.depositEnabled ? "left-7" : "left-1"}`} />
          </button>
        </div>

        {policy.depositEnabled && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Type</label>
              <div className="flex gap-2 mt-2">
                {[["fixed", "Fixed", Coins], ["percent", "Percent", Percent]].map(([id, label, Icon]) => (
                  <button key={id} onClick={() => upd("depositType", id)} className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black ${policy.depositType === id ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}><Icon size={13} /> {label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">{policy.depositType === "percent" ? "Percent of price" : "Amount (TND)"}</label>
              <input type="number" min="0" value={policy.depositValue} onChange={(e) => upd("depositValue", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500" placeholder={policy.depositType === "percent" ? "30" : "10"} />
            </div>
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Gateway</label>
              <div className="flex gap-2 mt-2">
                {["flouci", "konnect"].map((p) => (
                  <button key={p} onClick={() => upd("provider", p)} className={`flex-1 capitalize py-2.5 rounded-xl text-xs font-black ${policy.provider === p ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button onClick={savePolicy} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-black text-white hover:bg-indigo-500 transition-all disabled:opacity-60">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save policy
        </button>
      </div>

      {/* History */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 dark:border-slate-800">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2"><Clock size={18} className="text-indigo-500" /> Payment history</h3>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-indigo-500" size={24} /></div>
        ) : payments.length === 0 ? (
          <div className="py-14 text-center">
            <Wallet size={32} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
            <p className="font-black text-slate-700 dark:text-slate-200">No payments yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Deposits and payments will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {payments.map((p) => (
              <div key={p._id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0"><CreditCard size={17} /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-900 dark:text-white truncate">{p.customerName || "Customer"} · {p.amount} TND</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{p.kind} · {p.provider} · {new Date(p.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shrink-0 ${STATUS_STYLE[p.status] || STATUS_STYLE.pending}`}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProviderCard = ({ name, on }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 flex items-center justify-center mb-3"><Wallet size={18} /></div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{name}</p>
    <p className="text-sm font-black mt-1 flex items-center gap-1.5">{on ? <><CheckCircle2 size={15} className="text-emerald-500" /> <span className="text-slate-900 dark:text-white">Connected</span></> : <><XCircle size={15} className="text-slate-400" /> <span className="text-slate-400">Not set</span></>}</p>
  </div>
);

export default Payments;
