import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import {
  Search, Bell, ChevronDown, Settings as SettingsIcon,
  LogOut, Globe, X, CheckCheck, Trash2, BookOpen, Star,
  ShieldCheck, Zap, MessageSquare, Users, AlertCircle, CreditCard,
} from "lucide-react";

/* ── Notification type → icon + colour ── */
const NOTIF_META = {
  booking:     { icon: BookOpen,      color: "text-indigo-500",  bg: "bg-indigo-50"  },
  application: { icon: Users,         color: "text-violet-500",  bg: "bg-violet-50"  },
  review:      { icon: Star,          color: "text-amber-500",   bg: "bg-amber-50"   },
  payment:     { icon: CreditCard,    color: "text-emerald-500", bg: "bg-emerald-50" },
  chat:        { icon: MessageSquare, color: "text-sky-500",     bg: "bg-sky-50"     },
  staff:       { icon: Users,         color: "text-teal-500",    bg: "bg-teal-50"    },
  system:      { icon: ShieldCheck,   color: "text-slate-500",   bg: "bg-slate-50"   },
  customer:    { icon: Users,         color: "text-rose-500",    bg: "bg-rose-50"    },
  default:     { icon: AlertCircle,   color: "text-slate-500",   bg: "bg-slate-50"   },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/* ── Notification Dropdown ── */
function NotificationDropdown({ onClose }) {
  const { notifications, unreadCount, loading, markRead, markAllRead, deleteNotif, clearAll } = useNotifications();

  return (
    <div className="absolute right-0 mt-3 w-[420px] bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-slate-700" />
          <span className="font-black text-slate-900 text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 transition-all"
            >
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[11px] font-bold text-slate-400 hover:text-rose-500 px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-all"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all ml-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto" style={{ maxHeight: 420 }}>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-slate-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="h-2.5 bg-slate-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={32} className="text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-black text-slate-400">All caught up</p>
            <p className="text-xs text-slate-300 mt-1">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const meta = NOTIF_META[notif.type] || NOTIF_META.default;
            const Icon = meta.icon;
            return (
              <div
                key={notif._id}
                className={`flex gap-3 px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group ${
                  !notif.read ? "bg-indigo-50/30" : ""
                }`}
                onClick={() => { if (!notif.read) markRead(notif._id); }}
              >
                <div className={`w-9 h-9 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={16} className={meta.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-bold leading-tight ${!notif.read ? "text-slate-900" : "text-slate-700"}`}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotif(notif._id); }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-rose-100 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{notif.body}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1.5">{timeAgo(notif.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { unreadCount } = useNotifications();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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

        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">

          {/* Search */}
          <div className="relative w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search appointments, customers..."
              className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 border-transparent border-2 rounded-2xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">

            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setIsNotifOpen(p => !p); setIsProfileOpen(false); }}
                className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[9px] font-black px-0.5">
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
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 uppercase">
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
                    <Globe size={18} /> Online Web Profile
                  </Link>

                  <Link
                    to="/owner/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <SettingsIcon size={18} /> Settings
                  </Link>

                  <div className="h-[1px] bg-slate-100 my-1 mx-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={18} /> Logout Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
