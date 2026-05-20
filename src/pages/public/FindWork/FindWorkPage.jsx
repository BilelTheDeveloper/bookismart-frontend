import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Search, Briefcase, MapPin, Clock, DollarSign,
  ChevronRight, Loader2, Filter, X, Zap
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const JOB_TYPE_CONFIG = {
  'full-time':   { label: 'Full Time',   color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  'part-time':   { label: 'Part Time',   color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  'freelance':   { label: 'Freelance',   color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'internship':  { label: 'Internship',  color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
};

const FILTER_TYPES = ['all', 'full-time', 'part-time', 'freelance', 'internship'];

function JobCard({ job, onClick }) {
  const typeConf = JOB_TYPE_CONFIG[job.jobType] || JOB_TYPE_CONFIG['full-time'];
  const hasSalary = job.salaryMin || job.salaryMax;
  const daysAgo = Math.floor((Date.now() - new Date(job.createdAt)) / 86400000);

  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/40 hover:-translate-y-0.5"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/0 to-violet-600/0 group-hover:from-indigo-600/5 group-hover:to-violet-600/5 transition-all duration-300 pointer-events-none" />

      <div className="flex items-start justify-between gap-4">
        {/* Business avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-900/30 flex-shrink-0">
          {job.businessName?.charAt(0)?.toUpperCase() || 'B'}
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeConf.color} flex-shrink-0`}>
          {typeConf.label}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-white font-black text-lg leading-tight group-hover:text-indigo-300 transition-colors">
          {job.title}
        </h3>
        <p className="text-indigo-400 font-semibold text-sm mt-1">{job.businessName}</p>
      </div>

      <p className="text-slate-400 text-sm mt-3 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 4).map(skill => (
            <span key={skill} className="text-xs font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs font-semibold text-slate-500 px-2.5 py-1">+{job.skills.length - 4}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {job.location}
            </span>
          )}
          {hasSalary && (
            <span className="flex items-center gap-1 text-emerald-400">
              <DollarSign size={12} />
              {job.salaryMin && job.salaryMax
                ? `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} ${job.salaryCurrency}`
                : job.salaryMin
                ? `From ${job.salaryMin.toLocaleString()} ${job.salaryCurrency}`
                : `Up to ${job.salaryMax.toLocaleString()} ${job.salaryCurrency}`}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-600 flex items-center gap-1">
          <Clock size={11} /> {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={18} className="text-indigo-400" />
      </div>
    </div>
  );
}

export default function FindWorkPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [jobType, setJobType] = useState('all');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (jobType !== 'all') params.jobType = jobType;

      const { data } = await axios.get(`${API_BASE}/public/recruitment`, { params });
      if (data.success) {
        setJobs(data.jobs);
        setTotal(data.total);
        setPages(data.pages);
      }
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, jobType]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  const handleTypeFilter = (type) => {
    setJobType(type);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 pt-28 pb-14 text-center sm:px-6 sm:pt-32 md:pb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold px-4 py-2 rounded-full mb-5 sm:mb-6">
            <Zap size={14} className="text-indigo-400" />
            {total} Opportunities Available
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-tight sm:text-5xl md:text-6xl">
            Find Your Next<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Opportunity
            </span>
          </h1>
          <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
            Discover job offers from verified businesses. Apply in minutes.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative mt-10 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 hover:border-indigo-500/50 rounded-2xl px-5 py-4 transition-colors focus-within:border-indigo-500">
              <Search size={20} className="text-slate-500 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search job title, skills, or company..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-base"
              />
              {searchInput && (
                <button type="button" onClick={clearSearch} className="text-slate-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-bold text-sm transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="max-w-5xl mx-auto px-4 mb-8 sm:px-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold mr-2">
            <Filter size={14} /> Filter:
          </span>
          {FILTER_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                jobType === type
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Types' : JOB_TYPE_CONFIG[type]?.label}
            </button>
          ))}
          {(search || jobType !== 'all') && (
            <button
              onClick={() => { clearSearch(); setJobType('all'); }}
              className="ml-auto text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-5xl mx-auto px-4 pb-20 sm:px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={36} className="text-indigo-500 animate-spin" />
            <p className="text-slate-500 font-semibold">Loading opportunities...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-white mb-2">No results found</h3>
            <p className="text-slate-500">Try different keywords or remove filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  onClick={() => navigate(`/find-work/${job._id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-bold disabled:opacity-40 hover:border-slate-600 hover:text-white transition-all text-sm"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        page === p
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(pages, p + 1))}
                  disabled={page === pages}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-bold disabled:opacity-40 hover:border-slate-600 hover:text-white transition-all text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
