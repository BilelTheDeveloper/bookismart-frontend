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
      {/* 🚀 Sidebar Left 
          Note: Responsive handling (hiding/showing) is now managed internally 
          by the OwnerSidebar component's fixed/sticky logic.
      */}
      <OwnerSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 🎩 Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-30">
          
          {/* Spacer for Mobile: This makes room for the floating menu button inside OwnerSidebar */}
          <div className="w-12 lg:hidden"></div>

          {/* Search Bar - Responsive width & Hidden on very small mobile */}
          <div className="hidden sm:flex items-center gap-4 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 w-full max-w-[180px] md:max-w-96">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-600"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-6 ml-auto lg:ml-0">
            {/* Notifications */}
            <button className="relative w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 md:h-10 w-[1px] bg-slate-100 mx-1 md:mx-2"></div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-900 leading-none">{user.fullName}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">
                  {user.businessName || "Owner Account"}
                </p>
              </div>
              
              {/* Profile Image / Logout Trigger */}
              <button 
                onClick={logout}
                title="Click to Logout"
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform group relative shrink-0"
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

        {/* 🎭 Page Content Injector - Responsive Padding */}
        <main className="p-4 md:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainUserPage;