import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On refresh, we verify the token (usually via an API check)
  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // Token is okay here if used with HttpOnly cookies later
    if (savedToken) {
      // In a real secure app, you'd call /api/me here to verify the user
      // For now, we keep the user object in state memory
      setToken(savedToken);
    }
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken); 
    // We DON'T save the full user object to localStorage anymore!
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);