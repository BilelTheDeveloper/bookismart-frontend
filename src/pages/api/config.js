import axios from "axios";

/**
 * 🛠️ API CONFIGURATION
 * We use import.meta.env.VITE_API_URL which pulls from your .env file.
 * This is more secure and flexible than hardcoding the URL.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🛡️ AUTH INTERCEPTOR
 * Automatically attaches the JWT token to the headers of every request.
 * This allows the backend to identify the Merchant securely.
 */
API.interceptors.request.use(
  (config) => {
    // We still pull the token from localStorage for persistence across refreshes
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
 * 🚨 RESPONSE INTERCEPTOR (Security Addition)
 * If the backend returns a 401 (Unauthorized), it means the token expired.
 * We should log the user out to keep the app secure.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage and redirect if the session is dead
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;