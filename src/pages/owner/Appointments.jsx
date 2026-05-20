import React, { useState, useEffect, useCallback, useRef } from "react";
import API from "../../api/config";
import CompletionFlowModal from "../../components/CompletionFlowModal";
import {
  CalendarCheck,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  RefreshCw,
  Check,
  X,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Filter,
  Eye,
  Ban,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────────────────────── */

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: <Clock size={11} />,
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: <CheckCircle2 size={11} />,
  },
  completed: {
    label: "Completed",
    dot: "bg-indigo-400",
    badge: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    icon: <Check size={11} />,
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    icon: <X size={11} />,
  },
  "no-show": {
    label: "No Show",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    icon: <Ban size={11} />,
  },
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const toDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (time24) => {
  if (!time24) return "—";
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
};

/* ─────────────────────────────────────────────────────────────────────────────
   MINI CALENDAR (for reschedule modal)
   ───────────────────────────────────────────────────────────────────────────── */
const MiniCalendar = ({ selectedDate, onSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-bold text-slate-700">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold text-slate-400 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const isPast = date < today;
          const dateStr = toDateString(date);
          const isSelected = dateStr === selectedDate;
          const isToday = toDateString(date) === toDateString(today);
          return (
            <button
              key={dateStr}
              disabled={isPast}
              onClick={() => onSelect(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-xs font-semibold transition-all
                ${isPast ? "text-slate-200 cursor-not-allowed" : "cursor-pointer hover:bg-indigo-50 hover:text-indigo-600"}
                ${isSelected ? "bg-indigo-600 text-white shadow-md scale-110" : ""}
                ${isToday && !isSelected ? "text-indigo-600 ring-1 ring-inset ring-indigo-200" : ""}
                ${!isPast && !isSelected ? "text-slate-600" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   RESCHEDULE MODAL
   ───────────────────────────────────────────────────────────────────────────── */
const RescheduleModal = ({ booking, onClose, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState(booking.dateString || toDateString(new Date()));
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [dayIsClosed, setDayIsClosed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loadSlots = useCallback(async () => {
    if (!selectedDate) return;
    setSlotsLoading(true);
    setSelectedTime(null);
    setError(null);
    try {
      const duration = booking.service?.duration || 30;
      const res = await API.get(
        `/public/booking/${booking.ownerId}/slots?date=${selectedDate}&duration=${duration}&excludeBookingId=${booking._id}`
      );
      if (res.data.success) {
        if (res.data.data.isClosed) {
          setDayIsClosed(true);
          setSlots([]);
        } else {
          setDayIsClosed(false);
          setSlots(res.data.data.slots);
          const first = res.data.data.slots.find((s) => s.available);
          if (first) setSelectedTime(first.time);
        }
      }
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [selectedDate, booking]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await API.patch(`/merchant/bookings/${booking._id}/reschedule`, {
        date: selectedDate,
        timeSlot: selectedTime,
      });
      if (res.data.success) {
        onSuccess(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Reschedule failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Reschedule Appointment</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {booking.customerName} · {booking.service?.title}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Current appointment info */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock size={14} className="text-amber-600 flex-shrink-0" />
            <span className="text-sm text-amber-700 font-medium">
              Currently: {formatDisplayDate(booking.dateString)} at {formatTime(booking.timeSlot)}
            </span>
          </div>

          {/* Calendar */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pick New Date</p>
            <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
          </div>

          {/* Time Slots */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Available Times — {formatDisplayDate(selectedDate)}
            </p>
            {slotsLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="animate-spin text-indigo-500 w-5 h-5" />
                <span className="ml-2 text-slate-400 text-sm">Loading slots...</span>
              </div>
            ) : dayIsClosed ? (
              <div className="text-center py-5 bg-slate-50 rounded-xl border border-slate-200">
                <Ban size={20} className="text-slate-300 mx-auto mb-1" />
                <p className="text-slate-400 text-sm">Closed on this day</p>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center py-5 bg-slate-50 rounded-xl border border-slate-200">
                <AlertCircle size={20} className="text-slate-300 mx-auto mb-1" />
                <p className="text-slate-400 text-sm">No slots available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-36 overflow-y-auto">
                {slots.map(({ time, available }) => (
                  <button
                    key={time}
                    disabled={!available}
                    onClick={() => available && setSelectedTime(time)}
                    className={`
                      py-2 px-1 rounded-xl text-xs font-bold transition-all
                      ${!available
                        ? "bg-slate-50 text-slate-200 cursor-not-allowed line-through"
                        : selectedTime === time
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105"
                          : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200"
                      }
                    `}
                  >
                    {formatTime(time)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <AlertCircle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-rose-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReschedule}
            disabled={!selectedTime || dayIsClosed || submitting}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            {submitting ? (
              <><Loader2 size={14} className="animate-spin" /> Saving...</>
            ) : (
              <><CalendarDays size={14} /> Confirm Reschedule</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   BOOKING DETAIL DRAWER
   ───────────────────────────────────────────────────────────────────────────── */
const BookingDrawer = ({ booking, onClose, onStatusChange, onReschedule, onComplete }) => {
  const [actionLoading, setActionLoading] = useState(null);

  const handleStatus = async (status) => {
    setActionLoading(status);
    try {
      const res = await API.patch(`/merchant/bookings/${booking._id}/status`, { status });
      if (res.data.success) {
        onStatusChange(res.data.data);
      }
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setActionLoading(null);
    }
  };

  const cfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;

  const ActionButton = ({ label, icon, onClick, color, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${color} disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <CalendarCheck size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking Detail</p>
              <h3 className="font-black text-slate-900 text-base leading-tight">{booking.customerName}</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-200 hover:bg-slate-300 transition-colors text-slate-600">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black ${cfg.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>

          {/* Appointment Info */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Appointment</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Sparkles size={15} className="text-indigo-500" />
                <span className="text-sm font-bold text-slate-800">{booking.service?.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays size={15} className="text-indigo-500" />
                <span className="text-sm font-semibold text-slate-700">{formatDisplayDate(booking.dateString)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-indigo-500" />
                <span className="text-sm font-semibold text-slate-700">{formatTime(booking.timeSlot)}</span>
                {booking.service?.duration && (
                  <span className="text-xs text-slate-400 font-medium">· {booking.service.duration} min</span>
                )}
              </div>
              {booking.service?.price && (
                <div className="flex items-center gap-3 pt-1 border-t border-indigo-100">
                  <TrendingUp size={15} className="text-indigo-500" />
                  <span className="text-sm font-black text-slate-900">{booking.service.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <User size={15} className="text-slate-400" />
                <span className="text-sm font-bold text-slate-800">{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-slate-400" />
                <a href={`mailto:${booking.customerEmail}`} className="text-sm text-indigo-600 hover:underline font-medium">
                  {booking.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-slate-400" />
                <a href={`tel:${booking.customerPhone}`} className="text-sm text-indigo-600 hover:underline font-medium">
                  {booking.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Customer Note</p>
              <div className="flex gap-2">
                <MessageSquare size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium leading-relaxed">{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Booking Meta */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">Booking ID</p>
            <p className="text-xs font-mono text-slate-400">{booking._id}</p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Actions</p>
          <div className="flex flex-wrap gap-2">
            {booking.status !== 'confirmed' && booking.status !== 'completed' && booking.status !== 'no-show' && (
              <ActionButton
                label={actionLoading === 'confirmed' ? "Saving..." : "Confirm"}
                icon={<CheckCircle2 size={13} />}
                onClick={() => handleStatus('confirmed')}
                color="bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                disabled={!!actionLoading}
              />
            )}
            {booking.status !== 'completed' && booking.status !== 'cancelled' && booking.status !== 'no-show' && (
              <ActionButton
                label="Complete"
                icon={<Check size={13} />}
                onClick={() => onComplete(booking)}
                color="bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white"
                disabled={!!actionLoading}
              />
            )}
            {booking.status !== 'cancelled' && booking.status !== 'completed' && booking.status !== 'no-show' && (
              <>
                <ActionButton
                  label="Reschedule"
                  icon={<RotateCcw size={13} />}
                  onClick={onReschedule}
                  color="bg-amber-100 text-amber-700 hover:bg-amber-500 hover:text-white"
                  disabled={!!actionLoading}
                />
                <ActionButton
                  label={actionLoading === 'no-show' ? "Saving..." : "No-show"}
                  icon={<Ban size={13} />}
                  onClick={() => handleStatus('no-show')}
                  color="bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white"
                  disabled={!!actionLoading}
                />
                <ActionButton
                  label={actionLoading === 'cancelled' ? "Saving..." : "Cancel"}
                  icon={<XCircle size={13} />}
                  onClick={() => handleStatus('cancelled')}
                  color="bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white"
                  disabled={!!actionLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   STAT CARD
   ───────────────────────────────────────────────────────────────────────────── */
const StatCard = ({ label, value, color, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col gap-1 p-5 rounded-[1.75rem] border transition-all text-left w-full
      ${active
        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 scale-[1.02]"
        : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-lg shadow-sm"
      }
    `}
  >
    <span className={`text-3xl font-black tracking-tight ${active ? "text-white" : "text-slate-900"}`}>
      {value ?? "—"}
    </span>
    <span className={`text-[11px] font-bold uppercase tracking-widest ${active ? "text-indigo-200" : "text-slate-400"}`}>
      {label}
    </span>
    {!active && <div className={`w-5 h-1 rounded-full mt-1 ${color}`} />}
  </button>
);

/* ─────────────────────────────────────────────────────────────────────────────
   BOOKING ROW CARD
   ───────────────────────────────────────────────────────────────────────────── */
const BookingCard = ({ booking, onClick }) => {
  const cfg = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;

  return (
    <button
      onClick={onClick}
      className="w-full text-left group bg-white p-5 rounded-[1.75rem] border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Status dot + time */}
        <div className="flex-shrink-0 text-center min-w-[58px]">
          <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${cfg.dot}`} />
          <p className="text-sm font-black text-slate-800">{formatTime(booking.timeSlot)}</p>
          <p className="text-[9px] font-bold text-slate-300 uppercase">
            {booking.service?.duration ? `${booking.service.duration}m` : "—"}
          </p>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-slate-100 flex-shrink-0" />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {booking.customerName}
            </h4>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight flex-shrink-0 ${cfg.badge}`}>
              {cfg.icon}
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium truncate">{booking.service?.title}</p>
          <p className="text-[10px] text-slate-300 font-medium mt-0.5">{formatDisplayDate(booking.dateString)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {booking.service?.price && (
          <span className="text-sm font-black text-slate-700 hidden sm:block">
            {booking.service.price}
          </span>
        )}
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-indigo-50 text-slate-300 group-hover:text-indigo-400 transition-all">
          <Eye size={14} />
        </div>
      </div>
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN APPOINTMENTS PAGE
   ───────────────────────────────────────────────────────────────────────────── */
const Appointments = () => {
  // Data state
  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // UI state
  const [selectedBooking, setSelectedBooking]     = useState(null);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [completionBooking, setCompletionBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen]           = useState(false);

  const searchTimeout = useRef(null);

  /* ── Fetch bookings ── */
  const fetchBookings = useCallback(async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const status = opts.status ?? activeStatus;
      const search = opts.search ?? searchQuery;
      const date = opts.date ?? dateFilter;
      const page = opts.page ?? currentPage;

      if (status && status !== "all") params.set("status", status);
      if (search.trim()) params.set("search", search.trim());
      if (date) params.set("date", date);
      params.set("page", page);
      params.set("limit", 15);

      const res = await API.get(`/merchant/bookings?${params.toString()}`);
      if (res.data.success) {
        setBookings(res.data.data);
        setSummary(res.data.summary);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [activeStatus, searchQuery, dateFilter, currentPage]);

  useEffect(() => {
    fetchBookings();
  }, [activeStatus, dateFilter, currentPage]);

  /* ── Search with debounce ── */
  useEffect(() => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      fetchBookings({ search: searchQuery, page: 1 });
    }, 400);
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  /* ── Handle status tab change ── */
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  /* ── Update booking in list after action ── */
  const handleBookingUpdated = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
    setSelectedBooking(updatedBooking);
    // Refresh summary counts
    fetchBookings({ page: currentPage });
  };

  /* ── Handle reschedule success ── */
  const handleRescheduleSuccess = (updatedBooking) => {
    setRescheduleBooking(null);
    handleBookingUpdated(updatedBooking);
  };

  const TABS = [
    { key: "all", label: "All", count: summary?.total },
    { key: "pending", label: "Pending", count: summary?.pending },
    { key: "confirmed", label: "Confirmed", count: summary?.confirmed },
    { key: "completed", label: "Completed", count: summary?.completed },
    { key: "cancelled", label: "Cancelled", count: summary?.cancelled },
    { key: "no-show", label: "No-show", count: summary?.noShow },
  ];

  return (
    <div className="space-y-7 animate-in fade-in duration-500 pb-16">

      {/* ══════════════════════════════════════════════
          TOP HEADER
          ══════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100">
            <CalendarCheck size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Appointments</h1>
            <p className="text-slate-500 font-semibold text-sm">
              {summary?.total ?? "—"} total bookings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-indigo-400 transition-colors"
          />
          {dateFilter && (
            <button
              onClick={() => { setDateFilter(""); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-slate-100 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold flex items-center gap-1.5"
            >
              <X size={12} /> Clear
            </button>
          )}
          {/* Refresh */}
          <button
            onClick={() => fetchBookings()}
            disabled={loading}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SUMMARY STATS
          ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          label="Pending"
          value={summary?.pending}
          color="bg-amber-400"
          active={activeStatus === "pending"}
          onClick={() => handleStatusChange("pending")}
        />
        <StatCard
          label="Confirmed"
          value={summary?.confirmed}
          color="bg-emerald-400"
          active={activeStatus === "confirmed"}
          onClick={() => handleStatusChange("confirmed")}
        />
        <StatCard
          label="Completed"
          value={summary?.completed}
          color="bg-indigo-400"
          active={activeStatus === "completed"}
          onClick={() => handleStatusChange("completed")}
        />
        <StatCard
          label="Cancelled"
          value={summary?.cancelled}
          color="bg-rose-400"
          active={activeStatus === "cancelled"}
          onClick={() => handleStatusChange("cancelled")}
        />
        <StatCard
          label="No-show"
          value={summary?.noShow}
          color="bg-slate-400"
          active={activeStatus === "no-show"}
          onClick={() => handleStatusChange("no-show")}
        />
      </div>

      {/* ══════════════════════════════════════════════
          FILTER BAR
          ══════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Status tabs */}
        <div className="flex gap-1 p-1.5 bg-slate-100 rounded-2xl">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleStatusChange(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${
                activeStatus === tab.key
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              {tab.count != null && (
                <span className={`ml-1.5 text-[9px] font-black ${activeStatus === tab.key ? "text-indigo-400" : "text-slate-300"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
          <input
            type="text"
            placeholder="Search by name, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:shadow-sm transition-all placeholder:text-slate-300"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BOOKINGS LIST
          ══════════════════════════════════════════════ */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="text-rose-400" size={22} />
          </div>
          <p className="font-bold text-slate-700 mb-1">Something went wrong</p>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => fetchBookings()}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : loading && bookings.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-[1.75rem] border border-slate-100 p-5 flex items-center gap-4 animate-pulse">
              <div className="w-14 h-12 bg-slate-100 rounded-xl" />
              <div className="h-10 w-px bg-slate-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-lg w-40" />
                <div className="h-3 bg-slate-50 rounded-lg w-28" />
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <CalendarCheck size={24} className="text-slate-200" />
          </div>
          <p className="font-black text-slate-600 text-lg mb-1">No appointments found</p>
          <p className="text-slate-400 text-sm">
            {searchQuery || dateFilter || activeStatus !== "all"
              ? "Try adjusting your filters"
              : "Bookings from your clients will appear here"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {loading && (
            <div className="flex justify-center py-2">
              <Loader2 size={18} className="animate-spin text-indigo-400" />
            </div>
          )}
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onClick={() => {
                setSelectedBooking(booking);
                setIsDrawerOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PAGINATION
          ══════════════════════════════════════════════ */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
            let page;
            if (pagination.pages <= 5) {
              page = i + 1;
            } else if (currentPage <= 3) {
              page = i + 1;
            } else if (currentPage >= pagination.pages - 2) {
              page = pagination.pages - 4 + i;
            } else {
              page = currentPage - 2 + i;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
            disabled={currentPage === pagination.pages}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>

          <span className="text-xs font-bold text-slate-400 ml-2">
            {pagination.total} total
          </span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          BOOKING DETAIL DRAWER
          ══════════════════════════════════════════════ */}
      {isDrawerOpen && selectedBooking && (
        <BookingDrawer
          booking={selectedBooking}
          onClose={() => { setIsDrawerOpen(false); setSelectedBooking(null); }}
          onStatusChange={handleBookingUpdated}
          onReschedule={() => setRescheduleBooking(selectedBooking)}
          onComplete={(booking) => {
            setIsDrawerOpen(false);
            setCompletionBooking(booking);
          }}
        />
      )}

      {/* ══════════════════════════════════════════════
          RESCHEDULE MODAL
          ══════════════════════════════════════════════ */}
      {rescheduleBooking && (
        <RescheduleModal
          booking={rescheduleBooking}
          onClose={() => setRescheduleBooking(null)}
          onSuccess={(updated) => {
            setRescheduleBooking(null);
            handleBookingUpdated(updated);
          }}
        />
      )}

      {/* ══════════════════════════════════════════════
          COMPLETION FLOW MODAL
          ══════════════════════════════════════════════ */}
      {completionBooking && (
        <CompletionFlowModal
          booking={completionBooking}
          onClose={() => setCompletionBooking(null)}
          onCompleted={(updatedBooking) => {
            handleBookingUpdated(updatedBooking);
            setCompletionBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default Appointments;