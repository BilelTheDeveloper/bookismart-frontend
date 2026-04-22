import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Palette,
  Briefcase,
  Power
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  // Optimized Menu Items for Comprehensive Business Management
  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={22} />, path: "/owner/dashboard" },
    { name: "Appointments", icon: <CalendarCheck size={22} />, path: "/owner/dashboard/bookings" },
    { name: "Customers", icon: <Users size={22} />, path: "/owner/dashboard/customers" },
    { name: "Financials", icon: <Wallet size={22} />, path: "/owner/dashboard/finance" },
    { name: "Analytics", icon: <BarChart3 size={22} />, path: "/owner/dashboard/stats" },
    { name: "Website Themes", icon: <Palette size={22} />, path: "/owner/dashboard/themes" },
    { name: "Subscription", icon: <CreditCard size={22} />, path: "/owner/dashboard/billing" },
    { name: "Settings", icon: <Settings size={22} />, path: "/owner/dashboard/settings" },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0F172A] text-slate-400 flex flex-col transition-all duration-300 z-50 border-r border-slate-800 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* --- Toggle Button --- */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-[#0F172A] hover:bg-indigo-500 transition-all shadow-lg z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Logo Area */}
      <div className={`p-6 mb-2 flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center" : ""}`}>
        <div className="min-w-[32px] h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-900/20">
          B
        </div>
        {!isCollapsed && (
          <span className="text-xl font-black text-white tracking-tighter whitespace-nowrap animate-in fade-in duration-500">
            BOOKIIFY
          </span>
        )}
      </div>

      {/* --- PREMIUM FEATURE: WORK MODE BUTTON --- */}
      <div className={`px-4 mb-4 ${isCollapsed ? "flex justify-center" : ""}`}>
        <button className={`flex items-center gap-3 transition-all duration-300 group ${
          isCollapsed 
          ? "w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl justify-center hover:bg-emerald-500 hover:text-white" 
          : "w-full px-4 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-900/40 hover:bg-indigo-500"
        }`}>
          <Power size={18} className={isCollapsed ? "" : "animate-pulse"} />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">SET WORK MODE</span>}
          
          {/* Tooltip for collapsed mode */}
          {isCollapsed && (
            <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-[10px] font-black py-1 px-3 rounded-md uppercase tracking-wider whitespace-nowrap pointer-events-none">
              Work Mode
            </div>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
            Management
          </p>
        )}
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all font-bold group relative ${
                isActive 
                  ? "bg-slate-800 text-white shadow-inner" 
                  : "hover:bg-slate-800/50 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />
              )}

              <div className={`${isActive ? "text-indigo-400" : "group-hover:text-indigo-400"} transition-colors`}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <span className="text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.name}
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-xs py-2 px-3 rounded-lg border border-slate-700 whitespace-nowrap pointer-events-none z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-800/50">
        <button className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl text-rose-400 font-bold hover:bg-rose-500/10 transition-all ${isCollapsed ? "justify-center" : ""}`}>
          <LogOut size={22} />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;