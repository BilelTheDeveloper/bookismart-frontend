import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarDays, Users, BarChart2, MessageSquare, FileText,
  Gift, Briefcase, UserPlus, TrendingUp, Home,
  LogOut, ChevronRight, Menu, X, User, Loader2,
} from "lucide-react";
import { useStaffAuth } from "../../../context/StaffAuthContext";

const PAGE_META = {
  bookings:    { label: "Bookings",    icon: CalendarDays, path: "bookings",    color: "text-blue-400" },
  customers:   { label: "Customers",   icon: Users,        path: "customers",   color: "text-purple-400" },
  finance:     { label: "Finance",     icon: BarChart2,    path: "finance",     color: "text-emerald-400" },
  chat:        { label: "Chat",        icon: MessageSquare,path: "chat",        color: "text-sky-400" },
  invoices:    { label: "Invoices",    icon: FileText,     path: "invoices",    color: "text-amber-400" },
  loyalty:     { label: "Loyalty",     icon: Gift,         path: "loyalty",     color: "text-pink-400" },
  work_mode:   { label: "Work Mode",   icon: Briefcase,    path: "work-mode",   color: "text-orange-400" },
  recruitment: { label: "Recruitment", icon: UserPlus,     path: "recruitment", color: "text-teal-400" },
  analytics:   { label: "Analytics",   icon: TrendingUp,   path: "analytics",   color: "text-violet-400" },
};

const StaffLayout = () => {
  const { staff, loading, isAuthenticated, logoutStaff } = useStaffAuth();
  const navigate = useNavigate();

  // All hooks must be called unconditionally — before any early returns
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/staff/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <Loader2 size={32} className="animate-spin text-violet-400" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const allowedKeys = (staff?.allowedPages || []).map(p => p.pageKey);
  const navItems    = allowedKeys.map(k => PAGE_META[k]).filter(Boolean);

  const initials = staff?.fullName
    ?.split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  const SidebarContent = ({ mobile = false }) => (
    <aside className={`
      ${mobile ? "fixed inset-y-0 left-0 z-50 w-72 flex flex-col" : "relative flex flex-col"}
      ${!mobile && collapsed ? "w-20" : !mobile ? "w-64" : ""}
      bg-slate-900 border-r border-slate-800 h-screen transition-all duration-300
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-800">
        {(!collapsed || mobile) && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase size={14} className="text-violet-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm tracking-tight truncate">Staff Portal</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Bookiify</p>
            </div>
          </div>
        )}
        {collapsed && !mobile && (
          <div className="w-8 h-8 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center mx-auto">
            <Briefcase size={14} className="text-violet-400" />
          </div>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            className="text-slate-500 hover:text-white transition-colors shrink-0 ml-auto"
          >
            <ChevronRight size={16} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        )}
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Dashboard link */}
      <div className="px-3 pt-4">
        <NavLink
          to="/staff/portal"
          end
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm
            ${isActive ? "bg-violet-600/20 text-violet-300 border border-violet-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}
          `}
        >
          <Home size={16} className="shrink-0" />
          {(!collapsed || mobile) && <span>Dashboard</span>}
        </NavLink>
      </div>

      {/* Nav items */}
      {navItems.length > 0 && (
        <div className="px-3 pt-2">
          {(!collapsed || mobile) && (
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-3 mb-2">
              My Access
            </p>
          )}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={`/staff/portal/${item.path}`}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm
                    ${isActive ? `bg-slate-800 ${item.color} border border-slate-700` : "text-slate-400 hover:text-white hover:bg-slate-800"}
                  `}
                >
                  <Icon size={16} className="shrink-0" />
                  {(!collapsed || mobile) && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}

      {navItems.length === 0 && (!collapsed || mobile) && (
        <div className="mx-3 mt-2 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <p className="text-slate-500 text-xs text-center">No pages assigned yet. Contact your manager.</p>
        </div>
      )}

      {/* Profile footer */}
      <div className="mt-auto p-4 border-t border-slate-800">
        <div className={`flex items-center ${collapsed && !mobile ? "justify-center" : "gap-3"}`}>
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
            {staff?.profilePic
              ? <img src={staff.profilePic} alt="" className="w-full h-full object-cover" />
              : <span className="text-violet-300 text-xs font-black">{initials}</span>
            }
          </div>
          {(!collapsed || mobile) && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-black truncate">{staff?.fullName}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold capitalize">{staff?.role}</p>
            </div>
          )}
          {(!collapsed || mobile) && (
            <button
              onClick={logoutStaff}
              className="text-slate-500 hover:text-rose-400 transition-colors shrink-0"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
        {collapsed && !mobile && (
          <button
            onClick={logoutStaff}
            className="w-full mt-3 flex items-center justify-center text-slate-500 hover:text-rose-400 transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden">
          <SidebarContent mobile />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <p className="text-white font-black text-sm">Staff Portal</p>
          <button
            onClick={() => navigate("/staff/portal")}
            className="w-8 h-8 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center"
          >
            <User size={14} className="text-violet-400" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
