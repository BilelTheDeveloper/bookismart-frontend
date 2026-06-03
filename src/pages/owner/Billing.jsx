import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CreditCard, Zap, CheckCircle2, Clock, ArrowUpRight,
  ShieldCheck, Loader2, RefreshCw, CalendarDays, AlertTriangle,
  Star, Users, Building2, Crown, Sparkles, X,
} from "lucide-react";
import API from "../../api/config";

/* ─── Plan display config (matches server/config/plans.js) ─── */
const PLAN_CONFIG = {
  free_trial:   { label: "Free Trial",   color: "text-amber-400",   icon: <Zap className="text-amber-400 fill-amber-400" size={26} /> },
  solo_starter: { label: "Solo Starter", color: "text-emerald-400", icon: <Star className="text-emerald-400" size={26} /> },
  solo_pro:     { label: "Solo Pro",     color: "text-indigo-400",  icon: <Zap className="text-indigo-400" size={26} /> },
  team:         { label: "Team",         color: "text-sky-400",     icon: <Users className="text-sky-400" size={26} /> },
  business:     { label: "Business",     color: "text-violet-400",  icon: <Building2 className="text-violet-400" size={26} /> },
  enterprise:   { label: "Enterprise",   color: "text-fuchsia-400", icon: <Crown className="text-fuchsia-400" size={26} /> },
  // legacy ids (pre-relaunch)
  basic:        { label: "Solo Starter", color: "text-emerald-400", icon: <Star className="text-emerald-400" size={26} /> },
  premium:      { label: "Solo Pro",     color: "text-indigo-400",  icon: <Zap className="text-indigo-400" size={26} /> },
  pro:          { label: "Team",         color: "text-sky-400",     icon: <Users className="text-sky-400" size={26} /> },
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

/* ─── Upgrade catalog (audience-aware), TND/month ─── */
const UPGRADE_PLANS = {
  individual: [
    {
      id: "solo_starter", name: "Solo Starter", price: "19", color: "from-emerald-500 to-teal-600", border: "border-emerald-500/40",
      featuresKey: "billing.fSoloStarter",
    },
    {
      id: "solo_pro", name: "Solo Pro", price: "39", color: "from-indigo-500 to-violet-600", border: "border-indigo-500/40", popular: true,
      featuresKey: "billing.fSoloPro",
    },
  ],
  organization: [
    {
      id: "team", name: "Team", price: "59", color: "from-sky-500 to-cyan-600", border: "border-sky-500/40",
      featuresKey: "billing.fTeam",
    },
    {
      id: "business", name: "Business", price: "99", color: "from-indigo-500 to-violet-600", border: "border-indigo-500/40", popular: true,
      featuresKey: "billing.fBusiness",
    },
    {
      id: "enterprise", name: "Enterprise", price: "149–199", custom: true, color: "from-fuchsia-500 to-purple-700", border: "border-fuchsia-500/40",
      featuresKey: "billing.fEnterprise",
    },
  ],
};

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const fmtDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

function PlanPickerModal({ audience, onClose }) {
  const { t } = useTranslation();
  const [checkingOut, setCheckingOut] = useState(null);
  const [note, setNote] = useState("");
  const plans = UPGRADE_PLANS[audience] || UPGRADE_PLANS.individual;
  const cols = plans.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  const handleCheckout = async (plan) => {
    setCheckingOut(plan.id);
    setNote("");
    try {
      const { data } = await API.post("/payments/checkout", { plan: plan.id });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data?.contactSales) {
        setNote(t("billing.thanksEnterprise"));
      } else {
        setNote(data?.message || t("billing.checkoutComing"));
      }
    } catch (err) {
      setNote(err?.response?.data?.message || t("billing.checkoutFailed"));
    } finally {
      setCheckingOut(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d1117] rounded-[2rem] w-full max-w-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
          <div>
            <h3 className="text-2xl font-black text-white">{t("billing.modalTitle")}</h3>
            <p className="text-slate-400 text-sm mt-1">{t("billing.modalSub")}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className={`grid grid-cols-1 ${cols} gap-4 p-8`}>
          {plans.map((plan) => (
            <div key={plan.id} className={`relative bg-slate-900 border ${plan.border} rounded-2xl p-6 flex flex-col`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
                  {t("billing.mostPopular")}
                </span>
              )}
              <p className="text-white font-black text-lg">{plan.name}</p>
              <p className="mt-3 mb-5">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm font-bold"> TND{plan.custom ? "" : "/mo"}</span>
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {(t(plan.featuresKey, { returnObjects: true }) || []).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle2 size={13} className="text-indigo-400 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan)}
                disabled={!!checkingOut}
                className={`w-full py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${plan.color} text-white hover:opacity-90 disabled:opacity-50`}
              >
                {checkingOut === plan.id ? (
                  <><Loader2 size={14} className="animate-spin" /> {t("billing.processing")}</>
                ) : plan.custom ? (
                  <>{t("billing.contactSales")} <ArrowUpRight size={15} /></>
                ) : (
                  <>{t("billing.getPlan", { name: plan.name })} <ArrowUpRight size={15} /></>
                )}
              </button>
            </div>
          ))}
        </div>

        {note && (
          <p className="px-8 pb-6 -mt-3 text-center text-sm font-bold text-indigo-300">{note}</p>
        )}
      </div>
    </div>
  );
}

const STATUS_LABEL_KEYS = { trialing: "billing.statusTrialing", active: "billing.statusActive", past_due: "billing.statusPastDue", canceled: "billing.statusCanceled" };

const Billing = () => {
  const { t } = useTranslation();
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlans, setShowPlans] = useState(false);

  const fetchBilling = () => {
    setLoading(true);
    API.get("/merchant/settings/billing")
      .then((res) => { if (res.data?.success) setBilling(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBilling(); }, []);

  const data = billing?.data || {};
  const ent = billing?.entitlements || {};
  const sub = data.subscription || {};

  const planKey = ent.planId || sub.plan || "free_trial";
  const plan = PLAN_CONFIG[planKey] || PLAN_CONFIG.free_trial;
  const planLabel = planKey === "free_trial" ? t("billing.planFreeTrial") : plan.label;
  const statusLabel = STATUS_LABEL_KEYS[sub.status] ? t(STATUS_LABEL_KEYS[sub.status]) : t("billing.statusUnknown");
  const statusStyle = STATUS_STYLES[sub.status] || STATUS_STYLES.trialing;
  const daysLeft = ent.trial?.daysLeft ?? daysUntil(sub.trialEndsAt);
  const totalTrialDays = ent.trial?.totalDays || 30;
  const currency = data.currency || "TND";
  const transactions = data.transactionHistory || [];
  const audience = ent.audience || "individual";
  const onTrial = ent.trial?.active ?? (planKey === "free_trial");
  const isPaid = !onTrial && planKey !== "free_trial";

  const trialBarPct = useMemo(() => {
    if (!sub.trialEndsAt) return 0;
    const total = totalTrialDays * 24 * 60 * 60 * 1000;
    const remaining = new Date(sub.trialEndsAt) - new Date();
    return Math.max(0, Math.min(100, Math.round((remaining / total) * 100)));
  }, [sub.trialEndsAt, totalTrialDays]);

  const trialBarColor =
    daysLeft === null ? "bg-slate-400" :
    daysLeft > 14     ? "bg-emerald-500" :
    daysLeft > 5      ? "bg-amber-500"   : "bg-rose-500";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {showPlans && <PlanPickerModal audience={audience} onClose={() => setShowPlans(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t("billing.title")}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t("billing.subtitle")}</p>
        </div>
        <button
          onClick={fetchBilling}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl text-sm font-bold hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-60"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> {t("billing.refresh")}
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
                    {planLabel} {plan.icon}
                  </h2>
                )}
                {onTrial && (
                  <p className="text-slate-400 text-sm font-medium mt-2">
                    {t("billing.fullAccessTrial", { days: totalTrialDays })}
                  </p>
                )}
              </div>
              {!loading && sub.nextBillingDate && (
                <div className="text-right">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t("billing.nextBilling")}</p>
                  <p className="text-lg font-black mt-1">{fmtDate(sub.nextBillingDate)}</p>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t("billing.currency")}</p>
                <p className="text-white font-black mt-1">{currency}</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t("billing.trialEnds")}</p>
                {loading ? (
                  <div className="w-16 h-5 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-white font-black mt-1">{fmtDate(sub.trialEndsAt)}</p>
                )}
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t("billing.daysLeft")}</p>
                {loading ? (
                  <div className="w-12 h-5 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                  <p className={`font-black mt-1 ${daysLeft <= 5 ? "text-rose-400" : daysLeft <= 14 ? "text-amber-400" : "text-emerald-400"}`}>
                    {daysLeft !== null ? `${daysLeft}d` : "—"}
                  </p>
                )}
              </div>
            </div>

            {/* Trial progress bar */}
            {onTrial && !loading && daysLeft !== null && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">{t("billing.trialProgress")}</span>
                  <span className={daysLeft <= 5 ? "text-rose-400" : daysLeft <= 14 ? "text-amber-400" : "text-emerald-400"}>
                    {t("billing.remaining", { pct: trialBarPct })}
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${trialBarColor} rounded-full transition-all duration-700`} style={{ width: `${trialBarPct}%` }} />
                </div>
                {daysLeft <= 10 && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertTriangle size={12} className="text-amber-400" />
                    <p className="text-amber-300 text-[10px] font-bold">
                      {daysLeft <= 5 ? t("billing.expiringSoon") : t("billing.lessThan10")}
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

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-200">
          <div>
            <div className="p-3 bg-white/10 rounded-2xl w-fit mb-4"><Crown size={24} /></div>
            <h3 className="text-2xl font-black leading-tight">
              {isPaid ? t("billing.manageTitle") : t("billing.pickTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-indigo-100 font-medium">
              {(audience === "organization"
                ? [t("billing.ctaOrg1"), t("billing.ctaOrg2"), t("billing.ctaOrg3")]
                : [t("billing.ctaInd1"), t("billing.ctaInd2"), t("billing.ctaInd3")]
              ).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-indigo-300 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setShowPlans(true)}
            className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group mt-6"
          >
            {isPaid ? t("billing.changePlan") : t("billing.viewPlans")}
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Middle: payment method + security note */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <CreditCard className="text-indigo-600" /> {t("billing.paymentMethod")}
          </h3>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase">D17</div>
            <div>
              {isPaid ? (
                <>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-200">{t("billing.methodOnFile")}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{t("billing.methodOnFileSub")}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-black text-slate-600 dark:text-slate-300 italic">{t("billing.noMethod")}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{t("billing.noMethodSub", { days: totalTrialDays })}</p>
                </>
              )}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest">{t("billing.processedVia")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0"><ShieldCheck size={28} /></div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">{t("billing.secureBilling")}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{t("billing.secureBillingSub")}</p>
          </div>
        </div>
      </div>

      {/* Bottom: transaction history */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="text-indigo-600" /> {t("billing.transactionHistory")}
          </h3>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t("billing.records", { n: transactions.length })}</span>
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
            <p className="text-slate-400 font-black text-sm">{t("billing.noTransactions")}</p>
            <p className="text-slate-300 dark:text-slate-600 font-medium text-xs mt-1">{t("billing.noTransactionsSub")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  {[t("billing.thTxnId"), t("billing.thDate"), t("billing.thAmount"), t("billing.thStatus")].map((h) => (
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
