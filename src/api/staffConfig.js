import axios from "axios";

const SAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend-kcnn.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getBrowserFingerprint = () => {
  let deviceId = localStorage.getItem("device_fingerprint");
  if (!deviceId || deviceId === "undefined" || deviceId === "null" || deviceId.trim() === "") {
    deviceId = `${crypto.randomUUID()}-${Date.now()}`;
    localStorage.setItem("device_fingerprint", deviceId);
  }
  return deviceId;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

SAPI.interceptors.request.use((config) => {
  config.headers["x-device-fingerprint"] = getBrowserFingerprint();
  return config;
});

SAPI.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const code = error.response?.data?.code;

    if (originalRequest.url.includes("/staff/portal/refresh")) {
      isRefreshing = false;
      return Promise.reject(error);
    }

    if (code === "TOKEN_EXPIRED" && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(() => SAPI(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await SAPI.post("/staff/portal/refresh", {});
        processQueue(null);
        isRefreshing = false;
        return SAPI(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr);
        isRefreshing = false;
        if (!window.location.pathname.includes("/staff/login")) {
          window.location.replace("/staff/login?reason=session_expired");
        }
        return Promise.reject(refreshErr);
      }
    }

    const securityCodes = ["TOKEN_REVOKED", "TOKEN_INVALID", "FINGERPRINT_MISMATCH"];
    if (securityCodes.includes(code)) {
      if (!window.location.pathname.includes("/staff/login")) {
        window.location.replace("/staff/login?reason=security_violation");
      }
    }

    return Promise.reject(error);
  }
);

export default SAPI;
