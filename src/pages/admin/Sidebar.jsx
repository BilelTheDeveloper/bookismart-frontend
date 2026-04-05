import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Overview', 
      path: '/admin' 
    },
    { 
      icon: <Store size={20} />, 
      label: 'Merchants', 
      path: '/admin/merchants' 
    },
    { 
      icon: <ShieldCheck size={20} />, 
      label: 'KYC Verification', 
      path: '/admin/verification' 
    },
    { 
      icon: <CalendarCheck size={20} />, 
      label: 'Bookings', 
      path: '/admin/bookings' 
    },
    { 
      icon: <Users size={20} />, 
      label: 'Customers', 
      path: '/admin/customers' 
    },
    { 
      icon: <Settings size={20} />, 
      label: 'Settings', 
      path: '/admin/settings' 
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 sticky top-0">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">
          B
        </div>
        <span className="text-xl font-black tracking-tight text-white">Bookismart</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          // Check if the current URL matches the item path
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;