import React, { useEffect, useMemo, useRef, useState } from "react";
import API from "../../api/config";
import { Play, CheckCircle2, Plus, Minus, Send, TimerReset, UserRound, Briefcase } from "lucide-react";
import { getSocket } from "../../services/socket";
import { toast } from "react-hot-toast";

const formatTimeLeft = (seconds) => {
  const total = Math.max(0, Number(seconds) || 0);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const WorkMode = () => {
  const [view, setView] = useState("owner"); // owner | worker
  const [bookings, setBookings] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ownerNotes, setOwnerNotes] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const joinedRoomRef = useRef(null);
  const inFlightRef = useRef(false);
  const cooldownUntilRef = useRef(0);

  const activeConsultation = useMemo(
    () => consultations.find((c) => c.status === "in_progress") || consultations[0] || null,
    [consultations]
  );

  const loadData = async ({ force = false } = {}) => {
    const now = Date.now();
    if (!force && now < cooldownUntilRef.current) return;
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      const [bookingRes, consultationRes] = await Promise.all([
        API.get("/merchant/bookings?status=confirmed&limit=20"),
        API.get("/merchant/consultations?status=active"),
      ]);
      if (bookingRes.data?.success) setBookings(bookingRes.data.data || []);
      if (consultationRes.data?.success) {
        setConsultations(consultationRes.data.data || []);
        setSelected((consultationRes.data.data || [])[0] || null);
      }
    } catch (err) {
      if (err?.response?.status === 429) {
        // back off for 30 seconds to avoid rate-limit loops
        cooldownUntilRef.current = Date.now() + 30_000;
      }
      // swallow to avoid "Uncaught (in promise)" console spam
      console.error("WorkMode load failed", err);
    } finally {
      inFlightRef.current = false;
    }
  };

  useEffect(() => {
    loadData({ force: true });
    // Socket provides realtime updates; keep a light fallback refresh.
    const id = setInterval(() => {
      if (!document.hidden) loadData();
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  // Real-time sync: join per-consultation room and refresh on events
  useEffect(() => {
    const current = selected || activeConsultation;
    if (!current?._id) return;
    const socket = getSocket();
    const room = `consultation:${current._id}`;

    if (joinedRoomRef.current && joinedRoomRef.current !== room) {
      socket.emit("leave", { room: joinedRoomRef.current });
    }
    joinedRoomRef.current = room;
    socket.emit("join", { room });

    const onMessage = (payload) => {
      if (payload?.consultationId === String(current._id)) loadData({ force: true });
    };
    const onDone = (payload) => {
      if (payload?.consultationId === String(current._id)) loadData({ force: true });
    };
    socket.on("consultation:message", onMessage);
    socket.on("consultation:done", onDone);

    return () => {
      socket.off("consultation:message", onMessage);
      socket.off("consultation:done", onDone);
    };
  }, [selected, activeConsultation]);

  useEffect(() => {
    const c = selected || activeConsultation;
    if (!c) return;
    if (!c.customerEmail && !c.customerPhone) return;
    const query = c.customerEmail
      ? `customerEmail=${encodeURIComponent(c.customerEmail)}`
      : `customerPhone=${encodeURIComponent(c.customerPhone)}`;
    API.get(`/merchant/consultations/customer-history?${query}`).then((res) => {
      if (res.data?.success) setHistory(res.data.data || []);
    });
  }, [selected, activeConsultation]);

  const startConsultation = async (bookingId) => {
    const res = await API.post(`/merchant/consultations/from-booking/${bookingId}`);
    if (res.data?.success) {
      setSelected(res.data.data);
      await loadData();
    }
  };

  const updateTimer = async (consultationId, action, seconds) => {
    await API.patch(`/merchant/consultations/${consultationId}/timer`, { action, seconds });
    await loadData();
  };

  const sendMessage = async () => {
    const c = selected || activeConsultation;
    if (!c || !message.trim()) return;
    try {
      await API.post(
        `/merchant/consultations/${c._id}/messages`,
        { text: message.trim() },
        {
          headers: view === "worker" ? { "x-work-mode-role": "worker" } : undefined,
        }
      );
      setMessage("");
      await loadData({ force: true });
    } catch (err) {
      console.error("WorkMode send failed", err);
    }
  };

  const completeConsultation = async () => {
    const c = selected || activeConsultation;
    if (!c) return;
    await API.patch(`/merchant/consultations/${c._id}/complete`, {
      ownerNotes,
      completionSummary: ownerNotes,
    });
    setOwnerNotes("");
    await loadData();
  };

  const createInvite = async () => {
    setInviteBusy(true);
    try {
      const res = await API.post("/work-mode/invite");
      if (res.data?.success) {
        setInviteLink(res.data.data.link);
        toast.success("Worker link generated");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to generate link");
    } finally {
      setInviteBusy(false);
    }
  };

  const rotateInvite = async () => {
    setInviteBusy(true);
    try {
      await API.post("/work-mode/rotate");
      setInviteLink("");
      toast.success("Link revoked. Generate a new one.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to rotate link");
    } finally {
      setInviteBusy(false);
    }
  };

  const current = selected || activeConsultation;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Work Mode</h2>
        <p className="text-slate-500 font-medium">Owner ↔ worker coordination, chat, and auto-history.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Work Mode Sidebar */}
        <aside className="bg-white rounded-3xl border p-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mode</p>
          <button
            onClick={() => setView("owner")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border font-black text-sm ${
              view === "owner" ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <UserRound size={18} /> Owner view
          </button>
          <button
            onClick={() => setView("worker")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border font-black text-sm ${
              view === "worker" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Briefcase size={18} /> Worker view
          </button>
          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500">
              Worker view sends messages as <span className="font-black">worker</span> (no extra role in auth).
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Worker Invite Link</p>
            <button
              disabled={inviteBusy}
              onClick={createInvite}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-sm"
            >
              Generate Link
            </button>
            <button
              disabled={inviteBusy}
              onClick={rotateInvite}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-700 font-black text-sm"
            >
              Revoke / Rotate
            </button>
            {inviteLink && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-600 break-all">{inviteLink}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    toast.success("Copied");
                  }}
                  className="mt-2 w-full py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-black text-xs"
                >
                  Copy link
                </button>
              </div>
            )}
          </div>
        </aside>

        <section className="bg-white rounded-3xl border p-5 space-y-3">
          <h3 className="font-black text-slate-800">Confirmed Bookings</h3>
          {bookings.map((b) => (
            <button key={b._id} onClick={() => startConsultation(b._id)} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100">
              <p className="font-bold text-slate-800">{b.customerName} · {b.service?.title}</p>
              <p className="text-xs text-slate-500">{b.dateString} {b.timeSlot} · {b.service?.duration || 30}m</p>
              <span className="inline-flex mt-2 px-2 py-1 rounded-lg text-[10px] font-black bg-indigo-100 text-indigo-700"><Play size={12} className="mr-1" /> Start</span>
            </button>
          ))}
        </section>

        <section className="lg:col-span-2 bg-white rounded-3xl border p-5 space-y-4">
          {current ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-900 text-xl">{current.customerName}</h3>
                  <p className="text-sm text-slate-500">{current.serviceTitle} · {current.servicePrice} · {current.serviceDurationMinutes} min</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase text-slate-400 font-black">Timer</p>
                  <p className="text-4xl font-black text-indigo-600">{formatTimeLeft(current.remainingSeconds)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => updateTimer(current._id, "subtract", 60)} className="px-3 py-2 rounded-xl bg-rose-100 text-rose-700 font-bold text-xs"><Minus size={14} className="inline mr-1" /> 1 min</button>
                <button onClick={() => updateTimer(current._id, "add", 60)} className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs"><Plus size={14} className="inline mr-1" /> 1 min</button>
                <button onClick={() => updateTimer(current._id, "set", current.initialSeconds)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"><TimerReset size={14} className="inline mr-1" /> Reset</button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border p-3 h-64 overflow-y-auto bg-slate-50">
                  {(current.messages || []).map((m) => (
                    <div key={m._id} className={`mb-2 p-2 rounded-lg text-sm ${
                      m.senderRole === "owner"
                        ? "bg-indigo-100 text-indigo-800"
                        : m.senderRole === "worker"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-white border text-slate-700"
                    }`}>
                      <p className="text-[10px] font-black uppercase mb-1">{m.senderRole}</p>
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {view === "owner" ? (
                    <textarea value={ownerNotes} onChange={(e) => setOwnerNotes(e.target.value)} placeholder="Owner private notes for this consultation..." className="w-full h-28 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none" />
                  ) : (
                    <div className="w-full h-28 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-500 font-medium flex items-center">
                      Worker view: private owner notes are hidden.
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={view === "worker" ? "Message owner..." : "Message worker..."}
                      className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
                    />
                    <button onClick={sendMessage} className="px-4 rounded-xl bg-indigo-600 text-white"><Send size={16} /></button>
                  </div>
                  {view === "owner" && (
                    <button onClick={completeConsultation} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm">
                      <CheckCircle2 size={16} className="inline mr-2" /> Done Consultation
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border p-3">
                <p className="text-xs font-black uppercase text-slate-400 mb-2">Client History (Auto)</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {history.map((h) => (
                    <div key={h._id} className="p-2 rounded-lg bg-slate-50 text-sm">
                      <p className="font-bold text-slate-800">{h.serviceTitle} · {h.servicePrice}</p>
                      <p className="text-xs text-slate-500">{h.dateString} {h.timeSlot} · {h.serviceDurationMinutes}m</p>
                      {h.ownerNotes && <p className="text-xs text-slate-600 mt-1">Note: {h.ownerNotes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-slate-500 font-medium">Start a consultation from confirmed bookings.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default WorkMode;
