import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const AdminSidebar = ({ onMobileClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard",       path: "/admin/dashboard",       icon: "📊" },
    { name: "KYC Review",      path: "/admin/verify-identity", icon: "🛡️" },
    { name: "Customers",       path: "/admin/customers",        icon: "👤" },
    { name: "Recruitment",     path: "/admin/recruitment",      icon: "💼" },
    { name: "Staff Review",    path: "/admin/staff",            icon: "🪪" },
    { name: "Security Alerts", path: "/admin/security-alerts", icon: "🔐" },
    { name: "Verification",    path: "/admin/verification",     icon: "💳" },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen p-6 flex flex-col">
      <div className="mb-10 px-2 flex items-center justify-between">
        <h1 className="text-white text-2xl font-black italic">
          BOOKIIFY <span className="text-indigo-500 text-sm not-italic">ADM</span>
        </h1>
        <button
          onClick={() => onMobileClose?.()}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => onMobileClose?.()}
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
