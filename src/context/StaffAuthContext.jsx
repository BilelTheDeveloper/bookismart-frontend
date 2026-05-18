import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import SAPI from "../api/staffConfig";

const StaffAuthContext = createContext();

const verifyStaffMe = async () => {
  try {
    const res = await SAPI.get("/staff/portal/me");
    return res.data?.staff || null;
  } catch {
    return null;
  }
};

export const StaffAuthProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearAuth = useCallback(() => {
    setStaff(null);
    setIsAuthenticated(false);
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const verified = await verifyStaffMe();
      if (verified) {
        setStaff(verified);
        setIsAuthenticated(true);
      } else {
        clearAuth();
      }
    } catch {
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const loginStaff = (staffData) => {
    setStaff(staffData);
    setIsAuthenticated(true);
  };

  const logoutStaff = async () => {
    try {
      await SAPI.post("/staff/portal/logout");
    } catch { /* silent */ }
    finally {
      clearAuth();
      window.location.href = "/staff/login";
    }
  };

  const refreshStaff = async () => {
    const updated = await verifyStaffMe();
    if (updated) {
      setStaff(updated);
      setIsAuthenticated(true);
    } else {
      clearAuth();
    }
  };

  const value = { staff, loading, isAuthenticated, loginStaff, logoutStaff, refreshStaff };

  return (
    <StaffAuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600" />
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 opacity-25" />
          </div>
        </div>
      )}
    </StaffAuthContext.Provider>
  );
};

export const useStaffAuth = () => {
  const ctx = useContext(StaffAuthContext);
  if (!ctx) throw new Error("useStaffAuth must be used within StaffAuthProvider");
  return ctx;
};
