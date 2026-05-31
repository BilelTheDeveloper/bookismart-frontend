import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import API from "../../api/config";
import { getSocket } from "../../services/socket";
import {
  Play, CheckCircle2, Plus, Minus, TimerReset, Send,
  Users, Clock, Zap, Shield, Copy, RefreshCw, ChevronRight,
  StickyNote, Tag, Trash2, AlertTriangle, Star, Heart,
  Settings2, RotateCcw, Loader2, ArrowRight, X, MessageSquare,
  Bookmark, CheckCheck, Bell, User, Tv2, ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────── helpers */
const pad = (n) => String(n).padStart(2, "0");
const fmtSeconds = (s) => {
  const t = Math.max(0, s || 0);
  return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
};

const TAG_META = {
  general:    { label: "General",    color: "bg-slate-700 text-slate-300",      dot: "bg-slate-400"    },
  vip:        { label: "VIP",        color: "bg-amber-500/20 text-amber-300",   dot: "bg-amber-400"    },
  allergy:    { label: "Allergy",    color: "bg-rose-500/20 text-rose-300",     dot: "bg-rose-500"     },
  preference: { label: "Preference", color: "bg-indigo-500/20 text-indigo-300", dot: "bg-indigo-400"   },
  warning:    { label: "Warning",    color: "bg-orange-500/20 text-orange-300", dot: "bg-orange-400"   },
};

const STATUS_META = {
  waiting:    { label: "Waiting",     dot: "bg-amber-400",  badge: "bg-amber-500/15 text-amber-300  border-amber-500/30"  },
  in_progress:{ label: "In Progress", dot: "bg-emerald-400",badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  done:       { label: "Done",        dot: "bg-slate-500",  badge: "bg-slate-500/15 text-slate-400  border-slate-500/30"  },
};

/* ─────────────────────────────────────────────────────── TimerRing */
function TimerRing({ remaining, initial, size = 120 }) {
  const pct = initial > 0 ? Math.max(0, remaining / initial) : 0;
  const r = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const color = pct > 0.5 ? "#4f46e5" : pct > 0.2 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth={8} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
        />
      </svg>
      <div className="text-center z-10">
        <p className="text-2xl font-black text-white leading-none">{fmtSeconds(remaining)}</p>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">remaining</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── QueueCard */
function QueueCard({ c, active, onClick }) {
  const meta = STATUS_META[c.status] || STATUS_META.waiting;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all group flex items-center gap-3 ${
        active
          ? "bg-indigo-600/20 border-indigo-500/40"
          : "bg-slate-800/40 border-slate-700/40 hover:bg-slate-800/70 hover:border-slate-600"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
          active ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300"
        }`}>
          {c.queuePosition}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d1117] ${meta.dot}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-black truncate ${active ? "text-white" : "text-slate-200"}`}>{c.customerName}</p>
        <p className="text-[10px] text-slate-500 font-medium truncate">{c.serviceTitle} · {c.timeSlot}</p>
      </div>
      <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${active ? "text-indigo-400 opacity-100" : "text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-60"}`} />
    </button>
  );
}

/* ─────────────────────────────────────────────────────── NoteTag */
function NoteTag({ tag }) {
  const m = TAG_META[tag] || TAG_META.general;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${m.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────── Notes Panel */
function NotesPanel({ consultation, onCheckpointChange, checkpointData }) {
  const [notes, setNotes] = useState({ profileNotes: [], checkpoints: [] });
  const [addText, setAddText] = useState("");
  const [addTag, setAddTag] = useState("general");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const email = consultation?.customerEmail;
  const phone = consultation?.customerPhone;
  const name  = consultation?.customerName;

  const loadNotes = useCallback(async () => {
    if (!email && !phone) return;
    const q = email
      ? `email=${encodeURIComponent(email)}`
      : `phone=${encodeURIComponent(phone)}`;
    try {
      const { data } = await API.get(`/merchant/notes?${q}`);
      if (data.success) setNotes(data.data);
    } catch {}
  }, [email, phone]);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  const addNote = async () => {
    if (!addText.trim()) return;
    setSaving(true);
    try {
      const { data } = await API.post("/merchant/notes", {
        email, phone, name,
        tag: addTag, text: addText.trim(),
      });
      if (data.success) { setNotes(data.data); setAddText(""); setShowAddForm(false); }
    } catch {}
    finally { setSaving(false); }
  };

  const deleteNote = async (noteId) => {
    setDeleting(noteId);
    const q = email ? `email=${encodeURIComponent(email)}` : `phone=${encodeURIComponent(phone)}`;
    try {
      const { data } = await API.delete(`/merchant/notes/${noteId}?${q}`);
      if (data.success) setNotes(data.data);
    } catch {}
    finally { setDeleting(null); }
  };

  const lastCheckpoint = notes.checkpoints?.[0];

  return (
    <div className="flex flex-col h-full gap-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

      {/* Last checkpoint banner */}
      {lastCheckpoint && (
        <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark size={13} className="text-indigo-400" />
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Last Checkpoint</p>
            <span className="text-[9px] text-slate-600 dark:text-slate-300 ml-auto">{lastCheckpoint.date}</span>
          </div>
          <p className="text-xs font-bold text-white">{lastCheckpoint.service}</p>
          {lastCheckpoint.summary && (
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{lastCheckpoint.summary}</p>
          )}
          {lastCheckpoint.nextAction && (
            <div className="mt-2 flex items-start gap-1.5">
              <ArrowRight size={10} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-emerald-400 font-bold">{lastCheckpoint.nextAction}</p>
            </div>
          )}
        </div>
      )}

      {/* Profile notes */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNote size={13} className="text-amber-400" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Notes</p>
          </div>
          <button
            onClick={() => setShowAddForm(p => !p)}
            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded-lg hover:bg-indigo-500/10 transition-all"
          >
            {showAddForm ? "Cancel" : "+ Add"}
          </button>
        </div>

        {showAddForm && (
          <div className="space-y-2 mb-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(TAG_META).map(([key, m]) => (
                <button
                  key={key}
                  onClick={() => setAddTag(key)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all ${
                    addTag === key
                      ? `${m.color} border-current`
                      : "bg-slate-700 text-slate-500 border-transparent hover:border-slate-600"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <textarea
              value={addText}
              onChange={e => setAddText(e.target.value)}
              placeholder="Write a note about this client…"
              rows={2}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none resize-none placeholder-slate-600 focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={addNote}
              disabled={saving || !addText.trim()}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-lg disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
            >
              {saving ? <><Loader2 size={11} className="animate-spin" /> Saving…</> : "Save Note"}
            </button>
          </div>
        )}

        <div className="space-y-2">
          {notes.profileNotes?.length === 0 && !showAddForm && (
            <p className="text-xs text-slate-600 dark:text-slate-300 text-center py-3">No notes yet</p>
          )}
          {notes.profileNotes?.map(n => (
            <div key={n._id} className="flex items-start gap-2 group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <NoteTag tag={n.tag} />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.text}</p>
              </div>
              <button
                onClick={() => deleteNote(n._id)}
                disabled={deleting === n._id}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-rose-500/20 text-slate-600 dark:text-slate-300 hover:text-rose-400 transition-all flex-shrink-0 mt-0.5"
              >
                {deleting === n._id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Session checkpoint (filled at end) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCheck size={13} className="text-emerald-400" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Checkpoint</p>
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-300 mb-2">Saved when you click Done. Auto-shows next visit.</p>
        <textarea
          value={checkpointData.summary}
          onChange={e => onCheckpointChange("summary", e.target.value)}
          placeholder="What was done? Which product? Key observations…"
          rows={3}
          className="w-full bg-slate-800 border border-slate-700/50 text-slate-200 text-xs rounded-xl p-3 outline-none resize-none placeholder-slate-600 focus:border-emerald-500/50 transition-colors mb-2"
        />
        <input
          value={checkpointData.nextAction}
          onChange={e => onCheckpointChange("nextAction", e.target.value)}
          placeholder="Recommended next step / product / action…"
          className="w-full bg-slate-800 border border-slate-700/50 text-slate-200 text-xs rounded-xl px-3 py-2.5 outline-none placeholder-slate-600 focus:border-emerald-500/50 transition-colors"
        />
      </div>

      {/* History checkpoints */}
      {notes.checkpoints?.length > 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={13} className="text-slate-500" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visit History</p>
          </div>
          <div className="space-y-3 max-h-40 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {notes.checkpoints.slice(1).map(cp => (
              <div key={cp._id} className="pl-3 border-l-2 border-slate-700">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[10px] font-bold text-slate-400">{cp.date}</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300">· {cp.service}</p>
                </div>
                {cp.summary && <p className="text-[11px] text-slate-400 leading-relaxed">{cp.summary}</p>}
                {cp.nextAction && (
                  <p className="text-[10px] text-emerald-500 mt-0.5 flex items-center gap-1">
                    <ArrowRight size={9} /> {cp.nextAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── MESSAGE BUBBLE */
function MsgBubble({ msg }) {
  const isOwner = msg.senderRole === "owner";
  const isSystem = msg.senderRole === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="px-3 py-1 bg-slate-800 text-slate-500 text-[10px] font-bold rounded-full">{msg.text}</span>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwner ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[75%] rounded-2xl px-3 py-2 ${
        isOwner
          ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-br-sm"
          : "bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm"
      }`}>
        <p className={`text-[9px] font-black uppercase mb-0.5 ${isOwner ? "text-indigo-200" : "text-slate-500"}`}>
          {msg.senderRole}
        </p>
        <p className="text-sm leading-relaxed">{msg.text}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ MAIN COMPONENT */
const WorkMode = () => {
  const [queue, setQueue]         = useState([]);
  const [bookings, setBookings]   = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage]     = useState("");
  const [sending, setSending]     = useState(false);
  const [completing, setCompleting] = useState(false);
  const [startingId, setStartingId] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [copied, setCopied]       = useState(false);
  const [showInvitePanel, setShowInvitePanel] = useState(false);
  const [checkpointData, setCheckpointData]   = useState({ summary: "", nextAction: "" });
  const [tickSeconds, setTickSeconds]         = useState(0);
  const [rightTab, setRightTab]   = useState("notes"); // notes | history
  const [displaySlug, setDisplaySlug] = useState(null);
  const [displayCopied, setDisplayCopied] = useState(false);

  const joinedRoomRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inFlightRef = useRef(false);
  const tickRef = useRef(null);

  const selected = useMemo(() => queue.find(c => c._id === selectedId) || null, [queue, selectedId]);

  /* ── Load queue + bookings ── */
  const loadAll = useCallback(async ({ force = false } = {}) => {
    if (!force && inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      const [qRes, bRes] = await Promise.all([
        API.get("/merchant/consultations/queue"),
        API.get("/merchant/bookings?status=confirmed&limit=20"),
      ]);
      if (qRes.data?.success) {
        setQueue(qRes.data.data || []);
        if (!selectedId && qRes.data.data?.[0]) setSelectedId(qRes.data.data[0]._id);
      }
      if (bRes.data?.success) setBookings(bRes.data.data || []);
    } catch (e) {
      console.error("WorkMode load failed", e);
    } finally { inFlightRef.current = false; }
  }, [selectedId]);

  useEffect(() => {
    loadAll({ force: true });
    const id = setInterval(() => { if (!document.hidden) loadAll(); }, 20_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    API.get('/merchant/website/my-site')
      .then(res => { if (res.data?.slug) setDisplaySlug(res.data.slug); })
      .catch(() => {});
  }, []);

  /* ── Client-side countdown tick ── */
  useEffect(() => {
    clearInterval(tickRef.current);
    if (!selected || selected.status !== "in_progress") return;
    setTickSeconds(selected.remainingSeconds);
    tickRef.current = setInterval(() => {
      setTickSeconds(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [selected?._id, selected?.remainingSeconds, selected?.status]);

  /* ── Socket.io ── */
  useEffect(() => {
    if (!selected?._id) return;
    const socket = getSocket();
    const room = `consultation:${selected._id}`;
    if (joinedRoomRef.current && joinedRoomRef.current !== room) {
      socket.emit("leave", { room: joinedRoomRef.current });
    }
    joinedRoomRef.current = room;
    socket.emit("join", { room });

    const refresh = () => loadAll({ force: true });
    socket.on("consultation:message", refresh);
    socket.on("consultation:done", refresh);
    return () => {
      socket.off("consultation:message", refresh);
      socket.off("consultation:done", refresh);
    };
  }, [selected?._id, loadAll]);

  /* ── Auto-scroll messages ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages?.length]);

  /* ── Actions ── */
  const startConsultation = async (bookingId) => {
    setStartingId(bookingId);
    try {
      const { data } = await API.post(`/merchant/consultations/from-booking/${bookingId}`);
      if (data.success) {
        await loadAll({ force: true });
        setSelectedId(data.data._id);
      }
    } catch {}
    finally { setStartingId(null); }
  };

  const adjustTimer = async (action, seconds) => {
    if (!selected) return;
    await API.patch(`/merchant/consultations/${selected._id}/timer`, { action, seconds });
    await loadAll({ force: true });
  };

  const sendMsg = async () => {
    if (!selected || !message.trim()) return;
    setSending(true);
    try {
      await API.post(`/merchant/consultations/${selected._id}/messages`, { text: message.trim() });
      setMessage("");
      await loadAll({ force: true });
    } catch {}
    finally { setSending(false); }
  };

  const completeSession = async () => {
    if (!selected) return;
    setCompleting(true);
    try {
      await API.patch(`/merchant/consultations/${selected._id}/complete`, {
        ownerNotes: checkpointData.summary,
        checkpointSummary: checkpointData.summary,
        nextAction: checkpointData.nextAction,
      });
      setCheckpointData({ summary: "", nextAction: "" });
      await loadAll({ force: true });
    } catch {}
    finally { setCompleting(false); }
  };

  const generateInvite = async () => {
    setInviteBusy(true);
    try {
      const { data } = await API.post("/work-mode/invite");
      if (data?.success) setInviteLink(data.data.link);
    } catch {}
    finally { setInviteBusy(false); }
  };

  const revokeInvite = async () => {
    setInviteBusy(true);
    try {
      await API.post("/work-mode/rotate");
      setInviteLink("");
    } catch {}
    finally { setInviteBusy(false); }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckpointChange = (key, val) =>
    setCheckpointData(p => ({ ...p, [key]: val }));

  /* ── filtered bookings not already in queue ── */
  const queueIds = new Set(queue.map(c => String(c.bookingId)));
  const startableBookings = bookings.filter(b => !queueIds.has(String(b._id)));

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-0 rounded-2xl overflow-hidden bg-[#0d1117] border border-slate-800/60 shadow-2xl">

      {/* ══════════ LEFT: QUEUE PANEL ══════════ */}
      <aside className="w-72 flex-shrink-0 border-r border-slate-800 flex flex-col bg-slate-900/60">

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 flex items-center justify-center">
              <Zap size={14} className="text-indigo-400" />
            </div>
            <p className="font-black text-white text-sm">Work Mode</p>
          </div>
          <div className="flex items-center gap-1.5">
            {displaySlug && (
              <div className="relative flex items-center gap-1">
                <a
                  href={`/display/${displaySlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open waiting room display screen"
                  className="p-1.5 rounded-lg hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-400 transition-all"
                >
                  <Tv2 size={15} />
                </a>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/display/${displaySlug}`;
                    navigator.clipboard.writeText(url).then(() => {
                      setDisplayCopied(true);
                      setTimeout(() => setDisplayCopied(false), 2000);
                    });
                  }}
                  title="Copy display URL"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                >
                  {displayCopied ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            )}
            <button
              onClick={() => setShowInvitePanel(p => !p)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
            >
              <Settings2 size={15} />
            </button>
          </div>
        </div>

        {/* Invite panel */}
        {showInvitePanel && (
          <div className="px-4 py-4 border-b border-slate-800 bg-slate-800/30 space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Worker Invite</p>
            <button
              onClick={generateInvite}
              disabled={inviteBusy}
              className="w-full py-2.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-black text-xs rounded-xl hover:bg-emerald-600/30 transition-all disabled:opacity-50"
            >
              {inviteBusy ? <Loader2 size={12} className="animate-spin mx-auto" /> : "Generate Link"}
            </button>
            {inviteLink && (
              <>
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 font-mono break-all leading-relaxed">{inviteLink}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyLink}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${
                      copied
                        ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500"
                    }`}
                  >
                    {copied ? <CheckCheck size={12} className="inline mr-1" /> : <Copy size={12} className="inline mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={revokeInvite}
                    disabled={inviteBusy}
                    className="px-3 py-2 rounded-xl text-xs font-black bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-50"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Queue list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5" style={{ scrollbarWidth: "none" }}>
          {queue.length === 0 && startableBookings.length === 0 && (
            <div className="py-12 text-center">
              <Users size={28} className="text-slate-700 dark:text-slate-200 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-300 font-bold text-sm">No active sessions</p>
              <p className="text-slate-700 dark:text-slate-200 text-xs mt-1">Start from a confirmed booking below</p>
            </div>
          )}

          {queue.length > 0 && (
            <>
              <p className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest px-1 mb-2">Queue</p>
              {queue.map(c => (
                <QueueCard
                  key={c._id}
                  c={c}
                  active={c._id === selectedId}
                  onClick={() => setSelectedId(c._id)}
                />
              ))}
            </>
          )}
        </div>

        {/* Bookings to start */}
        {startableBookings.length > 0 && (
          <div className="border-t border-slate-800 px-3 py-3 space-y-1.5">
            <p className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest px-1 mb-2">Start Session</p>
            {startableBookings.slice(0, 4).map(b => (
              <button
                key={b._id}
                onClick={() => startConsultation(b._id)}
                disabled={startingId === b._id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:bg-indigo-600/10 hover:border-indigo-500/30 transition-all group"
              >
                <Play size={12} className="text-slate-500 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-bold text-slate-300 truncate">{b.customerName}</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-300 truncate">{b.service?.title} · {b.timeSlot}</p>
                </div>
                {startingId === b._id
                  ? <Loader2 size={12} className="animate-spin text-slate-500 flex-shrink-0" />
                  : <ChevronRight size={12} className="text-slate-700 dark:text-slate-200 group-hover:text-indigo-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                }
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* ══════════ CENTER: ACTIVE SESSION ══════════ */}
      <section className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-slate-600 dark:text-slate-300" />
              </div>
              <p className="text-slate-500 font-black text-base">Select or start a session</p>
              <p className="text-slate-700 dark:text-slate-200 text-sm mt-1">Choose a customer from the queue on the left</p>
            </div>
          </div>
        ) : (
          <>
            {/* Session header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-500/20">
                  {selected.customerName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-white font-black text-lg leading-tight">{selected.customerName}</h2>
                  <p className="text-slate-500 text-xs font-medium">{selected.serviceTitle} · {selected.servicePrice} · {selected.serviceDurationMinutes}min</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${STATUS_META[selected.status]?.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[selected.status]?.dot} ${selected.status === "in_progress" ? "animate-pulse" : ""}`} />
                  {STATUS_META[selected.status]?.label}
                </span>
              </div>

              {/* Timer ring */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <TimerRing remaining={tickSeconds} initial={selected.initialSeconds} size={90} />
                <div className="flex flex-col gap-1">
                  <button onClick={() => adjustTimer("add", 60)} className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 flex items-center justify-center transition-all">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => adjustTimer("subtract", 60)} className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/25 text-rose-400 hover:bg-rose-500/25 flex items-center justify-center transition-all">
                    <Minus size={14} />
                  </button>
                  <button onClick={() => adjustTimer("set", selected.initialSeconds)} className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600 flex items-center justify-center transition-all">
                    <TimerReset size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Message thread */}
            <div className="flex-1 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
              {(selected.messages || []).length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">Session started — send a message</p>
                </div>
              ) : (
                <>
                  {(selected.messages || []).map(m => <MsgBubble key={m._id} msg={m} />)}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input + Done */}
            <div className="px-6 py-4 border-t border-slate-800 space-y-3">
              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
                  placeholder="Message worker… (Enter to send)"
                  rows={2}
                  className="flex-1 bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm rounded-xl px-4 py-3 outline-none resize-none placeholder-slate-600 focus:border-indigo-500/50 transition-colors"
                />
                <button
                  onClick={sendMsg}
                  disabled={sending || !message.trim()}
                  className="w-11 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                >
                  {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>

              {selected.status !== "done" && (
                <button
                  onClick={completeSession}
                  disabled={completing}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/10"
                >
                  {completing
                    ? <><Loader2 size={15} className="animate-spin" /> Completing…</>
                    : <><CheckCircle2 size={15} /> Done — Save & Notify Next</>
                  }
                </button>
              )}
            </div>
          </>
        )}
      </section>

      {/* ══════════ RIGHT: NOTES & TOOLS ══════════ */}
      <aside className="w-72 flex-shrink-0 border-l border-slate-800 flex flex-col bg-slate-900/40">
        <div className="px-4 py-4 border-b border-slate-800">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Intelligence</p>
          {selected && (
            <p className="text-sm font-bold text-white mt-0.5 truncate">{selected.customerName}</p>
          )}
        </div>

        <div className="flex-1 overflow-hidden px-4 py-4">
          {selected ? (
            <NotesPanel
              consultation={selected}
              checkpointData={checkpointData}
              onCheckpointChange={handleCheckpointChange}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <StickyNote size={28} className="text-slate-700 dark:text-slate-200 mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-300 text-xs font-bold">Select a session to view notes</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default WorkMode;
