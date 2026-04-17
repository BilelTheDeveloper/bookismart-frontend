import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../pages/api/config'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🛡️ SESSION VERIFIER
   * Wrapped in useCallback so we can call it manually to refresh user data
   * (e.g., after a profile update or KYC submission).
   */
  const verifySession = useCallback(async () => {
    try {
      // { skipKick: true } prevents the Axios interceptor from redirecting 
      // if the user is just a guest visiting the landing page.
      const res = await API.get("/auth/me", { skipKick: true });
      
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      // 401 errors are expected here if the user isn't logged in yet
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  /**
   * 🔐 LOGIN
   * Receives the user object from the Login page after a successful POST.
   */
  const login = (userData) => {
    setUser(userData);
  };

  /**
   * 🚪 LOGOUT
   * Destroys the cookie on the server and resets the frontend RAM.
   */
  const logout = async () => {
    try {
      // Backend must have a route that does: res.clearCookie('token')
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      // Full refresh to login to ensure all state is wiped clean
      window.location.href = "/login";
    }
  };

  // 👑 Helper: Quick check for Admin privileges
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAdmin,
      refreshUser: verifySession // Allow components to refresh user data
    }}>
      {/* THIS IS THE FIX:
          We do not render the App routes until we know if the user is logged in.
          This prevents the ProtectedRoute from seeing 'null' and kicking the user.
      */}
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
             <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-400 font-bold text-sm animate-pulse tracking-widest uppercase">
               Securing Session...
             </p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};