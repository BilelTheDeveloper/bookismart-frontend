import React, { useState, useRef, useEffect, useCallback } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar, { getAccessState, getTrialDaysLeft } from "./Sidebar";
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import API from "../../api/config";
import CommandPalette from "../../components/CommandPalette";
import NotificationToast from "../../components/NotificationToast";
import {
  Search, Bell, ChevronDown, Settings as SettingsIcon,
  LogOut, Globe, X, CheckCheck, Trash2, BookOpen, Star,
  ShieldCheck, Zap, MessageSquare, Users, AlertCircle, CreditCard,
  FileText, CheckCircle2, XCircle, Loader2, Command, BadgeCheck,
  Moon, Sun, HelpCircle, ChevronRight, MenuIcon,
} from "lucide-react";

/* ── Notification type meta ── */
const NOTIF_META = {
  booking:     { icon: BookOpen,      color: "text-indigo-400",  bg: "bg-indigo-500/10",  label: "Booking"     },
  application: { icon: Users,         color: "text-violet-400",  bg: "bg-violet-500/10",  label: "Application" },
  review:      { icon: Star,          color: "text-amber-400",   bg: "bg-amber-500/10",   label: "Review"      },
  payment:     { icon: CreditCard,    color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Payment"     },
  chat:        { icon: MessageSquare, color: "text-sky-400",     bg: "bg-sky-500/10",     label: "Chat"        },
  staff:       { icon: Users,         color: "text-teal-400",    bg: "bg-teal-500/10",    label: "Staff"       },
  system:      { icon: ShieldCheck,   color: "text-slate-400",   bg: "bg-slate-500/10",   label: "System"      },
  customer:    { icon: Users,         color: "text-rose-400",    bg: "bg-rose-500/10",    label: "Customer"    },
  default:     { icon: AlertCircle,   color: "text-slate-400",   bg: "bg-slate-500/10",   label: "Info"        },
};

const FILTER_TABS = [
  { key: "all",         label: "All"         },
  { key: "booking",     label: "Bookings"    },
  { key: "payment",     label: "Payments"    },
  { key: "staff",       label: "Staff"       },
  { key: "system",      label: "System"      },
];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ── Quick action button (confirm / cancel booking from notification) ── */
function QuickActionBtn({ label, color, loading, onClick, icon: Icon }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      disabled={loading}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all disabled:opacity-40 ${color}`}
    >
      {loading ? <Loader2 size={10} className="animate-spin" /> : <Icon size={10} />}
      {label}
    </button>
  );
}

/* ── Single notification item ── */
function NotifItem({ notif, onMarkRead, onDelete, onQuickAction }) {
  const meta = NOTIF_META[notif.type] || NOTIF_META.default;
  const Icon = meta.icon;
  const [actionLoading, setActionLoading] = useState(null);

  const runQuickAction = async (action) => {
    setActionLoading(action);
    try { await onQuickAction(notif, action); }
    finally { setActionLoading(null); }
  };

  const hasBookingAction = notif.type === "booking" && notif.meta?.bookingId &&
    ["pending", "confirmed"].includes(notif.meta?.bookingStatus);

  return (
    <div
      className={`group flex gap-3 px-4 py-3.5 border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors cursor-pointer ${
        !notif.read ? "bg-indigo-500/5" : ""
      }`}
      onClick={() => { if (!notif.read) onMarkRead(notif._id); }}
    >
      {/* Icon */}
      <div className={`w-9 h-9 rounded-xl ${meta.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={15} className={meta.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1.5">
          <p className={`text-[13px] font-bold leading-tight ${!notif.read ? "text-white" : "text-slate-300"}`}>
            {notif.title}
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />}
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(notif._id); }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-rose-500/20 text-slate-600 hover:text-rose-400 transition-all"
            >
              <Trash2 size={11} />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{notif.body}</p>

        {/* Quick actions for booking notifications */}
        {hasBookingAction && (
          <div className="flex gap-1.5 mt-2">
            {notif.meta.bookingStatus === "pending" && (
              <QuickActionBtn
                label="Confirm"
                icon={CheckCircle2}
                color="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                loading={actionLoading === "confirmed"}
                onClick={() => runQuickAction("confirmed")}
              />
            )}
            <QuickActionBtn
              label="Cancel"
              icon={XCircle}
              color="bg-rose-500/15 text-rose-400 hover:bg-rose-500 hover:text-white"
              loading={actionLoading === "cancelled"}
              onClick={() => runQuickAction("cancelled")}
            />
          </div>
        )}

        <p className="text-[10px] text-slate-600 font-bold mt-1.5">{timeAgo(notif.createdAt)}</p>
      </div>
    </div>
  );
}

