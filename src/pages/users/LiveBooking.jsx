import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Timer, 
  MoreVertical, 
  ExternalLink,
  Navigation
} from "lucide-react";

const UserLiveDashboard = () => {
  // Mock data for the live bookings
  const [bookings] = useState([
    {
      id: 1,
      service: "Coupe Homme + Barbe",
      provider: "Gentleman's Club Sousse",
      time: "14:30",
      date: "Aujourd'hui",
      status: "Confirmé",
      address: "Av. Habib Bourguiba, Sousse",
      isLive: true, // This one is coming up next
    },
    {
      id: 2,
      service: "Consultation Dentaire",
      provider: "Dr. Slimane - Cabinet Dentaire",
      time: "09:00",
      date: "Demain",
      status: "En attente",
      address: "Centre Urbain Nord, Tunis",
      isLive: false,
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* 🎫 Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Mes <span className="text-indigo-600">Réservations</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Gérez vos rendez-vous en temps réel.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <Calendar size={18} />
              Calendrier
            </button>
          </div>
        </div>

        {/* 🚀 LIVE SPOTLIGHT (Next Appointment) */}
        {bookings.filter(b => b.isLive).map(live => (
          <div key={live.id} className="relative mb-12 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-indigo-50 flex flex-col lg:flex-row gap-8 items-center">
              
              {/* Live Indicator */}
              <div className="absolute top-6 right-8 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
                </span>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Prochainement</span>
              </div>

              {/* Service Icon/Visual */}
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                <Timer size={40} />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">{live.service}</h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4 text-slate-500 font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-indigo-500" />
                    {live.time} ({live.date})
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-rose-500" />
                    {live.provider}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-lg">
                  <Navigation size={18} />
                  Y Aller
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:border-red-100 hover:text-red-500 transition-all">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 📅 UPCOMING LIST */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">À venir</h3>
          
          {bookings.filter(b => !b.isLive).map(booking => (
            <div key={booking.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 md:p-6 flex items-center justify-between hover:shadow-lg transition-all group">
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <CheckCircle2 size={24} />
                </div>
                
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{booking.service}</h4>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mt-1">{booking.provider}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-12">
                <div className="hidden md:block text-right">
                  <p className="font-black text-slate-900">{booking.time}</p>
                  <p className="text-slate-400 font-bold text-xs">{booking.date}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <ExternalLink size={20} />
                  </button>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📥 Empty State Helper */}
        {bookings.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={32} className="text-slate-300" />
             </div>
             <h3 className="text-xl font-black text-slate-900">Aucune réservation</h3>
             <p className="text-slate-400 mt-2 font-medium">Vous n'avez pas encore de rendez-vous programmé.</p>
             <button className="mt-8 px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                Réserver maintenant
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserLiveDashboard;