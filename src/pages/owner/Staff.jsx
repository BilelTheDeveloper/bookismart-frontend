import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../api/config';
import {
  Users, UserPlus, Mail, Phone, Shield, Briefcase,
  Loader2, X, Check, AlertCircle, RefreshCw,
  Power, Trash2, Edit2, Clock, Star, Copy,
  ChevronDown, ChevronRight, Search, Filter,
  MoreVertical, Eye, CalendarDays, BarChart2,
  MessageSquare, FileText, Gift, UserCheck,
  TrendingUp, CheckCircle2, Lock, Unlock,
  ScanFace, ExternalLink
} from 'lucide-react';

/* ─── Constants (labels via i18n: staff.*) ─── */
const ROLES = [
  { key: 'manager',     labelKey: 'staff.roleManager',      color: 'bg-violet-500/20 text-violet-300 border-violet-500/30', icon: Shield },
  { key: 'staff',       labelKey: 'staff.roleStaff',        color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: Briefcase },
  { key: 'receptionist',labelKey: 'staff.roleReceptionist', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: Star },
];

const STATUS_CONFIG = {
  invited:      { labelKey: 'staff.stInvited',     color: 'bg-amber-500/15 text-amber-300 border-amber-500/20',    dot: 'bg-amber-400' },
  opened:       { labelKey: 'staff.stOpened',      color: 'bg-blue-500/15 text-blue-300 border-blue-500/20',        dot: 'bg-blue-400' },
  pending_kyc:  { labelKey: 'staff.stPendingKyc', color: 'bg-orange-500/15 text-orange-300 border-orange-500/20', dot: 'bg-orange-400' },
  under_review: { labelKey: 'staff.stUnderReview', color: 'bg-purple-500/15 text-purple-300 border-purple-500/20', dot: 'bg-purple-400 animate-pulse' },
  active:       { labelKey: 'staff.stActive',      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400' },
  rejected:     { labelKey: 'staff.stRejected',    color: 'bg-rose-500/15 text-rose-300 border-rose-500/20',       dot: 'bg-rose-400' },
  inactive:     { labelKey: 'staff.stInactive',    color: 'bg-slate-600/30 text-slate-400 border-slate-600/30',    dot: 'bg-slate-500' },
  expired:      { labelKey: 'staff.stExpired',     color: 'bg-slate-700/30 text-slate-500 border-slate-700/30',    dot: 'bg-slate-600' },
};

const ALL_PAGES = [
  { key: 'bookings',    labelKey: 'staff.pgBookings',    icon: CalendarDays },
  { key: 'customers',   labelKey: 'staff.pgCustomers',   icon: Users },
  { key: 'finance',     labelKey: 'staff.pgFinance',     icon: BarChart2 },
  { key: 'chat',        labelKey: 'staff.pgChat',        icon: MessageSquare },
  { key: 'invoices',    labelKey: 'staff.pgInvoices',    icon: FileText },
  { key: 'loyalty',     labelKey: 'staff.pgLoyalty',     icon: Gift },
  { key: 'work_mode',   labelKey: 'staff.pgWorkMode',    icon: Briefcase },
  { key: 'recruitment', labelKey: 'staff.pgRecruitment', icon: UserPlus },
  { key: 'analytics',   labelKey: 'staff.pgAnalytics',   icon: TrendingUp },
];

const PRESETS = {
  receptionist: { labelKey: 'staff.presetReceptionist', color: 'text-emerald-400', pages: ['bookings', 'customers', 'chat'] },
  manager:      { labelKey: 'staff.presetManager',      color: 'text-violet-400',  pages: ['bookings', 'customers', 'finance', 'chat', 'invoices', 'loyalty', 'recruitment', 'analytics'] },
  work_mode:    { labelKey: 'staff.presetWorkMode',     color: 'text-orange-400', pages: ['work_mode'] },
};

/* ─── Status Badge ─── */
const StatusBadge = ({ status }) => {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.invited;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {t(cfg.labelKey)}
    </span>
  );
};

/* ─── Copy Link Button ─── */
const CopyLink = ({ link }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${copied ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-indigo-500/50 hover:text-indigo-300'}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? t('staff.copied') : t('staff.copyLink')}
    </button>
  );
};

