import axios from "axios";

/**
 * 🔒 ADVANCED API CONFIGURATION (HttpOnly Cookie Edition)
 * Synchronized with Backend Security Version: 2026.1.4
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // 🚨 CRITICAL: This allows the browser to send HttpOnly cookies (access & refresh)
  // and receive them from the backend on every request.
  withCredentials: true, 
});

/**
 * 🛡️ DEVICE FINGERPRINT ENGINE
 * Generates a persistent hardware-linked ID to prevent Token Hijacking.
 */
const getBrowserFingerprint = () => {
  let deviceId = localStorage.getItem("device_fingerprint");
  
  if (!deviceId) {
    deviceId = `${crypto.randomUUID()}-${Date.now()}`;
    localStorage.setItem("device_fingerprint", deviceId);
  }
  return deviceId;
};

// Queue for handling multiple 401 errors during a refresh cycle
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

/**
 * 🛡️ REQUEST INTERCEPTOR
 * Injects Security Headers. Note: Authorization header is REMOVED 
 * because the token is now handled automatically via HttpOnly cookies.
 */
API.interceptors.request.use(
  (config) => {
    // Inject Fingerprint (Matches backend requirement for device binding)
    config.headers["x-device-fingerprint"] = getBrowserFingerprint();
    
    // 💡 Note: We no longer pull accessToken from localStorage.
    // The browser automatically attaches the 'accessToken' cookie.
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🛡️ RESPONSE INTERCEPTOR
 * The "Silent Refresh" Engine. Works with HttpOnly cookies.
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Detect 401 (Expired) - The backend sends this if the accessToken cookie is dead
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
        /**
         * 🔄 SILENT REFRESH
         * The backend will read the 'refreshToken' cookie, verify it,
         * and set NEW 'accessToken' and 'refreshToken' cookies.
         */
        await API.post("/auth/refresh", {});

        processQueue(null);
        isRefreshing = false;

        // Retry the original request (it will now automatically include the new cookie)
        return API(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // If refresh fails, the session is dead. Clean up local UI data.
        localStorage.removeItem("user");
        localStorage.removeItem("device_fingerprint");
        
        if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login?session=expired";
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 (Forbidden - Role mismatch)
    if (error.response?.status === 403) {
      console.warn("⛔ [Security Alert]: Access Denied to this resource.");
    }

    return Promise.reject(error);
  }
);

export default API;