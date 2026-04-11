import axios from "axios";

// Determine if we are on localhost or production
const isLocal = window.location.hostname === "localhost";

const API = axios.create({
  // This switches automatically based on where the app is running
  baseURL: isLocal 
    ? "http://localhost:5000/api" 
    : "https://api.bookismart.tn/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛡️ AUTH INTERCEPTOR: Automatically adds the token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;