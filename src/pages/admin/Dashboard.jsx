import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import { 
  TrendingUp, 
  Users, 
  Store, 
  DollarSign, 
  CalendarCheck, 
  Bell, 
  ArrowUpRight, 
  ShieldAlert, 
  Activity 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Revenue', value: '12,450 TND', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+8%' },
    { label: 'Active Merchants', value: '452', icon: <Store />, color: 'bg-indigo-500', trend: '+12%' },
    { label: 'New Bookings', value: '1,205', icon: <CalendarCheck />, color: 'bg-cyan-500', trend: '+18%' },
    { label: 'Platform Growth', value: '+12.5%', icon: <TrendingUp />, color: 'bg-amber-500', trend: 'Steady' },
  ];

  const systemAlerts = [
    { id: 1, type: 'kyc', title: 'Pending Verifications', desc: '14 merchants are waiting for CIN approval.', action: 'Review Now', path: '/admin/verification', icon: <ShieldAlert className="text-amber-600" />, bg: 'bg-amber-50' },
    { id: 2, type: 'payment', title: 'Flouci Integration', desc: 'System node updated successfully in Tunis region.', action: 'Logs', path: '/admin/settings', icon: <Activity className="text-indigo-600" />, bg: 'bg-indigo-50' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        {/* --- Header Section --- */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">System Live</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ecosystem Overview</h1>
            <p className="text-slate-500 font-medium mt-1">Real-time performance of Bookismart Tunisia.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
              Generate Audit
            </button>
          </div>
        </header>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-100`}>
                {React.cloneElement(stat.icon, { size: 22 })}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h2>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Main Chart Simulation (Users & Payments) --- */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-900 text-lg">Merchant Growth Distribution</h3>
              <select className="bg-slate-50 border-none text-[10px] font-black uppercase rounded-xl px-4 py-2">
                <option value="7d">Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            {/* Simple CSS Diagram for Users/Payments */}
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full bg-slate-50 rounded-2xl relative overflow-hidden h-full flex items-end">
                    <div 
                      className="w-full bg-indigo-500 rounded-2xl transition-all duration-1000 group-hover:bg-indigo-400" 
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Right Column: Alerts & Actions --- */}
          <div className="space-y-6">
            <h3 className="font-black text-slate-900 text-lg px-2">Critical Actions</h3>
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`${alert.bg} p-6 rounded-[2.5rem] border border-white shadow-sm transition-transform hover:scale-[1.02]`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 text-sm">{alert.title}</h4>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-1">{alert.desc}</p>
                    <button 
                      onClick={() => navigate(alert.path)}
                      className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {alert.action} <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Stats Summary Box */}
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-1">98.2%</h4>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Server Uptime</p>
                <div className="mt-6 flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-emerald-500 rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-white/5 rotate-12">
                <Activity size={120} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;