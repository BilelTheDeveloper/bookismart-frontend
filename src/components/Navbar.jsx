import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid, Zap, Briefcase, LogIn, UserPlus, Sparkles,
  Menu, X, Bell, ChevronDown, LayoutDashboard, Settings,
  CreditCard, LogOut, User, Search, Shield, Star, Wallet,
  ExternalLink, Check
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

/* ─── Notification data (will be real when notification center is built) ─── */
const DEMO_NOTIFICATIONS = [
  { id: 1, type: "booking", title: "New booking received", body: "John Doe booked for tomorrow at 3:00 PM", time: "2m ago", read: false },
  { id: 2, type: "review", title: "New 5-star review", body: "A customer left you a great review!", time: "1h ago", read: false },
  { id: 3, type: "system", title: "Subscription renews soon", body: "Your plan renews in 7 days", time: "3h ago", read: true },
];

/* ─── Profile Dropdown ─── */
function ProfileDropdown({ user, onLogout, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ownerLinks = [
    { label: t("nav.dashboard"),    icon: <LayoutDashboard size={16} />, path: "/owner/dashboard" },
    { label: t("nav.appointments"), icon: <Zap size={16} />,             path: "/owner/dashboard/bookings" },
    { label: t("nav.financials"),   icon: <Wallet size={16} />,          path: "/owner/dashboard/finance" },
    { label: t("nav.settings"),     icon: <Settings size={16} />,        path: "/owner/dashboard/settings" },
    { label: t("nav.billing"),      icon: <CreditCard size={16} />,      path: "/owner/dashboard/billing" },
  ];

  const adminLinks = [
    { label: t("nav.adminPanel"),  icon: <Shield size={16} />,          path: "/admin/dashboard" },
    { label: t("nav.kycReview"),   icon: <User size={16} />,            path: "/admin/verify-identity" },
  ];

  const links = user?.role === "admin" ? adminLinks : ownerLinks;
  const initials = user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
  const dashPath = user?.role === "admin" ? "/admin/dashboard" : "/owner/dashboard";

  return (
    <div className="absolute right-0 top-full mt-3 w-72 origin-top-right z-50">
      {/* Arrow tip */}
      <div className="absolute -top-1.5 right-5 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45 z-10" />

      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 overflow-hidden">
        {/* User header */}
        <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-600">
          <div className="flex items-center gap-3">
            {user?.profilePicUrl ? (
              <img src={user.profilePicUrl} alt={user.fullName} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-black text-base ring-2 ring-white/20">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm truncate">{user?.fullName}</p>
              <p className="text-indigo-200 text-xs font-semibold truncate">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  {user?.role === "admin" ? t("nav.administrator") : t("nav.businessOwner")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="p-2">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
            >
              <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">{link.icon}</span>
              {link.label}
              <ChevronDown size={12} className="ml-auto rotate-[-90deg] text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Quick action */}
        <div className="px-4 pb-3">
          <Link
            to={dashPath}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
          >
            <LayoutDashboard size={15} />
            {t("nav.goToDashboard")}
          </Link>
        </div>

        <div className="border-t border-slate-100 p-2">
          <button
            onClick={() => { onClose(); onLogout(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut size={16} /> {t("nav.signOut")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Notification Dropdown ─── */
function NotificationDropdown({ onClose }) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const typeIcon = {
    booking: "📅",
    review: "⭐",
    system: "🔔",
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-80 origin-top-right z-50">
      <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45 z-10" />
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-slate-900 text-sm">{t("nav.notifications")}</h3>
            {unread > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{unread}</span>
            )}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
              <Check size={11} /> {t("nav.markAllRead")}
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">{t("nav.noNotifications")}</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? "bg-indigo-50/40" : ""}`}>
                <span className="text-xl flex-shrink-0 mt-0.5">{typeIcon[n.type] || "🔔"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs font-bold truncate ${!n.read ? "text-slate-900" : "text-slate-600"}`}>{n.title}</p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.body}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5" />}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100">
          <Link
            to="/owner/dashboard"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            {t("nav.viewAllDashboard")} <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ─── */
const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen]       = useState(false);
  const [isNotifOpen, setIsNotifOpen]           = useState(false);
  const profileRef = useRef(null);
  const notifRef   = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const unreadCount = DEMO_NOTIFICATIONS.filter(n => !n.read).length;
  const initials = user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";

  const navLinks = [
    { name: t("nav.services"),      href: "/services",      icon: <LayoutGrid size={17} /> },
    { name: t("nav.howItWorks"),    href: "/how-it-works",  icon: <Zap size={17} /> },
    { name: t("nav.professionals"), href: "/professionals", icon: <Star size={17} /> },
    { name: t("nav.findWork"),      href: "/find-work",     icon: <Briefcase size={17} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-[0_14px_40px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:px-5">

        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-lg shadow-indigo-200 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <span className="text-xl font-black italic text-white">B</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Book<span className="text-indigo-500">iify</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <span className={`transition-all duration-200 ${isActive ? "scale-105 text-indigo-500" : "opacity-70 group-hover:scale-105 group-hover:opacity-100"}`}>
                  {link.icon}
                </span>
                {link.name}
                <span className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-indigo-500 transition-transform duration-200 ${isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </div>

        {/* Right side: auth-aware */}
        <div className="flex items-center gap-2 sm:gap-3">

          {isAuthenticated && user ? (
            <>
              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                  className="relative p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isNotifOpen && (
                  <NotificationDropdown onClose={() => setIsNotifOpen(false)} />
                )}
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-7 w-px bg-slate-200" />

              {/* Profile button + dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                  className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-all hover:bg-slate-100 ${isProfileOpen ? "bg-slate-100" : ""}`}
                >
                  {user.profilePicUrl ? (
                    <img src={user.profilePicUrl} alt={user.fullName} className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-200">
                      {initials}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-black text-slate-900 leading-none">{user.fullName?.split(" ")[0]}</p>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mt-0.5">{user.role}</p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`hidden sm:block text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isProfileOpen && (
                  <ProfileDropdown
                    user={user}
                    onLogout={logoutUser}
                    onClose={() => setIsProfileOpen(false)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <span className="hidden rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 xl:inline-flex items-center gap-1.5">
                <Sparkles size={13} /> {t("nav.aiPowered")}
              </span>
              <LanguageSwitcher />
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 sm:flex"
              >
                <LogIn size={17} /> {t("nav.login")}
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 px-3.5 py-2.5 text-sm font-black text-slate-900 shadow-md shadow-cyan-100 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-200 active:scale-95 sm:px-5"
              >
                <UserPlus size={16} />
                <span className="hidden sm:inline">{t("nav.joinAsOwner")}</span>
                <span className="sm:hidden">{t("nav.joinShort")}</span>
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            className="rounded-xl p-2 text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full w-full px-4 pt-2 lg:hidden transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-xl">
          {/* Nav links */}
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                {link.icon}
              </div>
              {link.name}
            </Link>
          ))}

          <hr className="border-slate-100 my-1" />

          {isAuthenticated && user ? (
            <>
              {/* Mobile user card */}
              <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
                {user.profilePicUrl ? (
                  <img src={user.profilePicUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-sm">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-black text-slate-900">{user.fullName}</p>
                  <p className="text-xs text-indigo-600 font-semibold capitalize">{user.role}</p>
                </div>
              </div>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/owner/dashboard"}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-bold text-white text-sm hover:bg-indigo-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} /> {t("nav.goToDashboard")}
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); logoutUser(); }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-bold text-rose-500 text-sm hover:bg-rose-50 transition-colors"
              >
                <LogOut size={18} /> {t("nav.signOut")}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex justify-center pb-1">
                <LanguageSwitcher />
              </div>
              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3.5 font-bold text-slate-900 hover:bg-slate-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn size={20} /> {t("nav.login")}
              </Link>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-[1.01]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserPlus size={20} /> {t("nav.joinAsOwner")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
