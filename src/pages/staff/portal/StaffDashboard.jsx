import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays, Users, BarChart2, MessageSquare, FileText,
  Gift, Briefcase, UserPlus, TrendingUp, ArrowRight, Clock
} from "lucide-react";
import { useStaffAuth } from "../../../context/StaffAuthContext";

const PAGE_META = {
  bookings:    { label: "Bookings",    icon: CalendarDays, path: "bookings",    color: "bg-blue-600/15 border-blue-500/20",    iconColor: "text-blue-400",    desc: "View & manage appointments" },
  customers:   { label: "Customers",   icon: Users,        path: "customers",   color: "bg-purple-600/15 border-purple-500/20", iconColor: "text-purple-400",  desc: "Browse client profiles" },
  finance:     { label: "Finance",     icon: BarChart2,    path: "finance",     color: "bg-emerald-600/15 border-emerald-500/20", iconColor: "text-emerald-400", desc: "Track revenue & payments" },
  chat:        { label: "Chat",        icon: MessageSquare,path: "chat",        color: "bg-sky-600/15 border-sky-500/20",       iconColor: "text-sky-400",     desc: "Message clients" },
  invoices:    { label: "Invoices",    icon: FileText,     path: "invoices",    color: "bg-amber-600/15 border-amber-500/20",   iconColor: "text-amber-400",   desc: "Create & send invoices" },
  loyalty:     { label: "Loyalty",     icon: Gift,         path: "loyalty",     color: "bg-pink-600/15 border-pink-500/20",     iconColor: "text-pink-400",    desc: "Manage reward programs" },
  work_mode:   { label: "Work Mode",   icon: Briefcase,    path: "work-mode",   color: "bg-orange-600/15 border-orange-500/20", iconColor: "text-orange-400",  desc: "Your active bookings view" },
  recruitment: { label: "Recruitment", icon: UserPlus,     path: "recruitment", color: "bg-teal-600/15 border-teal-500/20",     iconColor: "text-teal-400",    desc: "Job listings & applicants" },
  analytics:   { label: "Analytics",   icon: TrendingUp,   path: "analytics",   color: "bg-violet-600/15 border-violet-500/20", iconColor: "text-violet-400",  desc: "Performance insights" },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const StaffDashboard = () => {
  const { staff }  = useStaffAuth();
  const navigate   = useNavigate();

  const allowedKeys = (staff?.allowedPages || []).map(p => p.pageKey);
  const modules     = allowedKeys.map(k => PAGE_META[k]).filter(Boolean);

  const firstName = staff?.fullName?.split(" ")[0] || "there";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero greeting */}
      <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/20 rounded-[2rem] p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-2">
              {getGreeting()}
            </p>
            <h1 className="text-3xl font-black text-white">
              {firstName} <span className="text-slate-400 font-medium">👋</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium capitalize">
              {staff?.role || "Staff Member"} · {modules.length} module{modules.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-2xl text-slate-400 text-sm font-bold shrink-0">
            <Clock size={14} />
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Module grid */}
      {modules.length > 0 ? (
        <>
          <div>
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Your Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map(mod => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.path}
                    onClick={() => navigate(`/staff/portal/${mod.path}`)}
                    className={`group text-left p-6 rounded-[1.5rem] border ${mod.color} hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center mb-4`}>
                      <Icon size={22} className={mod.iconColor} />
                    </div>
                    <p className="text-white font-black text-base mb-1">{mod.label}</p>
                    <p className="text-slate-500 text-xs font-medium mb-4">{mod.desc}</p>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                      Open <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-12 text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase size={24} className="text-slate-600" />
          </div>
          <h3 className="text-white font-black mb-2">No Modules Assigned</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Your manager hasn't granted you access to any pages yet. Check back soon or contact them directly.
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
