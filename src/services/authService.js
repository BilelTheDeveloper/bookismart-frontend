import API from "../api/config";

/**
 * 🛡️ AUTH SERVICE - 2026 SECURITY CORE
 * All calls are routed through the secure API instance (Vercel -> Render).
 */

/**
 * 1. Sends an OTP to the specified target (Email or Phone)
 */
export const sendOTP = async (type, target) => {
  return await API.post("/auth/send-otp", { type, target });
};

/**
 * 2. Verifies the OTP code provided by the user
 */
export const verifyOTP = async (type, target, code) => {
  return await API.post("/auth/verify-otp", { type, target, code });
};

/**
 * 3. Secure Login & Session Initialization
 * Implements Role Detection and Access Token Persistence.
 */
export const login = async (credentials) => {
  // We send sanitized email/password to the fortress
  const response = await API.post("/auth/login", credentials);
  
  if (response.data.accessToken) {
    // We store the token for the Interceptor to pick it up
    localStorage.setItem("accessToken", response.data.accessToken);
    
    // Optional: Store non-sensitive user info for UI speed (Role/Name)
    localStorage.setItem("user_role", response.data.user.role);
  }
  
  return response.data;
};

/**
 * 4. Finalizes the 5-step registration process.
 * ADVANCED: Handles Multipart/Form-Data for Images, Videos, and JSON.
 */
export const registerUser = async (userData) => {
  let payload;

  // If data is already a FormData instance (preferred for Step 5), use it
  if (userData instanceof FormData) {
    payload = userData;
  } else {
    // Fallback: Manually build FormData if an object is passed
    payload = new FormData();
    Object.keys(userData).forEach((key) => {
      // Direct mapping to backend field expectations
      if (key === 'video' || key === 'livenessVideo') {
        payload.append('livenessVideo', userData[key]);
      } else {
        payload.append(key, userData[key]);
      }
    });
  }

  console.log("🚀 Initializing Secure Identity Upload...");

  // Note: We don't set boundaries; Browser handles it automatically for multipart
  return await API.post("/auth/register", payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

/**
 * 5. Identity Verification Status
 * Used to check if the Admin has approved the account.
 */
export const checkOnboardingStatus = async () => {
  return await API.get("/auth/onboarding-status");
};

/**
 * 6. Admin: Review & Decision Logic
 * Used by the Admin Dashboard to Approve/Reject applications.
 */
export const reviewProfessional = async (userId, action, reason) => {
  return await API.patch(`/auth/review-user/${userId}`, { action, reason });
};

/**
 * 7. Secure Logout
 * Wipes local identity and notifies the server to kill the Refresh Cookie.
 */
export const logout = async () => {
  try {
    // Notify backend to clear HttpOnly Refresh Cookie
    await API.post("/auth/logout"); 
  } catch (err) {
    console.warn("Server-side session already expired.");
  } finally {
    // Local Wipe
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_role");
    // Redirect to entry point
    window.location.href = "/login";
  }
};

/**
 * 8. Utility: Get Current User Role
 * Helps the Route Guards decide where to send the user.
 */
export const getCurrentUserRole = () => {
  return localStorage.getItem("user_role");
};