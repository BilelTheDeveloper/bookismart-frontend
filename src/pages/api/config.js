import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
 * 🚨 UPDATED RESPONSE INTERCEPTOR
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      
      // 1. Don't kick the user if they are already trying to login!
      const isLoginRequest = error.config.url.includes("/login");
      
      if (!isLoginRequest) {
        console.warn("🔐 Session expired or unauthorized. Redirecting...");
        
        // 2. Only clear and redirect if we aren't already on the login page
        if (window.location.pathname !== "/login") {
          localStorage.removeItem("token");
          localStorage.removeItem("admin"); // Clear admin data too
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;