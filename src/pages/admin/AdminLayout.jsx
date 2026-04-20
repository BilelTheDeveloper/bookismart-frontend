import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar is fixed on the left */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Administrator Access</p>
            <h2 className="text-2xl font-black text-slate-900">System Control</h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">A</div>
          </div>
        </header>

        {/* This is where pages like IdentityVerify will show up */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;