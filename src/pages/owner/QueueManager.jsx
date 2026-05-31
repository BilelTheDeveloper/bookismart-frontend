import React, { useState, useEffect, useRef, useCallback } from 'react';
import API from '../../api/config';
import {
  Tv2, Copy, ExternalLink, CheckCircle2, Clock, Users, PlayCircle,
  ChevronRight, Loader2, RefreshCw, AlertCircle, Sparkles, XCircle,
  MonitorPlay, ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

const POLL_INTERVAL = 10_000;

function pad(n) { return String(n).padStart(2, '0'); }

function fmtSlot(slot) {
  if (!slot) return '--:--';
  const [h, m] = slot.split(':');
  return `${h}h${m !== '00' ? m : ''}`;
}

function endSlot(startSlot, durationMin) {
  if (!startSlot) return null;
  const [h, m] = startSlot.split(':').map(Number);
  const total = h * 60 + m + (durationMin || 30);
  const eh = Math.floor(total / 60) % 24;
  const em = total % 60;
  return `${pad(eh)}h${em !== 0 ? pad(em) : ''}`;
}

/* ── Countdown for in_progress ── */
function CountdownTimer({ initialSeconds, startedAt }) {
  const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  const [remaining, setRemaining] = useState(Math.max(0, initialSeconds - elapsed));

  useEffect(() => {
    const freshElapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
    setRemaining(Math.max(0, initialSeconds - freshElapsed));
    const t = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [initialSeconds, startedAt]);

  const pct   = initialSeconds > 0 ? remaining / initialSeconds : 0;
  const circ  = 2 * Math.PI * 40;
  const color = pct > 0.5 ? '#34d399' : pct > 0.2 ? '#fbbf24' : '#f87171';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
      <svg width={96} height={96} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={48} cy={48} r={40} fill="none" stroke="#1e293b" strokeWidth={7} />
        <circle
          cx={48} cy={48} r={40}
          fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
        />
      </svg>
      <div className="z-10 text-center">
        <p className="text-xl font-black text-white tabular-nums leading-none">
          {pad(Math.floor(remaining / 60))}:{pad(remaining % 60)}
        </p>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">left</p>
      </div>
    </div>
  );
}

/* ── Current session card ── */
function InProgressCard({ item, onDone, doneLoading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-28 bg-emerald-500/8 blur-3xl" />
      </div>

      <div className="relative flex items-center gap-2 mb-5">
        <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-[10px] font-black uppercase tracking-widest">In Session</span>
        </div>
        <span className="text-slate-500 text-xs font-semibold ml-1">
          {fmtSlot(item.timeSlot)} → {endSlot(item.timeSlot, item.serviceDurationMinutes)}
        </span>
      </div>

      <div className="relative flex items-center gap-6">
        <CountdownTimer initialSeconds={item.initialSeconds} startedAt={item.startedAt} />

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Client in session</p>
          <p className="text-4xl font-black text-white leading-none truncate">{item.customerName}</p>
          <p className="text-slate-400 text-sm font-semibold mt-2 truncate">{item.serviceTitle}</p>
        </div>

        <button
          onClick={() => onDone(item._id)}
          disabled={doneLoading === item._id}
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/30 hover:border-transparent text-emerald-400 hover:text-white rounded-xl font-bold text-sm transition-all disabled:opacity-40"
        >
          {doneLoading === item._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
          Done
        </button>
      </div>
    </div>
  );
}

/* ── Waiting row ── */
function WaitingRow({ item, position, onCall, callLoading, hasActive }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/30 transition-colors group">
      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center shrink-0">
        <span className="text-sm font-black text-slate-400">{position}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-base font-black text-white truncate">{item.customerName}</p>
        <p className="text-[11px] text-slate-500 font-semibold mt-0.5 truncate">
          {item.serviceTitle} · {fmtSlot(item.timeSlot)} → {endSlot(item.timeSlot, item.serviceDurationMinutes)}
        </p>
      </div>

      <button
        onClick={() => onCall(item._id)}
        disabled={callLoading === item._id || hasActive}
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 hover:border-transparent text-indigo-400 hover:text-white rounded-lg font-bold text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        title={hasActive ? 'Complete current session first' : 'Call this client'}
      >
        {callLoading === item._id ? <Loader2 size={12} className="animate-spin" /> : <PlayCircle size={12} />}
        Call
      </button>
    </div>
  );
}

/* ── Booking row (not yet in queue) ── */
function BookingRow({ booking, onAdd, addLoading }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-800/50 bg-slate-900/30 hover:bg-slate-800/30 transition-colors">
      <div className="shrink-0 text-center min-w-[44px]">
        <p className="text-base font-black text-white leading-none">{fmtSlot(booking.timeSlot)}</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mt-0.5">slot</p>
      </div>

      <div className="w-px h-8 bg-slate-800 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-white truncate">{booking.customerName}</p>
        <p className="text-[11px] text-slate-500 font-semibold truncate">{booking.service?.title || 'Service'}</p>
      </div>

      <button
        onClick={() => onAdd(booking._id)}
        disabled={addLoading === booking._id}
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-violet-500/10 hover:bg-violet-500 border border-violet-500/20 hover:border-transparent text-violet-400 hover:text-white rounded-lg font-bold text-xs transition-all disabled:opacity-40"
      >
        {addLoading === booking._id ? <Loader2 size={12} className="animate-spin" /> : <ArrowRight size={12} />}
        Add
      </button>
    </div>
  );
}

