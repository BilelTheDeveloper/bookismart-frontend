import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/config";
import { ArrowLeft, Clock, FileText } from "lucide-react";

const CustomerHistory = () => {
  const { customerKey } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    API.get(`/merchant/insights/customers/${encodeURIComponent(customerKey)}/history`)
      .then((res) => {
        if (!mounted) return;
        if (res.data?.success) setItems(res.data.data || []);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [customerKey]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => navigate("/owner/dashboard/customers")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Key</p>
          <p className="font-black text-slate-900 text-sm truncate max-w-[360px]">{customerKey}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Clock size={22} className="text-indigo-600" /> Consultation History
          </h3>
          <span className="text-xs font-black text-slate-500">{loading ? "Loading..." : `${items.length} records`}</span>
        </div>

        <div className="p-8 space-y-4">
          {!loading && items.length === 0 && (
            <div className="text-slate-500 font-medium">No completed consultations found for this client.</div>
          )}

          {items.map((c) => (
            <div key={c._id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">{c.serviceTitle}</p>
                  <p className="text-xs text-slate-500 font-bold">{c.dateString} {c.timeSlot} · {c.serviceDurationMinutes} min</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Price</p>
                  <p className="font-black text-indigo-600">{c.servicePrice || "-"}</p>
                </div>
              </div>
              {c.ownerNotes && (
                <div className="mt-3 flex items-start gap-2 text-sm text-slate-700">
                  <FileText size={16} className="text-slate-400 mt-0.5" />
                  <p className="font-medium">{c.ownerNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;

