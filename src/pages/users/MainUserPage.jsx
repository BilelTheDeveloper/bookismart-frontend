import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OwnerSidebar from "../../components/user/OwnerSidebar"; // Reuse your sidebar or create a specific OwnerSidebar
import { Bell, Search, User, LogOut, LayoutDashboard, Calendar, Settings } from "lucide-react";

const MainUserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /**
   * 🖼️ CLOUDINARY URL HELPER
   * Checks if the path is a full Cloudinary URL or a local path
   */
  const getProfileImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path; // Use Cloudinary URL directly
    return `${API_URL}/${path.replace(/\\/g, '/')}`; // Fallback for local storage
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 🚀 Sidebar Left */}
      <OwnerSidebar />

      <div className="flex-1 flex flex-col">
        {/* 🎩 Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings or clients..." 
              className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-10 w-[1px] bg-slate-100 mx-2"></div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">{user.fullName}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{user.businessName}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform"
              >
                {/* 🛡️ Updated Cloudinary Logic for Profile Image */}
                <img 
                  src={getProfileImageUrl(user.profilePicUrl)} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </button>
            </div>
          </div>
        </header>

        {/* 🎭 Page Content Injector */}
        <main className="p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainUserPage;