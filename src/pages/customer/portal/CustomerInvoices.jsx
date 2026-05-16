import React, { useEffect, useState } from "react";
import { FileText, Download, AlertCircle, Loader2, CheckCircle2, Clock } from "lucide-react";
import CAPI from "../../../api/customerConfig";

const STATUS_STYLES = {
  paid:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/10  text-amber-400  border-amber-500/30",
  overdue: "bg-rose-500/10   text-rose-400   border-rose-500/30",
};

const CustomerInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    CAPI.get("/customer/invoices")
      .then(res => setInvoices(res.data?.data || []))
      .catch(err => setError(err.response?.data?.message || "Failed to load invoices."))
      .finally(() => setLoading(false));
  }, []);

  const totalPaid    = invoices.filter(i => i.status === "paid").reduce((s, i) => s + (i.total || 0), 0);
  const totalPending = invoices.filter(i => i.status !== "paid").reduce((s, i) => s + (i.total || 0), 0);

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={32} className="animate-spin text-indigo-500" /></div>;

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <AlertCircle size={40} className="text-rose-400" />
      <p className="text-slate-400">{error}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-violet-600/20 border border-violet-500/30 rounded-2xl flex items-center justify-center">
          <FileText size={22} className="text-violet-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">My Invoices</h2>
          <p className="text-slate-400 text-sm">{invoices.length} total invoices</p>
        </div>
      </div>

      {/* Summary */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">Total Paid</p>
            <p className="text-white text-2xl font-black">{totalPaid.toFixed(3)} <span className="text-sm text-slate-400 font-normal">TND</span></p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">Outstanding</p>
            <p className="text-white text-2xl font-black">{totalPending.toFixed(3)} <span className="text-sm text-slate-400 font-normal">TND</span></p>
          </div>
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] py-20 flex flex-col items-center gap-4">
          <FileText size={48} className="text-slate-700" />
          <p className="text-slate-500 font-bold">No invoices yet</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800">
              <tr>
                {["Invoice", "Date", "Amount", "Status"].map(h => (
                  <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-slate-800/30 transition-all">
                  <td className="px-6 py-4">
                    <p className="text-white font-black text-sm">#{inv.invoiceNumber || inv._id?.slice(-6).toUpperCase()}</p>
                    <p className="text-slate-500 text-xs mt-0.5 truncate max-w-[180px]">{inv.serviceName || "Service"}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">
                    {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("en-GB") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-black text-sm">{(inv.total || 0).toFixed(3)}</span>
                    <span className="text-slate-500 text-xs ml-1">TND</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wide inline-flex items-center gap-1 ${STATUS_STYLES[inv.status] || STATUS_STYLES.pending}`}>
                      {inv.status === "paid" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {inv.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerInvoices;
