import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSidebar from "./AdminSidebar";
import { Menu, X, ShieldCheck } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import ThemeToggle from "../../components/ThemeToggle";

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:block ${isMobileOpen ? "block" : "hidden lg:block"}`}>
        <AdminSidebar onMobileClose={() => setIsMobileOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <Menu size={22} />
            </button>
            <div>
              <p className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest">{t("admin.access")}</p>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{t("admin.control")}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/30 rounded-xl">
              <ShieldCheck size={14} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-black text-indigo-700 dark:text-indigo-300">{t("admin.badge")}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-300 flex-shrink-0">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
