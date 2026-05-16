import React, { useState, useEffect } from 'react';
import API from '../api/config';
import {
  CheckCircle2, FileText, Star, Send, X, ChevronRight,
  Loader2, Sparkles, Gift, ArrowRight, Trophy,
} from 'lucide-react';

/* ── Step indicator ── */
function StepDot({ active, done, n }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
      done  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' :
               'bg-slate-800 text-slate-600'
    }`}>
      {done ? <CheckCircle2 size={15} /> : n}
    </div>
  );
}

function StepLine({ done }) {
  return (
    <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-slate-800">
      <div className={`h-full bg-emerald-500 transition-all duration-700 ${done ? 'w-full' : 'w-0'}`} />
    </div>
  );
}

/* ── Confetti particle (CSS-only) ── */
function Confetti() {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400', 'bg-sky-400'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {particles.map((i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-sm opacity-0 ${colors[i % colors.length]}`}
          style={{
            left: `${5 + (i * 5.5) % 90}%`,
            top: '-8px',
            animation: `confettiFall ${0.8 + (i % 4) * 0.3}s ease-out ${i * 0.07}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(260px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN MODAL
   Props:
     booking      — the booking object (must be confirmed/pending status)
     onClose      — close the modal
     onCompleted  — called with updatedBooking after API success
   ══════════════════════════════════════════════════════════════════════════════ */
export default function CompletionFlowModal({ booking, onClose, onCompleted }) {
  const [step, setStep]                   = useState(0); // 0=confirm 1=invoice 2=loyalty 3=review 4=done
  const [completing, setCompleting]       = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);
  const [invoiceCreated, setInvoiceCreated]     = useState(false);
  const [loyaltyAwarded, setLoyaltyAwarded]     = useState(false);
  const [sendingReview, setSendingReview]       = useState(false);
  const [reviewSent, setReviewSent]             = useState(false);
  const [notes, setNotes]                       = useState('');
  const [error, setError]                       = useState('');

  const servicePrice = parseFloat(
    String(booking?.service?.price || '0').replace(/[^0-9.]/g, '')
  ) || 0;

  /* Step 0 → confirm booking via API */
  const handleComplete = async () => {
    setCompleting(true);
    setError('');
    try {
      const { data } = await API.patch(`/merchant/bookings/${booking._id}/status`, { status: 'completed' });
      if (data.success) {
        setCompletedBooking(data.data);
        /* The backend _onBookingCompleted auto-creates invoice + loyalty.
           We just signal the UI that they were triggered. */
        setInvoiceCreated(servicePrice > 0);
        setLoyaltyAwarded(true);
        onCompleted?.(data.data);
        /* Brief pause then advance */
        setTimeout(() => setStep(1), 600);
      }
    } catch (err) {
      setError('Failed to complete appointment. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  /* Step 3 → send review request email */
  const handleSendReview = async () => {
    setSendingReview(true);
    try {
      await API.post(`/merchant/bookings/${booking._id}/review-request`);
      setReviewSent(true);
    } catch {}
    finally { setSendingReview(false); }
  };

  const steps = [
    { label: 'Complete', icon: CheckCircle2 },
    { label: 'Invoice',  icon: FileText      },
    { label: 'Loyalty',  icon: Gift          },
    { label: 'Review',   icon: Star          },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={step === 4 ? onClose : undefined} />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {step === 4 && <Confetti />}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/20 rounded-xl">
              <Sparkles size={16} className="text-indigo-400" />
            </div>
            <p className="text-white font-black text-sm">Completion Flow</p>
          </div>
          {step === 4 && (
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Step indicators */}
        {step < 4 && (
          <div className="flex items-center px-6 py-4 border-b border-slate-800">
            {steps.map((s, i) => (
              <React.Fragment key={s.label}>
                <StepDot n={i + 1} active={step === i} done={step > i} />
                {i < steps.length - 1 && <StepLine done={step > i} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-6 min-h-[260px] flex flex-col">

          {/* ── STEP 0: Confirm ── */}
          {step === 0 && (
            <div className="flex flex-col flex-1">
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-1">Mark as Completed</h3>
                <p className="text-slate-400 text-sm">
                  Confirm that <span className="text-white font-bold">{booking.customerName}</span>'s{' '}
                  appointment is done. Invoice &amp; loyalty points will be auto-generated.
                </p>

                {/* Booking summary card */}
                <div className="mt-5 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Service</span>
                    <span className="text-white font-bold">{booking.service?.title || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Date</span>
                    <span className="text-white font-bold">{booking.dateString}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Time</span>
                    <span className="text-white font-bold">{booking.timeSlot}</span>
                  </div>
                  {servicePrice > 0 && (
                    <div className="flex justify-between text-sm border-t border-slate-800 pt-2 mt-2">
                      <span className="text-slate-400 font-bold">Amount</span>
                      <span className="text-emerald-400 font-black">{booking.service.price}</span>
                    </div>
                  )}
                </div>

                {error && <p className="text-rose-400 text-xs font-bold mt-3">{error}</p>}
              </div>

              <button
                onClick={handleComplete}
                disabled={completing}
                className="mt-6 w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
              >
                {completing
                  ? <><Loader2 size={16} className="animate-spin" /> Completing…</>
                  : <><CheckCircle2 size={16} /> Confirm Completion</>
                }
              </button>
            </div>
          )}

          {/* ── STEP 1: Invoice ── */}
          {step === 1 && (
            <div className="flex flex-col flex-1">
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                  invoiceCreated ? 'bg-emerald-500/20' : 'bg-slate-800'
                }`}>
                  <FileText size={30} className={invoiceCreated ? 'text-emerald-400' : 'text-slate-600'} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {invoiceCreated ? 'Invoice Created' : 'No Invoice'}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {invoiceCreated
                      ? `A draft invoice for ${booking.service?.price || '—'} was automatically generated and saved to Invoices.`
                      : 'No price was set for this service — invoice skipped.'
                    }
                  </p>
                </div>
                {invoiceCreated && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3 text-sm text-emerald-400 font-bold">
                    ✓ Saved to Invoices → Draft
                  </div>
                )}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 2: Loyalty ── */}
          {step === 2 && (
            <div className="flex flex-col flex-1">
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center shadow-xl">
                  <Gift size={30} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Loyalty Updated</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Visit count &amp; spend recorded for{' '}
                    <span className="text-white font-bold">{booking.customerName}</span>.
                    Loyalty points or stamp awarded automatically.
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3 text-sm text-amber-400 font-bold">
                  ✓ +1 Visit · +{booking.service?.price || '—'} Spend recorded
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="mt-6 w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 3: Review request ── */}
          {step === 3 && (
            <div className="flex flex-col flex-1">
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center shadow-xl">
                  <Star size={30} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Request a Review</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Send <span className="text-white font-bold">{booking.customerName}</span> an
                    email asking them to rate their experience. Takes one click.
                  </p>
                </div>
                {reviewSent ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3 text-sm text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 size={14} /> Review request sent to {booking.customerEmail}
                  </div>
                ) : (
                  <button
                    onClick={handleSendReview}
                    disabled={sendingReview}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-xl flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                  >
                    {sendingReview
                      ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                      : <><Send size={14} /> Send Review Request</>
                    }
                  </button>
                )}
              </div>
              <button
                onClick={() => setStep(4)}
                className="mt-4 w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Finish <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* ── STEP 4: Done / Celebration ── */}
          {step === 4 && (
            <div className="flex flex-col flex-1 items-center justify-center text-center gap-4 py-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                <Trophy size={36} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">All Done!</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Appointment completed · Invoice saved · Loyalty updated
                  {reviewSent && ' · Review request sent'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                {[
                  'Completed ✓',
                  invoiceCreated && 'Invoice ✓',
                  'Loyalty ✓',
                  reviewSent && 'Review sent ✓',
                ].filter(Boolean).map(t => (
                  <span key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={onClose}
                className="mt-4 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-xl hover:opacity-90 transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
