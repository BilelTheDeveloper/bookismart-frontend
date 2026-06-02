import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck, ShieldAlert, Ban, UserX, Plus, Trash2, X, Loader2,
  AlertTriangle, Phone, Mail, CalendarX2,
} from "lucide-react";
import API from "../../api/config";

const NoShowProtection = () => {
  const { t } = useTranslation();
  const [offenders, setOffenders] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { name,email,phone,reason }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [o, b] = await Promise.all([
        API.get("/merchant/no-show/offenders"),
        API.get("/merchant/no-show/blocked"),
      ]);
      setOffenders(o.data.offenders || []);
      setBlocked(b.data.blocked || []);
    } catch { toast.error(t("noShow.loadError")); }
    finally { setLoading(false); }
  }, [t]);
  useEffect(() => { load(); }, [load]);

  const block = async (payload) => {
    try {
      await API.post("/merchant/no-show/block", payload);
      toast.success(t("noShow.blocked"));
      setModal(null);
      load();
    } catch (e) { toast.error(e.response?.data?.message || t("noShow.blockFail")); }
  };
  const unblock = async (id) => {
    try { await API.delete(`/merchant/no-show/blocked/${id}`); toast.success(t("noShow.unblocked")); load(); }
    catch { toast.error(t("noShow.unblockFail")); }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white"><ShieldCheck className="text-indigo-600 dark:text-indigo-400" /> {t("noShow.title")}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t("noShow.subtitle")}</p>
        </div>
        <button onClick={() => setModal({ name: "", email: "", phone: "", reason: "" })} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 dark:bg-indigo-600 px-5 py-3 font-black text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all active:scale-95">
          <Plus size={18} /> {t("noShow.blockContact")}
        </button>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-3xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5">
        <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{t("noShow.banner")}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-indigo-500" size={28} /></div>
      ) : (
        <>
          {/* Repeat offenders */}
          <section>
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3"><ShieldAlert size={15} className="text-rose-500" /> {t("noShow.repeatOffenders", { n: offenders.length })}</h2>
            {offenders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 text-center">
                <ShieldCheck size={32} className="mx-auto mb-3 text-emerald-400" />
                <p className="font-black text-slate-700 dark:text-slate-200">{t("noShow.noOffenders")}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t("noShow.noOffendersSub")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offenders.map((o) => (
                  <div key={o.email} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/15 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 relative">
                      <UserX size={22} />
                      <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">{o.noShows}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 dark:text-white truncate">{o.name || o.email}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-2">
                        <CalendarX2 size={11} /> {t("noShow.noShowsCount", { n: o.noShows })}{o.lastAt ? t("noShow.lastDate", { date: new Date(o.lastAt).toLocaleDateString("en-GB") }) : ""}
                      </p>
                    </div>
                    <button onClick={() => block({ name: o.name, email: o.email, phone: o.phone, reason: t("noShow.reasonNoShows", { n: o.noShows }) })} className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-black text-white hover:bg-rose-600 transition-all shrink-0">
                      <Ban size={14} /> {t("noShow.block")}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Blocked list */}
          <section>
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3"><Ban size={15} className="text-slate-500" /> {t("noShow.blockedContacts", { n: blocked.length })}</h2>
            {blocked.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-12 text-center">
                <Ban size={30} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                <p className="font-black text-slate-700 dark:text-slate-200">{t("noShow.noBlocked")}</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
                {blocked.map((b) => (
                  <div key={b._id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0"><Ban size={18} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 dark:text-white truncate">{b.name || b.email || b.phone}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-3 flex-wrap">
                        {b.email && <span className="flex items-center gap-1"><Mail size={10} /> {b.email}</span>}
                        {b.phone && <span className="flex items-center gap-1"><Phone size={10} /> {b.phone}</span>}
                        {b.reason && <span className="italic">· {b.reason}</span>}
                      </p>
                    </div>
                    <button onClick={() => unblock(b._id)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shrink-0">
                      {t("noShow.unblock")}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Manual block modal */}
      {modal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{t("noShow.modalTitle")}</h3>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              {["name", "email", "phone", "reason"].map((k) => (
                <input key={k} value={modal[k]} onChange={(e) => setModal((m) => ({ ...m, [k]: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder={t(`noShow.ph${k.charAt(0).toUpperCase() + k.slice(1)}`)} />
              ))}
            </div>
            <button onClick={() => block(modal)} className="mt-6 w-full rounded-2xl bg-rose-500 py-3.5 font-black text-white hover:bg-rose-600 transition-all flex items-center justify-center gap-2"><Ban size={16} /> {t("noShow.blockThis")}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoShowProtection;
