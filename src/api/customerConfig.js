import axios from "axios";

const CAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookismart-backend-kcnn.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;

CAPI.interceptors.response.use(
  (res) => res,
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
