import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api/config';
import {
  Users, UserPlus, Mail, Phone, Shield, Briefcase,
  Loader2, X, Check, AlertCircle, MoreVertical, RefreshCw,
  Power, Trash2, Edit2, Clock, Star, ChevronDown
} from 'lucide-react';

const ROLES = [
  { key: 'manager',     label: 'Manager',     color: 'bg-violet-500/20 text-violet-300 border-violet-500/30', icon: Shield },
  { key: 'staff',       label: 'Staff',       color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: Briefcase },
  { key: 'receptionist',label: 'Receptionist',color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: Star },
];

const STATUS_CONFIG = {
  invited:  { label: 'Invited',  color: 'bg-amber-500/20 text-amber-300' },
  active:   { label: 'Active',   color: 'bg-emerald-500/20 text-emerald-300' },
  inactive: { label: 'Inactive', color: 'bg-slate-600 text-slate-400' },
};

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

/* ── Invite / Edit Modal ── */
function StaffModal({ member, onClose, onSaved }) {
  const isEdit = !!member;
  const [form, setForm] = useState({
    fullName: member?.fullName || '',
    email:    member?.email    || '',
    phone:    member?.phone    || '',
    role:     member?.role     || 'staff',
    skills:   member?.skills?.join(', ') || '',
    notes:    member?.notes    || '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving]  = useState(false);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required.';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
      const { data } = isEdit
        ? await API.put(`/merchant/staff/${member._id}`, payload)
        : await API.post('/merchant/staff', payload);
      onSaved(data.staff, isEdit);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to save.' });
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-slate-700/60 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-white font-black text-lg">{isEdit ? 'Edit Team Member' : 'Invite Team Member'}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{isEdit ? 'Update details below' : 'An invite email will be sent automatically'}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X size={17} />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {errors.submit && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm">
              <AlertCircle size={15} /> {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name *</label>
              <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Jane Smith"
                className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${errors.fullName ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`} />
              {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" disabled={isEdit}
                className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50 ${errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`} />
              {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 234 567 8900"
                className="w-full bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Role *</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(r => {
                const Icon = r.icon;
                return (
                  <button key={r.key} type="button" onClick={() => set('role', r.key)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${form.role === r.key ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}`}>
                    <Icon size={13} /> {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Skills <span className="text-slate-600 font-normal normal-case">(comma-separated)</span></label>
            <input value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="e.g. Haircut, Coloring, Beard Trim"
              className="w-full bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Internal Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="Any internal notes about this team member..."
              className="w-full bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none" />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-800">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-sm transition-all">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : isEdit ? <Check size={16} /> : <Mail size={16} />}
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Send Invite'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Staff Card ── */
function StaffCard({ member, onEdit, onToggle, onDelete, onResend, loading }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = ROLES.find(r => r.key === member.role) || ROLES[1];
  const RoleIcon = role.icon;
  const status = STATUS_CONFIG[member.status] || STATUS_CONFIG.invited;
  const initials = member.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {member.profilePic ? (
            <img src={member.profilePic} alt={member.fullName} className="w-14 h-14 rounded-2xl object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-100">
              {initials}
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.status === 'active' ? 'bg-emerald-400' : member.status === 'invited' ? 'bg-amber-400' : 'bg-slate-400'}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-slate-900 font-black text-base leading-tight">{member.fullName}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${role.color} flex items-center gap-1`}>
                  <RoleIcon size={10} /> {role.label}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
              </div>
            </div>

            {/* Menu */}
            <div className="relative flex-shrink-0">
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all">
                <MoreVertical size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden" onMouseLeave={() => setMenuOpen(false)}>
                  <button onClick={() => { onEdit(member); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-semibold">
                    <Edit2 size={14} className="text-slate-400" /> Edit Details
                  </button>
                  <button onClick={() => { onResend(member._id); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-semibold">
                    <RefreshCw size={14} className="text-slate-400" /> Resend Invite
                  </button>
                  <button onClick={() => { onToggle(member._id, member.status); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 font-semibold text-amber-600">
                    <Power size={14} /> {member.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button onClick={() => { onDelete(member._id); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 font-semibold">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1 mt-3">
            <span className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Mail size={11} className="text-slate-400" /> {member.email}
            </span>
            {member.phone && (
              <span className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Phone size={11} className="text-slate-400" /> {member.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      {member.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100">
          {member.skills.slice(0, 5).map(s => (
            <span key={s} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">{s}</span>
          ))}
          {member.skills.length > 5 && <span className="text-[10px] text-slate-400">+{member.skills.length - 5}</span>}
        </div>
      )}

      {/* Invite token (only when invited) */}
      {member.status === 'invited' && member.inviteToken && (
        <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
          <Clock size={12} className="text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-semibold">Token: <span className="font-black tracking-widest">{member.inviteToken}</span></p>
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function Staff() {
  const [staff, setStaff]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [actionId, setActionId]     = useState(null);
  const [filter, setFilter]         = useState('all');

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/merchant/staff');
      if (data.success) setStaff(data.staff);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  const handleSaved = (member, isEdit) => {
    setStaff(prev => isEdit ? prev.map(s => s._id === member._id ? member : s) : [member, ...prev]);
    setShowModal(false);
    setEditMember(null);
  };

  const handleToggle = async (id) => {
    setActionId(id);
    try {
      const { data } = await API.put(`/merchant/staff/${id}/toggle`);
      if (data.success) setStaff(prev => prev.map(s => s._id === id ? data.staff : s));
    } finally { setActionId(null); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this team member?')) return;
    setActionId(id);
    try {
      await API.delete(`/merchant/staff/${id}`);
      setStaff(prev => prev.filter(s => s._id !== id));
    } finally { setActionId(null); }
  };

  const handleResend = async (id) => {
    setActionId(id);
    try { await API.post(`/merchant/staff/${id}/resend`); } finally { setActionId(null); }
  };

  const filtered = filter === 'all' ? staff : staff.filter(s => s.status === filter);

  const kpi = {
    total:    staff.length,
    active:   staff.filter(s => s.status === 'active').length,
    invited:  staff.filter(s => s.status === 'invited').length,
    inactive: staff.filter(s => s.status === 'inactive').length,
  };

  return (
    <div className="space-y-8">
      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Team',   value: kpi.total,    color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
          { label: 'Active',       value: kpi.active,   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Invited',      value: kpi.invited,  color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Inactive',     value: kpi.inactive, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100' },
        ].map(k => (
          <div key={k.label} className={`${k.bg} border rounded-2xl p-5 shadow-sm`}>
            <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-slate-500 text-sm font-semibold mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-slate-900">Team Management</h2>
          <p className="text-slate-500 text-sm mt-0.5">Invite and manage your business staff</p>
        </div>
        <button
          onClick={() => { setEditMember(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-100"
        >
          <UserPlus size={16} /> Invite Member
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1 w-fit">
        {['all', 'active', 'invited', 'inactive'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all capitalize ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {f === 'all' ? `All (${kpi.total})` : f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={32} className="text-indigo-500 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No team members yet</h3>
          <p className="text-slate-500 text-sm mb-6">Invite your first team member to get started.</p>
          <button onClick={() => { setEditMember(null); setShowModal(true); }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
            <UserPlus size={16} /> Invite Team Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(member => (
            <StaffCard
              key={member._id}
              member={member}
              loading={actionId === member._id}
              onEdit={m => { setEditMember(m); setShowModal(true); }}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onResend={handleResend}
            />
          ))}
        </div>
      )}

      {showModal && (
        <StaffModal member={editMember} onClose={() => { setShowModal(false); setEditMember(null); }} onSaved={handleSaved} />
      )}
    </div>
  );
}
