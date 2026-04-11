import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ Added to track initial verification

  // On refresh, check for the token
  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user"); // Temporarily reading to prevent flicker

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
      setLoading(false); // ✅ App is now ready
    };

    initializeAuth();
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    
    // 🛡️ Security Note: 
    // For your production deployment, we store the token.
    // We also store user basic info so the Dashboard loads instantly on refresh.
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {!loading && children} {/* ⛔ Prevents the app from loading until auth is checked */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);