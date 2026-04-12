import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; 
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Wallet, 
  Settings, 
  Sparkles, 
  History, 
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Globe,
  Menu, // Added for Mobile
  X     // Added for Mobile
} from "lucide-react";

const OwnerSidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { theme } = useTheme(); 
  
  // 🔘 States for both Collapsed (Desktop) and Open (Mobile)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const BrandIcon = theme.icon;

  const menuItems = [
    { 
      group: "Business Control",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, path: "/merchant" },
        { name: "Live Bookings", icon: Calendar, path: "/merchant/bookings" },
        { name: "Client Aperçu", icon: Users, path: "/merchant/clients" },
        { name: "Web Templates", icon: Globe, path: "/merchant/templates" },
      ]
    },
    { 
      group: "Finance & Growth",
      items: [
        { name: "Billing & Flouci", icon: Wallet, path: "/merchant/billing" },
        { name: "AI Advisor", icon: Sparkles, path: "/merchant/advisor" },
        { name: "Activity History", icon: History, path: "/merchant/history" },
      ]
    },
    { 
      group: "System",
      items: [
        { name: "Shop Settings", icon: Settings, path: "/merchant/settings" },
        { name: "Support Hub", icon: HelpCircle, path: "/merchant/support" },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* 📱 Mobile Toggle - Only visible on small screens */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-5 left-4 z-[60] p-2 bg-white border border-slate-100 rounded-xl shadow-lg text-slate-600"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 🌫️ Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:sticky top-0 z-50 h-screen bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-24" : "w-80"}
        `}
      >
        {/* 🛠️ Desktop Toggle Button (Floating) - Hidden on Mobile */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-white border border-slate-100 rounded-full items-center justify-center shadow-md hover:scale-110 transition-all z-50 text-slate-400 hover:text-slate-900`}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* 🏷️ Brand Logo */}
        <div className={`p-8 pb-10 flex items-center justify-center ${(!isCollapsed || isMobileOpen) && "lg:justify-start"}`}>
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 ${theme.accent} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 shrink-0`} 
              style={{ boxShadow: `0 10px 15px -3px ${theme.color}33` }}
            >
              <BrandIcon className="text-white" size={20} />
            </div>
            
            {(!isCollapsed || isMobileOpen) && (
              <span className="text-xl font-black text-slate-900 tracking-tighter animate-in fade-in slide-in-from-left-2 duration-500 lg:block">
                {theme.title.replace('Smart', '')}<span className={theme.textAccent}>smart</span>
              </span>
            )}
          </div>
        </div>

        {/* 🧭 Navigation Menu */}
        <div className="flex-1 px-4 overflow-y-auto space-y-8 scrollbar-hide">
          {menuItems.map((group, idx) => (
            <div key={idx}>
              {(!isCollapsed || isMobileOpen) && (
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 animate-in fade-in duration-500 lg:block">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = path === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)} // Close on mobile navigation
                      className={`flex items-center ${(isCollapsed && !isMobileOpen) ? "justify-center" : "justify-between"} px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? `${theme.lightAccent} ${theme.textAccent}` 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon 
                          size={20} 
                          className={isActive ? theme.textAccent : "text-slate-400 group-hover:text-slate-900 transition-colors"} 
                        />
                        {(!isCollapsed || isMobileOpen) && (
                          <span className="text-sm font-bold tracking-tight animate-in fade-in slide-in-from-left-2 lg:block">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {isActive && (!isCollapsed || isMobileOpen) && (
                        <ChevronRight size={14} className="hidden lg:block animate-in slide-in-from-left-2 duration-300" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 💡 AI Advisor Quick Tip Box (Hidden when collapsed on desktop) */}
        {(!isCollapsed || isMobileOpen) && (
          <div 
            className="mx-6 my-6 p-5 rounded-[2rem] relative overflow-hidden group shadow-xl transition-all duration-500 animate-in fade-in zoom-in lg:block" 
            style={{ background: `linear-gradient(135deg, ${theme.color}, #1e293b)`, boxShadow: `0 20px 25px -5px ${theme.color}22` }}
          >
            <div className="relative z-10">
              <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Weekly Tip</p>
              <p className="text-white text-xs font-bold leading-relaxed mb-3">
                Saturdays are peak. Early Bird discount?
              </p>
              <Link to="/merchant/advisor" className="text-[10px] font-black text-white bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all uppercase tracking-tighter">
                Ask Advisor
              </Link>
            </div>
            <span className="absolute bottom-[-10px] right-[-10px] opacity-10">
                <Sparkles className="text-white w-20 h-20" />
            </span>
          </div>
        )}

        {/* 🚪 Logout Button */}
        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center ${(isCollapsed && !isMobileOpen) ? "justify-center" : "gap-3 px-4"} py-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-black text-sm uppercase tracking-widest`}
          >
            <LogOut size={18} />
            {(!isCollapsed || isMobileOpen) && <span>Exit Hub</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default OwnerSidebar;