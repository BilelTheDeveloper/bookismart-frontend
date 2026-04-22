import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Search, Bell, ChevronDown } from "lucide-react";

const DashboardLayout = () => {
  // Retrieve user data from localStorage (Saved by your Login controller)
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Owner Name",
    role: "owner",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* 1. Permanent Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* --- HIGH-UI HEADER --- */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
          
          {/* Search Bar Section */}
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

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-6">
            
            {/* Notification Icon */}
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-tight">
                  {user.fullName}
                </p>
                <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-tighter">
                  {user.role} Account
                </p>
              </div>
              
              <div className="relative">
                {user.profilePicUrl ? (
                  <img 
                    src={user.profilePicUrl} 
                    alt="Profile" 
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all shadow-sm"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Online Status Dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>

              <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <div className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs / Page Context (Optional) */}
            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Owner Command Center
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Manage your business profile and real-time operations.
              </p>
            </div>

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