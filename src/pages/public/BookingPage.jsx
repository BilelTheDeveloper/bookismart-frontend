import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/config";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS & HELPERS
   ───────────────────────────────────────────────────────────────────────────── */

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
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const formatTime = (time24) => {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
};

/* ─────────────────────────────────────────────────────────────────────────────
   STEP INDICATOR
   ───────────────────────────────────────────────────────────────────────────── */

const StepIndicator = ({ current, total }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }, (_, i) => (
      <React.Fragment key={i}>
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < current ? "bg-amber-400 w-8" : i === current ? "bg-amber-400 w-5" : "bg-white/10 w-3"
          }`}
        />
      </React.Fragment>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MINI CALENDAR
   ───────────────────────────────────────────────────────────────────────────── */

const MiniCalendar = ({ selectedDate, onSelect, businessHours }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const getDayName = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const isClosedDay = (date) => {
    if (!businessHours || businessHours.length === 0) return false;
    const day = getDayName(date);
    const config = businessHours.find((d) => d.day === day);
    return !config || config.isClosed;
  };

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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-bold text-white tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const isPast = date < today;
          const isClosed = isClosedDay(date);
          const disabled = isPast || isClosed;
          const dateStr = toDateString(date);
          const isSelected = dateStr === selectedDate;
          const isToday = toDateString(date) === toDateString(today);

          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`
                relative aspect-square flex items-center justify-center rounded-xl text-xs font-semibold
                transition-all duration-200
                ${disabled ? "text-white/15 cursor-not-allowed" : "cursor-pointer hover:bg-amber-400/20 hover:text-amber-300"}
                ${isSelected ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-110" : ""}
                ${isToday && !isSelected ? "text-amber-400 ring-1 ring-amber-400/40" : ""}
                ${!disabled && !isSelected ? "text-white/70" : ""}
              `}
            >
              {date.getDate()}
              {isClosed && !isPast && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[10px] text-white/40">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <span className="text-[10px] text-white/40">Closed / Past</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   TIME SLOT GRID
   ───────────────────────────────────────────────────────────────────────────── */

const TimeSlotGrid = ({ slots, selectedTime, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin text-amber-400 w-6 h-6" />
        <span className="ml-3 text-white/50 text-sm">Loading slots...</span>
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-2" />
        <p className="text-white/40 text-sm">No slots available for this day.</p>
      </div>
    );
  }

  const available = slots.filter((s) => s.available);
  const taken = slots.filter((s) => !s.available);

  return (
    <div>
      {available.length === 0 && (
        <div className="text-center py-6 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
          <p className="text-red-400 text-sm font-medium">All slots are booked for this day</p>
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map(({ time, available }) => (
          <button
            key={time}
            disabled={!available}
            onClick={() => available && onSelect(time)}
            className={`
              py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${!available
                ? "bg-white/3 text-white/15 cursor-not-allowed line-through decoration-white/20"
                : selectedTime === time
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-105"
                  : "bg-white/5 text-white/70 hover:bg-amber-400/20 hover:text-amber-300 border border-white/10 hover:border-amber-400/30"
              }
            `}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
      {taken.length > 0 && (
        <p className="text-[10px] text-white/25 mt-3 text-center">
          {taken.length} slot{taken.length > 1 ? "s" : ""} already taken
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN BOOKING PAGE
   ───────────────────────────────────────────────────────────────────────────── */

const BookingPage = () => {
  const { merchantId } = useParams();
  const navigate = useNavigate();

  // --- Step State ---
  const [step, setStep] = useState(0); // 0: Service, 1: DateTime, 2: Details, 3: Confirm, 4: Success

  // --- Merchant Data ---
  const [merchant, setMerchant] = useState(null);
  const [loadingMerchant, setLoadingMerchant] = useState(true);
  const [merchantError, setMerchantError] = useState(null);

  // --- Selection State ---
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(toDateString(new Date()));
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [dayIsClosed, setDayIsClosed] = useState(false);
  const [dayLimitReached, setDayLimitReached] = useState(false);

  // --- Form State ---
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [formErrors, setFormErrors] = useState({});

  // --- Submission State ---
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  /* ── Load merchant info ── */
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingMerchant(true);
        const res = await API.get(`/public/booking/${merchantId}`);
        if (res.data.success) {
          setMerchant(res.data.data);
        } else {
          setMerchantError("Business not found.");
        }
      } catch (err) {
        setMerchantError("Could not load this booking page.");
      } finally {
        setLoadingMerchant(false);
      }
    };
    load();
  }, [merchantId]);

  /* ── Load slots whenever date or service changes ── */
  const loadSlots = useCallback(async () => {
    if (!selectedDate || !merchant) return;
    setSlotsLoading(true);
    setSelectedTime(null);
    try {
      const duration = selectedService?.duration || 30;
      const res = await API.get(
        `/public/booking/${merchantId}/slots?date=${selectedDate}&duration=${duration}`
      );
      if (res.data.success) {
        if (res.data.data.isClosed) {
          setDayIsClosed(true);
            setDayLimitReached(false);
          setSlots([]);
        } else {
          setDayIsClosed(false);
            setDayLimitReached(Boolean(res.data.data.isFullyBookedByLimit));
          setSlots(res.data.data.slots);
          // Auto-select first available slot
          const first = res.data.data.slots.find((s) => s.available);
          if (first) setSelectedTime(first.time);
        }
      }
    } catch (err) {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [selectedDate, selectedService, merchantId, merchant]);

  useEffect(() => {
    if (step === 1) loadSlots();
  }, [step, loadSlots]);

  /* ── Form validation ── */
  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.trim().length < 8)
      errors.phone = "Valid phone number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ── Submit booking ── */
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await API.post(`/public/booking/${merchantId}`, {
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        service: selectedService,
        date: selectedDate,
        timeSlot: selectedTime,
        notes: form.notes,
      });
      if (res.data.success) {
        setBookingResult(res.data.data);
        setStep(4);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Booking failed. Please try again.";
      const code = err.response?.data?.code;
      if (code === "SLOT_CONFLICT") {
        setSubmitError("This slot was just taken! Please go back and pick another time.");
      } else {
        setDayLimitReached(false);
        setSubmitError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     LOADING / ERROR STATES
     ───────────────────────────────────────────────────────────────────────── */

  if (loadingMerchant) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
            Loading booking...
          </p>
        </div>
      </div>
    );
  }

  if (merchantError) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">Not Available</h2>
          <p className="text-white/40 text-sm mb-6">{merchantError}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     SUCCESS SCREEN
     ───────────────────────────────────────────────────────────────────────── */

  if (step === 4 && bookingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* Animated checkmark */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-amber-400/10 border-2 border-amber-400/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-amber-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-ping opacity-30" />
          </div>

          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-white/40 text-sm mb-8">
            We've saved your appointment. The business will confirm shortly.
          </p>

          {/* Booking card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Service</p>
                <p className="text-white font-bold">{bookingResult.service}</p>
              </div>
            </div>
            <div className="h-px bg-white/5" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Date</p>
                <p className="text-white text-sm font-semibold">{formatDisplayDate(bookingResult.date)}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Time</p>
                <p className="text-white text-sm font-semibold">{formatTime(bookingResult.time)}</p>
              </div>
            </div>
            <div className="h-px bg-white/5" />
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Booking ID</p>
              <p className="text-white/50 text-xs font-mono">{bookingResult.bookingId}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/p/${merchant.slug}`)}
              className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => {
                setStep(0);
                setSelectedService(null);
                setSelectedDate(toDateString(new Date()));
                setSelectedTime(null);
                setForm({ name: "", email: "", phone: "", notes: "" });
                setBookingResult(null);
              }}
              className="flex-1 py-3 bg-amber-400 text-black rounded-xl text-sm font-black hover:bg-amber-300 transition-colors"
            >
              Book Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     MAIN LAYOUT
     ───────────────────────────────────────────────────────────────────────── */

  const stepTitles = ["Choose Service", "Pick a Date & Time", "Your Details", "Review & Confirm"];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.04)_0%,_transparent_60%)]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => step === 0 ? navigate(-1) : setStep(s => s - 1)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">{step === 0 ? "Back" : stepTitles[step - 1] || "Back"}</span>
          </button>
          <StepIndicator current={step} total={4} />
        </div>

        {/* ── MERCHANT HEADER ── */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-white/3 border border-white/8 rounded-2xl">
          <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            {merchant?.profilePicUrl ? (
              <img src={merchant.profilePicUrl} alt={merchant.businessName} className="w-full h-full object-cover" />
            ) : (
              <Scissors className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div>
            <h2 className="font-black text-white text-lg leading-tight">{merchant?.businessName}</h2>
            <p className="text-white/40 text-xs">{merchant?.category} · {merchant?.ville}</p>
            <p className="text-white/25 text-[11px] mt-1">
              {merchant?.setupConfig?.localization?.address || merchant?.contact?.address || "Location not specified"}
            </p>
          </div>
        </div>

        {/* ── STEP TITLE ── */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-amber-400/70 uppercase tracking-[0.25em] mb-1">
            Step {step + 1} of 4
          </p>
          <h1 className="text-2xl font-black text-white tracking-tight">{stepTitles[step]}</h1>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            STEP 0 — SERVICE SELECTION
            ═══════════════════════════════════════════════════════════ */}
        {step === 0 && (
          <div className="space-y-3">
            {merchant?.services?.length === 0 && (
              <div className="text-center py-12 text-white/30">
                <Scissors className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No services available yet.</p>
              </div>
            )}
            {merchant?.services?.map((service, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedService(service);
                  setStep(1);
                }}
                className={`
                  w-full text-left p-5 rounded-2xl border transition-all duration-200 group
                  ${selectedService?.title === service.title
                    ? "bg-amber-400/10 border-amber-400/40"
                    : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-base mb-1">{service.title}</h3>
                    {service.description && (
                      <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
                    )}
                    {service.duration && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <Clock size={11} className="text-white/25" />
                        <span className="text-[11px] text-white/30">{service.duration} min</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-amber-400 font-black text-lg">{service.price}</span>
                    <div className="mt-2 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-400/30 group-hover:bg-amber-400/10 transition-all">
                      <ArrowRight size={12} className="text-white/30 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 1 — DATE & TIME
            ═══════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Selected service recap */}
            <div className="flex items-center gap-3 p-3 bg-amber-400/5 border border-amber-400/15 rounded-xl">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">{selectedService?.title}</span>
              <span className="ml-auto text-amber-400 text-sm font-black">{selectedService?.price}</span>
            </div>

            {/* Calendar */}
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Calendar size={10} /> Select Date
              </p>
              <MiniCalendar
                selectedDate={selectedDate}
                onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                businessHours={merchant?.businessHours || []}
              />
            </div>

            {/* Time slots */}
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock size={10} /> Available Times — {formatDisplayDate(selectedDate)}
              </p>

              {dayIsClosed ? (
                <div className="text-center py-8 bg-white/3 border border-white/8 rounded-2xl">
                  <X className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-white/40 text-sm font-medium">Closed on this day</p>
                  <p className="text-white/20 text-xs mt-1">Pick another date from the calendar</p>
                </div>
              ) : dayLimitReached ? (
                <div className="text-center py-8 bg-white/3 border border-white/8 rounded-2xl">
                  <X className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-white/40 text-sm font-medium">Maximum customers reached for this day</p>
                  <p className="text-white/20 text-xs mt-1">Please choose another date</p>
                </div>
              ) : (
                <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
                  <TimeSlotGrid
                    slots={slots}
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                    loading={slotsLoading}
                  />
                </div>
              )}
            </div>

            <button
              disabled={!selectedTime || dayIsClosed || dayLimitReached}
              onClick={() => setStep(2)}
              className={`
                w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-200
                ${selectedTime && !dayIsClosed && !dayLimitReached
                  ? "bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
                }
              `}
            >
              {selectedTime ? `Continue with ${formatTime(selectedTime)}` : "Select a time to continue"}
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 2 — CUSTOMER DETAILS
            ═══════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Appointment recap */}
            <div className="p-4 bg-white/3 border border-white/8 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Service</span>
                <span className="text-white font-semibold">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Date</span>
                <span className="text-white font-semibold">{formatDisplayDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Time</span>
                <span className="text-amber-400 font-black">{formatTime(selectedTime)}</span>
              </div>
            </div>

            {/* Form fields */}
            {[
              { key: "name", label: "Full Name", icon: User, type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+216 XX XXX XXX" },
            ].map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Icon size={10} /> {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, [key]: e.target.value }));
                    if (formErrors[key]) setFormErrors((fe) => ({ ...fe, [key]: null }));
                  }}
                  placeholder={placeholder}
                  className={`
                    w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm
                    placeholder:text-white/20 outline-none transition-all
                    focus:bg-white/8 focus:border-amber-400/40
                    ${formErrors[key] ? "border-red-400/50 bg-red-400/5" : "border-white/10"}
                  `}
                />
                {formErrors[key] && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={10} /> {formErrors[key]}
                  </p>
                )}
              </div>
            ))}

            {/* Notes */}
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <MessageSquare size={10} /> Notes (optional)
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Any special requests or info for the business..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all focus:bg-white/8 focus:border-amber-400/40 resize-none"
              />
            </div>

            <button
              onClick={() => {
                if (validateForm()) setStep(3);
              }}
              className="w-full py-4 bg-amber-400 text-black rounded-2xl font-black text-sm tracking-wide hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              Review Appointment →
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 3 — CONFIRM
            ═══════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
              <div className="p-4 bg-amber-400/5 border-b border-amber-400/10">
                <p className="text-[10px] font-black text-amber-400/70 uppercase tracking-widest mb-1">Appointment Summary</p>
                <h3 className="text-white font-bold">{merchant?.businessName}</h3>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { label: "Service", value: selectedService?.title },
                  { label: "Price", value: selectedService?.price, accent: true },
                  { label: "Duration", value: selectedService?.duration ? `${selectedService.duration} min` : "—" },
                  { label: "Date", value: formatDisplayDate(selectedDate) },
                  { label: "Time", value: formatTime(selectedTime), accent: true },
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  { label: "Phone", value: form.phone },
                  form.notes && { label: "Notes", value: form.notes },
                ].filter(Boolean).map(({ label, value, accent }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-white/40 text-sm">{label}</span>
                    <span className={`text-sm font-semibold ${accent ? "text-amber-400" : "text-white"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{submitError}</p>
              </div>
            )}

            <p className="text-white/25 text-xs text-center leading-relaxed">
              By confirming, you agree to the appointment terms. The business may contact you to confirm.
            </p>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-4 bg-amber-400 text-black rounded-2xl font-black text-sm tracking-wide hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Securing your booking...
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  Confirm Appointment
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── POWERED BY BOOKIIFY ── */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/8 rounded-full flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-400 rounded-sm flex items-center justify-center">
            <Sparkles size={9} className="text-black" />
          </div>
          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Powered by Bookiify</span>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;