import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/config";
import {
  LayoutDashboard, CalendarCheck, Users, Settings, CreditCard,
  BarChart3, LogOut, ChevronLeft, ChevronRight, Wallet, Palette,
  Power, FileText, Star, Briefcase, Globe, Zap, Sparkles,
  ShieldCheck, Lock, MessageSquare, BadgeCheck, Clock,
  AlertTriangle, RefreshCw, MonitorPlay, BookOpen, Building2, Gift, Megaphone,
} from "lucide-react";

/* ─── Access State Helpers ─── */
export const getAccessState = (user) => {
  const status = user?.accountStatus;
  if (status === "active") {
    const trialEnd = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
    if (!trialEnd || trialEnd > new Date()) return "trial";
    return "expired";
  }
  if (status === "review") return "review";
  return "unverified";
};

export const getTrialDaysLeft = (trialEndsAt) => {
  if (!trialEndsAt) return Infinity;
  const diff = new Date(trialEndsAt) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

/* ─── Nav Config (labels via i18n: sidebar.*) ─── */
const NAV_SECTIONS = [
  {
    key: "main", labelKey: "sidebar.secMain",
    items: [
      { key: "overview", labelKey: "sidebar.overview", icon: LayoutDashboard, path: "/owner/dashboard" },
      { key: "tutorial", labelKey: "sidebar.tutorial", icon: BookOpen, path: "/owner/dashboard/tutorial", badgeKey: "sidebar.badgeNew" },
    ],
  },
  {
    key: "management", labelKey: "sidebar.secManagement",
    items: [
      { key: "appointments", labelKey: "sidebar.appointments", icon: CalendarCheck, path: "/owner/dashboard/bookings" },
      { key: "queue", labelKey: "sidebar.queue", icon: MonitorPlay, path: "/owner/dashboard/queue" },
      { key: "recruitment", labelKey: "sidebar.recruitment", icon: Briefcase, path: "/owner/dashboard/recruitment" },
      { key: "staff", labelKey: "sidebar.staff", icon: Users, path: "/owner/dashboard/staff" },
      { key: "chat", labelKey: "sidebar.chat", icon: MessageSquare, path: "/owner/dashboard/chat" },
      { key: "noShow", labelKey: "sidebar.noShow", icon: ShieldCheck, path: "/owner/dashboard/no-show" },
    ],
  },
  {
    key: "finance", labelKey: "sidebar.secFinance",
    items: [
      { key: "financials", labelKey: "sidebar.financials", icon: Wallet, path: "/owner/dashboard/finance" },
      { key: "payments", labelKey: "sidebar.payments", icon: CreditCard, path: "/owner/dashboard/payments" },
      { key: "invoices", labelKey: "sidebar.invoices", icon: FileText, path: "/owner/dashboard/invoices" },
      { key: "loyalty", labelKey: "sidebar.loyalty", icon: Star, path: "/owner/dashboard/loyalty" },
      { key: "packages", labelKey: "sidebar.packages", icon: Gift, path: "/owner/dashboard/packages" },
    ],
  },
  {
    key: "growth", labelKey: "sidebar.secGrowth",
    items: [
      { key: "smartAi", labelKey: "sidebar.smartAi", icon: Sparkles, path: "/owner/dashboard/smart-ai", badgeKey: "sidebar.badgeAi" },
      { key: "marketing", labelKey: "sidebar.marketing", icon: Megaphone, path: "/owner/dashboard/marketing" },
      { key: "analytics", labelKey: "sidebar.analytics", icon: BarChart3, path: "/owner/dashboard/stats" },
      { key: "website", labelKey: "sidebar.website", icon: Palette, path: "/owner/dashboard/themes" },
    ],
  },
  {
    key: "account", labelKey: "sidebar.secAccount",
    items: [
      { key: "subscription", labelKey: "sidebar.subscription", icon: CreditCard, path: "/owner/dashboard/billing" },
      { key: "settings", labelKey: "sidebar.settings", icon: Settings, path: "/owner/dashboard/settings" },
    ],
  },
];

/* ─── Tooltip ─── */
function Tooltip({ label }) {
  return (
    <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 whitespace-nowrap pointer-events-none z-50 shadow-xl">
      {label}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45" />
    </div>
  );
}

/* ─── State CTA Block ─── */
function StateCTA({ accessState, isRejected, daysLeft, isCollapsed }) {
  const { t } = useTranslation();
  const collapsedButton = (() => {
    if (accessState === "unverified") return (
      <Link to="/owner/dashboard/kyc"
        className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-white hover:border-transparent transition-all"
        title={isRejected ? t("sidebar.tipResubmit") : t("sidebar.tipGetVerified")}
      >
        {isRejected ? <RefreshCw size={17} className="animate-pulse" /> : <ShieldCheck size={17} className="animate-pulse" />}
      </Link>
    );

    if (accessState === "review") return (
      <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative" title={t("sidebar.tipUnderReview")}>
        <div className="w-3.5 h-3.5 rounded-full bg-blue-400 animate-pulse" />
        <div className="absolute inset-0 rounded-xl bg-blue-400/10 animate-ping" style={{ animationDuration: "2s" }} />
      </div>
    );

    if (accessState === "trial") return (
      <Link to="/owner/dashboard/work-mode"
        className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white hover:border-transparent transition-all"
        title={t("sidebar.tipWorkMode")}
      >
        <Power size={17} />
      </Link>
    );

    if (accessState === "expired") return (
      <Link to="/owner/dashboard/billing"
        className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center hover:bg-rose-600 hover:text-white hover:border-transparent transition-all"
        title={t("sidebar.tipUpgrade")}
      >
        <CreditCard size={17} />
      </Link>
    );
  })();

  if (isCollapsed) {
    return (
      <div className="flex justify-center mb-3 flex-shrink-0">
        <div className="relative group">
          {collapsedButton}
          <div className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {accessState === "unverified" && <Tooltip label={isRejected ? t("sidebar.tipResubmit") : t("sidebar.tipGetVerified")} />}
            {accessState === "review"     && <Tooltip label={t("sidebar.tipUnderReview")} />}
            {accessState === "trial"      && <Tooltip label={t("sidebar.tipWorkMode")} />}
            {accessState === "expired"    && <Tooltip label={t("sidebar.tipUpgrade")} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 mb-3 flex-shrink-0 space-y-1.5">

      {/* UNVERIFIED */}
      {accessState === "unverified" && (
        <Link
          to="/owner/dashboard/kyc"
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all relative overflow-hidden group"
          style={{ background: "linear-gradient(135deg,#d97706,#b45309)", boxShadow: "0 4px 24px rgba(217,119,6,0.3)" }}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-all" />
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            {isRejected
              ? <RefreshCw size={15} className="text-white" />
              : <ShieldCheck size={15} className="text-white animate-pulse" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-xs leading-none">
              {isRejected ? t("sidebar.resubmitDocs") : t("sidebar.getVerified")}
            </p>
            <p className="text-amber-200 text-[10px] font-bold mt-0.5">
              {isRejected ? t("sidebar.docsRejectedFix") : t("sidebar.identityRequired")}
            </p>
          </div>
          <ChevronRight size={14} className="text-amber-200 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}

      {/* UNDER REVIEW */}
      {accessState === "review" && (
        <div
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.08))", border: "1px solid rgba(37,99,235,0.2)" }}
        >
          <div className="relative flex-shrink-0 w-8 h-8">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-blue-400/8 animate-ping" style={{ animationDuration: "2.5s" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-blue-300 font-black text-xs leading-none">{t("sidebar.underReview")}</p>
            <p className="text-blue-400/60 text-[10px] font-bold mt-0.5">{t("sidebar.reviewing24h")}</p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      {/* TRIAL ACTIVE */}
      {accessState === "trial" && (
        <>
          <Link
            to="/owner/dashboard/work-mode"
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", boxShadow: "0 4px 20px rgba(79,70,229,0.3)" }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all" />
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Power size={15} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-xs leading-none">{t("sidebar.setWorkMode")}</p>
              <p className="text-indigo-200 text-[10px] font-bold mt-0.5">{t("sidebar.allUnlocked")}</p>
            </div>
            <Zap size={13} className="text-indigo-200 flex-shrink-0" />
          </Link>

          {daysLeft <= 30 && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold ${
              daysLeft <= 7
                ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
            }`}>
              <Clock size={11} className="flex-shrink-0" />
              {daysLeft <= 7
                ? <span>{t("sidebar.trialEndsInD", { days: daysLeft })}</span>
                : <span>{t("sidebar.trialDaysLeft", { days: daysLeft })}</span>}
            </div>
          )}
        </>
      )}

      {/* TRIAL EXPIRED */}
      {accessState === "expired" && (
        <>
          <Link
            to="/owner/dashboard/billing"
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl font-bold text-sm transition-all relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg,#e11d48,#9f1239)", boxShadow: "0 4px 20px rgba(225,29,72,0.3)" }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all" />
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <CreditCard size={15} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-xs leading-none">{t("sidebar.upgradeNow")}</p>
              <p className="text-rose-200 text-[10px] font-bold mt-0.5">{t("sidebar.trialExpired")}</p>
            </div>
            <span className="flex-shrink-0 text-[8px] font-black text-rose-200 bg-rose-900/50 border border-rose-500/30 rounded-full px-1.5 py-0.5 uppercase tracking-wider">
              {t("sidebar.expired")}
            </span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/8 border border-rose-500/15 text-[10px] font-bold text-rose-400/80">
            <AlertTriangle size={11} className="flex-shrink-0" />
            <span>{t("sidebar.allLocked")}</span>
          </div>
        </>
      )}

    </div>
  );
}

/* ─── Main Sidebar ─── */
const Sidebar = ({ isCollapsed, setIsCollapsed, onMobileClose }) => {
  const { t }      = useTranslation();
  const location   = useLocation();
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const [hoveredItem, setHoveredItem] = useState(null);

  const accessState = getAccessState(user);
  const isRejected  = user?.accountStatus === "on_boarding" && user?.kycStatus === "rejected";
  const daysLeft    = getTrialDaysLeft(user?.trialEndsAt);
  const initials    = user?.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "OW";

  // Organization accounts get a "Branches" item in the Management section.
  const isOrg = user?.accountType === "organization";
  const navSections = NAV_SECTIONS.map((section) =>
    section.key === "management" && isOrg
      ? { ...section, items: [{ key: "branches", labelKey: "sidebar.branches", icon: Building2, path: "/owner/dashboard/branches" }, ...section.items] }
      : section
  );

  const handleLogout = async () => {
    try { await API.post("/auth/logout"); } catch { /* swallow */ } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const isActive = (path) =>
    path === "/owner/dashboard" ? location.pathname === path : location.pathname.startsWith(path);

  const isAllowed = (path) => {
    // Tutorial is always accessible regardless of account state
    if (path.startsWith("/owner/dashboard/tutorial")) return true;
    if (accessState === "trial") return true;
    if (accessState === "expired") return ["/owner/dashboard", "/owner/dashboard/billing"].some(a => path === a || path.startsWith(a));
    return ["/owner/dashboard", "/owner/dashboard/kyc"].some(a => path === a || path.startsWith(a));
  };

  const lockTooltip = (name) => {
    if (accessState === "expired")  return t("sidebar.lockUpgrade", { name });
    if (accessState === "review")   return t("sidebar.lockReview", { name });
    return t("sidebar.lockVerify", { name });
  };

  /* User card status */
  const statusDot = {
    trial:      { color: "bg-emerald-400", label: t("sidebar.stVerified") },
    review:     { color: "bg-blue-400 animate-pulse", label: t("sidebar.stReview") },
    unverified: { color: "bg-amber-400",  label: isRejected ? t("sidebar.stRejected") : t("sidebar.stPending") },
    expired:    { color: "bg-rose-500",   label: t("sidebar.stExpired") },
  }[accessState] || { color: "bg-slate-500", label: t("sidebar.stUnknown") };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 z-50 ${isCollapsed ? "w-[72px]" : "w-64"}`}
      style={{ background: "linear-gradient(180deg,#0D1117 0%,#0F172A 60%,#0D1117 100%)", borderRight: "1px solid rgba(99,102,241,0.12)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -20%,rgba(99,102,241,0.15) 0%,transparent 70%)" }} />

      {/* Collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-14 w-6 h-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center border-2 border-[#0D1117] transition-all shadow-lg shadow-indigo-900/40 z-50"
      >
        {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      {/* Brand */}
      <div className={`relative flex items-center gap-3 px-4 py-5 overflow-hidden flex-shrink-0 ${isCollapsed ? "justify-center" : ""}`}>
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-900/40">
            B
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0D1117]" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-black text-lg tracking-tighter leading-none">BOOKIIFY</p>
            <p className="text-indigo-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">{t("sidebar.businessSuite")}</p>
          </div>
        )}
      </div>

      {/* State CTA */}
      <StateCTA
        accessState={accessState}
        isRejected={isRejected}
        daysLeft={daysLeft}
        isCollapsed={isCollapsed}
      />

      {/* Nav */}
      <nav className="flex-1 px-2 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
        {navSections.map((section, si) => (
          <div key={section.key} className={si > 0 ? "mt-4" : ""}>
            {!isCollapsed && (
              <p className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.22em] mb-1.5">{t(section.labelKey)}</p>
            )}
            {isCollapsed && si > 0 && <div className="h-px bg-slate-800/60 mx-2 mb-3" />}

            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon    = item.icon;
                const active  = isActive(item.path);
                const allowed = isAllowed(item.path);
                const label   = t(item.labelKey);

                if (!allowed) {
                  return (
                    <div
                      key={item.key}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.key)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div
                        className={`flex items-center gap-3.5 rounded-xl cursor-not-allowed opacity-30 ${
                          isCollapsed ? "w-11 h-11 justify-center mx-auto" : "px-3.5 py-2.5"
                        }`}
                      >
                        <Lock size={14} className="text-slate-600 flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm text-slate-600 whitespace-nowrap">{label}</span>}
                      </div>
                      {hoveredItem === item.key && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none">
                          <Tooltip label={lockTooltip(label)} />
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => isCollapsed && setHoveredItem(item.key)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      to={item.path}
                      onClick={() => onMobileClose?.()}
                      className={`flex items-center gap-3.5 rounded-xl transition-all duration-200 font-semibold relative overflow-hidden group ${
                        isCollapsed ? "w-11 h-11 justify-center mx-auto" : "px-3.5 py-2.5"
                      } ${active ? "text-white" : "text-slate-400 hover:text-white"}`}
                      style={active ? {
                        background: "linear-gradient(135deg,rgba(99,102,241,0.2) 0%,rgba(124,58,237,0.1) 100%)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        boxShadow: "0 0 20px rgba(99,102,241,0.08)",
                      } : {}}
                    >
                      {!active && <div className="absolute inset-0 rounded-xl bg-slate-800/0 group-hover:bg-slate-800/60 transition-all duration-200" />}
                      {active && !isCollapsed && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-full" />}
                      <div className={`relative flex-shrink-0 transition-all duration-200 ${active ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"}`}>
                        <Icon size={19} />
                        {active && isCollapsed && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full border border-[#0D1117]" />}
                      </div>
                      {!isCollapsed && <span className="text-sm whitespace-nowrap leading-none">{label}</span>}
                      {!isCollapsed && item.badgeKey && (
                        <span className="ml-auto bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{t(item.badgeKey)}</span>
                      )}
                    </Link>
                    {isCollapsed && hoveredItem === item.key && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none">
                        <Tooltip label={label} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="flex-shrink-0 border-t border-slate-800/50 mt-2">
        {!isCollapsed ? (
          <div className="p-3">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/40 mb-2">
              <div className="relative flex-shrink-0">
                {user?.profilePicUrl ? (
                  <img src={user.profilePicUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs">
                    {initials}
                  </div>
                )}
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${statusDot.color} rounded-full border-2 border-[#0D1117]`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-xs truncate leading-none">{user?.fullName}</p>
                  {accessState === "trial" && <BadgeCheck size={11} className="text-indigo-400 flex-shrink-0" />}
                </div>
                <p className={`text-[10px] truncate mt-0.5 ${
                  accessState === "trial"      ? "text-emerald-500/80" :
                  accessState === "review"     ? "text-blue-400/70"    :
                  accessState === "expired"    ? "text-rose-400/80"    :
                  "text-amber-500/80"
                }`}>
                  {statusDot.label}
                </p>
              </div>
              <Link to="/owner/dashboard/settings" className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all flex-shrink-0">
                <Settings size={13} />
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 font-semibold text-sm hover:bg-rose-500/10 hover:text-rose-300 transition-all group"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>{t("sidebar.signOut")}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-3">
            <div className="relative group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs cursor-pointer">
                {initials}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${statusDot.color} rounded-full border-2 border-[#0D1117]`} />
            </div>
            <div className="relative group">
              <button
                onClick={handleLogout}
                className="w-11 h-9 rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 flex items-center justify-center transition-all"
              >
                <LogOut size={17} />
              </button>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Tooltip label={t("sidebar.signOut")} />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
