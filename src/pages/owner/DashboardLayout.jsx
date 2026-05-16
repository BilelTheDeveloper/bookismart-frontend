import React, { useState, useRef, useEffect, useCallback } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import API from "../../api/config";
import CommandPalette from "../../components/CommandPalette";
import NotificationToast from "../../components/NotificationToast";
import {
  Search, Bell, ChevronDown, Settings as SettingsIcon,
  LogOut, Globe, X, CheckCheck, Trash2, BookOpen, Star,
  ShieldCheck, Zap, MessageSquare, Users, AlertCircle, CreditCard,
  FileText, CheckCircle2, XCircle, Loader2, Command,
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
    <div className="absolute right-0 mt-3 w-[400px] bg-[#0d1117] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 z-50 flex flex-col overflow-hidden max-h-[560px]">

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

/* ══════════════════════════════════════════════════════════════════════════════
   DASHBOARD LAYOUT
   ══════════════════════════════════════════════════════════════════════════════ */
const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { unreadCount, toasts, dismissToast } = useNotifications();

  const [isCollapsed,   setIsCollapsed]   = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen,   setIsNotifOpen]   = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef   = useRef(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target))   setIsNotifOpen(false);
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
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* SIDEBAR */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* MAIN */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>

        {/* ── HEADER ── */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between gap-4">

          {/* Command search bar (opens palette) */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="relative w-80 flex items-center gap-3 pl-4 pr-3 py-2.5 bg-slate-100 hover:bg-slate-200 border-2 border-transparent hover:border-indigo-200 rounded-2xl text-sm transition-all group text-left"
          >
            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 font-medium flex-1">Search anything…</span>
            <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 bg-white border border-slate-200 text-slate-400 text-[10px] font-black rounded-lg shadow-sm flex-shrink-0">
              <Command size={10} /> K
            </kbd>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-4">

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

            <div className="h-8 w-[1px] bg-slate-200" />

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
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50">
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

        {/* ── PAGE CONTENT ── */}
        <div className="p-8 flex-1">
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
    </div>
  );
};

export default DashboardLayout;
