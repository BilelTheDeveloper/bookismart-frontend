import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. Permanent Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        {/* Dynamic Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Welcome Back!</h1>
            <p className="text-slate-500">Here is what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:shadow-sm">
              <span className="sr-only">Notifications</span>
              🔔
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200" />
          </div>
        </header>

        {/* 3. This is where your Dashboard Pages will render */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;