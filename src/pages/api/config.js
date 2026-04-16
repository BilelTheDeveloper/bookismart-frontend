import axios from "axios";

/**
 * 🛠️ API CONFIGURATION
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🛡️ AUTH INTERCEPTOR
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 🚨 RESPONSE INTERCEPTOR
 * Includes a 'skipKick' check to prevent unwanted redirects on specific pages.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the request configuration explicitly asked to skip the redirect kick
    const skipKick = error.config?.skipKick;

    if (error.response && error.response.status === 401) {
      // 1. Don't kick if it's a login attempt or if skipKick is enabled
      const isLoginRequest = error.config.url.includes("/login");

      if (!isLoginRequest && !skipKick) {
        console.warn("🔐 Session expired or unauthorized. Redirecting...");

        // 2. Only clear and redirect if we aren't already on the login page
        if (window.location.pathname !== "/login") {
          localStorage.removeItem("token");
          localStorage.removeItem("admin"); 
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;