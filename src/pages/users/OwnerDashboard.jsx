import React from "react";
import { TrendingUp, Users, CalendarCheck, Wallet, ArrowUpRight, Clock } from "lucide-react";

const OwnerDashboard = () => {
  // Stat Card Component for reuse
  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <div className={`p-3 md:p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
          <Icon size={20} className={`${color.replace('bg-', 'text-')} md:w-6 md:h-6`} />
        </div>
        <span className="flex items-center gap-1 text-emerald-500 font-black text-[10px] md:text-xs">
          <ArrowUpRight size={14} /> {trend}
        </span>
      </div>
      <h3 className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl font-black text-slate-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-10">
      {/* 👋 Header Section */}
      <section className="px-1">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Business Overview</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium mt-2">Here is what's happening at your shop today.</p>
      </section>

      {/* 📊 High-Level Stats - Grid handles 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <StatCard title="Total Revenue" value="1,240 TND" icon={Wallet} trend="+12%" color="bg-emerald-500" />
        <StatCard title="Active Clients" value="482" icon={Users} trend="+5%" color="bg-indigo-500" />
        <StatCard title="Total Bookings" value="24" icon={CalendarCheck} trend="+18%" color="bg-amber-500" />
        <StatCard title="Growth Rate" value="22.4%" icon={TrendingUp} trend="+2%" color="bg-cyan-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* 📈 User Activity / "Diagram" Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm min-h-[350px] md:min-h-[400px] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
            <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">User Traffic Flow</h3>
            <select className="w-full sm:w-auto bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="flex-1 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center group cursor-pointer hover:border-indigo-300 transition-all p-4">
             <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm mx-auto mb-4 flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 transition-transform">📊</div>
                <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest">Revenue & Booking Chart</p>
                <p className="text-[9px] md:text-[10px] text-slate-300 font-bold mt-1">(Chart.js / Recharts Integration Here)</p>
             </div>
          </div>
        </div>

        {/* 🔔 Real-time Alerts Box */}
        <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-indigo-200 flex flex-col">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center animate-pulse">
              <Clock size={16} />
            </div>
            <h3 className="text-base md:text-lg font-black uppercase tracking-tighter">Live Updates</h3>
          </div>
          
          <div className="space-y-4 md:space-y-6 flex-1">
            <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">New Booking</p>
              <p className="font-bold text-xs md:text-sm">Ahmed Mansour booked Haircut</p>
              <p className="text-[9px] md:text-[10px] text-white/40 mt-2 font-bold uppercase">2 mins ago</p>
            </div>
            <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Payment Received</p>
              <p className="font-bold text-xs md:text-sm">+45.000 TND via Flouci</p>
              <p className="text-[9px] md:text-[10px] text-white/40 mt-2 font-bold uppercase">15 mins ago</p>
            </div>
            <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer opacity-50">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Reminder</p>
              <p className="font-bold text-xs md:text-sm">Review pending staff schedules</p>
              <p className="text-[9px] md:text-[10px] text-white/40 mt-2 font-bold uppercase">1 hour ago</p>
            </div>
          </div>
          
          <button className="w-full py-4 mt-6 md:mt-8 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-400 hover:text-white transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;