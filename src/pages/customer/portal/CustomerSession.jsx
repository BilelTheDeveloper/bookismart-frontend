import React, { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import {
  Clock, CheckCircle2, Loader2, Zap, Users,
  Calendar, Bell, MessageSquare, RefreshCw,
} from "lucide-react";
import CAPI from "../../../api/customerConfig";
import { useCustomerAuth } from "../../../context/CustomerAuthContext";

// ─── Helpers ────────────────────────────────────────────────────────────────

const COLOR = {
  emerald: {
    bg:     "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text:   "text-emerald-400",
    ring:   "ring-emerald-500/30",
    dot:    "bg-emerald-400",
  },
  indigo: {
    bg:     "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text:   "text-indigo-400",
    ring:   "ring-indigo-500/30",
    dot:    "bg-indigo-400",
  },
  amber: {
    bg:     "bg-amber-500/10",
    border: "border-amber-500/30",
    text:   "text-amber-400",
    ring:   "ring-amber-500/30",
    dot:    "bg-amber-400",
  },
};

function getStatusCfg(status, queuePosition) {
  if (status === "done") return {
    key:     "emerald",
    icon:    CheckCircle2,
    label:   "Session Complete",
    pulse:   false,
    desc:    "Your session has ended. Thank you for your visit!",
  };
  if (status === "in_progress") return {
    key:     "indigo",
    icon:    Zap,
    label:   "In Progress",
    pulse:   true,
    desc:    "You are currently being attended to.",
  };
  // waiting
  const pos = queuePosition || 1;
  return {
    key:     "amber",
    icon:    Clock,
    label:   pos === 1 ? "You're Up Next!" : `Waiting — #${pos} in queue`,
    pulse:   pos === 1,
    desc:    pos === 1
      ? "Please get ready — you'll be called any moment."
      : `${pos - 1} ${pos === 2 ? "person" : "people"} ahead of you.`,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="text-slate-500 mt-0.5 shrink-0">{icon}</span>}
    <span className="text-slate-500 text-sm shrink-0">{label}:</span>
    <span className="text-white text-sm font-bold break-words">{value || "—"}</span>
  </div>
);

const QueueDots = ({ total, current }) => {
  const dots = Math.min(total, 7);
  return (
    <div className="flex justify-center gap-2 mt-5">
      {Array.from({ length: dots }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all ${
            i === dots - 1
              ? "bg-amber-400 scale-125"
              : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
};

const MessageBubble = ({ msg }) => (
  <div className="bg-slate-800 rounded-xl px-4 py-3">
    <p className="text-slate-300 text-sm leading-relaxed">{msg.text}</p>
    <p className="text-slate-600 text-xs mt-1.5 capitalize">{msg.senderRole}</p>
  </div>
);

const NoSession = ({ onRefresh }) => (
  <div className="flex flex-col items-center justify-center min-h-[420px] text-center px-4">
    <div className="w-20 h-20 bg-slate-800/80 border border-slate-700 rounded-2xl flex items-center justify-center mb-5">
      <Users size={32} className="text-slate-600" />
    </div>
    <h3 className="text-white font-black text-xl mb-2">No Active Session</h3>
    <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
      You don't have an active or upcoming consultation session right now.
      Book an appointment to get started.
    </p>
    <button
      onClick={onRefresh}
      className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl transition-all"
    >
      <RefreshCw size={15} />
      Check Again
    </button>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const CustomerSession = () => {
  const { customer } = useCustomerAuth();
  const [session,  setSession]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [nextUp,   setNextUp]   = useState(false);   // "you're next" banner
  const socketRef = useRef(null);
  const currentRoomRef = useRef(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CAPI.get("/customer/consultation/active");
      setSession(res.data?.data || null);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSession(); }, [fetchSession]);

  // Socket.io: connect once, re-join room when session._id changes
  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "https://bookismart-backend-ixlp.onrender.com";
    const origin = base.replace(/\/api$/, "");

    const socket = io(origin, { withCredentials: true });
    socketRef.current = socket;

    return () => {
      if (currentRoomRef.current) {
        socket.emit("leave", { room: `consultation:${currentRoomRef.current}` });
      }
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !session?._id) return;

    const cid = String(session._id);

    // Leave previous room
    if (currentRoomRef.current && currentRoomRef.current !== cid) {
      socket.emit("leave", { room: `consultation:${currentRoomRef.current}` });
    }

    socket.emit("join", { room: `consultation:${cid}` });
    currentRoomRef.current = cid;

    const onNextUp = ({ consultationId }) => {
      if (consultationId === cid) setNextUp(true);
    };

    const onMessage = ({ consultationId, message }) => {
      if (consultationId !== cid) return;
      setSession(prev =>
        prev ? { ...prev, messages: [...(prev.messages || []), message] } : prev
      );
    };

    const onDone = ({ consultationId }) => {
      if (consultationId !== cid) return;
      setSession(prev => prev ? { ...prev, status: "done" } : prev);
      setNextUp(false);
    };

    socket.on("consultation:nextUp",  onNextUp);
    socket.on("consultation:message", onMessage);
    socket.on("consultation:done",    onDone);

    return () => {
      socket.off("consultation:nextUp",  onNextUp);
      socket.off("consultation:message", onMessage);
      socket.off("consultation:done",    onDone);
    };
  }, [session?._id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 size={32} className="animate-spin text-indigo-500" />
    </div>
  );

  if (!session) return <NoSession onRefresh={fetchSession} />;

  const cfg  = getStatusCfg(session.status, session.queuePosition);
  const c    = COLOR[cfg.key];
  const Icon = cfg.icon;

  const visibleMessages = (session.messages || [])
    .filter(m => m.senderRole !== "customer")
    .slice(-5);

  return (
    <div className="max-w-xl mx-auto space-y-5 pb-12">

      {/* Page header */}
      <div className="mb-1">
        <h1 className="text-white font-black text-2xl">My Session</h1>
        <p className="text-slate-500 text-sm mt-1">Live status for your current consultation</p>
      </div>

      {/* "You're next!" alert banner */}
      {nextUp && session.status === "waiting" && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/40 rounded-2xl px-5 py-4">
          <Bell size={18} className="text-amber-400 shrink-0 animate-bounce" />
          <div>
            <p className="text-amber-300 font-black text-sm">You're up next!</p>
            <p className="text-amber-500/80 text-xs mt-0.5">Please get ready — your session is about to start.</p>
          </div>
        </div>
      )}

      {/* Status hero card */}
      <div className={`${c.bg} border ${c.border} rounded-3xl p-8 text-center`}>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${c.bg} border ${c.border} ring-4 ${c.ring} mx-auto mb-5`}>
          <Icon size={36} className={`${c.text} ${cfg.pulse ? "animate-pulse" : ""}`} />
        </div>

        <h2 className={`text-2xl font-black ${c.text} mb-2`}>{cfg.label}</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{cfg.desc}</p>

        {/* Queue position dots */}
        {session.status === "waiting" && (session.queuePosition || 1) > 1 && (
          <QueueDots total={session.queuePosition} current={session.queuePosition} />
        )}

        {/* In-progress pulse ring */}
        {session.status === "in_progress" && (
          <div className="flex justify-center mt-5">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500" />
            </span>
          </div>
        )}
      </div>

      {/* Session details */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
        <div className="px-6 py-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Appointment Info</p>
          <div className="space-y-3">
            <DetailRow
              icon={<Zap size={15} />}
              label="Service"
              value={session.serviceTitle}
            />
            <DetailRow
              icon={<Calendar size={15} />}
              label="Date"
              value={session.dateString}
            />
            <DetailRow
              icon={<Clock size={15} />}
              label="Time"
              value={session.timeSlot}
            />
            {session.servicePrice && (
              <DetailRow
                icon={null}
                label="Price"
                value={session.servicePrice}
              />
            )}
          </div>
        </div>

        {/* Messages from owner/worker */}
        {visibleMessages.length > 0 && (
          <div className="px-6 py-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageSquare size={13} />
              Messages
            </p>
            <div className="space-y-2">
              {visibleMessages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Done celebration */}
      {session.status === "done" && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-6 text-center space-y-3">
          <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
          <div>
            <h3 className="text-emerald-400 font-black text-lg">Session Complete!</h3>
            <p className="text-slate-400 text-sm mt-1">
              We hope you had a great experience. See you next time!
            </p>
          </div>
          {session.completionSummary && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 text-left mt-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Session Summary</p>
              <p className="text-slate-300 text-sm leading-relaxed">{session.completionSummary}</p>
            </div>
          )}
        </div>
      )}

      {/* Refresh button when not in a terminal state */}
      {session.status !== "done" && (
        <button
          onClick={fetchSession}
          className="w-full flex items-center justify-center gap-2 py-3 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300 text-sm font-bold rounded-xl transition-all"
        >
          <RefreshCw size={14} />
          Refresh Status
        </button>
      )}
    </div>
  );
};

export default CustomerSession;
