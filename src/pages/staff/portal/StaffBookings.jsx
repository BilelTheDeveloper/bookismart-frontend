import React, { useState, useEffect, useCallback } from "react";
import {
  CalendarDays, Clock, User, Phone, Mail, ChevronDown,
  Plus, Loader2, CheckCircle2, AlertCircle, Search, X,
  PhoneCall, UserPlus, RefreshCw,
} from "lucide-react";
import SAPI from "../../../api/staffConfig";
import { toast } from "react-hot-toast";

const STATUS_STYLES = {
  pending:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cancelled: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  "no-show": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const todayString = () => new Date().toISOString().split("T")[0];

const formatTime12 = (hhmm) => {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${((h % 12) || 12)}:${String(m).padStart(2, "0")} ${ampm}`;
};

/* ─── Walk-in Form ─── */
const WalkinForm = ({ onSuccess }) => {
  const [services, setServices]     = useState([]);
  const [loadingSvc, setLoadingSvc] = useState(true);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    serviceIdx: "",
    date: todayString(),
    timeSlot: "",
    notes: "",
  });

  const [slots, setSlots]           = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load services once on mount
  useEffect(() => {
    SAPI.get("/staff/portal/booking-services")
      .then(res => setServices(res.data?.data?.services || []))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoadingSvc(false));
  }, []);

  const selectedService = form.serviceIdx !== "" ? services[parseInt(form.serviceIdx)] : null;

  // Reload slots when date or service changes
  useEffect(() => {
    if (!form.date || !selectedService) { setSlots([]); return; }
    setLoadingSlots(true);
    setForm(f => ({ ...f, timeSlot: "" }));
    SAPI.get("/staff/portal/booking-slots", {
      params: { date: form.date, duration: selectedService.duration },
    })
      .then(res => {
        const d = res.data?.data;
        setSlots(d?.isClosed ? [] : (d?.slots || []));
        if (d?.isClosed) toast("Business is closed on this day.", { icon: "🔒" });
      })
      .catch(() => toast.error("Failed to load time slots"))
      .finally(() => setLoadingSlots(false));
  }, [form.date, form.serviceIdx]);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return toast.error("Select a service");
    if (!form.timeSlot)   return toast.error("Select a time slot");
    setSubmitting(true);
    try {
      await SAPI.post("/staff/portal/bookings", {
        customerName:  form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        customerEmail: form.customerEmail.trim() || undefined,
        service: {
          title:    selectedService.title,
          price:    selectedService.price || "N/A",
          duration: selectedService.duration,
        },
        date:     form.date,
        timeSlot: form.timeSlot,
        notes:    form.notes.trim(),
      });
      toast.success("Booking confirmed!");
      setForm({
        customerName: "", customerPhone: "", customerEmail: "",
        serviceIdx: "", date: todayString(), timeSlot: "", notes: "",
      });
      setSlots([]);
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create booking";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Customer info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              required
              className={`${inputCls} pl-9`}
              placeholder="Customer name"
              value={form.customerName}
              onChange={e => setField("customerName", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Phone *
          </label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              required
              type="tel"
              className={`${inputCls} pl-9`}
              placeholder="+216 XX XXX XXX"
              value={form.customerPhone}
              onChange={e => setField("customerPhone", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
          Email <span className="text-slate-600 normal-case font-medium">(optional)</span>
        </label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            className={`${inputCls} pl-9`}
            placeholder="customer@email.com"
            value={form.customerEmail}
            onChange={e => setField("customerEmail", e.target.value)}
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
          Service *
        </label>
        {loadingSvc ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm py-3">
            <Loader2 size={14} className="animate-spin" /> Loading services...
          </div>
        ) : (
          <div className="relative">
            <select
              required
              className={`${inputCls} appearance-none cursor-pointer`}
              value={form.serviceIdx}
              onChange={e => setField("serviceIdx", e.target.value)}
            >
              <option value="">Select a service</option>
              {services.map((s, i) => (
                <option key={i} value={i}>
                  {s.title} — {s.duration}min {s.price ? `(${s.price})` : ""}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Date *
          </label>
          <div className="relative">
            <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              required
              type="date"
              min={todayString()}
              className={`${inputCls} pl-9`}
              value={form.date}
              onChange={e => setField("date", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Time Slot *
          </label>
          {loadingSlots ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm h-[46px]">
              <Loader2 size={14} className="animate-spin" /> Loading slots...
            </div>
          ) : slots.length === 0 && selectedService ? (
            <p className="text-slate-500 text-xs py-3">No available slots for this date.</p>
          ) : (
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <select
                required
                className={`${inputCls} pl-9 appearance-none cursor-pointer`}
                value={form.timeSlot}
                onChange={e => setField("timeSlot", e.target.value)}
                disabled={!selectedService || slots.length === 0}
              >
                <option value="">Pick a time</option>
                {slots.filter(s => s.available).map(s => (
                  <option key={s.time} value={s.time}>{formatTime12(s.time)}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
          Notes <span className="text-slate-600 normal-case font-medium">(optional)</span>
        </label>
        <textarea
          rows={2}
          className={`${inputCls} resize-none`}
          placeholder="Any special requests or notes..."
          value={form.notes}
          onChange={e => setField("notes", e.target.value)}
          maxLength={500}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
        {submitting ? "Saving..." : "Confirm Walk-in Booking"}
      </button>
    </form>
  );
};

/* ─── Bookings List ─── */
const BookingsList = ({ date, refreshKey }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    setLoading(true);
    SAPI.get("/staff/portal/bookings", { params: { date } })
      .then(res => setBookings(res.data?.data || []))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, [date, refreshKey]);

  const filtered = bookings.filter(b =>
    !search ||
    b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    b.customerPhone?.includes(search)
  );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          placeholder="Search by name or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={24} className="animate-spin text-violet-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10">
          <CalendarDays size={32} className="mx-auto text-slate-700 mb-3" />
          <p className="text-slate-500 text-sm font-bold">No bookings for this date</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(b => (
            <div key={b._id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-black text-sm truncate">{b.customerName}</p>
                    <span className={`shrink-0 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium">{b.customerPhone}</p>
                  <p className="text-slate-500 text-xs mt-1">{b.service?.title} · {b.service?.duration}min</p>
                  {b.notes && <p className="text-slate-600 text-xs mt-1 italic truncate">"{b.notes}"</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-violet-300 font-black text-sm">{formatTime12(b.timeSlot)}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{b.service?.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Page ─── */
const StaffBookings = () => {
  const [activeDate, setActiveDate] = useState(todayString());
  const [showForm, setShowForm]     = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-black text-2xl tracking-tight">Bookings</h1>
          <p className="text-slate-400 text-sm font-medium mt-0.5">View schedule & add walk-in / phone bookings</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm transition-all ${
            showForm
              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
              : "bg-violet-600 text-white hover:bg-violet-500"
          }`}
        >
          {showForm ? <X size={15} /> : <UserPlus size={15} />}
          {showForm ? "Cancel" : "New Walk-in"}
        </button>
      </div>

      {/* Walk-in Form Panel */}
      {showForm && (
        <div className="bg-slate-900 border border-violet-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center">
              <PhoneCall size={15} className="text-violet-400" />
            </div>
            <div>
              <p className="text-white font-black text-sm">Walk-in / Phone Booking</p>
              <p className="text-slate-500 text-xs">Customer calls or walks in — confirm directly, no waiting</p>
            </div>
          </div>
          <WalkinForm onSuccess={handleSuccess} />
        </div>
      )}

      {/* Date Filter + Bookings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <CalendarDays size={16} className="text-violet-400" />
            <p className="text-white font-black text-sm">
              {activeDate === todayString() ? "Today's Schedule" : `Schedule — ${activeDate}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={activeDate}
              onChange={e => setActiveDate(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
            />
            <button
              onClick={() => setRefreshKey(k => k + 1)}
              className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
        <BookingsList date={activeDate} refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default StaffBookings;
