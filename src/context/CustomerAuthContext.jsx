import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import CAPI from "../api/customerConfig";

const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer]         = useState(null);
  const [loading, setLoading]           = useState(true);
  const [isAuthenticated, setIsAuth]    = useState(false);

  const clearAuth = useCallback(() => {
    setCustomer(null);
    setIsAuth(false);
    localStorage.removeItem("customer");
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const cached = localStorage.getItem("customer");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCustomer(parsed);
          setIsAuth(true);
          setLoading(false);
        } catch {
          localStorage.removeItem("customer");
        }
      }

      const res = await CAPI.get("/customer/me");
      if (res.data?.customer) {
        const c = res.data.customer;
        setCustomer(c);
        setIsAuth(true);
        localStorage.setItem("customer", JSON.stringify(c));
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

  const loginCustomer = (customerData) => {
    setCustomer(customerData);
    setIsAuth(true);
    localStorage.setItem("customer", JSON.stringify(customerData));
  };

  const logoutCustomer = async () => {
    try {
      await CAPI.post("/customer/logout");
    } catch { /* ignore */ } finally {
      clearAuth();
      window.location.href = "/customer/login";
    }
  };

  const refreshCustomer = async () => {
    try {
      const res = await CAPI.get("/customer/me");
      if (res.data?.customer) {
        setCustomer(res.data.customer);
        localStorage.setItem("customer", JSON.stringify(res.data.customer));
      }
    } catch { clearAuth(); }
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, loading, isAuthenticated, loginCustomer, logoutCustomer, refreshCustomer }}>
      {!loading ? children : (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
          </div>
          <p className="mt-6 text-slate-400 font-bold tracking-widest text-xs uppercase">Authenticating</p>
        </div>
      )}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be inside CustomerAuthProvider");
  return ctx;
};
