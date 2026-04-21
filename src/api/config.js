import axios from "axios";

/**
 * 🔒 ADVANCED API CONFIGURATION
 * Synchronized with Backend Security Version: 2026.1.3
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 CRITICAL: Allows HttpOnly Refresh Cookies
});

/**
 * 🛡️ DEVICE FINGERPRINT ENGINE
 * Generates a persistent hardware-linked ID to prevent Token Hijacking.
 */
const getBrowserFingerprint = () => {
  let deviceId = localStorage.getItem("device_fingerprint");
  
  if (!deviceId) {
    // Generate a unique high-entropy ID
    deviceId = `${crypto.randomUUID()}-${Date.now()}`;
    localStorage.setItem("device_fingerprint", deviceId);
  }
  return deviceId;
};

// Queue for handling multiple 401 errors at once
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
 * 🛡️ REQUEST INTERCEPTOR
 * Injects Authorization and Security Headers into every outgoing request.
 */
API.interceptors.request.use(
  (config) => {
    // 1. Inject Fingerprint (Matches backend requirement)
    config.headers["x-device-fingerprint"] = getBrowserFingerprint();

    // 2. Inject Access Token
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🛡️ RESPONSE INTERCEPTOR
 * The "Silent Refresh" Engine with Collision Protection.
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Detect 401 (Expired) and handle the Silent Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        // If a refresh is already in progress, wait in the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the /refresh route (Fingerprint is automatically added by the Request Interceptor above)
        const { data } = await axios.post(
          `${API.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Update global instance headers
        API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        
        processQueue(null, newToken);
        isRefreshing = false;

        // Retry the original request
        return API(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // If the refresh token is also expired, wipe the session
        localStorage.removeItem("accessToken");
        
        // Only redirect to login if we are not already there
        if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login?session=expired";
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 (Forbidden - AdminGuard rejection)
    if (error.response?.status === 403) {
      console.error("⛔ [Security Alert]: Unauthorized Access Blocked.");
      // You can trigger a notification here or redirect
    }

    return Promise.reject(error);
  }
);

export default API;