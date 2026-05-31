import React, { useState, useEffect, useMemo } from "react";
import {
  CreditCard, Zap, CheckCircle2, Clock, ArrowUpRight,
  ShieldCheck, Loader2, RefreshCw, CalendarDays, AlertTriangle,
  TrendingUp, Crown, Sparkles, X, ExternalLink,
} from "lucide-react";
import API from "../../api/config";

/* ─── Plan display config ─── */
const PLAN_CONFIG = {
  free_trial: { label: "Free Trial", color: "text-amber-400", icon: <Zap className="text-amber-400 fill-amber-400" size={26} /> },
  basic:      { label: "Basic",      color: "text-emerald-400", icon: <TrendingUp className="text-emerald-400" size={26} /> },
  premium:    { label: "Premium",    color: "text-indigo-400",  icon: <Crown className="text-indigo-400" size={26} /> },
  pro:        { label: "Pro",        color: "text-violet-400",  icon: <Sparkles className="text-violet-400" size={26} /> },
};

const STATUS_STYLES = {
  trialing:  "bg-amber-500/20 text-amber-300 border-amber-500/30",
  active:    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  past_due:  "bg-rose-500/20 text-rose-300 border-rose-500/30",
  canceled:  "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const STATUS_LABEL = {
  trialing: "Trial Active",
  active:   "Active",
  past_due: "Past Due",
  canceled: "Canceled",
};

const TXN_STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  Failed:    "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  Pending:   "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

/* ─── Days remaining from a date ─── */
const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

/* ─── Format date nicely ─── */
const fmtDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

/* ─── Plan picker config ─── */
const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    icon: <TrendingUp size={22} className="text-emerald-400" />,
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/40",
    features: ["Up to 3 staff members", "Unlimited bookings", "Basic analytics", "Email notifications"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 79,
    icon: <Crown size={22} className="text-indigo-400" />,
    color: "from-indigo-500 to-violet-600",
    border: "border-indigo-500/40",
    badge: "Most Popular",
    features: ["Up to 10 staff members", "Advanced analytics", "Priority support", "Custom domain", "Loyalty programs"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    icon: <Sparkles size={22} className="text-violet-400" />,
    color: "from-violet-500 to-purple-700",
    border: "border-violet-500/40",
    features: ["Unlimited staff members", "Full analytics suite", "Dedicated support", "White-label option", "API access", "All integrations"],
  },
];

