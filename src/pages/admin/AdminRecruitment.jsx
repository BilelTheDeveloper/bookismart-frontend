import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api/config';
import {
  Briefcase, CheckCircle2, XCircle, Clock, Eye,
  Loader2, AlertCircle, X, MapPin, DollarSign, Calendar, Users
} from 'lucide-react';

const STATUS_TABS = [
  { key: 'pending_review', label: 'Pending Review', color: 'text-amber-500' },
  { key: 'approved',       label: 'Approved',        color: 'text-emerald-500' },
  { key: 'rejected',       label: 'Rejected',        color: 'text-rose-500' },
  { key: 'all',            label: 'All Posts',        color: 'text-slate-400' },
];

const STATUS_CONFIG = {
  draft:          { label: 'Draft',        badge: 'bg-slate-700 text-slate-300' },
  pending_review: { label: 'Pending',      badge: 'bg-amber-500/20 text-amber-300' },
  approved:       { label: 'Approved',     badge: 'bg-emerald-500/20 text-emerald-300' },
  rejected:       { label: 'Rejected',     badge: 'bg-rose-500/20 text-rose-300' },
  closed:         { label: 'Closed',       badge: 'bg-slate-500/20 text-slate-400' },
};

const JOB_TYPE_LABELS = { 'full-time': 'Full Time', 'part-time': 'Part Time', 'freelance': 'Freelance', 'internship': 'Internship' };

/* ── Review Modal ── */
function ReviewModal({ job, onClose, onReviewed }) {
  const [action, setAction] = useState(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (action === 'reject' && !reason.trim()) {
      setError('Please provide a rejection reason.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { data } = await API.put(`/admin/recruitment/${job._id}/review`, { action, reason });
      if (data.success) onReviewed(job._id, data.job.status);
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
          <h2 className="text-xl font-black text-white">Review Job Post</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Job info card */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                {job.businessName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-black text-lg">{job.title}</h3>
                <p className="text-indigo-400 font-semibold text-sm">{job.businessName}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-700 px-2.5 py-1 rounded-lg">{JOB_TYPE_LABELS[job.jobType]}</span>
                  {job.location && <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} />{job.location}</span>}
                  {job.isRemote && <span className="text-xs font-bold text-emerald-400">Remote OK</span>}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-700">
              {(job.salaryMin || job.salaryMax) && (
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1"><DollarSign size={10} /> Salary</p>
                  <p className="text-sm font-bold text-emerald-400">
                    {job.salaryMin && job.salaryMax ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}` : job.salaryMin ? `From ${job.salaryMin.toLocaleString()}` : `Up to ${job.salaryMax.toLocaleString()}`}
                    <span className="text-slate-500 font-normal ml-1">{job.salaryCurrency}</span>
                  </p>
                </div>
              )}
              {job.deadline && (
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1"><Calendar size={10} /> Deadline</p>
                  <p className="text-sm font-bold text-amber-400">{new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 font-semibold mb-1">Submitted</p>
                <p className="text-sm font-bold text-white">{new Date(job.updatedAt || job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Description</p>
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
              {job.description}
            </div>
          </div>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Skills Required</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(s => (
                  <span key={s} className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Decision */}
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Decision</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAction('approve')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                  action === 'approve'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/20'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400'
                }`}
              >
                <CheckCircle2 size={18} /> Approve
              </button>
              <button
                onClick={() => setAction('reject')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                  action === 'reject'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-900/20'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-rose-500/50 hover:text-rose-400'
                }`}
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>

          {/* Reason (reject only) */}
          {action === 'reject' && (
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Rejection Reason <span className="text-rose-400">*</span>
              </label>
              <textarea
                value={reason}
                onChange={e => { setReason(e.target.value); setError(''); }}
                rows={3}
                placeholder="Explain why this post is being rejected..."
                className="w-full bg-slate-800 border border-rose-500/40 focus:border-rose-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-rose-500/30 text-sm resize-none"
              />
              {error && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-slate-800 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!action || submitting}
            className={`flex-1 py-3 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-40 ${
              action === 'approve'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                : action === 'reject'
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {submitting ? 'Processing...' : action === 'approve' ? 'Confirm Approval' : action === 'reject' ? 'Confirm Rejection' : 'Select Action First'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function AdminRecruitment() {
  const [tab, setTab] = useState('pending_review');
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reviewJob, setReviewJob] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/recruitment', { params: { status: tab, limit: 50 } });
      if (data.success) { setJobs(data.jobs); setTotal(data.total); }
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleReviewed = (jobId, newStatus) => {
    setReviewJob(null);
    setJobs(prev => tab === 'all'
      ? prev.map(j => j._id === jobId ? { ...j, status: newStatus } : j)
      : prev.filter(j => j._id !== jobId)
    );
  };

  const kpi = {
    pending:  jobs.filter(j => j.status === 'pending_review').length,
    approved: jobs.filter(j => j.status === 'approved').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', val: kpi.pending, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Approved',       val: kpi.approved, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Rejected',       val: kpi.rejected, color: 'text-rose-500', bg: 'bg-rose-50 border-rose-100' },
        ].map(k => (
          <div key={k.label} className={`${k.bg} border rounded-2xl p-5`}>
            <p className={`text-3xl font-black ${k.color}`}>{k.val}</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit">
        {STATUS_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === t.key
                ? 'bg-white text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={32} className="text-indigo-500 animate-spin" /></div>
      ) : jobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Nothing here</h3>
          <p className="text-slate-500 text-sm">No job posts match this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => {
            const conf = STATUS_CONFIG[job.status];
            const isPending = job.status === 'pending_review';
            const hasSalary = job.salaryMin || job.salaryMax;

            return (
              <div key={job._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg shadow-indigo-100">
                    {job.businessName?.charAt(0)?.toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-slate-900 dark:text-white font-black text-base">{job.title}</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${conf.badge}`}>{conf.label}</span>
                      <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg font-semibold">{JOB_TYPE_LABELS[job.jobType]}</span>
                    </div>
                    <p className="text-indigo-500 text-sm font-semibold mt-1">{job.businessName}</p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      {job.location && <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} />{job.location}</span>}
                      {hasSalary && (
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <DollarSign size={11} />
                          {job.salaryMin && job.salaryMax ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}` : job.salaryMin ? `From ${job.salaryMin.toLocaleString()}` : `Up to ${job.salaryMax.toLocaleString()}`} {job.salaryCurrency}
                        </span>
                      )}
                      {job.skills?.slice(0, 3).map(s => (
                        <span key={s} className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{s}</span>
                      ))}
                      {job.skills?.length > 3 && <span className="text-xs text-slate-400">+{job.skills.length - 3} more</span>}
                    </div>

                    {job.rejectionReason && (
                      <div className="mt-3 flex items-start gap-2 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                        <AlertCircle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                        <p className="text-rose-600 text-xs font-semibold">{job.rejectionReason}</p>
                      </div>
                    )}
                  </div>

                  {/* Right: date + action */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <p className="text-xs text-slate-400">{new Date(job.createdAt).toLocaleDateString()}</p>
                    <button
                      onClick={() => setReviewJob(job)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        isPending
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <Eye size={14} />
                      {isPending ? 'Review Now' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {reviewJob && (
        <ReviewModal
          job={reviewJob}
          onClose={() => setReviewJob(null)}
          onReviewed={handleReviewed}
        />
      )}
    </div>
  );
}
