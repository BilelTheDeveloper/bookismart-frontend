import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { useCustomerAuth } from "../../../context/CustomerAuthContext";

const CustomerBooking = () => {
  const { customer } = useCustomerAuth();
  const hasFullAccess = customer?.allowedPages?.find(p => p.pageKey === "booking")?.accessLevel === "full";

  if (!hasFullAccess) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center">
        <BookOpen size={36} className="text-slate-500" />
      </div>
      <h3 className="text-white font-black text-xl">View Only Access</h3>
      <p className="text-slate-400 text-sm max-w-xs text-center">
        You have read-only access to this section. Contact your service provider to enable booking.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
          <BookOpen size={22} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Book a Service</h2>
          <p className="text-slate-400 text-sm">Schedule an appointment with {customer?.businessName}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-500/20 rounded-[2rem] p-10 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <BookOpen size={36} className="text-emerald-400" />
        </div>
        <h3 className="text-white font-black text-2xl mb-3">Ready to Book?</h3>
        <p className="text-slate-400 max-w-sm mx-auto mb-8">
          Browse available services and time slots from <strong className="text-slate-200">{customer?.businessName}</strong> and book instantly.
        </p>
        <a
          href={`/book/${customer?.ownerId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/30"
        >
          <BookOpen size={18} /> Open Booking Page <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default CustomerBooking;
