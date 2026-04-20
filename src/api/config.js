import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for HttpOnly Refresh Tokens
});

/**
 * 🛡️ REQUEST INTERCEPTOR
 * Automatically adds the Device Fingerprint to every request.
 * This satisfies the 'x-device-fingerprint' check in your backend.
 */
API.interceptors.request.use((config) => {
  // We recreate the fingerprint logic on the frontend side 
  // or use a unique ID stored in localStorage for this device.
  let deviceId = localStorage.getItem("device_fingerprint");
  
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Generate a unique ID for this browser
    localStorage.setItem("device_fingerprint", deviceId);
  }

  config.headers["x-device-fingerprint"] = deviceId;

  // Add Access Token if it exists in memory
  const token = localStorage.getItem("accessToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * 🛡️ RESPONSE INTERCEPTOR
 * The "Silent Refresh" Engine.
 * If a request fails with 401 (Expired), it tries to get a new token automatically.
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the /refresh route we built in the backend
        const { data } = await axios.post(
          `${API.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Store the new Access Token
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the session is truly dead
        localStorage.removeItem("accessToken");
        // Optional: window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;