/* ── Full Notification Dropdown ── */
function NotificationDropdown({ onClose }) {
  const { notifications, unreadCount, loading, markRead, markAllRead, deleteNotif, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const handleQuickAction = async (notif, action) => {
    if (!notif.meta?.bookingId) return;
    await API.patch(`/merchant/bookings/${notif.meta.bookingId}/status`, { status: action });
    markRead(notif._id);
  };

  return (
    <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-[400px] bg-[#0d1117] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 z-50 flex flex-col overflow-hidden max-h-[80vh] sm:max-h-[560px]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-slate-400" />
          <span className="font-black text-white text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 px-2 py-1.5 rounded-lg hover:bg-indigo-500/10 transition-all">
              <CheckCheck size={11} /> All read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} className="text-[10px] font-bold text-slate-600 hover:text-rose-400 px-2 py-1.5 rounded-lg hover:bg-rose-500/10 transition-all">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-600 hover:text-white transition-all ml-1">
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-slate-800 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-slate-800 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-800 rounded w-3/4" />
                  <div className="h-2.5 bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-14 text-center">
            <Bell size={28} className="text-slate-800 mx-auto mb-3" />
            <p className="text-sm font-black text-slate-600">
              {activeTab === "all" ? "All caught up" : `No ${activeTab} notifications`}
            </p>
          </div>
        ) : (
          filtered.map(notif => (
            <NotifItem
              key={notif._id}
              notif={notif}
              onMarkRead={markRead}
              onDelete={deleteNotif}
              onQuickAction={handleQuickAction}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ══ FAQ DATA ══════════════════════════════════════════════════════════════ */
const LANGS = [
  { code: "FR", flag: "🇫🇷", label: "Français" },
  { code: "EN", flag: "🇬🇧", label: "English"  },
  { code: "AR", flag: "🇹🇳", label: "عربية"    },
];

const FAQ = [
  {
    category: "Getting Started", color: "indigo",
    items: [
      { q: "How do I verify my identity (KYC)?",
        a: "Click 'GET VERIFIED' in the sidebar. Upload a clear photo of your ID card (front and back), then complete the 5-second biometric scan. Our team reviews your dossier within 24 hours and notifies you by email." },
      { q: "How do I set up my online booking page?",
        a: "Go to Website in the sidebar, choose a theme, add your services with prices and durations, set your opening hours, and publish. You'll get a unique link to share with customers on WhatsApp, Instagram, or your website." },
      { q: "What is Work Mode?",
        a: "Work Mode is a simplified daily interface. Track today's queue, mark appointments as done, manage walk-ins, and let staff log in via a secure invite link — all optimized for phone use at your business." },
    ]
  },
  {
    category: "Bookings", color: "emerald",
    items: [
      { q: "How do customers book with me?",
        a: "Share your Bookiify link. Customers choose a service, pick an available time slot, and confirm. You get an instant notification and the booking appears in Appointments." },
      { q: "How do I confirm or cancel a booking?",
        a: "In Appointments, click any booking to open its details. Use the action buttons to Confirm, Reschedule, or Cancel. The customer automatically receives an email notification." },
      { q: "Can I block time off / set my schedule?",
        a: "Yes. In your settings you can define working days and hours, add breaks, and block specific dates for holidays or personal time." },
    ]
  },
  {
    category: "Finance", color: "amber",
    items: [
      { q: "How do I track my revenue?",
        a: "The Finance page shows earnings by day, week, or month. Filter by service type or staff member. All transactions are logged automatically when a booking is completed." },
      { q: "How do I send an invoice?",
        a: "In Invoices, click 'New Invoice', select the customer and services, then hit Send. The invoice is emailed as a PDF with your business branding and a payment reference." },
      { q: "How does the loyalty program work?",
        a: "Customers earn points per visit or total spend. In Loyalty settings, define your point-to-reward rules. Customers can redeem points for free services or discounts on their next booking." },
    ]
  },
  {
    category: "Security", color: "rose",
    items: [
      { q: "How do I enable two-factor authentication?",
        a: "Settings → Security → Enable Two-Factor Auth. Scan the QR code with Google Authenticator or Authy. From then on, every login requires your 6-digit app code after your password." },
      { q: "How do I change my password?",
        a: "Settings → Security → Change Password. Enter your current password then choose a new strong password (min 8 characters, must include uppercase, a number, and a special character)." },
      { q: "What is device fingerprinting?",
        a: "Bookiify ties your session to the device you logged in from. If someone steals your token and tries to use it from a different device, the session is rejected automatically." },
    ]
  },
];

const COLOR_MAP = {
  indigo: { pill: "bg-indigo-100 text-indigo-700 border border-indigo-200", active: "bg-indigo-600 text-white border border-indigo-600" },
  emerald: { pill: "bg-emerald-100 text-emerald-700 border border-emerald-200", active: "bg-emerald-600 text-white border border-emerald-600" },
  amber:  { pill: "bg-amber-100 text-amber-700 border border-amber-200",  active: "bg-amber-500 text-white border border-amber-500"  },
  rose:   { pill: "bg-rose-100 text-rose-700 border border-rose-200",     active: "bg-rose-600 text-white border border-rose-600"   },
};

/* ── Help Panel ── */
function HelpPanel({ onClose }) {
  const [openIdx, setOpenIdx]           = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = FAQ[activeCategory];

  return (
    <>
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[60]" onClick={onClose} />
      <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
              <HelpCircle size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 dark:text-white text-base">Help Center</h2>
              <p className="text-[11px] text-slate-500 font-bold">Frequently asked questions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 px-6 py-3 overflow-x-auto border-b border-slate-100 dark:border-slate-800" style={{ scrollbarWidth: "none" }}>
          {FAQ.map((f, i) => (
            <button
              key={f.category}
              onClick={() => { setActiveCategory(i); setOpenIdx(null); }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                activeCategory === i ? COLOR_MAP[f.color].active : COLOR_MAP[f.color].pill + " hover:opacity-80"
              }`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2" style={{ scrollbarWidth: "none" }}>
          {cat.items.map((item, i) => (
            <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
              >
                <span className="leading-snug">{item.q}</span>
                <ChevronDown size={15} className={`flex-shrink-0 text-slate-400 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <div className="px-4 pb-4 pt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-slate-50 dark:border-slate-800/60">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 font-bold">
            Still need help?{" "}
            <a href="mailto:support@bookiify.com" className="text-indigo-600 font-black hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Access State Banner ── */
function AccessBanner({ user }) {
  const accessState = getAccessState(user);
  const daysLeft    = getTrialDaysLeft(user?.trialEndsAt);
  const isRejected  = user?.accountStatus === "on_boarding" && user?.kycStatus === "rejected";

  if (accessState === "unverified") {
    return (
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b bg-amber-50 border-amber-200 text-amber-800 text-xs font-bold sm:flex-nowrap sm:gap-3 sm:px-8 sm:text-sm">
        <ShieldCheck size={16} className="text-amber-600 flex-shrink-0" />
        <span className="flex-1">{isRejected ? "Your KYC was rejected. Please resubmit with the correct documents." : "Your account is not yet verified."}</span>
        <Link to="/owner/dashboard/kyc" className="underline hover:no-underline font-black whitespace-nowrap">
          {isRejected ? "Resubmit →" : "Complete KYC →"}
        </Link>
      </div>
    );
  }

  if (accessState === "review") {
    return (
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-blue-50 border-blue-200 text-blue-800 text-xs font-bold sm:gap-3 sm:px-8 sm:text-sm">
        <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
        <span>Your identity documents are under review. We&apos;ll notify you within 24 hours.</span>
      </div>
    );
  }

  if (accessState === "expired") {
    return (
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b bg-rose-50 border-rose-200 text-rose-800 text-xs font-bold sm:flex-nowrap sm:gap-3 sm:px-8 sm:text-sm">
        <XCircle size={16} className="text-rose-500 flex-shrink-0" />
        <span className="flex-1">Your free trial has expired. Upgrade your plan to continue.</span>
        <Link to="/owner/dashboard/billing" className="underline hover:no-underline font-black whitespace-nowrap">Upgrade Now →</Link>
      </div>
    );
  }

  if (accessState === "trial" && daysLeft <= 30) {
    const urgent = daysLeft <= 7;
    return (
      <div className={`flex flex-wrap items-center gap-2 px-4 py-3 border-b sm:gap-3 sm:px-8 text-xs sm:text-sm font-bold ${urgent ? "bg-rose-50 border-rose-200 text-rose-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
        <Loader2 size={16} className={`flex-shrink-0 ${urgent ? "text-rose-500" : "text-amber-600"}`} />
        <span>
          {urgent
            ? `Your free trial expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}. Upgrade now to avoid interruption.`
            : `Your free trial expires in ${daysLeft} days.`}
        </span>
        <Link to="/owner/dashboard/billing" className="ml-1 underline hover:no-underline font-black whitespace-nowrap">
          Upgrade Plan →
        </Link>
      </div>
    );
  }

  return null;
}

/* ══════════════════════════════════════════════════════════════════════════════
   DASHBOARD LAYOUT
   ══════════════════════════════════════════════════════════════════════════════ */
const DashboardLayout = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logoutUser } = useAuth();
  const { unreadCount, toasts, dismissToast } = useNotifications();

  /* ── Route Enforcement ── */
  useEffect(() => {
    if (!user) return;
    const state = getAccessState(user);
    const path  = location.pathname;

    if (state === "unverified" || state === "review") {
      if (path !== "/owner/dashboard/kyc" && path !== "/owner/dashboard") {
        navigate("/owner/dashboard/kyc", { replace: true });
      }
    } else if (state === "expired") {
      if (path !== "/owner/dashboard/billing" && path !== "/owner/dashboard") {
        navigate("/owner/dashboard/billing", { replace: true });
      }
    }
  }, [location.pathname, user, navigate]);

  const [isCollapsed,    setIsCollapsed]   = useState(true);
  const [isMobileOpen,   setIsMobileOpen]  = useState(false);
  const [isProfileOpen,  setIsProfileOpen] = useState(false);
  const [isNotifOpen,    setIsNotifOpen]   = useState(false);
  const [isPaletteOpen,  setIsPaletteOpen] = useState(false);
  const [isHelpOpen,     setIsHelpOpen]    = useState(false);
  const [isLangOpen,     setIsLangOpen]    = useState(false);
  const [lang,           setLang]          = useState(() => localStorage.getItem("bookiify_lang") || "FR");
  const [isDark,         setIsDark]        = useState(() => localStorage.getItem("bookiify_theme") === "dark");

  const profileRef = useRef(null);
  const notifRef   = useRef(null);
  const langRef    = useRef(null);

  /* Dark mode effect */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("bookiify_theme", isDark ? "dark" : "light");
  }, [isDark]);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target))   setIsNotifOpen(false);
      if (langRef.current    && !langRef.current.contains(e.target))    setIsLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Global ⌘K / Ctrl+K shortcut */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = async () => {
    await logoutUser?.();
    navigate("/login");
  };

  const displayUser = user || { fullName: "Owner", role: "owner" };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR — hidden on mobile, shown as overlay when isMobileOpen */}
      <div className={`lg:block ${isMobileOpen ? "block" : "hidden"}`}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onMobileClose={() => setIsMobileOpen(false)} />
      </div>

      {/* MAIN */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 lg:${isCollapsed ? "ml-[72px]" : "ml-64"}`}>

        {/* ── HEADER ── */}
        <header className="h-16 sm:h-20 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-3">

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Menu size={22} />
          </button>

          {/* Command search bar (opens palette) */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-sm flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 pr-2 sm:pr-3 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-transparent hover:border-indigo-200 rounded-2xl text-sm transition-all group text-left"
          >
            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-medium flex-1 truncate text-xs sm:text-sm">Search…</span>
            <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-400 text-[10px] font-black rounded-lg shadow-sm flex-shrink-0">
              <Command size={10} /> K
            </kbd>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Language toggle */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(p => !p)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm font-black"
              >
                <Globe size={16} />
                <span>{lang}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 py-1.5 z-50">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); localStorage.setItem("bookiify_lang", l.code); setIsLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                        lang === l.code ? "text-indigo-600" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(p => !p)}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700" />

            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setIsNotifOpen(p => !p); setIsProfileOpen(false); }}
                className={`relative p-2.5 rounded-xl transition-all ${
                  isNotifOpen ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[9px] font-black px-0.5 animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
              {isNotifOpen && <NotificationDropdown onClose={() => setIsNotifOpen(false)} />}
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700" />

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => { setIsProfileOpen(p => !p); setIsNotifOpen(false); }}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 leading-tight">{displayUser.fullName}</p>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-tighter">{displayUser.role} Account</p>
                </div>

                <div className="relative">
                  {displayUser.profilePicUrl ? (
                    <img
                      src={displayUser.profilePicUrl}
                      alt="Profile"
                      className="w-11 h-11 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all shadow-sm"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 uppercase">
                      {displayUser.fullName?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180 text-slate-900" : ""}`}
                />
              </div>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
                      Active & Online
                    </p>
                  </div>

                  <Link
                    to="/owner/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Globe size={16} /> Online Web Profile
                  </Link>

                  <Link
                    to="/owner/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <SettingsIcon size={16} /> Settings
                  </Link>

                  <div className="h-[1px] bg-slate-100 my-1 mx-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} /> Logout Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── ACCESS STATUS BANNER ── */}
        <AccessBanner user={user} />

        {/* ── PAGE CONTENT ── */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* ── GLOBAL OVERLAYS ── */}
      <CommandPalette open={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />

      {/* ── HELP PANEL ── */}
      {isHelpOpen && <HelpPanel onClose={() => setIsHelpOpen(false)} />}

      {/* ── FLOATING HELP BUBBLE ── */}
      <button
        onClick={() => setIsHelpOpen(p => !p)}
        className="fixed bottom-7 right-7 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl shadow-indigo-400/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Help & FAQ"
      >
        {isHelpOpen ? <X size={22} /> : <HelpCircle size={22} />}
        {!isHelpOpen && (
          <span className="absolute bottom-16 right-0 bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Help & FAQ
          </span>
        )}
        {!isHelpOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20 pointer-events-none" />
        )}
      </button>
    </div>
  );
};

export default DashboardLayout;
