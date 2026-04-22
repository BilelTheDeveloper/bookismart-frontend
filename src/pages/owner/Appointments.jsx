import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter,
  AlertCircle,
  ChevronRight,
  MapPin
} from "lucide-react";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = [
    { 
      id: "BK-7712", 
      customer: "Sami Ben Ali", 
      service: "Full Grooming Package", 
      time: "10:30 AM", 
      duration: "45 min",
      status: "Confirmed",
      price: "45.000",
      avatar: null 
    },
    { 
      id: "BK-7715", 
      customer: "Mariem Dridi", 
      service: "Hair Coloring & Styling", 
      time: "11:15 AM", 
      duration: "120 min",
      status: "In-Progress",
      price: "120.000",
      avatar: null 
    },
    { 
      id: "BK-7719", 
      customer: "Yassine Jlassi", 
      service: "Beard Trim & Shape", 
      time: "01:00 PM", 
      duration: "30 min",
      status: "Pending",
      price: "25.000",
      avatar: null 
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "In-Progress": return "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 animate-pulse";
      case "Confirmed": return "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200";
      case "Pending": return "bg-amber-50 text-amber-600 ring-1 ring-amber-200";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      
      {/* --- TOP HUD: SUMMARY & SEARCH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-100">
              <CalendarIcon size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Daily Schedule</h2>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                Wednesday, April 22 <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" /> 12 Appointments
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Find booking..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-transparent border-2 rounded-2xl text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none"
            />
          </div>
        </div>

        <button className="bg-slate-900 hover:bg-black text-white rounded-[2.5rem] p-6 flex flex-col items-center justify-center transition-all group shadow-xl shadow-slate-200">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="font-black text-xs uppercase tracking-[0.2em]">Quick Book</span>
        </button>
      </div>

      {/* --- MAIN SCHEDULE CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: BOOKINGS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 p-1.5 bg-slate-100 w-fit rounded-2xl mb-6">
            {["upcoming", "completed", "cancelled"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {bookings.map((item) => (
            <div key={item.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Time Indicator */}
                <div className="text-center min-w-[70px]">
                  <p className="text-lg font-black text-slate-900">{item.time}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.duration}</p>
                </div>

                {/* Vertical Divider */}
                <div className="h-12 w-[1px] bg-slate-100" />

                {/* Customer Info */}
                <div>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.customer}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm font-bold text-slate-500">{item.service}</p>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900">{item.price} TND</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.id}</p>
                </div>
                <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SMART INSIGHTS & CALENDAR PREVIEW */}
        <div className="space-y-6">
          {/* Mini Insights Card */}
          <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <h4 className="text-xl font-black mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-indigo-400" /> Waitlist
            </h4>
            <div className="space-y-4 relative z-10">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold text-white">Client #{i+42}</p>
                    <p className="text-xs text-indigo-300 font-medium italic underline cursor-pointer">Needs ASAP Slot</p>
                  </div>
                  <ChevronRight size={18} className="text-indigo-400" />
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>

          {/* Location / Staff Selection */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">View Context</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin size={18} className="text-indigo-600" />
                <span className="text-sm font-black text-slate-900">Main Headquarters</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                <span className="text-sm font-bold text-slate-600">All Specialists</span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Legend</h4>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                 <div className="w-2 h-2 bg-indigo-500 rounded-full" /> In Progress
               </div>
               <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Confirmed
               </div>
               <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                 <div className="w-2 h-2 bg-amber-500 rounded-full" /> Pending
               </div>
               <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                 <div className="w-2 h-2 bg-rose-500 rounded-full" /> No Show
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;