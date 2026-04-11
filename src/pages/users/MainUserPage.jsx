import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OwnerSidebar from "../../components/user/OwnerSidebar"; 
import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // 🔐 Import useAuth

const MainUserPage = () => {
  const { user, logout, loading } = useAuth(); // 👈 Get user & logout from central state
  const navigate = useNavigate();

  /**
   * 🛡️ PROTECT ROUTE: 
   * If not loading and no user exists, kick to login.
   */
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  /**
   * 🖼️ CLOUDINARY URL HELPER
   * Cleaned to work in production without hardcoded localhost.
   */
  const getProfileImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150"; // Fallback image
    if (path.startsWith("http")) return path; 
    // If it's a relative path, we assume it's served from your backend URL
    return path; 
  };

  // While checking auth, show nothing or a loader to prevent "flashing" the login screen
  if (loading || !user) {
    return null; 
  }

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
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{user.businessName || "Owner Account"}</p>
              </div>
              
              {/* Profile Image / Logout Trigger */}
              <button 
                onClick={logout}
                title="Click to Logout"
                className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform group relative"
              >
                <img 
                  src={getProfileImageUrl(user.profilePicUrl)} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <LogOut size={16} className="text-white" />
                </div>
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