/* ─── Permissions Editor ─── */
const PermissionsEditor = ({ allowedPages = [], onChange }) => {
  const { t } = useTranslation();
  const selectedKeys = allowedPages.map(p => p.pageKey);

  const toggle = (key) => {
    if (selectedKeys.includes(key)) {
      onChange(allowedPages.filter(p => p.pageKey !== key));
    } else {
      onChange([...allowedPages, { pageKey: key, accessLevel: 'full' }]);
    }
  };

  const applyPreset = (presetKey) => {
    const pages = PRESETS[presetKey].pages.map(k => ({ pageKey: k, accessLevel: 'full' }));
    onChange(pages);
  };

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{t('staff.quickPresets')}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              onClick={() => applyPreset(key)}
              className={`px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-black transition-all ${preset.color}`}
            >
              {t(preset.labelKey)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange([])}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-rose-500/50 text-rose-400 text-xs font-black transition-all"
          >
            {t('staff.clearAll')}
          </button>
        </div>
      </div>

      {/* Page toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ALL_PAGES.map(page => {
          const Icon = page.icon;
          const on = selectedKeys.includes(page.key);
          return (
            <button
              key={page.key}
              type="button"
              onClick={() => toggle(page.key)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${on ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
            >
              {on ? <Check size={12} className="shrink-0" /> : <div className="w-3 h-3 border border-current rounded shrink-0" />}
              <Icon size={12} className="shrink-0" />
              <span className="truncate">{t(page.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Invite / Edit Modal ─── */
const StaffModal = ({ member, onClose, onSaved }) => {
  const { t } = useTranslation();
  const isEdit = !!member;
  const [form, setForm] = useState({
    fullName:     member?.fullName || '',
    email:        member?.email    || '',
    phone:        member?.phone    || '',
    role:         member?.role     || 'staff',
    notes:        member?.notes    || '',
    requireKyc:   member?.requireKyc !== false,
    allowedPages: member?.allowedPages || [],
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('staff.errFullName');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t('staff.errEmail');
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      const { data } = isEdit
        ? await API.put(`/merchant/staff/${member._id}`, form)
        : await API.post('/merchant/staff', form);
      onSaved(data.staff || data.data, isEdit);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || t('staff.errSave') });
    } finally { setSaving(false); }
  };

  const selectedRole = ROLES.find(r => r.key === form.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between rounded-t-[2rem] z-10">
          <div>
            <h2 className="text-white font-black text-xl">{isEdit ? t('staff.editTitle') : t('staff.inviteTitle')}</h2>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              {isEdit ? t('staff.editSub') : t('staff.inviteSub')}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Personal info */}
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('staff.personalInfo')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{t('staff.fullName')}</label>
                <input
                  value={form.fullName}
                  onChange={e => set('fullName', e.target.value)}
                  placeholder={t('staff.phName')}
                  className={`w-full bg-slate-800 border text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all ${errors.fullName ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
                />
                {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{t('staff.email')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  disabled={isEdit}
                  placeholder={t('staff.phEmail')}
                  className={`w-full bg-slate-800 border text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
                />
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{t('staff.phone')}</label>
                <input
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder={t('staff.phPhone')}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{t('staff.role')}</label>
                <div className="relative">
                  <select
                    value={form.role}
                    onChange={e => set('role', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 text-white rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                  >
                    {ROLES.map(r => <option key={r.key} value={r.key}>{t(r.labelKey)}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">{t('staff.notes')}</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={2}
                placeholder={t('staff.phNotes')}
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all"
              />
            </div>
          </div>

          {/* KYC toggle */}
          {!isEdit && (
            <div className="flex items-center justify-between p-5 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                  <ScanFace size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-black text-sm">{t('staff.requireKyc')}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{t('staff.requireKycSub')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => set('requireKyc', !form.requireKyc)}
                className={`w-12 h-6 rounded-full transition-all relative ${form.requireKyc ? 'bg-indigo-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.requireKyc ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          )}

          {/* Permissions */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('staff.portalAccess')}</p>
            <PermissionsEditor allowedPages={form.allowedPages} onChange={v => set('allowedPages', v)} />
          </div>

          {errors.submit && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
              <p className="text-rose-300 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 bg-slate-800 border border-slate-700 text-white font-black rounded-xl text-sm hover:bg-slate-700 transition-all">
              {t('staff.cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {saving ? t('staff.saving') : isEdit ? t('staff.saveChanges') : t('staff.sendInvitation')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Detail / Access Panel ─── */
const StaffDetailPanel = ({ member, onClose, onUpdated }) => {
  const { t } = useTranslation();
  const [allowedPages, setAllowedPages] = useState(member.allowedPages || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [resending, setResending] = useState(false);
  const [resendDone, setResendDone] = useState(false);

  const saveAccess = async () => {
    setSaving(true);
    try {
      await API.put(`/merchant/staff/${member._id}/access`, { allowedPages });
      setSaved(true);
      onUpdated({ ...member, allowedPages });
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* silent */
    } finally { setSaving(false); }
  };

  const resendInvite = async () => {
    setResending(true);
    try {
      const { data } = await API.post(`/merchant/staff/${member._id}/resend`);
      setResendDone(true);
      if (data.registerLink) onUpdated({ ...member, registerLink: data.registerLink });
      setTimeout(() => setResendDone(false), 3000);
    } catch { /* silent */ }
    finally { setResending(false); }
  };

  const registerLink = member.registerLink
    ? member.registerLink
    : `${window.location.origin}/staff/register/${member.registrationToken}`;

  const canResend = ['invited', 'opened', 'expired', 'rejected'].includes(member.status);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-5 flex items-center gap-4 rounded-t-[2rem]">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center shrink-0">
            {member.profilePic
              ? <img src={member.profilePic} alt="" className="w-full h-full object-cover" />
              : <span className="text-white font-black">{member.fullName?.charAt(0)}</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black truncate">{member.fullName}</p>
            <p className="text-slate-500 text-xs truncate">{member.email}</p>
          </div>
          <StatusBadge status={member.status} />
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Invite link (for pending states) */}
          {['invited', 'opened', 'expired', 'rejected'].includes(member.status) && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('staff.inviteLink')}</p>
              <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-400 break-all font-mono">
                {registerLink}
              </div>
              <div className="flex gap-2">
                <CopyLink link={registerLink} />
                <button
                  onClick={resendInvite}
                  disabled={resending}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${resendDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-indigo-500/50 hover:text-indigo-300'}`}
                >
                  {resending ? <Loader2 size={12} className="animate-spin" /> : resendDone ? <Check size={12} /> : <RefreshCw size={12} />}
                  {resending ? t('staff.resending') : resendDone ? t('staff.resendDone') : t('staff.resendEmail')}
                </button>
              </div>
            </div>
          )}

          {/* Permissions editor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('staff.accessPermissions')}</p>
              <span className="text-xs text-slate-500">{t('staff.pagesCount', { n: allowedPages.length })}</span>
            </div>
            <PermissionsEditor allowedPages={allowedPages} onChange={setAllowedPages} />
          </div>

          <button
            onClick={saveAccess}
            disabled={saving}
            className={`w-full py-3.5 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 ${saved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white'}`}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Shield size={16} />}
            {saving ? t('staff.saving') : saved ? t('staff.saved') : t('staff.savePermissions')}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Staff Page ─── */
const Staff = () => {
  const { t } = useTranslation();
  const [staff, setStaff]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [detailMember, setDetailMember] = useState(null);
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState({});

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/merchant/staff');
      setStaff(data.data || []);
    } catch {
      setError(t('staff.loadError'));
    } finally { setLoading(false); }
  }, [t]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  const setActionState = (id, state) => setActionLoading(p => ({ ...p, [id]: state }));

  const toggleStatus = async (member) => {
    const id = member._id;
    setActionState(id, 'toggling');
    try {
      const { data } = await API.put(`/merchant/staff/${id}/toggle`);
      setStaff(prev => prev.map(m => m._id === id ? { ...m, status: data.status } : m));
    } catch { /* silent */ }
    finally { setActionState(id, null); }
  };

  const deleteMember = async (id) => {
    if (!window.confirm(t('staff.removeConfirm'))) return;
    setActionState(id, 'deleting');
    try {
      await API.delete(`/merchant/staff/${id}`);
      setStaff(prev => prev.filter(m => m._id !== id));
    } catch { /* silent */ }
    finally { setActionState(id, null); }
  };

  const handleSaved = (saved, isEdit) => {
    if (isEdit) {
      setStaff(prev => prev.map(m => m._id === saved._id ? { ...m, ...saved } : m));
    } else {
      setStaff(prev => [saved, ...prev]);
    }
    setShowModal(false);
    setEditMember(null);
  };

  const handleUpdated = (updated) => {
    setStaff(prev => prev.map(m => m._id === updated._id ? { ...m, ...updated } : m));
    if (detailMember?._id === updated._id) setDetailMember(prev => ({ ...prev, ...updated }));
  };

  const filtered = staff.filter(m => {
    const matchSearch = !search || m.fullName?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: staff.length,
    active: staff.filter(m => m.status === 'active').length,
    invited: staff.filter(m => ['invited','opened'].includes(m.status)).length,
    pending: staff.filter(m => ['pending_kyc','under_review'].includes(m.status)).length,
    inactive: staff.filter(m => ['inactive','expired','rejected'].includes(m.status)).length,
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
        <p className="text-slate-500 text-sm font-bold">{t('staff.loadingTeam')}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t('staff.title')}</h2>
          <p className="text-slate-500 text-sm mt-0.5">{t('staff.subtitleCounts', { active: counts.active, invited: counts.invited, pending: counts.pending })}</p>
        </div>
        <button
          onClick={() => { setEditMember(null); setShowModal(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-indigo-100"
        >
          <UserPlus size={16} />
          {t('staff.inviteMember')}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('staff.search')}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 rounded-2xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all',      label: t('staff.fAll', { n: counts.all }) },
            { key: 'active',   label: t('staff.fActive', { n: counts.active }) },
            { key: 'invited',  label: t('staff.fInvited', { n: counts.invited }) },
            { key: 'under_review', label: t('staff.fReview', { n: counts.pending }) },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all border ${statusFilter === f.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl p-4">
          <AlertCircle size={16} className="text-rose-500 shrink-0" />
          <p className="text-rose-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Staff grid */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-16 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-slate-400" />
          </div>
          <h3 className="text-slate-700 dark:text-slate-200 font-black mb-2">{search ? t('staff.noResults') : t('staff.noTeam')}</h3>
          <p className="text-slate-400 text-sm">
            {search ? t('staff.noResultsSub') : t('staff.noTeamSub')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(member => {
            const role = ROLES.find(r => r.key === member.role);
            const RoleIcon = role?.icon || Briefcase;
            const isActing = !!actionLoading[member._id];
            const canToggle = ['active','inactive'].includes(member.status);

            return (
              <div
                key={member._id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      {member.profilePic
                        ? <img src={member.profilePic} alt="" className="w-full h-full object-cover" />
                        : <span className="text-slate-600 dark:text-slate-300 font-black text-lg">{member.fullName?.charAt(0)}</span>
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-900 dark:text-white font-black text-sm truncate">{member.fullName}</p>
                      <p className="text-slate-500 text-xs truncate">{member.email}</p>
                    </div>
                  </div>
                  <StatusBadge status={member.status} />
                </div>

                {/* Role + pages */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-widest ${role?.color}`}>
                    <RoleIcon size={10} />
                    {role ? t(role.labelKey) : member.role}
                  </span>
                  <span className="text-slate-400 text-xs font-bold">
                    {t('staff.pagesShort', { n: member.allowedPages?.length || 0 })}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setDetailMember(member)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-black text-xs rounded-xl transition-all"
                  >
                    <Shield size={12} /> {t('staff.access')}
                  </button>
                  <button
                    onClick={() => { setEditMember(member); setShowModal(true); }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-500 font-black text-xs rounded-xl transition-all"
                    title="Edit"
                  >
                    <Edit2 size={12} />
                  </button>
                  {canToggle && (
                    <button
                      onClick={() => toggleStatus(member)}
                      disabled={isActing}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border font-black text-xs rounded-xl transition-all disabled:opacity-50 ${member.status === 'active' ? 'bg-rose-50 border-rose-200 text-rose-500 hover:border-rose-300' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:border-emerald-300'}`}
                      title={member.status === 'active' ? t('staff.deactivate') : t('staff.activate')}
                    >
                      {isActing ? <Loader2 size={12} className="animate-spin" /> : <Power size={12} />}
                    </button>
                  )}
                  <button
                    onClick={() => deleteMember(member._id)}
                    disabled={isActing}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-rose-300 hover:bg-rose-50 text-slate-400 hover:text-rose-500 font-black text-xs rounded-xl transition-all disabled:opacity-50"
                    title="Remove"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <StaffModal
          member={editMember}
          onClose={() => { setShowModal(false); setEditMember(null); }}
          onSaved={handleSaved}
        />
      )}
      {detailMember && (
        <StaffDetailPanel
          member={detailMember}
          onClose={() => setDetailMember(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
};

export default Staff;
