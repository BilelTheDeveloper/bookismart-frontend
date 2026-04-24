import axios from "axios";

/**
 * 🔒 ULTRA-SECURE API CONFIGURATION (Enterprise Edition)
 * Bridges the gap between browser cookies and Redis-backed Backend Guards.
 */
const API = axios.create({
  // SYNC: Matches your Render deployment exactly
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // 🚨 CRITICAL: Allows browser to send/receive secure HttpOnly cookies automatically.
  withCredentials: true, 
});

/**
 * 🛡️ HARDENED DEVICE FINGERPRINT ENGINE
 * Resolves UUID persistence and handles edge-case string corruption.
 */
const getBrowserFingerprint = () => {
  let deviceId = localStorage.getItem("device_fingerprint");
  
  // 🚨 SECURITY FIX: Check for 'undefined' or 'null' strings from previous session bugs
  if (!deviceId || deviceId === "undefined" || deviceId === "null") {
    deviceId = `${crypto.randomUUID()}-${Date.now()}`;
    localStorage.setItem("device_fingerprint", deviceId);
  }
  return deviceId;
};

// Queue management for token refresh synchronization
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * 🛡️ REQUEST INTERCEPTOR: Fingerprint Injection
 */
API.interceptors.request.use(
  (config) => {
    // Every request carries the "Identity Binding" for the Redis/Hardware check
    config.headers["x-device-fingerprint"] = getBrowserFingerprint();
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🛡️ RESPONSE INTERCEPTOR: Precision Security Handling
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 🚨 EMERGENCY BREAK: Prevent infinite loops if /refresh itself fails
    if (originalRequest.url === "/auth/refresh" || originalRequest.url.includes("refresh")) {
      isRefreshing = false;
      return Promise.reject(error);
    }

    const responseData = error.response?.data;
    const errorCode = responseData?.code; 

    /**
     * 🚩 CASE 1: Session Expired (TOKEN_EXPIRED)
     * Attempt silent token rotation.
     */
    if (errorCode === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post("/auth/refresh", {});
        processQueue(null);
        isRefreshing = false;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // Cleanup local UI state
        localStorage.removeItem("user");
        if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login?session=expired";
        }
        return Promise.reject(refreshError);
      }
    }

    /**
     * 🚩 CASE 2: Security Breach / Revocation
     * (TOKEN_REVOKED, TOKEN_INVALID, FINGERPRINT_MISMATCH, etc.)
     */
    const criticalSecurityCodes = [
        'TOKEN_REVOKED', 
        'TOKEN_INVALID', 
        'FINGERPRINT_MISMATCH', 
        'TOKEN_MISSING',
        'FINGERPRINT_MISSING'
    ];

    if (criticalSecurityCodes.includes(errorCode)) {
      console.error(`🚨 [Security Alert]: ${errorCode}. Session terminated by Vault.`);
      
      // 🛡️ SIGNAL: Notify AuthContext to wipe state immediately
      window.dispatchEvent(new Event("auth-security-breach"));
      
      localStorage.removeItem("user");
      
      if (!window.location.pathname.includes('/login')) {
          window.location.href = "/login?reason=security_violation";
      }
    }

    /**
     * 🚩 CASE 3: Account Status Restriction
     */
    if (errorCode === 'ACCOUNT_RESTRICTED') {
        window.location.href = "/onboarding-status";
    }

    /**
     * 🚩 CASE 4: Forbidden Role (403)
     */
    if (error.response?.status === 403 && errorCode === 'FORBIDDEN') {
      if (!window.location.pathname.includes('/unauthorized')) {
          window.location.href = "/unauthorized";
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 🔑 SECURITY UTILITY: verifyMe
 */
export const verifyMe = async () => {
    try {
        const response = await API.get("/auth/verify-me");
        return response.data.user; 
    } catch (error) {
        return null;
    }
};

export default API;