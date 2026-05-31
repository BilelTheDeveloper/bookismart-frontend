import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import {
  Building2, Plus, MapPin, Phone, Star, Pencil, Trash2, X,
  Loader2, Power, Crown, Users,
} from "lucide-react";
import API from "../../api/config";
import { useAuth } from "../../context/AuthContext";

const VILLES = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa",
  "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia",
  "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];

const emptyForm = { name: "", address: "", city: "", phone: "" };

const Branches = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [branches, setBranches]   = useState([]);
  const [meta, setMeta]           = useState({ accountType: user?.accountType, branchLimit: null, seatLimit: null });
  const [loading, setLoading]     = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);

  const isOrg = (meta.accountType || user?.accountType) === "organization";

  const load = useCallback(async () => {
    try {
      const { data } = await API.get("/merchant/branches");
      setBranches(data.branches || []);
      setMeta({ accountType: data.accountType, branchLimit: data.branchLimit, seatLimit: data.seatLimit });
    } catch {
      toast.error(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit   = (b) => { setEditing(b); setForm({ name: b.name, address: b.address || "", city: b.city, phone: b.phone || "" }); setModalOpen(true); };

  const save = async () => {
    if (!form.name.trim() || !form.city) { toast.error(t("dashboard.branches.requiredFields")); return; }
    setSaving(true);
    try {
      if (editing) {
        const { data } = await API.put(`/merchant/branches/${editing._id}`, form);
        setBranches((prev) => prev.map((b) => (b._id === editing._id ? data.branch : b)));
      } else {
        const { data } = await API.post("/merchant/branches", form);
        setBranches((prev) => [...prev, data.branch]);
      }
      setModalOpen(false);
      toast.success(t("common.save") + " ✓");
    } catch (err) {
      toast.error(err.response?.data?.message || t("common.error"));
    } finally {
      setSaving(false);
    }
  };

  const setMain = async (b) => {
    try {
      const { data } = await API.put(`/merchant/branches/${b._id}`, { isMain: true });
      setBranches((prev) => prev.map((x) => ({ ...x, isMain: x._id === data.branch._id })));
    } catch (err) { toast.error(err.response?.data?.message || t("common.error")); }
  };

  const toggleActive = async (b) => {
    try {
      const { data } = await API.put(`/merchant/branches/${b._id}`, { isActive: !b.isActive });
      setBranches((prev) => prev.map((x) => (x._id === b._id ? data.branch : x)));
    } catch (err) { toast.error(err.response?.data?.message || t("common.error")); }
  };

  const remove = async (b) => {
    if (!window.confirm(t("dashboard.branches.deleteConfirm"))) return;
    try {
      await API.delete(`/merchant/branches/${b._id}`);
      setBranches((prev) => prev.filter((x) => x._id !== b._id));
      toast.success(t("common.delete") + " ✓");
    } catch (err) { toast.error(err.response?.data?.message || t("common.error")); }
  };

  /* ── Non-org gate ── */
  if (!loading && !isOrg) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/15">
          <Crown size={28} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t("dashboard.branches.orgOnly")}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">{t("dashboard.branches.orgOnlyDesc")}</p>
        <a href="/owner/dashboard/billing" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-black text-white hover:bg-indigo-500 transition-all">
          {t("dashboard.branches.upgrade")}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white">
            <Building2 className="text-indigo-600 dark:text-indigo-400" /> {t("dashboard.branches.title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t("dashboard.branches.subtitle")}</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-black text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:bg-indigo-500 transition-all active:scale-95"
        >
          <Plus size={18} /> {t("dashboard.branches.addBranch")}
        </button>
      </div>

      {/* Usage chips */}
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Building2 size={14} className="text-indigo-500" />
          {t("dashboard.branches.branchesUsed", { used: branches.length, limit: meta.branchLimit || "∞" })}
        </span>
        {meta.seatLimit && (
          <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Users size={14} className="text-violet-500" />
            {t("dashboard.branches.staffSeats", { count: meta.seatLimit })}
          </span>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={28} /></div>
      ) : branches.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-16 text-center">
          <Building2 size={40} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
          <p className="text-lg font-black text-slate-700 dark:text-slate-200">{t("dashboard.branches.noBranches")}</p>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500 font-medium">{t("dashboard.branches.noBranchesDesc")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {branches.map((b) => (
            <div key={b._id} className={`relative rounded-3xl border p-5 transition-all ${
              b.isActive ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-70"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                  <Building2 size={20} />
                </div>
                <div className="flex items-center gap-1.5">
                  {b.isMain && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/15 px-2.5 py-1 text-[10px] font-black uppercase text-amber-700 dark:text-amber-400">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {t("dashboard.branches.main")}
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                    b.isActive ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }`}>
                    {b.isActive ? t("dashboard.branches.active") : t("dashboard.branches.inactive")}
                  </span>
                </div>
              </div>

              <h3 className="mt-4 text-base font-black text-slate-900 dark:text-white">{b.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                <MapPin size={13} /> {b.address ? `${b.address}, ` : ""}{b.city}
              </p>
              {b.phone && (
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Phone size={13} /> {b.phone}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                <button onClick={() => openEdit(b)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Pencil size={12} /> {t("dashboard.branches.edit")}
                </button>
                {!b.isMain && (
                  <button onClick={() => setMain(b)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors">
                    <Star size={12} /> {t("dashboard.branches.setMain")}
                  </button>
                )}
                <button onClick={() => toggleActive(b)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Power size={12} /> {b.isActive ? t("dashboard.branches.deactivate") : t("dashboard.branches.activate")}
                </button>
                {!b.isMain && (
                  <button onClick={() => remove(b)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors ms-auto">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {editing ? t("dashboard.branches.editBranch") : t("dashboard.branches.newBranch")}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wide text-slate-400">{t("dashboard.branches.name")} *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("dashboard.branches.namePlaceholder")}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-wide text-slate-400">{t("dashboard.branches.address")}</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={t("dashboard.branches.addressPlaceholder")}
                  className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wide text-slate-400">{t("dashboard.branches.city")} *</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 appearance-none"
                  >
                    <option value="">{t("dashboard.branches.selectCity")}</option>
                    {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wide text-slate-400">{t("dashboard.branches.phone")}</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t("dashboard.branches.phonePlaceholder")}
                    className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800 py-3 font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                {t("dashboard.branches.cancel")}
              </button>
              <button onClick={save} disabled={saving} className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 font-black text-white hover:bg-indigo-500 transition-all disabled:opacity-60">
                {saving ? <><Loader2 size={16} className="animate-spin" /> {t("dashboard.branches.creating")}</> : t("dashboard.branches.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;
