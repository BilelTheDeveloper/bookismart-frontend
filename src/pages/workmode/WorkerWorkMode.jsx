import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../api/config";
import { getWorkModeSocket } from "../../services/socket";
import { Send, Shield, AlertTriangle } from "lucide-react";

const WorkerWorkMode = () => {
  const [params] = useSearchParams();
  const tokenFromUrl = params.get("token") || "";
  const [token, setToken] = useState(tokenFromUrl);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (tokenFromUrl) {
      sessionStorage.setItem("workmode_token", tokenFromUrl);
      setToken(tokenFromUrl);
    } else {
      const stored = sessionStorage.getItem("workmode_token");
      if (stored) setToken(stored);
    }
  }, [tokenFromUrl]);

  const load = async () => {
    if (!token) return;
    setError(null);
    try {
      const res = await API.get(`/work-mode/worker/consultations?token=${encodeURIComponent(token)}`);
      if (res.data?.success) {
        setItems(res.data.data || []);
        if (!selectedId && res.data.data?.[0]?._id) setSelectedId(res.data.data[0]._id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "This link is invalid or expired.");
    }
  };

  useEffect(() => {
    load();
  }, [token]);

  const selected = useMemo(() => items.find((x) => x._id === selectedId) || null, [items, selectedId]);

  useEffect(() => {
    if (!token) return;
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const s = getWorkModeSocket(token);
    socketRef.current = s;

    const onMessage = () => load();
    s.on("consultation:message", onMessage);
    s.on("consultation:done", onMessage);

    return () => {
      s.off("consultation:message", onMessage);
      s.off("consultation:done", onMessage);
      s.disconnect();
    };
  }, [token, selectedId]);

  useEffect(() => {
    if (!socketRef.current) return;
    if (!selectedId) return;
    socketRef.current.emit("join", { room: `consultation:${selectedId}` });
    return () => {
      socketRef.current?.emit("leave", { room: `consultation:${selectedId}` });
    };
  }, [selectedId]);

  const send = async () => {
    if (!selectedId || !message.trim() || !socketRef.current) return;
    socketRef.current.emit("workmode:message", { consultationId: selectedId, text: message.trim() });
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="bg-white rounded-3xl border p-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Worker Work Mode</h1>
            <p className="text-slate-500 font-medium">No login required. Access is controlled by the owner’s invite link.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-2xl">
            <Shield size={16} /> Secure link
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-rose-600 mt-0.5" size={18} />
            <div>
              <p className="font-black text-rose-700">Access blocked</p>
              <p className="text-sm text-rose-700/80 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-5">
          <section className="bg-white rounded-3xl border p-5 space-y-3">
            <h3 className="font-black text-slate-800">Active Consultations</h3>
            {items.map((c) => (
              <button
                key={c._id}
                onClick={() => setSelectedId(c._id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all ${
                  selectedId === c._id ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <p className="font-black text-slate-900">{c.customerName}</p>
                <p className="text-xs text-slate-500 font-bold">{c.serviceTitle} · {c.dateString} {c.timeSlot}</p>
              </button>
            ))}
            {items.length === 0 && !error && (
              <p className="text-slate-500 font-medium">No active consultations.</p>
            )}
          </section>

          <section className="lg:col-span-2 bg-white rounded-3xl border p-5 space-y-4">
            {selected ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{selected.customerName}</h3>
                    <p className="text-sm text-slate-500">{selected.serviceTitle}</p>
                  </div>
                </div>

                <div className="rounded-2xl border p-3 h-80 overflow-y-auto bg-slate-50">
                  {(selected.messages || []).map((m) => (
                    <div
                      key={m._id}
                      className={`mb-2 p-2 rounded-lg text-sm ${
                        m.senderRole === "worker"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase mb-1">{m.senderRole}</p>
                      {m.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message owner..."
                    className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") send();
                    }}
                  />
                  <button onClick={send} className="px-4 rounded-xl bg-emerald-600 text-white">
                    <Send size={16} />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-slate-500 font-medium">Select a consultation.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkerWorkMode;

