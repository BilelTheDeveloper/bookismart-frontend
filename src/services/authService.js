import API from "../api/config";

/**
 * 🛡️ AUTH SERVICE - 2026 COOKIE-VAULT EDITION
 * All calls are routed through the secure API instance (Vercel -> Render).
 * Tokens are now managed automatically by the browser via HttpOnly Cookies.
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
 * Logic: The backend sets 'accessToken' and 'refreshToken' as HttpOnly cookies.
 * We only return the user data to the component.
 */
export const login = async (credentials) => {
  // We send sanitized email/password to the fortress
  const response = await API.post("/auth/login", credentials);
  
  // 💡 Note: We NO LONGER manually store the accessToken in localStorage.
  // It is now an HttpOnly cookie that JavaScript cannot touch.
  
  return response.data;
};

/**
 * 4. Finalizes the 5-step registration process.
 * Handles Multipart/Form-Data for Images, Videos, and JSON.
 */
export const registerUser = async (userData) => {
  let payload;

  if (userData instanceof FormData) {
    payload = userData;
  } else {
    payload = new FormData();
    Object.keys(userData).forEach((key) => {
      if (key === 'video' || key === 'livenessVideo') {
        payload.append('livenessVideo', userData[key]);
      } else {
        payload.append(key, userData[key]);
      }
    });
  }

  return await API.post("/auth/register", payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

/**
 * 5. Identity Verification Status
 */
export const checkOnboardingStatus = async () => {
  return await API.get("/auth/onboarding-status");
};

/**
 * 6. Admin: Review & Decision Logic
 */
export const reviewProfessional = async (userId, action, reason) => {
  return await API.patch(`/auth/review-user/${userId}`, { action, reason });
};

/**
 * 7. Secure Logout
 * Logic: Tells the server to clear cookies and wipes the local UI state.
 */
export const logout = async () => {
  try {
    // 🛡️ Notifies backend to use res.clearCookie() for both tokens
    await API.post("/auth/logout"); 
  } catch (err) {
    console.warn("Server-side session already expired or unreachable.");
  } finally {
    // Local Cleanup: Remove only UI-related data
    localStorage.removeItem("user");
    
    // Redirect to entry point
    window.location.href = "/login";
  }
};

/**
 * 8. Utility: Get Current User Role
 * Logic: Pulls from the saved user object in localStorage.
 */
export const getCurrentUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};