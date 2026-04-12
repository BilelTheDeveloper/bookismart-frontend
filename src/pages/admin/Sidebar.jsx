import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Logic to open/close on mobile

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
    <>
      {/* 📱 Mobile Toggle Button - Only visible on small screens */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 left-4 z-[60] p-2 bg-slate-900 text-white rounded-lg border border-slate-700"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 🚀 Sidebar Wrapper */}
      <aside className={`
        ${isOpen ? 'w-64' : 'w-20 lg:w-64'} 
        transition-all duration-300 ease-in-out
        h-screen bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 sticky top-0 z-50
      `}>
        
        {/* Logo Section */}
        <div className="p-6 lg:p-8 flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-black">
            B
          </div>
          <span className={`text-xl font-black tracking-tight text-white transition-opacity duration-300 ${!isOpen && 'opacity-0 lg:opacity-100'}`}>
            Bookismart
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 lg:px-4 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false); // Close on mobile after click
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
                title={item.label}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className={`whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'opacity-0 lg:opacity-100 hidden lg:block'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all group"
            title="Sign Out"
          >
            <div className="flex-shrink-0">
              <LogOut size={20} />
            </div>
            <span className={`whitespace-nowrap transition-opacity duration-300 ${!isOpen && 'opacity-0 lg:opacity-100 hidden lg:block'}`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* 🌫️ Overlay for Mobile - Closes sidebar when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;