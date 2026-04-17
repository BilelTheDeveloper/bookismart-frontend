import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../pages/api/config'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🛡️ ADVANCED INITIALIZATION
   * Every time the app loads or refreshes, we ask the server: "Who is this user?"
   * The browser automatically sends the HttpOnly 'token' cookie.
   */
  useEffect(() => {
    const verifySession = async () => {
      try {
        // We call the 'me' endpoint to get the user profile via the cookie
        const res = await API.get("/auth/me", { skipKick: true });
        
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("🔒 Session: No valid security cookie found.");
        setUser(null);
      } finally {
        // ✅ CRITICAL: App is only "ready" after the backend responds
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  /**
   * 🔐 LOGIN
   * Saves user profile to RAM (state). Token is already handled by the Set-Cookie header.
   */
  const login = (userData) => {
    setUser(userData);
    // 🔥 REMOVED: No more localStorage.setItem("user")
  };

  /**
   * 🚪 LOGOUT
   * Tells the backend to expire the HttpOnly cookie and clears memory.
   */
  const logout = async () => {
    try {
      // Backend should clear the 'token' cookie on its side
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // 🧹 Cleanup RAM state
      setUser(null);
      // 🔥 REMOVED: localStorage.clear() - since it's already empty!
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {/* We hide the entire app until the server verifies the session. 
          This is what prevents the "kick-out" redirect loop. 
      */}
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
             <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-400 font-bold text-sm animate-pulse tracking-widest uppercase">Securing Session...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);