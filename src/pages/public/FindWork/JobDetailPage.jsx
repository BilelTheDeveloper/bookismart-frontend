import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Calendar,
  Upload, FileText, CheckCircle2, Loader2, AlertCircle, X, Send
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const JOB_TYPE_CONFIG = {
  'full-time':  { label: 'Full Time',  color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  'part-time':  { label: 'Part Time',  color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  'freelance':  { label: 'Freelance',  color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'internship': { label: 'Internship', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
};

function CVUpload({ cvFile, setCvFile, cvBase64, setCvBase64, error }) {
  const inputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('CV must be smaller than 5MB.');
      return;
    }
    setCvFile(file);
    const reader = new FileReader();
    reader.onload = () => setCvBase64(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-slate-300 mb-2">
        CV / Resume <span className="text-rose-400">*</span>
        <span className="text-slate-500 font-normal ml-2">(PDF, max 5MB)</span>
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all group ${
          cvFile
            ? 'border-emerald-500/50 bg-emerald-500/5'
            : error
            ? 'border-rose-500/50 bg-rose-500/5'
            : 'border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/5'
        }`}
      >
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFile} />
        {cvFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <FileText size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 font-bold text-sm">{cvFile.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{(cvFile.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setCvFile(null); setCvBase64(''); }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors font-semibold"
            >
              <X size={12} /> Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 group-hover:bg-indigo-500/20 flex items-center justify-center transition-all">
              <Upload size={24} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div>
              <p className="text-slate-300 font-bold text-sm">Click to upload your CV</p>
              <p className="text-slate-500 text-xs mt-0.5">PDF format only</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {error}</p>}
    </div>
  );
}

function ApplyForm({ job, onSuccess }) {
  const [form, setForm] = useState({ applicantName: '', applicantEmail: '', applicantPhone: '', coverLetter: '' });
  const [cvFile, setCvFile] = useState(null);
  const [cvBase64, setCvBase64] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.applicantName.trim()) e.applicantName = 'Full name is required.';
    if (!form.applicantEmail.trim() || !/\S+@\S+\.\S+/.test(form.applicantEmail)) e.applicantEmail = 'Valid email required.';
    if (!form.applicantPhone.trim()) e.applicantPhone = 'Phone number is required.';
    if (!form.coverLetter.trim() || form.coverLetter.length < 50) e.coverLetter = 'Cover letter must be at least 50 characters.';
    if (!cvBase64) e.cv = 'CV is required.';
    return e;
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API_BASE}/public/recruitment/${job._id}/apply`, {
        ...form,
        cvBase64,
      });
      if (data.success) onSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || 'Submission failed. Please try again.';
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.submit && (
        <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm font-semibold">
          <AlertCircle size={16} /> {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Full Name <span className="text-rose-400">*</span></label>
          <input
            type="text"
            value={form.applicantName}
            onChange={e => handleChange('applicantName', e.target.value)}
            placeholder="John Doe"
            className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${errors.applicantName ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
          />
          {errors.applicantName && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.applicantName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Phone <span className="text-rose-400">*</span></label>
          <input
            type="tel"
            value={form.applicantPhone}
            onChange={e => handleChange('applicantPhone', e.target.value)}
            placeholder="+1 234 567 8900"
            className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${errors.applicantPhone ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
          />
          {errors.applicantPhone && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.applicantPhone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">Email <span className="text-rose-400">*</span></label>
        <input
          type="email"
          value={form.applicantEmail}
          onChange={e => handleChange('applicantEmail', e.target.value)}
          placeholder="you@example.com"
          className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm ${errors.applicantEmail ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
        />
        {errors.applicantEmail && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.applicantEmail}</p>}
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-bold text-slate-300 mb-2">
          Cover Letter <span className="text-rose-400">*</span>
          <span className="text-slate-500 font-normal ml-2">({form.coverLetter.length}/3000)</span>
        </label>
        <textarea
          value={form.coverLetter}
          onChange={e => handleChange('coverLetter', e.target.value)}
          maxLength={3000}
          rows={6}
          placeholder="Tell the employer why you're the perfect fit for this role..."
          className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm resize-none ${errors.coverLetter ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'}`}
        />
        {errors.coverLetter && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.coverLetter}</p>}
      </div>

      {/* CV Upload */}
      <CVUpload cvFile={cvFile} setCvFile={setCvFile} cvBase64={cvBase64} setCvBase64={setCvBase64} error={errors.cv} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
      >
        {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><Send size={18} /> Submit Application</>}
      </button>
    </form>
  );
}

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/public/recruitment/${id}`);
        if (data.success) setJob(data.job);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={36} className="text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="text-5xl">😕</div>
        <h2 className="text-2xl font-black">Job not found</h2>
        <p className="text-slate-400">This listing may have been closed or removed.</p>
        <button onClick={() => navigate('/find-work')} className="mt-4 px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors">
          Browse All Jobs
        </button>
      </div>
    );
  }

  const typeConf = JOB_TYPE_CONFIG[job.jobType] || JOB_TYPE_CONFIG['full-time'];
  const hasSalary = job.salaryMin || job.salaryMax;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-10">

        {/* Back */}
        <button
          onClick={() => navigate('/find-work')}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to all jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Job Info ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Header card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-900/30 flex-shrink-0">
                  {job.businessName?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-black text-white leading-tight">{job.title}</h1>
                  <p className="text-indigo-400 font-bold mt-1">{job.businessName}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeConf.color}`}>{typeConf.label}</span>
                    {job.location && (
                      <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={12} />{job.location}</span>
                    )}
                    {job.isRemote && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Remote OK</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                {hasSalary && (
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1"><DollarSign size={11} /> Salary</p>
                    <p className="text-sm font-bold text-emerald-400">
                      {job.salaryMin && job.salaryMax
                        ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}`
                        : job.salaryMin
                        ? `From ${job.salaryMin.toLocaleString()}`
                        : `Up to ${job.salaryMax.toLocaleString()}`}
                      <span className="text-slate-500 font-normal ml-1">{job.salaryCurrency}</span>
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1"><Clock size={11} /> Posted</p>
                  <p className="text-sm font-bold text-white">{new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                {job.deadline && (
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1"><Calendar size={11} /> Deadline</p>
                    <p className="text-sm font-bold text-amber-400">{new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
              <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-400" /> Job Description
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{job.description}</div>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
                <h2 className="text-lg font-black text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2.5">
                  {job.skills.map(skill => (
                    <span key={skill} className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Apply Form ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              {applied ? (
                <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Application Sent!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your application has been submitted. Check your email for a confirmation. Good luck!
                  </p>
                  <button
                    onClick={() => navigate('/find-work')}
                    className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    Browse More Jobs
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
                  <h2 className="text-xl font-black text-white mb-6">Apply for this Job</h2>
                  <ApplyForm job={job} onSuccess={() => setApplied(true)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
