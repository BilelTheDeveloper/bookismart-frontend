import axios from "axios";

/**
 * 🛠️ API CONFIGURATION
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // ✅ CRITICAL: This allows the browser to send the HttpOnly 'token' cookie
  // between your Vercel frontend and Render backend.
  withCredentials: true, 
});

/**
 * 🛡️ AUTH INTERCEPTOR
 * Clean & simple. The browser handles the cookie handshake automatically.
 */
API.interceptors.request.use(
  (config) => {
    // No more manual token attachment. Pure security.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 🚨 RESPONSE INTERCEPTOR
 * Handles 401 errors (unauthorized) by kicking the user to login.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipKick = error.config?.skipKick;

    // If the server says 401 (Unauthorized/Token Expired)
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config.url.includes("/login");

      // We don't kick if it's the login request failing or if skipKick is true
      if (!isLoginRequest && !skipKick) {
        console.warn("🔐 Session invalid. Redirecting to login...");

        // Only redirect if we aren't already on the login page to avoid loops
        if (window.location.pathname !== "/login") {
          // 🔥 ZERO LOCALSTORAGE: We clear everything just in case something stayed.
          localStorage.clear(); 
          
          // Force a full refresh to the login page to clear RAM (AuthContext state)
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;