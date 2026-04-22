import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  UserCircle, 
  Settings as SettingsIcon, 
  LogOut, 
  Globe 
} from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "Owner Name",
    role: "owner",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Add any extra logout logic here (e.g., clearing cookies/context)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* --- SIDEBAR --- */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* --- MAIN CONTENT --- */}
      <main 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        
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

          {/* Right Action Icons & Profile Dropdown */}
          <div className="flex items-center gap-6">
            
            {/* Notification Icon */}
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* User Profile Info with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
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
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 uppercase">
                      {user.fullName?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>

                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180 text-slate-900" : ""}`} 
                />
              </div>

              {/* --- DROPDOWN MENU --- */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</p>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Active & Online
                    </p>
                  </div>

                  <Link 
                    to="/owner/profile" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Globe size={18} />
                    Online Web Profile
                  </Link>

                  <Link 
                    to="/owner/dashboard/settings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <SettingsIcon size={18} />
                    Settings
                  </Link>

                  <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 hover:transition-colors"
                  >
                    <LogOut size={18} />
                    Logout Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <div className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
           
              </h1>
              <p className="text-slate-500 text-sm font-medium">
               
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