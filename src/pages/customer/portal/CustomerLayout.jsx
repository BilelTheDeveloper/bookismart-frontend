import React, { useState } from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import {
  User, Calendar, FileText, Gift, BookOpen,
  LogOut, Menu, X, ChevronRight, Loader2
} from "lucide-react";
import { useCustomerAuth } from "../../../context/CustomerAuthContext";

const ALL_PAGES = [
  { key: "profile",      label: "My Profile",      icon: User,      path: "profile",      always: true },
  { key: "appointments", label: "Appointments",     icon: Calendar,  path: "appointments" },
  { key: "invoices",     label: "Invoices",         icon: FileText,  path: "invoices" },
  { key: "loyalty",      label: "Loyalty Points",   icon: Gift,      path: "loyalty" },
  { key: "booking",      label: "Book a Service",   icon: BookOpen,  path: "booking" },
];

const CustomerLayout = () => {
  const { customer, loading, isAuthenticated, logoutCustomer } = useCustomerAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  if (loading) return (
    <div className="h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-indigo-500" />
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/customer/login" replace />;

  const allowedKeys = new Set([
    "profile",
    ...(customer?.allowedPages?.map(p => p.pageKey) || []),
  ]);

  const navItems = ALL_PAGES.filter(p => p.always || allowedKeys.has(p.key));

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutCustomer();
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-6 py-8 border-b border-slate-800">
        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Client Portal</p>
        <h1 className="text-white font-black text-xl leading-tight">
          {customer?.businessName || "Bookiify"}
        </h1>
      </div>

      {/* Customer identity */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {customer?.profilePicture ? (
            <img src={customer.profilePicture} alt="avatar" className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/40" />
          ) : (
            <div className="w-11 h-11 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 font-black text-sm">
              {customer?.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-white font-black text-sm truncate">{customer?.fullName}</p>
            <p className="text-slate-500 text-xs truncate">{customer?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.key}
              to={`/customer/portal/${item.path}`}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300 transition-colors"} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="opacity-60" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 border-t border-slate-800 pt-4">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold text-sm transition-all"
        >
          {loggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-72 bg-slate-900 border-r border-slate-800 z-10">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-4 bg-slate-900 border-b border-slate-800">
          <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white">
            <Menu size={22} />
          </button>
          <span className="text-white font-black text-sm">{customer?.businessName}</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
