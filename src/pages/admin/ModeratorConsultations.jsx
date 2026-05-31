import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/config";
import { Send, BellRing } from "lucide-react";

const formatTimeLeft = (seconds) => {
  const total = Math.max(0, Number(seconds) || 0);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const ModeratorConsultations = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await API.get("/moderator/consultations?status=all");
    if (res.data?.success) {
      const list = res.data.data || [];
      setItems(list);
      if (!selected && list[0]) setSelected(list[0]);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  const queue = useMemo(() => items.filter((x) => ["waiting", "in_progress"].includes(x.status)), [items]);
  const recentlyDone = useMemo(
    () =>
      items.filter((x) => x.status === "done").slice(0, 5),
    [items]
  );

  const sendMessage = async () => {
    if (!selected || !message.trim()) return;
    await API.post(`/moderator/consultations/${selected._id}/messages`, { text: message.trim() });
    setMessage("");
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Moderator Console</h2>
        <p className="text-slate-500 font-medium">Live owner coordination and next-client readiness.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <section className="bg-white dark:bg-slate-900 rounded-3xl border p-5 space-y-3">
          <h3 className="font-black text-slate-800 dark:text-slate-100">Live Queue</h3>
          {queue.map((c) => (
            <button key={c._id} onClick={() => setSelected(c)} className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-800 dark:text-slate-100">{c.customerName}</p>
              <p className="text-xs text-slate-500">{c.ownerId?.businessName || "Owner"} · {c.serviceTitle}</p>
              <p className="text-xs text-slate-500">{c.dateString} {c.timeSlot} · {formatTimeLeft(c.remainingSeconds)}</p>
            </button>
          ))}
          {recentlyDone.length > 0 && (
            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Recently Done</p>
              {recentlyDone.map((c) => (
                <div key={c._id} className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 mb-2">
                  <p className="text-sm font-bold text-emerald-800">{c.customerName}</p>
                  <p className="text-xs text-emerald-700">{c.serviceTitle} finished</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border p-5">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{selected.customerName}</h3>
                  <p className="text-sm text-slate-500">{selected.serviceTitle} · {selected.serviceDurationMinutes} min</p>
                </div>
                <span className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm">{formatTimeLeft(selected.remainingSeconds)}</span>
              </div>

              <div className="rounded-2xl border p-3 h-72 overflow-y-auto bg-slate-50">
                {(selected.messages || []).map((m) => (
                  <div key={m._id} className={`mb-2 p-2 rounded-lg text-sm ${m.senderRole === "moderator" ? "bg-indigo-100 text-indigo-800" : "bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-200"}`}>
                    <p className="text-[10px] font-black uppercase mb-1">{m.senderRole}</p>
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Inform owner / next client readiness..." className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm outline-none" />
                <button onClick={sendMessage} className="px-4 rounded-xl bg-indigo-600 text-white"><Send size={16} /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setMessage("Current consultation ended. Please notify the next client to be ready.")} className="py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm">
                  <BellRing size={16} className="inline mr-2" /> Next Client Ready
                </button>
                <button onClick={() => setMessage("Please update me if you need additional support during this consultation.")} className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm">
                  Owner Follow-up
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">No active consultation selected.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ModeratorConsultations;
