import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/config";

const toneClass = (level) => {
  if (level === "SECURITY") return "bg-rose-50 text-rose-700 border-rose-200";
  if (level === "ERROR") return "bg-amber-50 text-amber-700 border-amber-200";
  if (level === "WARN") return "bg-indigo-50 text-indigo-700 border-indigo-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
};

const SecurityAlerts = () => {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [s, a] = await Promise.all([
        API.get("/admin/security/summary?hours=24"),
        API.get("/admin/security/alerts?limit=200"),
      ]);
      if (s.data?.success) setSummary(s.data.data);
      if (a.data?.success) setItems(a.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 20_000);
    return () => clearInterval(id);
  }, []);

  const counts = useMemo(() => {
    const by = summary?.byLevel || {};
    return {
      total: summary?.total ?? 0,
      security: by.SECURITY ?? 0,
      warn: by.WARN ?? 0,
      error: by.ERROR ?? 0,
      info: by.INFO ?? 0,
    };
  }, [summary]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Security Alerts</h2>
          <p className="text-slate-500 font-medium">Real-time suspicious activity feed (last 24h).</p>
        </div>
        <button onClick={load} className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm">
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          ["Total", counts.total, "bg-white border-slate-100"],
          ["SECURITY", counts.security, "bg-rose-50 border-rose-100"],
          ["WARN", counts.warn, "bg-indigo-50 border-indigo-100"],
          ["ERROR", counts.error, "bg-amber-50 border-amber-100"],
          ["INFO", counts.info, "bg-slate-50 border-slate-200"],
        ].map(([label, value, cls]) => (
          <div key={label} className={`rounded-3xl border p-5 ${cls}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <p className="font-black text-slate-900">Recent events</p>
          <p className="text-xs font-bold text-slate-400">{loading ? "Loading…" : `${items.length} events`}</p>
        </div>

        <div className="divide-y divide-slate-50">
          {items.map((e) => (
            <div key={e._id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${toneClass(e.level)}`}>
                    {e.level}
                  </span>
                  {e.code && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest">
                      {e.code}
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-400">
                    {new Date(e.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="font-black text-slate-900 mt-2 break-words">{e.msg}</p>
                <p className="text-xs text-slate-500 font-medium mt-1 break-words">
                  {e.method} {e.path} · IP {e.ip || "—"} {e.userId ? `· user ${e.userId}` : ""}
                </p>
              </div>
              {e.meta && Object.keys(e.meta).length > 0 && (
                <pre className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-[11px] text-slate-700 overflow-auto max-w-full md:max-w-[420px]">
{JSON.stringify(e.meta, null, 2)}
                </pre>
              )}
            </div>
          ))}

          {items.length === 0 && !loading && (
            <div className="p-10 text-slate-500 font-medium">No security events yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityAlerts;

