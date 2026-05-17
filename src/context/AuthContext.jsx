import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API, { verifyMe } from "../api/config"; 

const AuthContext = createContext();

/**
 * 🛡️ ENTERPRISE AUTH PROVIDER (Redis + Fingerprint + Fast-Path Edition)
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * 🔄 CLEANUP UTILITY
   * Resets all local states to prevent "Ghost Sessions"
   */
  const clearAuthData = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("csrf_token");
  }, []);

  /**
   * 🔄 INITIALIZE: Hydrate-then-Verify Pattern
   * ⚡ This fixes the race condition: 
   * 1. Check localStorage first (Fast-Path) to unblock the UI.
   * 2. Verify with backend in the background to ensure session is still valid.
   */
  const initializeAuth = useCallback(async () => {
    try {
      // Single server call — httpOnly cookie is the session, no localStorage shortcut
      const verifiedUser = await verifyMe();
      if (verifiedUser) {
        setUser(verifiedUser);
        setIsAuthenticated(true);
      } else {
        clearAuthData();
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearAuthData();
      }
    } finally {
      setLoading(false);
    }
  }, [clearAuthData]);

  /**
   * 🛡️ SECURITY WATCHDOG
   * Listens for signals from the Axios Interceptor. If the interceptor
   * detects a security breach, it forces this context to reset.
   */
  useEffect(() => {
    const handleSecurityBreach = () => {
      clearAuthData();
    };

    window.addEventListener("auth-security-breach", handleSecurityBreach);
    initializeAuth();

    return () => window.removeEventListener("auth-security-breach", handleSecurityBreach);
  }, [initializeAuth, clearAuthData]);

  /**
   * 🔑 LOGIN HANDLER
   */
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  /**
   * 🚪 SECURE LOGOUT HANDLER
   * Blacklists the JTI in Redis via the backend.
   */
  const logoutUser = async () => {
    try {
      // 🛡️ API.post will automatically carry the x-device-fingerprint
      await API.post("/auth/logout");
    } catch {
      // silent — local cleanup proceeds regardless
    } finally {
      clearAuthData();
      window.location.href = "/login";
    }
  };

  /**
   * 🛠️ REFRESH STATE UTILITY
   */
  const refreshUser = async () => {
    const updatedUser = await verifyMe();
    if (updatedUser) {
      setUser(updatedUser);
      setIsAuthenticated(true);
    } else {
      clearAuthData();
    }
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