/* ── TV Link card ── */
function TvLinkCard({ slug }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/display/${slug}`;

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-700/50 bg-slate-900/60">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
        <MonitorPlay size={18} className="text-indigo-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Waiting room display URL</p>
        <p className="text-sm font-bold text-slate-300 truncate">{url}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg font-bold text-xs transition-all"
        >
          {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 hover:border-transparent text-indigo-400 hover:text-white rounded-lg font-bold text-xs transition-all"
        >
          <ExternalLink size={12} />
          Open TV
        </a>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function Empty({ icon: Icon, title, sub }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mb-3">
        <Icon size={24} className="text-slate-600 dark:text-slate-300" />
      </div>
      <p className="text-slate-400 font-bold text-sm">{title}</p>
      {sub && <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main component
   ══════════════════════════════════════════════════════════ */
export default function QueueManager() {
  const [queue, setQueue]             = useState([]);
  const [bookings, setBookings]       = useState([]);
  const [slug, setSlug]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [refreshing, setRefreshing]   = useState(false);
  const [addLoading, setAddLoading]   = useState(null);
  const [callLoading, setCallLoading] = useState(null);
  const [doneLoading, setDoneLoading] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  /* ── Fetch queue + today's bookings + website slug ── */
  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const [queueRes, bookingsRes, siteRes] = await Promise.all([
        API.get('/merchant/consultations/queue'),
        API.get('/merchant/bookings', { params: { date: today, status: 'confirmed', limit: 50 } }),
        slug === null ? API.get('/merchant/website/my-site').catch(() => ({ data: { data: null } })) : Promise.resolve(null),
      ]);

      setQueue(queueRes.data.data || []);
      setBookings(bookingsRes.data.data || []);
      if (siteRes) setSlug(siteRes.data?.data?.slug || false);
    } catch {
      // silent fail on poll — error shown only on first load
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [today, slug]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const t = setInterval(() => fetchAll(true), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [fetchAll]);

  /* ── Derive sets ── */
  const inProgress = queue.find(c => c.status === 'in_progress');
  const waiting    = queue.filter(c => c.status === 'waiting');

  // Bookings not yet in the active queue
  const queuedBookingIds = new Set(queue.map(c => String(c.bookingId)));
  const notInQueue = bookings.filter(b => !queuedBookingIds.has(String(b._id)));

  /* ── Handlers ── */
  const handleAddToQueue = async (bookingId) => {
    setAddLoading(bookingId);
    try {
      await API.post(`/merchant/consultations/queue/${bookingId}`);
      toast.success('Added to queue');
      fetchAll(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to queue');
    } finally {
      setAddLoading(null);
    }
  };

  const handleCall = async (consultationId) => {
    setCallLoading(consultationId);
    try {
      await API.patch(`/merchant/consultations/${consultationId}/call`);
      toast.success('Client called — session started');
      fetchAll(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to call client');
    } finally {
      setCallLoading(null);
    }
  };

  const handleDone = async (consultationId) => {
    setDoneLoading(consultationId);
    try {
      await API.patch(`/merchant/consultations/${consultationId}/complete`);
      toast.success('Session completed');
      fetchAll(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete session');
    } finally {
      setDoneLoading(null);
    }
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Queue Screen</h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Manage today's waiting room — clients see the live screen in real time
          </p>
        </div>
        <button
          onClick={() => fetchAll()}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* ── TV link ── */}
      {slug ? (
        <TvLinkCard slug={slug} />
      ) : slug === false ? (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-amber-400">
          <AlertCircle size={16} />
          <p className="text-sm font-bold">
            No website set up yet. Create your website first to get the display screen URL.
          </p>
        </div>
      ) : null}

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <PlayCircle size={15} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xl font-black text-white leading-none">{inProgress ? 1 : 0}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">In Session</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Clock size={15} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xl font-black text-white leading-none">{waiting.length}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Waiting</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Users size={15} className="text-violet-400" />
          </div>
          <div>
            <p className="text-xl font-black text-white leading-none">{notInQueue.length}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Not yet queued</p>
          </div>
        </div>
      </div>

      {/* ── Main two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

        {/* ── LEFT: Queue control ── */}
        <div className="space-y-4">

          {/* In Progress */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Current Session</p>
            {inProgress ? (
              <InProgressCard
                item={inProgress}
                onDone={handleDone}
                doneLoading={doneLoading}
              />
            ) : (
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <p className="text-slate-300 font-bold text-sm">No active session</p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">Call a waiting client to start</p>
                </div>
              </div>
            )}
          </div>

          {/* Waiting List */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Waiting Queue</p>
              <div className="flex-1 h-px bg-slate-800" />
              {waiting.length > 0 && (
                <span className="text-[10px] font-black text-slate-600 dark:text-slate-300">{waiting.length} client{waiting.length > 1 ? 's' : ''}</span>
              )}
            </div>

            {waiting.length === 0 ? (
              <Empty icon={Clock} title="Queue is empty" sub="Add bookings from the right panel" />
            ) : (
              <div className="space-y-2">
                {waiting.map((item, i) => (
                  <WaitingRow
                    key={item._id}
                    item={item}
                    position={i + 1}
                    onCall={handleCall}
                    callLoading={callLoading}
                    hasActive={!!inProgress}
                  />
                ))}
              </div>
            )}
          </div>

          {inProgress && waiting.length > 0 && (
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold text-center">
              Complete the current session to call the next client
            </p>
          )}
        </div>

        {/* ── RIGHT: Today's bookings panel ── */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Sparkles size={13} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Today's Bookings</p>
              <p className="text-[10px] text-slate-500 font-semibold">confirmed · not in queue yet</p>
            </div>
          </div>

          {notInQueue.length === 0 ? (
            <Empty
              icon={CheckCircle2}
              title="All done"
              sub={bookings.length === 0 ? 'No confirmed bookings today' : 'All bookings are in the queue'}
            />
          ) : (
            <div className="space-y-2">
              {notInQueue.map(b => (
                <BookingRow
                  key={b._id}
                  booking={b}
                  onAdd={handleAddToQueue}
                  addLoading={addLoading}
                />
              ))}
            </div>
          )}

          {bookings.length > 0 && notInQueue.length < bookings.length && (
            <div className="mt-4 pt-3 border-t border-slate-800/60">
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold text-center">
                {bookings.length - notInQueue.length} booking{bookings.length - notInQueue.length > 1 ? 's' : ''} already in queue
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
