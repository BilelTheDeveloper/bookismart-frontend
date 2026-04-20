import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "KYC Review", path: "/admin/verify-identity", icon: "🛡️" },
    { name: "User Management", path: "/admin/users", icon: "👥" },
    { name: "Subscriptions", path: "/admin/plans", icon: "💳" },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen p-6 flex flex-col">
      <div className="mb-10 px-2">
        <h1 className="text-white text-2xl font-black italic">BOOKIIFY <span className="text-indigo-500 text-sm not-italic">ADM</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
              location.pathname === item.path 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-800">
        <button className="w-full p-4 text-left text-rose-400 font-bold text-sm hover:bg-rose-500/10 rounded-2xl transition-all">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;