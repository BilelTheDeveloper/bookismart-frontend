import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign,
  MousePointer2,
  Clock,
  Filter
} from "lucide-react";

const Analytics = () => {
  // Mock data for the UI
  const stats = [
    { label: "Total Revenue", value: "1,250.000", sub: "TND", trend: "+12.5%", positive: true, icon: <DollarSign size={20} /> },
    { label: "Total Bookings", value: "148", sub: "Appointments", trend: "+8.2%", positive: true, icon: <Calendar size={20} /> },
    { label: "New Customers", value: "32", sub: "This Month", trend: "-2.4%", positive: false, icon: <Users size={20} /> },
    { label: "Avg. Ticket", value: "45.000", sub: "TND / Visit", trend: "+4.1%", positive: true, icon: <TrendingUp size={20} /> },
  ];

  const topServices = [
    { name: "Haircut & Beard Trim", usage: 64, revenue: "960.000", color: "bg-indigo-500" },
    { name: "Executive Facial", usage: 42, revenue: "840.000", color: "bg-violet-500" },
    { name: "Classic Shave", usage: 28, revenue: "280.000", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- TOP HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 font-medium">Real-time data for your business growth.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={18} /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* --- KPI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-50 text-indigo-600 rounded-2xl">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-full ${
                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              }`}>
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {stat.value} <span className="text-sm font-bold text-slate-400">{stat.sub}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN DATA GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Visualization Mockup */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" /> Revenue Flow
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                <span className="text-xs font-bold text-slate-500">Current</span>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="w-3 h-3 bg-slate-200 rounded-full" />
                <span className="text-xs font-bold text-slate-500">Previous</span>
              </div>
            </div>
          </div>
          
          {/* Mock Graph Bars */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 40, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full relative">
                   <div 
                    style={{ height: `${h}%` }} 
                    className="w-full bg-slate-100 rounded-t-lg group-hover:bg-indigo-100 transition-all absolute bottom-0"
                  />
                  <div 
                    style={{ height: `${h * 0.7}%` }} 
                    className="w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-600 transition-all relative z-10"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services Breakdown */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <MousePointer2 className="text-indigo-600" /> Popular Services
          </h3>
          <div className="space-y-6">
            {topServices.map((service, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-black text-slate-900">{service.name}</p>
                    <p className="text-xs text-slate-500 font-bold">{service.usage} Bookings</p>
                  </div>
                  <p className="text-sm font-black text-indigo-600">{service.revenue} TND</p>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${service.color} rounded-full`} 
                    style={{ width: `${(service.usage / 80) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
            View Full Report
          </button>
        </div>
      </div>

      {/* --- RECENT ACTIVITY FOOTER --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-2">Efficiency Score</p>
            <h4 className="text-3xl font-black">94% <span className="text-lg font-medium text-slate-400 italic">Excellent</span></h4>
            <p className="text-slate-400 text-sm mt-2 max-w-[240px]">Your booking-to-completion rate is higher than 85% of peers.</p>
          </div>
          <div className="relative z-10 p-6 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
             <Clock size={40} className="text-indigo-400" />
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <TrendingUp size={28} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900 tracking-tight">Growth Forecast</h4>
              <p className="text-sm text-slate-500 font-medium">Predicted +15% revenue next month.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
            Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;