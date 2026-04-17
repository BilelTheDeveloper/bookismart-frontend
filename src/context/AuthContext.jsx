import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/config'; // ✅ Ensure this points to your new Axios config

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🛡️ ADVANCED INITIALIZATION
   * Instead of reading LocalStorage, we ask the server to verify our cookie.
   */
  useEffect(() => {
    const verifySession = async () => {
      try {
        // We call a "me" or "validate" endpoint. 
        // The browser automatically sends the HttpOnly cookie.
        const res = await API.get("/auth/me", { skipKick: true });
        
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log("Session invalid or expired.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  /**
   * 🔐 LOGIN
   * We only save the user object. The token is handled by the browser cookie.
   */
  const login = (userData) => {
    setUser(userData);
    // We only store non-sensitive UI data in localStorage to prevent "flicker"
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  /**
   * 🚪 LOGOUT
   * We must tell the backend to clear the HttpOnly cookie.
   */
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Always cleanup frontend state regardless of backend success
      setUser(null);
      localStorage.removeItem("user");
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);