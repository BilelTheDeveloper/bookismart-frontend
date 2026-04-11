import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import { 
  TrendingUp, 
  Store, 
  DollarSign, 
  CalendarCheck, 
  Bell, 
  ArrowUpRight, 
  ShieldAlert, 
  Activity,
  Globe,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Advanced Stats mapping for the entire Tunisia region
  const stats = [
    { label: 'Total Platform Revenue', value: '12,450 TND', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+8%', shadow: 'shadow-emerald-100' },
    { label: 'Active Merchants', value: '452', icon: <Store />, color: 'bg-indigo-600', trend: '+12%', shadow: 'shadow-indigo-100' },
    { label: 'Platform Bookings', value: '1,205', icon: <CalendarCheck />, color: 'bg-rose-500', trend: '+18%', shadow: 'shadow-rose-100' },
    { label: 'System Growth', value: '+12.5%', icon: <TrendingUp />, color: 'bg-amber-500', trend: 'Steady', shadow: 'shadow-amber-100' },
  ];

  const systemAlerts = [
    { 
      id: 1, 
      type: 'kyc', 
      title: 'Pending Verifications', 
      desc: '14 merchants are waiting for CIN/Business approval.', 
      action: 'Review Now', 
      path: '/admin/verification', 
      icon: <ShieldAlert className="text-amber-600" />, 
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
    { 
      id: 2, 
      type: 'payment', 
      title: 'Flouci Node Status', 
      desc: 'Tunis region payment gateways are performing optimally.', 
      action: 'Check Logs', 
      path: '/admin/settings', 
      icon: <Zap className="text-indigo-600" />, 
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        {/* --- Advanced Header --- */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Live Infrastructure</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <Globe size={10} className="text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">Region: Tunisia</span>
              </div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ecosystem <span className="text-indigo-600">Overview</span></h1>
            <p className="text-slate-500 font-medium mt-1">Global performance monitoring for Bookismart.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all hover:shadow-lg">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-300 active:scale-95">
              Export System Audit
            </button>
          </div>
        </header>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-all">
              <div className={`w-14 h-14 ${stat.color} text-white rounded-[1.25rem] flex items-center justify-center mb-5 shadow-2xl ${stat.shadow}`}>
                {React.cloneElement(stat.icon, { size: 26 })}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h2 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Distribution Diagram (Category-Aware Growth) --- */}
          <div className="lg:col-span-2 bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Merchant Distribution</h3>
                <p className="text-slate-400 text-xs font-medium mt-1">Growth across 10 "Smart" categories</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-slate-50 text-[10px] font-black uppercase px-4 py-2 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Daily</button>
                <button className="bg-slate-900 text-[10px] font-black uppercase px-4 py-2 rounded-xl text-white">Monthly</button>
              </div>
            </div>
            
            {/* Visual Growth Diagram */}
            <div className="h-64 flex items-end justify-between gap-3 px-2 relative z-10">
              {[60, 45, 85, 30, 95, 70, 50, 80, 40, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                  <div className="w-full bg-slate-50 rounded-2xl relative overflow-hidden h-full flex items-end">
                    <div 
                      className={`w-full bg-indigo-500 rounded-2xl transition-all duration-700 ease-out group-hover:opacity-80`} 
                      style={{ height: `${height}%`, transitionDelay: `${i * 50}ms` }}
                    >
                      <div className="absolute top-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[8px] font-black text-white">{height}%</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Cat {i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Right Column: Intelligence & Control --- */}
          <div className="space-y-6">
            <h3 className="font-black text-slate-900 text-lg px-2 flex items-center gap-2">
              System Intelligence <Activity size={18} className="text-indigo-600" />
            </h3>
            
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`${alert.bg} p-6 rounded-[2.5rem] border ${alert.border} shadow-sm transition-all hover:shadow-md group`}>
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 text-sm">{alert.title}</h4>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-1">{alert.desc}</p>
                    <button 
                      onClick={() => navigate(alert.path)}
                      className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-all"
                    >
                      {alert.action} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Platform Health Monitor */}
            <div className="bg-[#0F172A] p-8 rounded-[3rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-black text-2xl tracking-tighter">99.98%</h4>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">API Uptime Ratio</p>
                  </div>
                  <Zap size={20} className="text-amber-400 animate-pulse" />
                </div>
                
                <div className="flex gap-1.5 h-8 items-end mb-4">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-emerald-500/20 rounded-full relative overflow-hidden"
                      style={{ height: `${Math.random() * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-emerald-400 animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] font-bold text-slate-500 italic">Global cluster: Northern Africa (Tunis)</p>
              </div>
              <Activity size={140} className="absolute -right-8 -bottom-8 text-white/[0.03] group-hover:text-white/[0.05] transition-all duration-1000" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;