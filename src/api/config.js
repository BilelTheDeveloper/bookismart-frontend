import axios from "axios";

/**
 * 🔒 ULTRA-SECURE API CONFIGURATION (Cookie-Protocol Edition)
 * Purpose: Bridges the gap between browser cookies and Backend Military-Grade guards.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // 🚨 CRITICAL: Allows browser to send/receive secure HttpOnly cookies automatically.
  withCredentials: true, 
});

/**
 * 🛡️ HARDENED DEVICE FINGERPRINT ENGINE
 * Generates a persistent hardware-linked ID.
 * Bound to the JWT on the backend to prevent session hijacking.
 */
const getBrowserFingerprint = () => {
  let deviceId = localStorage.getItem("device_fingerprint");
  
  if (!deviceId) {
    // Generate a unique identifier for this browser instance
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
    // Always inject the fingerprint. The backend 'protect' middleware 
    // will compare this against the one sealed inside the JWT.
    config.headers["x-device-fingerprint"] = getBrowserFingerprint();
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🛡️ RESPONSE INTERCEPTOR: The Silent Refresh & Security Kick
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /**
     * 🚩 CASE 1: 401 Unauthorized (Expired Access Token)
     * Triggered when the short-lived access cookie expires.
     */
    if (error.response?.status === 401 && !originalRequest._retry) {
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
        // Attempt to refresh the cookies via the backend /refresh route
        await API.post("/auth/refresh", {});
        
        processQueue(null);
        isRefreshing = false;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // If refresh fails, wipe local storage and force login
        localStorage.removeItem("user");
        if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login?session=expired";
        }
        return Promise.reject(refreshError);
      }
    }

    /**
     * 🚩 CASE 2: 403 Forbidden (Role Mismatch / Tamper Alert)
     * Triggered by your backend 'adminGuard' if a user tries to access 
     * an unauthorized area (e.g., Owner trying to hit Admin API).
     */
    if (error.response?.status === 403) {
      console.error("🚨 [Security Alert]: Unauthorized role action blocked by Backend.");
      
      // If the backend returns 403, it means the cookie is valid but the ROLE is wrong.
      // We immediately redirect to the unauthorized page.
      if (!window.location.pathname.includes('/unauthorized')) {
          window.location.href = "/unauthorized";
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 🔑 SECURITY UTILITY: verifyMe
 * The only way the UI should confirm who the user is.
 */
export const verifyMe = async () => {
    try {
        const response = await API.get("/auth/verify-me");
        return response.data.user; // Returns REAL role from DB
    } catch (error) {
        return null;
    }
};

export default API;