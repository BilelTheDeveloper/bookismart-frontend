import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API, { verifyMe } from "../api/config"; // 🛡️ Using our updated Enterprise API config

const AuthContext = createContext();

/**
 * 🛡️ ENTERPRISE AUTH PROVIDER (Redis + Fingerprint Edition)
 * Purpose: Centralizes identity and ensures the Frontend state 
 * perfectly mirrors the Backend/Redis security state.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * 🔄 INITIALIZE: Real-time Backend Verification
   * Every page refresh triggers a check against the JWT + Fingerprint + Redis Blacklist.
   */
  const initializeAuth = useCallback(async () => {
    try {
      const verifiedUser = await verifyMe();
      
      if (verifiedUser) {
        setUser(verifiedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      }
    } catch (error) {
      // If the interceptor hasn't already handled it, clean up here.
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * 🔑 LOGIN HANDLER
   * Called after authController.login successfully sets the HttpOnly cookies.
   */
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // LocalStorage is only for non-sensitive UI (Name, Avatar).
    // The "True" identity is stored in the Secure Cookies.
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * 🚪 SECURE LOGOUT HANDLER
   * Crucial: Tells the backend to blacklist the current JTI in Redis.
   */
  const logoutUser = async () => {
    try {
      // 🛡️ Call the protected logout route
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout notification to server failed, clearing local state anyway.");
    } finally {
      // Always clear local state regardless of server response
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      // Optional: Clear fingerprint on logout if you want a fresh ID next time
      // localStorage.removeItem("device_fingerprint"); 
      
      window.location.href = "/login";
    }
  };

  /**
   * 🛠️ REFRESH STATE UTILITY
   * Can be called manually if a profile update occurs.
   */
  const refreshUser = async () => {
    const updatedUser = await verifyMe();
    if (updatedUser) setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    loginUser,
    logoutUser,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-100 opacity-25"></div>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <p className="text-slate-800 font-bold text-lg tracking-tight">Security Vault</p>
            <p className="text-slate-500 text-sm">Verifying Enterprise Session...</p>
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