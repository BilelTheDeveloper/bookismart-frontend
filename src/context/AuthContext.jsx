import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyMe } from "../api/config"; // Path to your API config file

const AuthContext = createContext();

/**
 * 🛡️ ULTRA-PRO AUTH PROVIDER
 * Purpose: Centralizes identity and prevents LocalStorage manipulation.
 * Logic: Bypasses browser storage to use real-time Backend verification.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔄 INITIALIZE: Verify user identity on every hard refresh/mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // We call the secure /verify-me endpoint we built earlier
        const verifiedUser = await verifyMe();
        
        if (verifiedUser) {
          setUser(verifiedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * 🔑 LOGIN HANDLER
   * Called after the login API request is successful.
   */
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Note: We still update localStorage for UI convenience (like showing a name),
    // but the SECURITY guards will NOT use that storage.
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * 🚪 LOGOUT HANDLER
   */
  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, loginUser, logoutUser }}>
      {!loading ? children : (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium tracking-tight">Securing Session...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// 👑 CUSTOM HOOK: useAuth
// Allows any component to access user data safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};