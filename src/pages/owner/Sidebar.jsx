import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  LogOut
} from "lucide-react"; // Using Lucide for modern icons

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/owner/dashboard" },
    { name: "Appointments", icon: <CalendarCheck size={20} />, path: "/owner/dashboard/bookings" },
    { name: "Customers", icon: <Users size={20} />, path: "/owner/dashboard/customers" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/dashboard/stats" },
    { name: "Subscription", icon: <CreditCard size={20} />, path: "/dashboard/billing" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0">
      {/* Brand Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-black">
          B
        </div>
        <span className="text-xl font-black text-white tracking-tight">BOOKIIFY</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout / User Info Section */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;