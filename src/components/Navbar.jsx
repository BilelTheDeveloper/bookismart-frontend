import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid, Zap, Briefcase, LogIn, UserPlus, Sparkles,
  X, Bell, ChevronDown, LayoutDashboard, Settings,
  CreditCard, LogOut, User, Shield, Star, Wallet,
  ExternalLink, Check, Menu, ArrowRight,
  CalendarCheck, ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

/* ─────────────────────────────────────────────────────────────────────────────
   DEMO NOTIFICATIONS — text resolved via i18n (navbar.n*)
   ───────────────────────────────────────────────────────────────────────────── */
const DEMO_NOTIFICATIONS = [
  { id: 1, icon: "📅", titleKey: "navbar.n1Title", bodyKey: "navbar.n1Body", time: "2m", read: false },
  { id: 2, icon: "⭐", titleKey: "navbar.n2Title", bodyKey: "navbar.n2Body", time: "1h", read: false },
  { id: 3, icon: "🔔", titleKey: "navbar.n3Title", bodyKey: "navbar.n3Body", time: "3h", read: true  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NAV LINKS — labels/descriptions via i18n
   ───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { key: "services",      href: "/services",      icon: LayoutGrid, descKey: "navbar.descServices" },
  { key: "howItWorks",    href: "/how-it-works",  icon: Zap,        descKey: "navbar.descHowItWorks" },
  { key: "professionals", href: "/professionals", icon: Star,       descKey: "navbar.descProfessionals" },
  { key: "findWork",      href: "/find-work",     icon: Briefcase,  descKey: "navbar.descFindWork" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NOTIFICATION DROPDOWN
   ───────────────────────────────────────────────────────────────────────────── */
function NotificationDropdown({ onClose }) {
  const { t } = useTranslation();
  const [notifs, setNotifs] = useState(DEMO_NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;
  const markAll = () => setNotifs(p => p.map(n => ({ ...n, read: true })));

  return (
    <div className="absolute right-0 top-full mt-4 w-[340px] sm:w-[380px] z-50 origin-top-right">
      <div className="absolute -top-2 right-5 w-4 h-4 rotate-45 bg-white border-l border-t border-slate-100 z-10" />
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-900/10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
          <div className="flex items-center gap-2.5">
            <Bell size={16} className="text-slate-600" />
            <span className="font-black text-slate-900 text-sm">{t("nav.notifications")}</span>
            {unread > 0 && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center leading-tight">
                {unread}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={markAll}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors">
                <Check size={11} /> {t("nav.markAllRead")}
              </button>
            )}
            <button onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-y-auto max-h-[280px]" style={{ scrollbarWidth: "none" }}>
          {notifs.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm font-medium">
              {t("navbar.caughtUp")}
            </div>
          ) : notifs.map(n => (
            <div key={n.id}
              className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer ${!n.read ? "bg-indigo-50/40" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${!n.read ? "bg-indigo-100" : "bg-slate-100"}`}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[13px] font-bold leading-tight ${!n.read ? "text-slate-900" : "text-slate-600"}`}>{t(n.titleKey)}</p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{t(n.bodyKey)}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-50 bg-slate-50/50">
          <Link to="/owner/dashboard" onClick={onClose}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-500 py-1 transition-colors">
            {t("nav.viewAllDashboard")} <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROFILE DROPDOWN
   ───────────────────────────────────────────────────────────────────────────── */
function ProfileDropdown({ user, onLogout, onClose }) {
  const { t } = useTranslation();
  const ownerLinks = [
    { label: t("nav.dashboard"),    icon: LayoutDashboard, path: "/owner/dashboard",          desc: t("navbar.descDashboard") },
    { label: t("nav.appointments"), icon: CalendarCheck,   path: "/owner/dashboard/bookings", desc: t("navbar.descAppointments") },
    { label: t("nav.financials"),   icon: Wallet,          path: "/owner/dashboard/finance",  desc: t("navbar.descFinancials") },
    { label: t("nav.settings"),     icon: Settings,        path: "/owner/dashboard/settings", desc: t("navbar.descSettings") },
    { label: t("nav.billing"),      icon: CreditCard,      path: "/owner/dashboard/billing",  desc: t("navbar.descSubscription") },
  ];
  const adminLinks = [
    { label: t("nav.adminPanel"), icon: Shield, path: "/admin/dashboard",       desc: t("navbar.descAdminPanel") },
    { label: t("nav.kycReview"),  icon: User,  path: "/admin/verify-identity",  desc: t("navbar.descKyc") },
  ];

  const links = user?.role === "admin" ? adminLinks : ownerLinks;
  const initials = user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
  const dashPath = user?.role === "admin" ? "/admin/dashboard" : "/owner/dashboard";

  return (
    <div className="absolute right-0 top-full mt-4 w-[300px] z-50 origin-top-right">
      <div className="absolute -top-2 right-5 w-4 h-4 rotate-45 bg-[#4f46e5] z-10" />
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-900/10 overflow-hidden">

        {/* Header */}
        <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
          <div className="flex items-center gap-3.5 relative">
            {user?.profilePicUrl ? (
              <img src={user.profilePicUrl} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30 flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-base ring-2 ring-white/20 flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm leading-tight truncate">{user?.fullName}</p>
              <p className="text-indigo-200 text-[11px] font-medium truncate mt-0.5">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  {user?.role === "admin" ? t("nav.administrator") : t("nav.businessOwner")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Go to dashboard CTA */}
        <div className="px-3 pt-3">
          <Link to={dashPath} onClick={onClose}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all group">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={15} />
              {t("nav.goToDashboard")}
            </div>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Links */}
        <div className="p-2 mt-1">
          {links.map(link => {
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path} onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group hover:bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all flex-shrink-0">
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-xs leading-tight">{link.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{link.desc}</p>
                </div>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Sign out */}
        <div className="p-3 border-t border-slate-50 mt-1">
          <button onClick={() => { onClose(); onLogout(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all">
            <LogOut size={15} /> {t("nav.signOut")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN NAVBAR
   ───────────────────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const location = useLocation();

  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [announcement, setAnnouncement] = useState(
    () => localStorage.getItem("bk_ann_dismissed") !== "1"
  );
  const [activeHover,  setActiveHover]  = useState(null);

  const profileRef = useRef(null);
  const notifRef   = useRef(null);

  const unreadCount = DEMO_NOTIFICATIONS.filter(n => !n.read).length;
  const initials    = user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";

  const whyItems = [
    { icon: "🚀", label: t("navbar.whyTrial"),     sub: t("navbar.whyTrialSub") },
    { icon: "📅", label: t("navbar.whyBooking"),   sub: t("navbar.whyBookingSub") },
    { icon: "🤖", label: t("navbar.whyAi"),        sub: t("navbar.whyAiSub") },
    { icon: "📊", label: t("navbar.whyAnalytics"), sub: t("navbar.whyAnalyticsSub") },
    { icon: "🔒", label: t("navbar.whySecurity"),  sub: t("navbar.whySecuritySub") },
    { icon: "👥", label: t("navbar.whyStaff"),     sub: t("navbar.whyStaffSub") },
  ];

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const dismissAnnouncement = () => {
    setAnnouncement(false);
    localStorage.setItem("bk_ann_dismissed", "1");
  };

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          ANNOUNCEMENT BAR
      ═══════════════════════════════════════════════════════ */}
      {announcement && (
        <div
          className="relative z-[110] flex items-center justify-center gap-3 px-4 py-2.5 text-center text-xs font-bold text-white"
          style={{ background: "linear-gradient(90deg,#4f46e5 0%,#7c3aed 50%,#0ea5e9 100%)" }}
        >
          <Sparkles size={13} className="flex-shrink-0 opacity-80" />
          <span className="leading-relaxed">
            {t("navbar.announcement")}{" "}
            <Link to="/signup" className="underline font-black hover:no-underline whitespace-nowrap">
              {t("navbar.announcementCta")}
            </Link>
          </span>
          <button
            onClick={dismissAnnouncement}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className={`dark sticky top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "py-2 bg-slate-950/95 shadow-lg shadow-black/40 border-b border-white/10"
            : "py-3 bg-slate-950/70"
        } backdrop-blur-2xl`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">
          <div className={`flex items-center justify-between gap-4 transition-all duration-300 rounded-2xl ${
            scrolled
              ? "bg-transparent px-0"
              : "bg-white/5 border border-white/10 px-4 sm:px-6 py-2 shadow-sm shadow-black/20"
          }`}>

            {/* ── BRAND ── */}
            <Link to="/" className="group flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200/60 transition-all duration-300 group-hover:shadow-indigo-300/80 group-hover:scale-105 group-hover:-rotate-3">
                  <span className="text-xl font-black italic text-white select-none">B</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div className="leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  Book<span className="text-indigo-400">iify</span>
                </span>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 mt-0.5 hidden sm:block">
                  {t("navbar.tagline")}
                </p>
              </div>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
              {NAV_LINKS.map(link => {
                const Icon = link.icon;
                const active = isActive(link.href);
                const name = t(`nav.${link.key}`);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onMouseEnter={() => setActiveHover(link.href)}
                    onMouseLeave={() => setActiveHover(null)}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "text-indigo-300 bg-indigo-500/15"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={15} className={`flex-shrink-0 transition-all duration-200 ${
                      active ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-300"
                    }`} />
                    <span className="whitespace-nowrap">{name}</span>
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-500 rounded-full" />
                    )}
                    {/* Hover tooltip */}
                    {activeHover === link.href && !active && (
                      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg whitespace-nowrap pointer-events-none opacity-90 shadow-lg z-50">
                        {t(link.descKey)}
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

              {isAuthenticated && user ? (
                /* ─── AUTHENTICATED ─── */
                <>
                  {/* Theme toggle */}
                  <ThemeToggle className="hidden sm:inline-flex" />

                  {/* Language switcher */}
                  <div className="hidden md:block">
                    <LanguageSwitcher />
                  </div>

                  {/* Notification bell */}
                  <div className="relative" ref={notifRef}>
                    <button
                      onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); }}
                      className={`relative p-2.5 rounded-xl transition-all ${
                        notifOpen ? "bg-indigo-500/15 text-indigo-300" : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                      aria-label={t("nav.notifications")}
                    >
                      <Bell size={19} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-[18px] h-[18px] bg-rose-500 border-2 border-white text-white text-[9px] font-black rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
                  </div>

                  <div className="w-px h-7 bg-white/15" />

                  {/* Profile */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl transition-all ${
                        profileOpen ? "bg-white/10" : "hover:bg-white/10"
                      }`}
                    >
                      <div className="relative">
                        {user.profilePicUrl ? (
                          <img src={user.profilePicUrl} alt="" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-2 ring-indigo-100" />
                        ) : (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow shadow-indigo-200">
                            {initials}
                          </div>
                        )}
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-xs font-black text-white leading-none">{user.fullName?.split(" ")[0]}</p>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">{user.role}</p>
                      </div>
                      <ChevronDown size={13} className={`hidden sm:block text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                    </button>
                    {profileOpen && (
                      <ProfileDropdown user={user} onLogout={logoutUser} onClose={() => setProfileOpen(false)} />
                    )}
                  </div>
                </>
              ) : (
                /* ─── GUEST ─── */
                <>
                  {/* AI badge */}
                  <span className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 text-xs font-bold text-indigo-300 flex-shrink-0 whitespace-nowrap">
                    <Sparkles size={12} className="text-indigo-400" />
                    {t("navbar.aiPlatform")}
                  </span>

                  {/* Theme toggle */}
                  <ThemeToggle />

                  {/* Language switcher */}
                  <div className="hidden md:block">
                    <LanguageSwitcher />
                  </div>

                  <div className="hidden sm:block w-px h-6 bg-white/15" />

                  {/* Login */}
                  <Link
                    to="/login"
                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <LogIn size={15} />
                    {t("nav.login")}
                  </Link>

                  {/* Signup CTA */}
                  <Link
                    to="/signup"
                    className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-black text-sm text-white shadow-lg shadow-indigo-400/30 transition-all hover:shadow-indigo-400/50 hover:scale-[1.03] active:scale-95 overflow-hidden"
                    style={{ background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#0ea5e9 100%)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    <UserPlus size={15} className="flex-shrink-0" />
                    <span className="hidden sm:inline whitespace-nowrap">{t("navbar.startFree")}</span>
                    <span className="sm:hidden">{t("navbar.joinFree")}</span>
                  </Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-slate-200 hover:bg-white/10 transition-all ml-1"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[150] bg-slate-900/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        className={`dark fixed top-0 right-0 h-full w-[min(88vw,360px)] z-[160] bg-slate-950 shadow-2xl shadow-black/50 flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-900/40">
              <span className="text-lg font-black italic text-white">B</span>
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              Book<span className="text-indigo-400">iify</span>
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1" style={{ scrollbarWidth: "none" }}>

          {/* Nav links */}
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-400 px-3 mb-3">{t("navbar.explore")}</p>
          {NAV_LINKS.map(link => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all ${
                  active ? "bg-indigo-500/15 text-indigo-300" : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  active ? "bg-indigo-500/20 text-indigo-300" : "bg-white/10 text-slate-400"
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">{t(`nav.${link.key}`)}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{t(link.descKey)}</p>
                </div>
                {active && <ChevronRight size={14} className="ml-auto text-indigo-400" />}
              </Link>
            );
          })}

          <div className="h-px bg-white/10 my-4" />

          {isAuthenticated && user ? (
            <div className="space-y-2">
              {/* User card */}
              <div className="rounded-2xl overflow-hidden border border-slate-100">
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center gap-3">
                  {user.profilePicUrl ? (
                    <img src={user.profilePicUrl} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-lg">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-black text-sm">{user.fullName}</p>
                    <p className="text-indigo-200 text-[11px] font-medium">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-300 text-[10px] font-black uppercase">
                        {user.role === "admin" ? t("nav.administrator") : t("nav.businessOwner")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/owner/dashboard"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all group"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={17} /> {t("nav.goToDashboard")}
                </div>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <div className="flex items-center justify-center gap-3 py-1">
                <LanguageSwitcher />
                <ThemeToggle variant="pill" />
              </div>
              <button
                onClick={() => { setMobileOpen(false); logoutUser(); }}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-rose-50 text-rose-500 font-bold text-sm hover:bg-rose-100 transition-colors"
              >
                <LogOut size={16} /> {t("nav.signOut")}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 py-2">
                <LanguageSwitcher />
                <ThemeToggle variant="pill" />
              </div>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-colors"
              >
                <LogIn size={18} /> {t("navbar.loginAccount")}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-white font-black text-sm shadow-lg shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-95"
                style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
              >
                <UserPlus size={18} /> {t("navbar.createAccount")}
              </Link>

              {/* Why Bookiify */}
              <div className="pt-2">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-400 px-1 mb-3">{t("navbar.whyBookiify")}</p>
                {whyItems.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{f.label}</p>
                      <p className="text-[10px] text-slate-400">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-white/10 bg-white/5">
          <p className="text-[10px] text-slate-400 font-medium text-center">
            © {new Date().getFullYear()} Bookiify — {t("navbar.footerTagline")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
