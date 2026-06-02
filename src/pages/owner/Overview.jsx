import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../api/config";
import {
  CalendarCheck, Users, TrendingUp, Clock, CheckCircle2, AlertCircle,
  Globe, ArrowRight, XCircle, RefreshCw, ExternalLink, Star, Timer,
  DollarSign, Palette, Zap, BarChart3, Sparkles, Target
} from "lucide-react";

const todayStr = () => new Date().toISOString().slice(0, 10);

/* ─── Thin progress bar for trial countdown ─── */
const TrialBar = ({ daysLeft, total = 30 }) => {
  const { t } = useTranslation();
  const pct = Math.max(0, Math.min(100, Math.round((daysLeft / total) * 100)));
  const color = daysLeft > 14 ? 'bg-emerald-400' : daysLeft > 5 ? 'bg-amber-400' : 'bg-rose-400';
  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span>{t("overview.trialUsage")}</span>
        <span>{t("overview.daysLeftShort", { days: daysLeft })}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200/60 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

/* ─── Website status card (top banner) ─── */
const WebsiteStatusBanner = ({ website, loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-[2rem] animate-pulse" />;
  }

  if (!website) {
    return (
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-[2rem] p-5 border-2 border-dashed border-slate-200 dark:border-slate-700">
        <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
          <Globe size={20} className="text-slate-400" />
        </div>
        <div className="flex-1">
          <p className="font-black text-slate-800 dark:text-white">{t("overview.noWebsite")}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t("overview.noWebsiteSub")}</p>
        </div>
        <Link
          to="/owner/dashboard/themes"
          className="shrink-0 px-4 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/40"
        >
          <Palette size={14} /> {t("overview.buildSite")}
        </Link>
      </div>
    );
  }

  const isLive = website.verificationStatus === 'approved' && website.isPublished;
  const isApprovedOffline = website.verificationStatus === 'approved' && !website.isPublished;
  const isPending = website.verificationStatus === 'pending';
  const isRejected = website.verificationStatus === 'rejected';

  const cfg = isLive
    ? { bg: 'bg-emerald-950', border: 'border-emerald-900', dot: 'bg-emerald-400 animate-pulse', label: t("overview.websiteLive"), sub: `bookiify.vercel.app/p/${website.slug}`, iconBg: 'bg-emerald-900', iconColor: 'text-emerald-400', icon: <CheckCircle2 size={20} /> }
    : isApprovedOffline
    ? { bg: 'bg-indigo-950', border: 'border-indigo-900', dot: 'bg-indigo-400', label: t("overview.approvedOffline"), sub: t("overview.approvedOfflineSub"), iconBg: 'bg-indigo-900', iconColor: 'text-indigo-400', icon: <Globe size={20} /> }
    : isPending
    ? { bg: 'bg-amber-950', border: 'border-amber-900', dot: 'bg-amber-400 animate-pulse', label: t("overview.underReview"), sub: t("overview.underReviewSub"), iconBg: 'bg-amber-900', iconColor: 'text-amber-400', icon: <Timer size={20} /> }
    : { bg: 'bg-rose-950', border: 'border-rose-900', dot: 'bg-rose-400', label: t("overview.rejected"), sub: website.rejectionReason || t("overview.rejectedSub"), iconBg: 'bg-rose-900', iconColor: 'text-rose-400', icon: <XCircle size={20} /> };

  return (
    <div className={`flex items-center gap-4 ${cfg.bg} rounded-[2rem] p-5 border ${cfg.border}`}>
      <div className={`w-11 h-11 ${cfg.iconBg} rounded-xl flex items-center justify-center shrink-0 ${cfg.iconColor}`}>
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <p className="text-sm font-black text-white">{cfg.label}</p>
        </div>
        <p className="text-xs text-slate-400 font-medium truncate">{cfg.sub}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        {isLive && (
          <a
            href={`https://bookiify.vercel.app/p/${website.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-emerald-500 text-white text-[10px] font-black rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1.5"
          >
            <ExternalLink size={12} /> {t("overview.visit")}
          </a>
        )}
        <Link
          to="/owner/theme/customize-site"
          className="px-3 py-2 bg-white/10 text-white text-[10px] font-black rounded-xl hover:bg-white/20 transition-all"
        >
          {t("overview.editSite")}
        </Link>
      </div>
    </div>
  );
};

/* ─── Status pill ─── */
const STATUS_LABEL_KEYS = {
  pending: 'overview.stPending', confirmed: 'overview.stConfirmed', completed: 'overview.stCompleted',
  cancelled: 'overview.stCancelled', 'no-show': 'overview.stNoShow',
};
const StatusPill = ({ status }) => {
  const { t } = useTranslation();
  const cfg = {
    pending:   'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
    confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
    completed: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
    cancelled: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400',
    'no-show': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg[status] || 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
      {STATUS_LABEL_KEYS[status] ? t(STATUS_LABEL_KEYS[status]) : status}
    </span>
  );
};

/* ─── Skeleton loader ─── */
const SkeletonRow = () => (
  <div className="px-6 py-4 flex items-center gap-4">
    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-3/4" />
      <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse w-1/2" />
    </div>
    <div className="w-16 h-6 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
  </div>
);

/* ═══════════════════════════════════════════ */
const Overview = () => {
  const { t, i18n } = useTranslation();
  const { user: authUser } = useAuth();
  const subscription = authUser?.paymentInfo?.subscription || {};
  const trialEndsAt = subscription.trialEndsAt
    ? new Date(subscription.trialEndsAt)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const trialDaysLeft = Math.max(0, Math.ceil((trialEndsAt - Date.now()) / 86_400_000));
  const PLAN_LABELS = { free_trial: t('overview.planFreeTrial'), solo_starter: 'Solo Starter', solo_pro: 'Solo Pro', team: 'Team', business: 'Business', enterprise: 'Enterprise', basic: 'Solo Starter', premium: 'Solo Pro', pro: 'Team' };
  const planLabel = PLAN_LABELS[subscription.plan || 'free_trial'] || t('overview.planFreeTrial');

  const [loading, setLoading] = useState(true);
  const [websiteLoading, setWebsiteLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [website, setWebsite] = useState(null);
  const [todayBookings, setTodayBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState(null);

  const today = todayStr();
  const locale = { fr: 'fr-FR', ar: 'ar-TN', en: 'en-US' }[i18n.language?.slice(0, 2)] || 'en-US';
  const todayLabel = new Date().toLocaleDateString(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const hours = new Date().getHours();
  const greetKey = hours < 12 ? 'overview.greetMorning' : hours < 18 ? 'overview.greetAfternoon' : 'overview.greetEvening';

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [sumRes, todayRes, pendingRes] = await Promise.all([
        API.get('/merchant/insights/summary'),
        API.get(`/merchant/bookings?date=${today}&limit=20`),
        API.get('/merchant/bookings?status=pending&limit=5'),
      ]);
      if (sumRes.data?.success) setSummary(sumRes.data.data);
      if (todayRes.data?.success) setTodayBookings(todayRes.data.data || []);
      if (pendingRes.data?.success) {
        setPendingBookings(pendingRes.data.data || []);
        setPendingTotal(pendingRes.data.pagination?.total ?? pendingRes.data.data?.length ?? 0);
      }
    } catch (e) {
      console.error('Dashboard data load error', e);
    } finally {
      setLoading(false);
    }
  }, [today]);

  const fetchWebsite = useCallback(async () => {
    setWebsiteLoading(true);
    try {
      const res = await API.get('/merchant/website/my-site');
      if (res.data) setWebsite(res.data);
    } catch (e) {
      if (e.response?.status !== 404) console.error('Website load error', e);
      setWebsite(null);
    } finally {
      setWebsiteLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchWebsite();
  }, [fetchData, fetchWebsite]);

  const handleQuickStatus = async (bookingId, status) => {
    setActionLoading(bookingId);
    try {
      await API.patch(`/merchant/bookings/${bookingId}/status`, { status });
      const [todayRes, pendingRes] = await Promise.all([
        API.get(`/merchant/bookings?date=${today}&limit=20`),
        API.get('/merchant/bookings?status=pending&limit=5'),
      ]);
      if (todayRes.data?.success) setTodayBookings(todayRes.data.data || []);
      if (pendingRes.data?.success) {
        setPendingBookings(pendingRes.data.data || []);
        setPendingTotal(pendingRes.data.pagination?.total ?? 0);
      }
    } catch (e) {
      console.error('Quick status update failed', e);
    } finally {
      setActionLoading(null);
    }
  };

  const kpis = [
    {
      label: t("overview.todayApts"),
      value: loading ? null : todayBookings.length,
      icon: <CalendarCheck size={18} />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-500/15',
      sub: new Date().toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' }),
    },
    {
      label: t("overview.pendingAction"),
      value: loading ? null : pendingTotal,
      icon: <AlertCircle size={18} />,
      color: pendingTotal > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400',
      bg: pendingTotal > 0 ? 'bg-amber-50 dark:bg-amber-500/15' : 'bg-slate-50 dark:bg-slate-800',
      sub: t("overview.needConfirmation"),
    },
    {
      label: t("overview.totalBookings"),
      value: loading ? null : (summary?.totalBookings ?? 0),
      icon: <Users size={18} />,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-500/15',
      sub: t("overview.allTime"),
    },
    {
      label: t("overview.revenue"),
      value: loading ? null : `${(summary?.totalRevenue ?? 0).toFixed(2)} TND`,
      icon: <DollarSign size={18} />,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/15',
      sub: t("overview.fromConsultations"),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t(greetKey)}, {authUser?.fullName?.split(' ')[0] || 'Owner'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">{todayLabel}</p>
        </div>
        <button
          onClick={() => { fetchData(); fetchWebsite(); }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-60 self-start sm:self-auto"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> {t("overview.refresh")}
        </button>
      </div>

      {/* ── Website Status + Trial ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WebsiteStatusBanner website={website} loading={websiteLoading} />
        </div>

        {/* Trial card */}
        <div className={`rounded-[2rem] p-5 border flex flex-col justify-between ${
          trialDaysLeft <= 7
            ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30'
            : trialDaysLeft <= 30
            ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("overview.subscription")}</p>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{planLabel}</p>
              <p className={`text-xs font-medium mt-0.5 ${trialDaysLeft <= 7 ? 'text-rose-600 dark:text-rose-400' : trialDaysLeft <= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {trialDaysLeft > 0 ? t("overview.daysRemaining", { days: trialDaysLeft }) : t("overview.trialExpired")}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl ${trialDaysLeft <= 7 ? 'bg-rose-100 dark:bg-rose-500/20' : trialDaysLeft <= 30 ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-indigo-50 dark:bg-indigo-500/15'}`}>
              <Star size={18} className={trialDaysLeft <= 7 ? 'text-rose-600 dark:text-rose-400' : trialDaysLeft <= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'} />
            </div>
          </div>
          <div>
            <TrialBar daysLeft={trialDaysLeft} />
            <Link
              to="/owner/dashboard/billing"
              className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                trialDaysLeft <= 30
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Zap size={12} />
              {trialDaysLeft <= 30 ? t("overview.upgradeNow") : t("overview.viewPlans")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${kpi.bg} ${kpi.color} rounded-xl flex items-center justify-center mb-3`}>
              {kpi.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 leading-none">
              {kpi.value === null
                ? <span className="inline-block w-16 h-7 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                : kpi.value}
            </p>
            <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Smart AI Widget ── */}
      <Link
        to="/owner/dashboard/smart-ai"
        className="block group relative overflow-hidden rounded-[2rem] border border-indigo-900/60 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:border-indigo-700/60 transition-all shadow-lg hover:shadow-indigo-900/30"
      >
        {/* glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-full bg-indigo-500/5 blur-2xl" />
        </div>
        <div className="relative flex items-center gap-5 px-6 py-5">
          {/* icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-indigo-400" />
            <div className="absolute w-3 h-3 bg-indigo-400 rounded-full top-4 right-6 animate-ping opacity-30" />
          </div>
          {/* text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-black text-white">{t("overview.smartName", { name: authUser?.businessName || authUser?.fullName?.split(' ')[0] || 'AI' })}</p>
              <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">AI</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {t("overview.aiSub")}
            </p>
          </div>
          {/* stats pills */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {summary && (
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <Target size={11} className="text-emerald-400" />
                <span className="text-[11px] font-black text-white">{t("overview.doneCount", { n: summary.bookingsCompleted })}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2">
              <Sparkles size={11} className="text-indigo-400" />
              <span className="text-[11px] font-black text-indigo-300">{t("overview.insightsCount", { n: 12 })}</span>
            </div>
          </div>
          {/* arrow */}
          <ArrowRight size={18} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
        </div>
      </Link>

      {/* ── Today's Schedule + Pending Confirmations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Today's Schedule */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{t("overview.todaySchedule")}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {today}
              </p>
            </div>
            <span className={`text-xs font-black px-3 py-1 rounded-full ${
              todayBookings.length > 0 ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              {loading ? '—' : t("overview.aptsCount", { n: todayBookings.length })}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-72">
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : todayBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3">
                  <CalendarCheck size={24} className="text-slate-300 dark:text-slate-600" />
                </div>
                <p className="text-sm font-bold text-slate-400">{t("overview.noAptsToday")}</p>
                <p className="text-xs text-slate-400 mt-1">{t("overview.checkTomorrow")}</p>
              </div>
            ) : (
              todayBookings
                .slice()
                .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
                .map((b) => (
                  <div key={b._id} className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                    <div className="w-16 text-center shrink-0">
                      <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">{b.timeSlot}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{b.service?.duration}{t("common.minShort", "min")}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100 dark:bg-slate-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{b.customerName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{b.service?.title}</p>
                    </div>
                    <StatusPill status={b.status} />
                  </div>
                ))
            )}
          </div>

          <div className="px-7 py-4 border-t border-slate-50 dark:border-slate-800 mt-auto">
            <Link
              to="/owner/dashboard/bookings"
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              {t("overview.allAppointments")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Pending Confirmations */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="px-7 py-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{t("overview.pendingConfirmations")}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {t("overview.actionRequired")}
              </p>
            </div>
            {pendingTotal > 0 && (
              <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400">
                {t("overview.waitingCount", { n: pendingTotal })}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-72">
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : pendingBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/15 rounded-2xl flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} className="text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-slate-400">{t("overview.allCaughtUp")}</p>
                <p className="text-xs text-slate-400 mt-1">{t("overview.noPending")}</p>
              </div>
            ) : (
              pendingBookings.map((b) => (
                <div key={b._id} className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{b.customerName}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {b.dateString} · {b.timeSlot} · {b.service?.title}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleQuickStatus(b._id, 'confirmed')}
                      disabled={actionLoading === b._id}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all disabled:opacity-50 uppercase tracking-wider"
                    >
                      {actionLoading === b._id ? '···' : t("overview.confirm")}
                    </button>
                    <button
                      onClick={() => handleQuickStatus(b._id, 'cancelled')}
                      disabled={actionLoading === b._id}
                      className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-xl hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all disabled:opacity-50 uppercase tracking-wider"
                    >
                      {t("overview.cancel")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-7 py-4 border-t border-slate-50 dark:border-slate-800 mt-auto">
            <Link
              to="/owner/dashboard/bookings"
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              {t("overview.manageAll")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{t("overview.quickAccess")}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: t("overview.qaAppointments"), sub: t("overview.qaAppointmentsSub"), to: '/owner/dashboard/bookings', icon: <CalendarCheck size={18} />, color: 'text-indigo-600 dark:text-indigo-400', ring: 'hover:ring-indigo-200 dark:hover:ring-indigo-500/30', bg: 'bg-indigo-50 dark:bg-indigo-500/15' },
            { label: t("overview.qaCustomers"), sub: t("overview.qaCustomersSub"), to: '/owner/dashboard/customers', icon: <Users size={18} />, color: 'text-violet-600 dark:text-violet-400', ring: 'hover:ring-violet-200 dark:hover:ring-violet-500/30', bg: 'bg-violet-50 dark:bg-violet-500/15' },
            { label: t("overview.qaAnalytics"), sub: t("overview.qaAnalyticsSub"), to: '/owner/dashboard/stats', icon: <BarChart3 size={18} />, color: 'text-emerald-600 dark:text-emerald-400', ring: 'hover:ring-emerald-200 dark:hover:ring-emerald-500/30', bg: 'bg-emerald-50 dark:bg-emerald-500/15' },
            { label: t("overview.qaLoyalty"), sub: t("overview.qaLoyaltySub"), to: '/owner/dashboard/loyalty', icon: <Star size={18} />, color: 'text-amber-600 dark:text-amber-400', ring: 'hover:ring-amber-200 dark:hover:ring-amber-500/30', bg: 'bg-amber-50 dark:bg-amber-500/15' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={`bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all ring-2 ring-transparent ${item.ring} group`}
            >
              <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className="font-black text-slate-900 dark:text-white text-sm">{item.label}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-wider">{item.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
