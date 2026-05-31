import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart3, TrendingUp, Users, Calendar, ArrowUpRight,
  DollarSign, Clock, CheckCircle2, XCircle, AlertCircle,
  MousePointer2, RefreshCw, Award
} from "lucide-react";
import API from "../../api/config";

/* ─── Mini SVG bar chart ─── */
const BookingsChart = ({ months }) => {
  const maxCount = Math.max(...months.map(m => m.count), 1);
  const currentMonth = new Date().getMonth(); // 0-indexed

  return (
    <div className="h-52 flex items-end gap-1.5 px-1">
      {months.map((m, i) => {
        const totalPct = (m.count / maxCount) * 100;
        const completedPct = m.count > 0 ? (m.completed / m.count) * 100 : 0;
        const isCurrent = i === currentMonth;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-black py-1.5 px-3 rounded-lg whitespace-nowrap pointer-events-none z-10">
              {m.count} bookings · {m.completed} done
            </div>
            <div className="w-full relative" style={{ height: '160px' }}>
              {/* Background bar */}
              <div
                className={`w-full absolute bottom-0 rounded-t-lg transition-all ${isCurrent ? 'bg-indigo-100 dark:bg-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}
                style={{ height: `${Math.max(totalPct, 4)}%` }}
              />
              {/* Completed overlay */}
              <div
                className={`w-full absolute bottom-0 rounded-t-lg transition-all ${isCurrent ? 'bg-indigo-500' : 'bg-indigo-300 dark:bg-indigo-400/70'}`}
                style={{ height: `${(completedPct / 100) * Math.max(totalPct, 4)}%` }}
              />
              {isCurrent && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
              )}
            </div>
            <span className={`text-[9px] font-black uppercase ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
              {m.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Status bar breakdown ─── */
const StatusBar = ({ label, count, total, color, icon }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{label}</span>
        </div>
        <span className="text-xs font-black text-slate-900 dark:text-white">{count} <span className="text-slate-400 font-medium">({pct}%)</span></span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      API.get("/merchant/insights/summary"),
      API.get("/merchant/insights/analytics"),
    ]).then(([sumRes, anaRes]) => {
      if (sumRes.data?.success) setSummary(sumRes.data.data);
      if (anaRes.data?.success) setAnalytics(anaRes.data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const kpis = useMemo(() => [
    {
      label: "Total Revenue",
      value: (summary?.totalRevenue ?? 0).toFixed(2),
      unit: "TND",
      icon: <DollarSign size={20} />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/15",
    },
    {
      label: "Total Bookings",
      value: String(summary?.totalBookings ?? 0),
      unit: "Appointments",
      icon: <Calendar size={20} />,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/15",
    },
    {
      label: "New Customers",
      value: String(summary?.newCustomers30d ?? 0),
      unit: "Last 30 Days",
      icon: <Users size={20} />,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/15",
    },
    {
      label: "Avg. Ticket",
      value: (summary?.avgTicket ?? 0).toFixed(2),
      unit: "TND / Visit",
      icon: <TrendingUp size={20} />,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/15",
    },
  ], [summary]);

  const statusBreakdown = analytics?.statusBreakdown || {};
  const monthlyBookings = analytics?.monthlyBookings || Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    label: new Date(2026, i, 1).toLocaleString('en-US', { month: 'short' }),
    count: 0,
    completed: 0,
  }));
  const topServices = analytics?.topServices || [];
  const completionRate = analytics?.completionRate ?? 0;
  const maxServiceCount = Math.max(...topServices.map(s => s.count), 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Live business intelligence — all data is real-time.</p>
        </div>
        <button
          onClick={fetchAll}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/40 transition-all disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>{stat.icon}</div>
              <div className="flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight size={12} /> Live
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {loading ? <span className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg inline-block w-20 h-7" /> : stat.value}
                <span className="text-sm font-bold text-slate-400 ml-1">{stat.unit}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Monthly Bookings Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="text-indigo-600 dark:text-indigo-400" /> Monthly Bookings
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-100 dark:bg-indigo-500/30 rounded-full" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Total</span>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="h-52 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <BookingsChart months={monthlyBookings} />
          )}
        </div>

        {/* Booking Status Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" /> Status Overview
          </h3>
          <p className="text-xs text-slate-400 font-bold mb-6 uppercase tracking-wider">
            {statusBreakdown.total ?? 0} total appointments
          </p>
          {loading ? (
            <div className="space-y-5">
              {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-4">
              <StatusBar label="Completed" count={statusBreakdown.completed ?? 0} total={statusBreakdown.total ?? 1} color="bg-emerald-500" />
              <StatusBar label="Confirmed" count={statusBreakdown.confirmed ?? 0} total={statusBreakdown.total ?? 1} color="bg-indigo-500" />
              <StatusBar label="Pending" count={statusBreakdown.pending ?? 0} total={statusBreakdown.total ?? 1} color="bg-amber-400" />
              <StatusBar label="Cancelled" count={statusBreakdown.cancelled ?? 0} total={statusBreakdown.total ?? 1} color="bg-rose-400" />
              <StatusBar label="No-Show" count={statusBreakdown.noShow ?? 0} total={statusBreakdown.total ?? 1} color="bg-slate-400" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Top Services */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <MousePointer2 className="text-indigo-600 dark:text-indigo-400" /> Top Services
          </h3>
          <p className="text-xs text-slate-400 font-bold mb-6 uppercase tracking-wider">Last 90 days — completed bookings</p>
          {loading ? (
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
            </div>
          ) : topServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <AlertCircle size={32} className="mb-2" />
              <p className="text-sm font-bold">No completed bookings yet</p>
              <p className="text-xs">Mark bookings as completed to see service insights</p>
            </div>
          ) : (
            <div className="space-y-5">
              {topServices.map((service, idx) => {
                const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
                const pct = Math.round((service.count / maxServiceCount) * 100);
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${colors[idx % colors.length]} rounded-xl flex items-center justify-center text-white text-xs font-black`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white">{service.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{service.count} bookings</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">{service.revenue.toFixed(2)} TND</p>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Efficiency Panel */}
        <div className="flex flex-col gap-6">
          {/* Completion Rate */}
          <div className="bg-slate-900 dark:bg-slate-950 dark:border dark:border-slate-800 rounded-[2.5rem] p-4 sm:p-6 lg:p-8 text-white flex-1 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Award size={12} /> Completion Rate
              </p>
              {loading ? (
                <div className="w-24 h-12 bg-white/10 rounded-xl animate-pulse" />
              ) : (
                <>
                  <h4 className="text-5xl font-black text-white">
                    {completionRate}
                    <span className="text-2xl text-slate-400">%</span>
                  </h4>
                  <p className="text-slate-400 text-sm mt-2">
                    {completionRate >= 80 ? 'Excellent performance' :
                     completionRate >= 60 ? 'Good — room to improve' :
                     'Needs attention'}
                  </p>
                </>
              )}
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
          </div>

          {/* Consult vs Booking ratio */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
              <Clock size={12} /> Consultations Done
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {loading ? '—' : summary?.totalConsultations ?? 0}
              </span>
              <span className="text-sm font-bold text-slate-400 mb-1">sessions</span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(((summary?.totalConsultations ?? 0) / Math.max(summary?.totalBookings ?? 1, 1)) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
              vs {summary?.totalBookings ?? 0} total bookings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
