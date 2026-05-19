import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../../api/config';
import { Loader2, AlertCircle, Tv2, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';

const REFRESH_INTERVAL = 15_000;

// ── helpers ──────────────────────────────────────────────────────────────────

function pad(n) { return String(n).padStart(2, '0'); }

function fmtTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function fmtDate(date, locale) {
  return date.toLocaleDateString(locale || 'fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function slotToMinutes(slot) {
  if (!slot) return 0;
  const [h, m] = slot.split(':').map(Number);
  return h * 60 + m;
}

function fmtSlot(slot) {
  if (!slot) return '--:--';
  const [h, m] = slot.split(':');
  return `${h}h${m !== '00' ? m : ''}`;
}

function endSlot(startSlot, durationMin) {
  if (!startSlot) return null;
  const [h, m] = startSlot.split(':').map(Number);
  const total   = h * 60 + m + (durationMin || 30);
  const eh      = Math.floor(total / 60) % 24;
  const em      = total % 60;
  return `${pad(eh)}:${pad(em)}`;
}

function computeEstimatedStarts(queue, serverNow) {
  const now = serverNow || new Date();
  let cursorMs = now.getTime();

  return queue.map(item => {
    if (item.status === 'in_progress') {
      const endMs = cursorMs + (item.remainingSeconds ?? 0) * 1000;
      cursorMs = endMs;
      return { ...item, estStartMs: now.getTime(), estEndMs: endMs };
    } else {
      const estStartMs = cursorMs;
      const estEndMs   = cursorMs + (item.durationMinutes ?? 30) * 60_000;
      cursorMs = estEndMs;
      return { ...item, estStartMs, estEndMs };
    }
  });
}

function fmtWait(ms, t) {
  if (ms <= 0) return t('display.now');
  const min = Math.ceil(ms / 60_000);
  if (min < 60) return `~${min} ${t('display.min')}`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `~${h}h${pad(m)}` : `~${h}h`;
}

// ── Subcomponents ─────────────────────────────────────────────────────────────

function LiveClock() {
  const [now, setNow] = useState(new Date());
  const { i18n } = useTranslation();
  const locale = i18n.language?.slice(0, 2) || 'fr';

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right">
      <p className="text-5xl font-black text-white tabular-nums tracking-tight leading-none">
        {fmtTime(now)}
      </p>
      <p className="text-slate-400 text-sm font-semibold mt-1 capitalize">{fmtDate(now, locale)}</p>
    </div>
  );
}

function CurrentCard({ item, estEndMs }) {
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState(item.remainingSeconds ?? 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(item.remainingSeconds ?? 0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemaining(r => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [item.remainingSeconds]);

  const pct      = item.durationMinutes > 0 ? Math.max(0, remaining / (item.durationMinutes * 60)) : 0;
  const circ     = 2 * Math.PI * 54;
  const offset   = circ * (1 - pct);
  const color    = pct > 0.5 ? '#34d399' : pct > 0.2 ? '#fbbf24' : '#f87171';

  const estEndLabel = estEndMs
    ? `${t('display.until')} ${pad(new Date(estEndMs).getHours())}h${pad(new Date(estEndMs).getMinutes())}`
    : '';

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-emerald-900/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative flex items-center gap-2.5 mb-6">
        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-xs font-black uppercase tracking-[0.2em]">{t('display.inSession')}</span>
        </div>
        <span className="text-slate-500 text-xs font-semibold">{item.timeSlot} — {estEndLabel}</span>
      </div>

      <div className="relative flex items-center gap-8">
        <div className="shrink-0 relative flex items-center justify-center" style={{ width: 128, height: 128 }}>
          <svg width={128} height={128} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
            <circle cx={64} cy={64} r={54} fill="none" stroke="#1e293b" strokeWidth={8} />
            <circle
              cx={64} cy={64} r={54}
              fill="none" stroke={color} strokeWidth={8}
              strokeDasharray={circ} strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
            />
          </svg>
          <div className="z-10 text-center">
            <p className="text-3xl font-black text-white tabular-nums leading-none">
              {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t('display.remaining')}</p>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">{t('display.clientInSession')}</p>
          <p className="text-6xl font-black text-white leading-none truncate">{item.firstName}</p>
          <p className="text-slate-400 text-sm font-semibold mt-3">{item.durationMinutes} {t('display.min')} · {item.timeSlot}</p>
        </div>
      </div>
    </div>
  );
}

function NextCard({ item, waitMs }) {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 p-6 shadow-xl shadow-amber-900/20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-48 h-32 bg-amber-500/5 blur-2xl" />
      </div>

      <div className="relative flex items-center gap-2.5 mb-4">
        <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-300 text-[10px] font-black uppercase tracking-[0.2em]">{t('display.next')}</span>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{t('display.next')}</p>
          <p className="text-4xl font-black text-white leading-none truncate">{item.firstName}</p>
          <p className="text-slate-500 text-xs font-semibold mt-2">{item.timeSlot} — {endSlot(item.timeSlot, item.durationMinutes)}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-0.5">{t('display.estimated')}</p>
            <p className="text-2xl font-black text-amber-300">{fmtWait(waitMs, t)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueRow({ item, position, waitMs }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
        <span className="text-sm font-black text-slate-400">{position}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xl font-black text-white truncate">{item.firstName}</p>
        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{item.timeSlot} — {endSlot(item.timeSlot, item.durationMinutes)}</p>
      </div>

      <div className="shrink-0 text-right">
        <span className="text-[10px] font-black uppercase text-slate-500 block mb-0.5">{t('display.waitingIn')}</span>
        <span className="text-base font-black text-slate-300">{fmtWait(waitMs, t)}</span>
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
      <div className="w-24 h-24 rounded-3xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-emerald-400" />
      </div>
      <h2 className="text-3xl font-black text-white mb-2">{t('display.waitingRoom')}</h2>
      <p className="text-slate-400 text-base font-medium">{t('display.queueEmpty')}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const DisplayScreen = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await API.get(`/public/display/${slug}`);
      if (res.data.success) {
        setData(res.data.data);
        setLastRefresh(new Date());
        setError(null);
      }
    } catch (err) {
      if (!data) setError(err.response?.data?.message || t('display.screenNotFound'));
    } finally {
      setLoading(false);
    }
  }, [slug, t]);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchData]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-semibold">{t('display.loadingScreen')}</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-16 h-16 text-rose-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">{t('display.screenNotFound')}</h2>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const { queue = [], businessName, serverTime } = data;
  const serverNow = serverTime ? new Date(serverTime) : new Date();
  const now       = new Date();

  const withEst   = computeEstimatedStarts(queue, now);
  const current   = withEst.find(q => q.status === 'in_progress');
  const waiting   = withEst.filter(q => q.status === 'waiting');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden select-none">
      {/* Background texture */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/3 blur-[100px] rounded-full" />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
            <Tv2 size={22} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white leading-none">{businessName}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{t('display.waitingRoomLive')}</span>
            </div>
          </div>
        </div>
        <LiveClock />
      </header>

      {/* ── Queue status bar ── */}
      <div className="relative z-10 flex items-center gap-6 px-10 py-3 bg-slate-900/40 border-b border-slate-800/40">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-slate-500" />
          <span className="text-slate-400 text-xs font-bold">
            <span className="text-white font-black">{waiting.length}</span> {t('display.waitingLabel')}
          </span>
        </div>
        {current && (
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span className="text-slate-400 text-xs font-bold">
              <span className="text-emerald-400 font-black">1</span> {t('display.inCourse')}
            </span>
          </div>
        )}
        {lastRefresh && (
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold">
            <div className="w-1 h-1 bg-slate-700 rounded-full animate-pulse" />
            {pad(lastRefresh.getHours())}:{pad(lastRefresh.getMinutes())}:{pad(lastRefresh.getSeconds())}
          </div>
        )}
      </div>

      {/* ── Main content ── */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-6 p-8 overflow-auto">

        {/* Left — Current + Next */}
        <div className="lg:w-[55%] flex flex-col gap-5">
          {current
            ? <CurrentCard item={current} estEndMs={current.estEndMs} />
            : (
              <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-900/40 p-8 text-center flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <p className="text-slate-300 font-black text-lg">{t('display.noSession')}</p>
                <p className="text-slate-500 text-sm font-medium">{t('display.roomReady')}</p>
              </div>
            )
          }

          {waiting[0] && (
            <NextCard
              item={waiting[0]}
              waitMs={waiting[0].estStartMs - now.getTime()}
            />
          )}
        </div>

        {/* Right — Full queue list */}
        <div className="lg:flex-1 flex flex-col">
          {queue.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {waiting.length > 1 && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t('display.waitingList')}</p>
                    <div className="flex-1 h-px bg-slate-800" />
                    <span className="text-[10px] font-black text-slate-600">{waiting.length - 1} {t('display.persons')}</span>
                  </div>
                  <div className="space-y-2 overflow-y-auto flex-1">
                    {waiting.slice(1).map((item, i) => (
                      <QueueRow
                        key={item.firstName + i}
                        item={item}
                        position={i + 2}
                        waitMs={item.estStartMs - now.getTime()}
                      />
                    ))}
                  </div>
                </>
              )}

              {waiting.length === 0 && current && (
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                  <Users size={32} className="text-slate-700 mb-3" />
                  <p className="text-slate-500 font-semibold">{t('display.noOtherClients')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 flex items-center justify-between px-10 py-4 border-t border-slate-800/40">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-indigo-400" />
          <span className="text-[11px] font-black text-slate-600">
            Powered by <span className="text-slate-500">Bookiify</span>
          </span>
        </div>
        <p className="text-[11px] text-slate-700 font-medium">
          {t('display.autoRefreshMsg')}
        </p>
      </footer>
    </div>
  );
};

export default DisplayScreen;
