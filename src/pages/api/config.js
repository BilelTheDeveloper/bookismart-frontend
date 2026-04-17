import axios from "axios";

/**
 * 🛠️ API CONFIGURATION
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // ✅ NEW: Most important line for Security.
  // This tells the browser to send HttpOnly cookies (the token) with every request.
  withCredentials: true, 
});

/**
 * 🛡️ AUTH INTERCEPTOR
 * We no longer need to manually attach the "Bearer token" header 
 * because the browser does it automatically via Cookies.
 */
API.interceptors.request.use(
  (config) => {
    // We keep this block clean. No more localStorage.getItem("token")
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 🚨 RESPONSE INTERCEPTOR
 * Handles 401 errors (unauthorized) by cleaning up the frontend state.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipKick = error.config?.skipKick;

    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config.url.includes("/login");

      if (!isLoginRequest && !skipKick) {
        console.warn("🔐 Session expired or unauthorized. Redirecting...");

        // Only redirect if we aren't already on the login page
        if (window.location.pathname !== "/login") {
          // ✅ Cleanup: We only remove user data; the cookie is cleared by the backend or expires
          localStorage.removeItem("user"); // Clear user profile info
          localStorage.removeItem("admin"); 
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;