function PlanPickerModal({ onClose }) {
  const [checkingOut, setCheckingOut] = useState(null);

  const handleCheckout = async (planId) => {
    setCheckingOut(planId);
    try {
      const { data } = await API.post("/payments/checkout", { plan: planId });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckingOut(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d1117] rounded-[2rem] w-full max-w-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
          <div>
            <h3 className="text-2xl font-black text-white">Choose Your Plan</h3>
            <p className="text-slate-400 text-sm mt-1">Billed monthly · Cancel anytime</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-slate-900 border ${plan.border} rounded-2xl p-6 flex flex-col`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${plan.color} bg-opacity-10`}>
                  {plan.icon}
                </div>
                <div>
                  <p className="text-white font-black">{plan.name}</p>
                  <p className="text-slate-400 text-xs">/month</p>
                </div>
              </div>

              <p className="text-3xl font-black text-white mb-5">${plan.price}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 size={13} className="text-indigo-400 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!!checkingOut}
                className={`w-full py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${plan.color} text-white hover:opacity-90 disabled:opacity-50`}
              >
                {checkingOut === plan.id ? (
                  <><Loader2 size={14} className="animate-spin" /> Processing…</>
                ) : (
                  <>Get {plan.name} <ArrowUpRight size={15} /></>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Billing = () => {
  const [billing, setBilling]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [showPlans, setShowPlans]     = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const fetchBilling = () => {
    setLoading(true);
    API.get("/merchant/settings/billing")
      .then((res) => { if (res.data?.success) setBilling(res.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBilling(); }, []);

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const { data } = await API.post("/payments/portal");
      if (data?.portalUrl) window.location.href = data.portalUrl;
    } catch {
      alert("Could not open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  const sub = billing?.subscription || {};
  const plan = PLAN_CONFIG[sub.plan] || PLAN_CONFIG.free_trial;
  const statusLabel = STATUS_LABEL[sub.status] || "Unknown";
  const statusStyle = STATUS_STYLES[sub.status] || STATUS_STYLES.trialing;
  const daysLeft = daysUntil(sub.trialEndsAt);
  const currency = billing?.currency || "TND";
  const transactions = billing?.transactionHistory || [];
  const isPaid = sub.plan && sub.plan !== "free_trial";

  const trialBarPct = useMemo(() => {
    if (!sub.trialEndsAt) return 0;
    const total = 90 * 24 * 60 * 60 * 1000;
    const remaining = new Date(sub.trialEndsAt) - new Date();
    return Math.max(0, Math.min(100, Math.round((remaining / total) * 100)));
  }, [sub.trialEndsAt]);

  const trialBarColor =
    daysLeft === null ? "bg-slate-400" :
    daysLeft > 30     ? "bg-emerald-500" :
    daysLeft > 7      ? "bg-amber-500"   : "bg-rose-500";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {showPlans && <PlanPickerModal onClose={() => setShowPlans(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Billing & Subscription</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Manage your plan, trial status, and payment history.</p>
        </div>
        <button
          onClick={fetchBilling}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl text-sm font-bold hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-60"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Top: plan card + upgrade CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Subscription card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${statusStyle}`}>
                  {statusLabel}
                </span>
                {loading ? (
                  <div className="w-48 h-10 bg-white/10 rounded-xl animate-pulse mt-4" />
                ) : (
                  <h2 className="text-4xl font-black mt-4 flex items-center gap-3">
                    {plan.label} {plan.icon}
                  </h2>
                )}
              </div>
              {!loading && sub.nextBillingDate && (
                <div className="text-right">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Next Billing</p>
                  <p className="text-lg font-black mt-1">{fmtDate(sub.nextBillingDate)}</p>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Currency</p>
                <p className="text-white font-black mt-1">{currency}</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Trial Ends</p>
                {loading ? (
                  <div className="w-16 h-5 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-white font-black mt-1">{fmtDate(sub.trialEndsAt)}</p>
                )}
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Days Left</p>
                {loading ? (
                  <div className="w-12 h-5 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                  <p className={`font-black mt-1 ${daysLeft <= 7 ? "text-rose-400" : daysLeft <= 30 ? "text-amber-400" : "text-emerald-400"}`}>
                    {daysLeft !== null ? `${daysLeft}d` : "—"}
                  </p>
                )}
              </div>
            </div>

            {/* Trial progress bar */}
            {sub.plan === "free_trial" && !loading && daysLeft !== null && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Trial Progress</span>
                  <span className={daysLeft <= 7 ? "text-rose-400" : daysLeft <= 30 ? "text-amber-400" : "text-emerald-400"}>
                    {trialBarPct}% remaining
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${trialBarColor} rounded-full transition-all duration-700`} style={{ width: `${trialBarPct}%` }} />
                </div>
                {daysLeft <= 14 && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertTriangle size={12} className="text-amber-400" />
                    <p className="text-amber-300 text-[10px] font-bold">
                      {daysLeft <= 7 ? "Trial expiring soon — upgrade to keep access." : "Less than 2 weeks left on your trial."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
        </div>

        {/* Upgrade / Manage CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-200">
          <div>
            <div className="p-3 bg-white/10 rounded-2xl w-fit mb-4"><Crown size={24} /></div>
            {isPaid ? (
              <>
                <h3 className="text-2xl font-black leading-tight">Manage Your<br />Subscription</h3>
                <p className="mt-3 text-indigo-100 text-sm font-medium">Update payment method, download invoices, or cancel your plan from the Stripe billing portal.</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black leading-tight">Switch to Pro &<br />Scale Faster</h3>
                <ul className="mt-4 space-y-2 text-sm text-indigo-100 font-medium">
                  {["Unlimited staff members", "Advanced analytics", "Priority support", "Custom domain"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-indigo-300 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {isPaid ? (
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-60"
            >
              {portalLoading ? <><Loader2 size={16} className="animate-spin" /> Opening…</> : <><ExternalLink size={16} /> Billing Portal</>}
            </button>
          ) : (
            <button
              onClick={() => setShowPlans(true)}
              className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group mt-6"
            >
              Upgrade Now
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Middle: payment method + security note */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="text-indigo-600" /> Payment Method
            </h3>
            {isPaid && (
              <button
                onClick={openPortal}
                disabled={portalLoading}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                {portalLoading ? <Loader2 size={12} className="animate-spin" /> : <ExternalLink size={12} />}
                Manage
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase">Card</div>
            <div>
              {isPaid ? (
                <>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200">Payment method on file</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Managed securely via Stripe. Click "Manage" to update.</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-black text-slate-600 dark:text-slate-300 italic">No payment method added yet</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Your trial is currently free of charge.</p>
                </>
              )}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest">Payments processed securely via Stripe.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0"><ShieldCheck size={28} /></div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">Secure Billing</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">All transactions are encrypted and processed securely via certified Tunisian payment partners. Your data is never stored unencrypted.</p>
          </div>
        </div>
      </div>

      {/* Bottom: transaction history */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="text-indigo-600" /> Transaction History
          </h3>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{transactions.length} records</span>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-20 text-center">
            <CalendarDays size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-black text-sm">No transactions yet</p>
            <p className="text-slate-300 dark:text-slate-600 font-medium text-xs mt-1">Your billing history will appear here once charges begin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  {["Transaction ID", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {transactions.map((txn, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400">{txn.transactionId || `TXN-${String(i + 1).padStart(4, "0")}`}</td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900 dark:text-white">{fmtDate(txn.date)}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900 dark:text-white">{(txn.amount || 0).toFixed(3)} {currency}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${TXN_STATUS_STYLES[txn.status] || "bg-slate-100 text-slate-600"}`}>
                        {txn.status || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Billing;
