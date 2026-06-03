import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Package, Crown, Gift, Plus, Trash2, Pencil, X, Loader2, Users,
  DollarSign, Check, CalendarClock, Ticket, Ban, Sparkles, ChevronRight,
} from "lucide-react";
import API from "../../api/config";

const KIND_META = {
  package:    { labelKey: "packages.kindPackage",    icon: Package, accent: "indigo", hintKey: "packages.hintPackage" },
  membership: { labelKey: "packages.kindMembership", icon: Crown,   accent: "violet", hintKey: "packages.hintMembership" },
  giftcard:   { labelKey: "packages.kindGiftcard",   icon: Gift,    accent: "rose",   hintKey: "packages.hintGiftcard" },
};
const ACCENT = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/15", chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" },
  violet: { text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/15", chip: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  rose:   { text: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-50 dark:bg-rose-500/15",     chip: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" },
};
const emptyOffer = { kind: "package", name: "", description: "", price: "", sessions: 5, durationDays: 30, value: "", serviceTitle: "" };

const Packages = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("offers");
  const [offers, setOffers] = useState([]);
  const [issued, setIssued] = useState([]);
  const [stats, setStats] = useState({ activeOffers: 0, activeIssued: 0, giftOutstanding: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [issuedFilter, setIssuedFilter] = useState("");

  const [offerModal, setOfferModal] = useState(null); // null | offer obj (new or editing)
  const [issueModal, setIssueModal] = useState(null); // null | offer to issue
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [o, i, s] = await Promise.all([
        API.get("/merchant/packages/offers"),
        API.get("/merchant/packages/issued"),
        API.get("/merchant/packages/stats"),
      ]);
      setOffers(o.data.offers || []);
      setIssued(i.data.issued || []);
      setStats(s.data.stats || {});
    } catch { toast.error(t("packages.loadError")); }
    finally { setLoading(false); }
  }, [t]);
  useEffect(() => { load(); }, [load]);

  const saveOffer = async () => {
    const o = offerModal;
    if (!o.name?.trim()) { toast.error(t("packages.nameRequired")); return; }
    setBusy(true);
    try {
      if (o._id) await API.put(`/merchant/packages/offers/${o._id}`, o);
      else await API.post("/merchant/packages/offers", o);
      setOfferModal(null); toast.success(t("packages.saved")); load();
    } catch (e) { toast.error(e.response?.data?.message || t("packages.saveFailed")); }
    finally { setBusy(false); }
  };
  const deleteOffer = async (id) => {
    if (!window.confirm(t("packages.deleteConfirm"))) return;
    try { await API.delete(`/merchant/packages/offers/${id}`); load(); } catch { toast.error(t("packages.deleteFailed")); }
  };
  const issue = async (form) => {
    setBusy(true);
    try {
      await API.post("/merchant/packages/issue", { offerId: issueModal._id, ...form });
      setIssueModal(null); toast.success(t("packages.issued")); setTab("issued"); load();
    } catch (e) { toast.error(e.response?.data?.message || t("packages.issueFailed")); }
    finally { setBusy(false); }
  };
  const redeem = async (cp) => {
    let amount = 1;
    if (cp.kind === "giftcard") {
      const v = window.prompt(t("packages.redeemPrompt", { balance: cp.balance }), "");
      if (v == null) return; amount = Number(v);
    }
    try { await API.post(`/merchant/packages/issued/${cp._id}/redeem`, { amount }); toast.success(t("packages.redeemed")); load(); }
    catch (e) { toast.error(e.response?.data?.message || t("packages.redeemFailed")); }
  };
  const cancelIssued = async (id) => {
    if (!window.confirm(t("packages.cancelConfirm"))) return;
    try { await API.delete(`/merchant/packages/issued/${id}`); load(); } catch { toast.error(t("packages.cancelFailed")); }
  };

  const issuedShown = issuedFilter ? issued.filter((i) => i.kind === issuedFilter) : issued;

  const kpis = [
    { label: t("packages.kpiActiveOffers"), value: stats.activeOffers, icon: Ticket, accent: "indigo" },
    { label: t("packages.kpiActiveSold"), value: stats.activeIssued, icon: Users, accent: "violet" },
    { label: t("packages.kpiGiftBalance"), value: `${(stats.giftOutstanding || 0).toFixed(0)} TND`, icon: Gift, accent: "rose" },
    { label: t("packages.kpiPackageRevenue"), value: `${(stats.totalRevenue || 0).toFixed(0)} TND`, icon: DollarSign, accent: "indigo" },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white"><Sparkles className="text-indigo-600 dark:text-indigo-400" /> {t("packages.title")}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t("packages.subtitle")}</p>
        </div>
        <button onClick={() => setOfferModal({ ...emptyOffer })} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-black text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-500 transition-all active:scale-95">
          <Plus size={18} /> {t("packages.newOffer")}
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const a = ACCENT[k.accent]; const Icon = k.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${a.bg} ${a.text} flex items-center justify-center mb-3`}><Icon size={18} /></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{loading ? "—" : k.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 gap-1 w-fit">
        {[["offers", t("packages.tabOffers")], ["issued", t("packages.tabIssued")]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${tab === id ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>{label}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-indigo-500" size={28} /></div>
      ) : tab === "offers" ? (
        offers.length === 0 ? (
          <Empty icon={Ticket} title={t("packages.noOffers")} sub={t("packages.noOffersSub")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {offers.map((o) => {
              const meta = KIND_META[o.kind]; const a = ACCENT[meta.accent]; const Icon = meta.icon;
              return (
                <div key={o._id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${a.bg} ${a.text} flex items-center justify-center`}><Icon size={20} /></div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${a.chip}`}>{t(meta.labelKey)}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-white">{o.name}</h3>
                  {o.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{o.description}</p>}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{o.price} <small className="text-sm text-slate-400">TND</small></span>
                    <span className="text-xs font-bold text-slate-400">
                      {o.kind === "package" && t("packages.sessionsSuffix", { n: o.sessions })}
                      {o.kind === "membership" && t("packages.daysSuffix", { n: o.durationDays })}
                      {o.kind === "giftcard" && t("packages.valueSuffix", { n: o.value })}
                    </span>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <button onClick={() => setIssueModal(o)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white py-2.5 text-xs font-black hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all"><Users size={14} /> {t("packages.issueSell")}</button>
                    <button onClick={() => setOfferModal(o)} className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={15} /></button>
                    <button onClick={() => deleteOffer(o._id)} className="p-2.5 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"><Trash2 size={15} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {[["", t("packages.filterAll")], ["package", t("packages.filterPackages")], ["membership", t("packages.filterMemberships")], ["giftcard", t("packages.filterGiftcards")]].map(([id, label]) => (
              <button key={id} onClick={() => setIssuedFilter(id)} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${issuedFilter === id ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700"}`}>{label}</button>
            ))}
          </div>
          {issuedShown.length === 0 ? (
            <Empty icon={Users} title={t("packages.nothingIssued")} sub={t("packages.nothingIssuedSub")} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issuedShown.map((cp) => {
                const meta = KIND_META[cp.kind]; const a = ACCENT[meta.accent]; const Icon = meta.icon;
                const remaining = cp.kind === "package" ? t("packages.remainingPackage", { left: cp.sessionsTotal - cp.sessionsUsed, total: cp.sessionsTotal })
                  : cp.kind === "giftcard" ? t("packages.remainingGift", { balance: cp.balance, value: cp.value })
                  : cp.expiresAt ? t("packages.remainingUntil", { date: new Date(cp.expiresAt).toLocaleDateString("en-GB") }) : "";
                const statusColor = cp.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400";
                return (
                  <div key={cp._id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${a.bg} ${a.text} flex items-center justify-center shrink-0`}><Icon size={20} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-slate-900 dark:text-white truncate">{cp.customerName || t("packages.customer")}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${statusColor}`}>{cp.status === "active" ? t("packages.stActive") : cp.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{cp.name} · {remaining}</p>
                        {cp.code && <p className="text-[11px] font-black tracking-widest mt-1 text-rose-500 dark:text-rose-400">{cp.code}</p>}
                      </div>
                    </div>
                    {cp.status === "active" && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <button onClick={() => redeem(cp)} className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black text-white ${a.text.includes("rose") ? "bg-rose-500 hover:bg-rose-600" : "bg-indigo-600 hover:bg-indigo-500"} transition-all`}>
                          <Check size={14} /> {cp.kind === "package" ? t("packages.useSession") : cp.kind === "giftcard" ? t("packages.redeem") : t("packages.logVisit")}
                        </button>
                        <button onClick={() => cancelIssued(cp._id)} className="p-2.5 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"><Ban size={15} /></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Offer create/edit modal */}
      {offerModal && <OfferModal offer={offerModal} setOffer={setOfferModal} onSave={saveOffer} busy={busy} />}
      {/* Issue modal */}
      {issueModal && <IssueModal offer={issueModal} onClose={() => setIssueModal(null)} onIssue={issue} busy={busy} />}
    </div>
  );
};

const Empty = ({ icon: Icon, title, sub }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-16 text-center">
    <Icon size={36} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
    <p className="text-lg font-black text-slate-700 dark:text-slate-200">{title}</p>
    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{sub}</p>
  </div>
);

const fieldCls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500";

const OfferModal = ({ offer, setOffer, onSave, busy }) => {
  const { t } = useTranslation();
  const upd = (k, v) => setOffer((o) => ({ ...o, [k]: v }));
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setOffer(null)}>
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">{offer._id ? t("packages.offerEdit") : t("packages.offerNew")}</h3>
          <button onClick={() => setOffer(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(KIND_META).map(([k, m]) => {
              const Icon = m.icon; const active = offer.kind === k;
              return (
                <button key={k} onClick={() => upd("kind", k)} className={`rounded-xl border py-3 flex flex-col items-center gap-1.5 transition-all ${active ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15" : "border-slate-200 dark:border-slate-700"}`}>
                  <Icon size={18} className={active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"} />
                  <span className={`text-[10px] font-black ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`}>{t(m.labelKey)}</span>
                </button>
              );
            })}
          </div>
          <input value={offer.name} onChange={(e) => upd("name", e.target.value)} className={fieldCls} placeholder={t("packages.namePlaceholder")} />
          <textarea value={offer.description} onChange={(e) => upd("description", e.target.value)} rows={2} className={`${fieldCls} resize-none`} placeholder={t("packages.descPlaceholder")} />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">{t("packages.priceTnd")}</label>
              <input type="number" value={offer.price} onChange={(e) => upd("price", e.target.value)} className={fieldCls} placeholder="0" />
            </div>
            {offer.kind === "package" && <div><label className="text-[10px] font-black uppercase text-slate-400">{t("packages.sessions")}</label><input type="number" value={offer.sessions} onChange={(e) => upd("sessions", e.target.value)} className={fieldCls} /></div>}
            {offer.kind === "membership" && <div><label className="text-[10px] font-black uppercase text-slate-400">{t("packages.validDays")}</label><input type="number" value={offer.durationDays} onChange={(e) => upd("durationDays", e.target.value)} className={fieldCls} /></div>}
            {offer.kind === "giftcard" && <div><label className="text-[10px] font-black uppercase text-slate-400">{t("packages.cardValue")}</label><input type="number" value={offer.value} onChange={(e) => upd("value", e.target.value)} className={fieldCls} /></div>}
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setOffer(null)} className="flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800 py-3 font-black text-slate-600 dark:text-slate-300">{t("packages.cancel")}</button>
          <button onClick={onSave} disabled={busy} className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 font-black text-white hover:bg-indigo-500 disabled:opacity-60">{busy ? <Loader2 size={16} className="animate-spin" /> : t("packages.saveOffer")}</button>
        </div>
      </div>
    </div>
  );
};

const IssueModal = ({ offer, onClose, onIssue, busy }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ customerName: "", customerEmail: "", customerPhone: "", pricePaid: offer.price });
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">{t("packages.issueTitle", { name: offer.name })}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
        </div>
        <p className="text-xs text-slate-400 mb-5">{t(KIND_META[offer.kind].labelKey)} · {offer.price} TND</p>
        <div className="space-y-3">
          <input value={form.customerName} onChange={(e) => upd("customerName", e.target.value)} className={fieldCls} placeholder={t("packages.custName")} />
          <input value={form.customerPhone} onChange={(e) => upd("customerPhone", e.target.value)} className={fieldCls} placeholder={t("packages.phone")} />
          <input value={form.customerEmail} onChange={(e) => upd("customerEmail", e.target.value)} className={fieldCls} placeholder={t("packages.emailOpt")} />
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">{t("packages.amountPaid")}</label>
            <input type="number" value={form.pricePaid} onChange={(e) => upd("pricePaid", e.target.value)} className={fieldCls} />
          </div>
        </div>
        <button onClick={() => onIssue(form)} disabled={busy} className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 font-black text-white hover:bg-indigo-500 disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <><ChevronRight size={16} /> {t("packages.confirmIssue")}</>}
        </button>
      </div>
    </div>
  );
};

export default Packages;
