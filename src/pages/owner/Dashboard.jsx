import React from "react";
import { logout } from "../../services/authService";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  TrendingUp,
  Clock
} from "lucide-react";

const OwnerDashboard = () => {
  // Static stats for testing the UI layout
  const stats = [
    { label: "Total Bookings", value: "128", icon: Calendar, color: "bg-indigo-500" },
    { label: "New Clients", value: "24", icon: Users, color: "bg-emerald-500" },
    { label: "Revenue", value: "2,450 TND", icon: TrendingUp, color: "bg-amber-500" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-8 flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-slate-900 tracking-tighter text-xl">BOOKIIFY</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={LayoutDashboard} label="Overview" active />
          <NavItem icon={Calendar} label="Appointments" />
          <NavItem icon={Users} label="Customers" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 font-bold text-sm hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="w-full bg-slate-50 border-none rounded-xl pl-10 py-2 text-sm focus:ring-2 focus:ring-indigo-600/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
               {/* User Profile Pic would go here */}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
          <header>
            <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 font-medium">Welcome back to your business control center.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Table (Placeholder) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Recent Appointments</h3>
              <button className="text-indigo-600 font-black text-xs hover:underline">VIEW ALL</button>
            </div>
            <div className="p-8 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium">No appointments scheduled for today.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for Sidebar Items
const NavItem = ({ icon: Icon, label, active = false }) => (
  <button className={`flex items-center gap-3 px-4 py-3 w-full font-bold text-sm rounded-2xl transition-all ${
    active ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
  }`}>
    <Icon className="w-5 h-5" /> {label}
  </button>
);

export default OwnerDashboard;