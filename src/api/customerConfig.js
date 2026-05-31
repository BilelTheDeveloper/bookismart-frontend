import axios from "axios";

const CAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend-ixlp.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getBrowserFingerprint = () => {
  let id = localStorage.getItem("device_fingerprint");
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    id = `${crypto.randomUUID()}-${Date.now()}`;
    localStorage.setItem("device_fingerprint", id);
  }
  return id;
};

CAPI.interceptors.request.use((config) => {
  config.headers["x-device-fingerprint"] = getBrowserFingerprint();
  const method = (config.method || "get").toUpperCase();
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const csrf = sessionStorage.getItem("csrf_token");
    if (csrf) config.headers["x-csrf-token"] = csrf;
  }
  return config;
});

let isRefreshing = false;

CAPI.interceptors.response.use(
  (res) => {
    const csrf = res?.data?.csrfToken;
    if (csrf) sessionStorage.setItem("csrf_token", csrf);
    return res;
  },
  async (error) => {
    const code = error.response?.data?.code;
    if (code === "TOKEN_EXPIRED" && !error.config._retry && !isRefreshing) {
      error.config._retry = true;
      isRefreshing = true;
      try {
        await CAPI.post("/customer/refresh");
        isRefreshing = false;
        return CAPI(error.config);
      } catch {
        isRefreshing = false;
        localStorage.removeItem("customer");
        window.location.href = "/customer/login";
      }
    }
    if (code === "ACCOUNT_INACTIVE" || code === "REJECTED") {
      localStorage.removeItem("customer");
      window.location.href = "/customer/login";
    }
    return Promise.reject(error);
  }
);

export default CAPI;
