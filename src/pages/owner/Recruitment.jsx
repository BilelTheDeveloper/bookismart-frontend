import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api/config';
import {
  Briefcase, Plus, Send, Eye, Trash2, X, ChevronDown,
  Loader2, CheckCircle2, AlertCircle, Clock, Users, Lock,
  ChevronRight, ArrowLeft, FileText, ExternalLink, Check
} from 'lucide-react';

const STATUS_CONFIG = {
  draft:          { label: 'Draft',           color: 'bg-slate-700 text-slate-300 border-slate-600' },
  pending_review: { label: 'Under Review',    color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  approved:       { label: 'Live',            color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  rejected:       { label: 'Rejected',        color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  closed:         { label: 'Closed',          color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
};

const APP_STATUS_CONFIG = {
  pending:     { label: 'Pending',     color: 'bg-slate-700 text-slate-300' },
  shortlisted: { label: 'Shortlisted', color: 'bg-amber-500/20 text-amber-300' },
  accepted:    { label: 'Accepted',    color: 'bg-emerald-500/20 text-emerald-300' },
  rejected:    { label: 'Rejected',    color: 'bg-rose-500/20 text-rose-300' },
};

const JOB_TYPES = ['full-time', 'part-time', 'freelance', 'internship'];
const JOB_TYPE_LABELS = { 'full-time': 'Full Time', 'part-time': 'Part Time', 'freelance': 'Freelance', 'internship': 'Internship' };

/* ── Create / Edit Job Modal ── */
function JobFormModal({ job, onClose, onSaved }) {
  const isEdit = !!job;
  const [form, setForm] = useState({
    title: job?.title || '',
    description: job?.description || '',
    jobType: job?.jobType || 'full-time',
    skills: job?.skills?.join(', ') || '',
    salaryMin: job?.salaryMin || '',
    salaryMax: job?.salaryMax || '',
    salaryCurrency: job?.salaryCurrency || 'USD',
    location: job?.location || '',
    isRemote: job?.isRemote || false,
    deadline: job?.deadline ? job.deadline.slice(0, 10) : '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.description.trim() || form.description.length < 50) e.description = 'Description must be at least 50 characters.';
    if (!form.jobType) e.jobType = 'Job type is required.';
    if (form.salaryMin && form.salaryMax && Number(form.salaryMin) > Number(form.salaryMax)) e.salaryMin = 'Min salary cannot exceed max.';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        deadline: form.deadline || null,
      };
      const { data } = isEdit
        ? await API.put(`/merchant/recruitment/${job._id}`, payload)
        : await API.post('/merchant/recruitment', payload);
      onSaved(data.job, isEdit);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
          <div>
            <h2 className="text-xl font-black text-white">{isEdit ? 'Edit Job Post' : 'Create Job Post'}</h2>
            <p className="text-slate-500 text-sm mt-0.5">Fill in the details and submit for admin review</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {errors.submit && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm font-semibold">
              <AlertCircle size={16} /> {errors.submit}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Senior Hair Stylist, Office Manager..."
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${errors.title ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
            />
            {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Description * <span className="text-slate-500 font-normal">({form.description.length}/5000)</span>
            </label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={5}
              maxLength={5000}
              placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none ${errors.description ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
            />
            {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Job Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {JOB_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('jobType', t)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    form.jobType === t
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {JOB_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Skills <span className="text-slate-500 font-normal">(comma-separated)</span></label>
            <input
              type="text"
              value={form.skills}
              onChange={e => set('skills', e.target.value)}
              placeholder="e.g. Customer Service, MS Office, Adobe Photoshop"
              className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Salary */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Min Salary</label>
              <input
                type="number"
                value={form.salaryMin}
                onChange={e => set('salaryMin', e.target.value)}
                placeholder="0"
                min={0}
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              {errors.salaryMin && <p className="text-rose-400 text-xs mt-1">{errors.salaryMin}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Max Salary</label>
              <input
                type="number"
                value={form.salaryMax}
                onChange={e => set('salaryMax', e.target.value)}
                placeholder="0"
                min={0}
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Currency</label>
              <select
                value={form.salaryCurrency}
                onChange={e => set('salaryCurrency', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white outline-none text-sm"
              >
                {['USD', 'EUR', 'GBP', 'DZD', 'MAD', 'TND'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Location + Remote + Deadline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="City or region"
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Application Deadline</label>
              <input
                type="date"
                value={form.deadline}
                onChange={e => set('deadline', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white outline-none text-sm"
              />
            </div>
          </div>

          {/* Remote toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set('isRemote', !form.isRemote)}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-0.5 ${form.isRemote ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all ${form.isRemote ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm font-bold text-slate-300">Remote work available</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-slate-800 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Applications Panel ── */
function ApplicationsPanel({ job, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data: d } = await API.get(`/merchant/recruitment/${job._id}/applications`);
        if (d.success) setData(d);
      } finally { setLoading(false); }
    };
    fetch();
  }, [job._id]);

  const updateStatus = async (appId, status, notes = '') => {
    setUpdating(appId);
    try {
      const payload = { status };
      if (notes) payload.rejectionReason = notes;
      const { data: d } = await API.put(`/merchant/recruitment/${job._id}/applications/${appId}/status`, payload);
      if (d.success) {
        setData(prev => ({ ...prev, applications: prev.applications.map(a => a._id === appId ? d.application : a) }));
        setExpanded(null);
        setRejectReason('');
      }
    } finally { setUpdating(null); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
          <div>
            <h2 className="text-xl font-black text-white">Applications</h2>
            <p className="text-indigo-400 text-sm font-semibold mt-0.5">{job.title}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 size={28} className="text-indigo-500 animate-spin" /></div>
          ) : !data?.applications?.length ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-lg font-black text-white mb-1">No applications yet</h3>
              <p className="text-slate-500 text-sm">Applications will appear here once people start applying.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.applications.map(app => {
                const conf = APP_STATUS_CONFIG[app.status];
                const isExpanded = expanded === app._id;
                return (
                  <div key={app._id} className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden transition-all">
                    {/* Summary row */}
                    <div className="flex items-center gap-4 p-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black flex-shrink-0">
                        {app.applicantName?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm">{app.applicantName}</p>
                        <p className="text-slate-400 text-xs">{app.applicantEmail} · {app.applicantPhone}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${conf.color} flex-shrink-0`}>{conf.label}</span>
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-700 hover:bg-indigo-600 rounded-lg text-slate-400 hover:text-white transition-all flex-shrink-0"
                        title="View CV"
                      >
                        <FileText size={14} />
                      </a>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : app._id)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-white transition-all flex-shrink-0"
                      >
                        <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-slate-700 pt-4 space-y-4">
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Cover Letter</p>
                          <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 rounded-xl p-4">{app.coverLetter}</p>
                        </div>

                        {/* Status actions */}
                        {!['accepted', 'rejected'].includes(app.status) && (
                          <div className="space-y-3">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Update Status</p>
                            <div className="flex flex-wrap gap-2">
                              {['pending', 'shortlisted', 'accepted'].map(s => (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(app._id, s)}
                                  disabled={updating === app._id || app.status === s}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 ${
                                    app.status === s
                                      ? 'bg-indigo-600 border-indigo-500 text-white'
                                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-300'
                                  }`}
                                >
                                  {updating === app._id ? <Loader2 size={12} className="animate-spin inline" /> : APP_STATUS_CONFIG[s].label}
                                </button>
                              ))}
                            </div>
                            {/* Reject with reason */}
                            <div className="space-y-2">
                              <textarea
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Rejection reason (optional)..."
                                rows={2}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs resize-none outline-none focus:border-rose-500"
                              />
                              <button
                                onClick={() => updateStatus(app._id, 'rejected', rejectReason)}
                                disabled={updating === app._id}
                                className="w-full py-2 bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 font-bold rounded-xl text-xs transition-all"
                              >
                                Reject Applicant
                              </button>
                            </div>
                          </div>
                        )}

                        {app.rejectionReason && (
                          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                            <p className="text-xs text-rose-400 font-semibold">Rejection reason: {app.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Recruitment() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [appsJob, setAppsJob] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [closingId, setClosingId] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/merchant/recruitment');
      if (data.success) setJobs(data.jobs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSaved = (job, isEdit) => {
    if (isEdit) {
      setJobs(prev => prev.map(j => j._id === job._id ? { ...j, ...job } : j));
    } else {
      setJobs(prev => [{ ...job, applicationCount: 0 }, ...prev]);
    }
    setShowForm(false);
    setEditJob(null);
  };

  const handleSubmit = async (jobId) => {
    setSubmittingId(jobId);
    try {
      const { data } = await API.put(`/merchant/recruitment/${jobId}/submit`);
      if (data.success) setJobs(prev => prev.map(j => j._id === jobId ? { ...j, status: 'pending_review' } : j));
    } finally { setSubmittingId(null); }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this draft post?')) return;
    setDeletingId(jobId);
    try {
      await API.delete(`/merchant/recruitment/${jobId}`);
      setJobs(prev => prev.filter(j => j._id !== jobId));
    } finally { setDeletingId(null); }
  };

  const handleClose = async (jobId) => {
    if (!window.confirm('Close this job post? It will no longer be visible publicly.')) return;
    setClosingId(jobId);
    try {
      const { data } = await API.put(`/merchant/recruitment/${jobId}/close`);
      if (data.success) setJobs(prev => prev.map(j => j._id === jobId ? { ...j, status: 'closed' } : j));
    } finally { setClosingId(null); }
  };

  const kpi = {
    total:   jobs.length,
    live:    jobs.filter(j => j.status === 'approved').length,
    pending: jobs.filter(j => j.status === 'pending_review').length,
    apps:    jobs.reduce((s, j) => s + (j.applicationCount || 0), 0),
  };

  return (
    <div className="space-y-8">
      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts',    value: kpi.total,   icon: <Briefcase size={18} />, color: 'text-indigo-400' },
          { label: 'Live Now',       value: kpi.live,    icon: <CheckCircle2 size={18} />, color: 'text-emerald-400' },
          { label: 'Under Review',   value: kpi.pending, icon: <Clock size={18} />, color: 'text-amber-400' },
          { label: 'Total Applicants', value: kpi.apps, icon: <Users size={18} />, color: 'text-violet-400' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className={`${k.color} mb-3`}>{k.icon}</div>
            <p className="text-3xl font-black text-slate-900">{k.value}</p>
            <p className="text-slate-500 text-sm font-semibold mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">My Job Posts</h2>
          <p className="text-slate-500 text-sm mt-0.5">Create and manage recruitment offers for your business</p>
        </div>
        <button
          onClick={() => { setEditJob(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-100 text-sm"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={32} className="text-indigo-500 animate-spin" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No job posts yet</h3>
          <p className="text-slate-500 text-sm mb-6">Post your first job offer and start receiving applications.</p>
          <button
            onClick={() => { setEditJob(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
          >
            <Plus size={16} /> Create Job Post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => {
            const conf = STATUS_CONFIG[job.status];
            const canEdit = ['draft', 'rejected'].includes(job.status);
            const canSubmit = ['draft', 'rejected'].includes(job.status);
            const canClose = job.status === 'approved';
            const canDelete = ['draft', 'rejected'].includes(job.status);
            const typeLabel = { 'full-time': 'Full Time', 'part-time': 'Part Time', 'freelance': 'Freelance', 'internship': 'Internship' }[job.jobType];

            return (
              <div key={job._id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-slate-900 font-black text-base">{job.title}</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${conf.color}`}>{conf.label}</span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{typeLabel}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1.5 line-clamp-1">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      {job.location && <span className="text-xs text-slate-400 font-medium">📍 {job.location}</span>}
                      {job.salaryMin && <span className="text-xs text-emerald-600 font-bold">💰 {job.salaryMin.toLocaleString()} {job.salaryCurrency}+</span>}
                      <span className="text-xs text-slate-400">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    {job.rejectionReason && (
                      <div className="mt-3 flex items-start gap-2 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                        <AlertCircle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="text-rose-600 text-xs font-semibold">{job.rejectionReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Application count */}
                  {job.status === 'approved' && (
                    <button
                      onClick={() => setAppsJob(job)}
                      className="flex flex-col items-center justify-center bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-2xl px-5 py-3 transition-all flex-shrink-0 group"
                    >
                      <span className="text-2xl font-black text-indigo-600">{job.applicationCount || 0}</span>
                      <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-600 flex items-center gap-1">
                        <Users size={11} /> applicants
                      </span>
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-5 pt-5 border-t border-slate-100 flex-wrap">
                  {canEdit && (
                    <button
                      onClick={() => { setEditJob(job); setShowForm(true); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                    >
                      Edit
                    </button>
                  )}
                  {canSubmit && (
                    <button
                      onClick={() => handleSubmit(job._id)}
                      disabled={submittingId === job._id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all disabled:opacity-60"
                    >
                      {submittingId === job._id ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                      Submit for Review
                    </button>
                  )}
                  {job.status === 'approved' && (
                    <button
                      onClick={() => setAppsJob(job)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold rounded-xl text-xs transition-all"
                    >
                      <Users size={12} /> View Applications
                    </button>
                  )}
                  {job.status === 'pending_review' && (
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-semibold">
                      <Clock size={12} /> Awaiting admin review
                    </div>
                  )}
                  <div className="ml-auto flex items-center gap-2">
                    {canClose && (
                      <button
                        onClick={() => handleClose(job._id)}
                        disabled={closingId === job._id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-xl text-xs transition-all"
                      >
                        <Lock size={12} /> {closingId === job._id ? '...' : 'Close'}
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={deletingId === job._id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-xl text-xs transition-all"
                      >
                        <Trash2 size={12} /> {deletingId === job._id ? '...' : 'Delete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <JobFormModal
          job={editJob}
          onClose={() => { setShowForm(false); setEditJob(null); }}
          onSaved={handleSaved}
        />
      )}
      {appsJob && (
        <ApplicationsPanel job={appsJob} onClose={() => setAppsJob(null)} />
      )}
    </div>
  );
}
