import React, { useEffect, useState } from "react";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import CAPI from "../../../api/customerConfig";

const STATUS_STYLES = {
  confirmed:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  pending:    "bg-amber-500/10  text-amber-400  border-amber-500/30",
  completed:  "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  cancelled:  "bg-rose-500/10   text-rose-400   border-rose-500/30",
  "no-show":  "bg-slate-500/10  text-slate-400  border-slate-500/30",
};

const STATUS_ICONS = {
  confirmed: CheckCircle2,
  completed: CheckCircle2,
  pending:   Clock,
  cancelled: XCircle,
  "no-show": AlertCircle,
};

const CustomerAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    CAPI.get("/customer/appointments")
      .then(res => setBookings(res.data?.data || []))
      .catch(err => setError(err.response?.data?.message || "Failed to load appointments."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 size={32} className="animate-spin text-indigo-500" />
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <AlertCircle size={40} className="text-rose-400" />
      <p className="text-slate-400 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center">
          <Calendar size={22} className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">My Appointments</h2>
          <p className="text-slate-400 text-sm">{bookings.length} total records</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] py-20 flex flex-col items-center gap-4">
          <Calendar size={48} className="text-slate-700" />
          <p className="text-slate-500 font-bold">No appointments found</p>
          <p className="text-slate-600 text-sm">Your booking history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const Icon = STATUS_ICONS[b.status] || Clock;
            return (
              <div key={b._id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex items-center gap-5 transition-all">
                <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex flex-col items-center justify-center text-indigo-400 shrink-0">
                  <span className="text-lg font-black leading-none">{b.dateString?.split("-")[2] || "—"}</span>
                  <span className="text-[10px] font-bold uppercase">{b.dateString ? new Date(b.dateString).toLocaleString("en", { month: "short" }) : ""}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-black text-sm truncate">{b.serviceName || b.service || "Service"}</p>
                  <div className="flex items-center gap-3 mt-1 text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-1"><Clock size={11} /> {b.timeSlot || b.time || "—"}</span>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                  <Icon size={11} />
                  {b.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerAppointments;
