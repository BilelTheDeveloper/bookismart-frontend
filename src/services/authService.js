import API from "../api/config";

/**
 * 🛡️ AUTH SERVICE - 2026 COOKIE-VAULT EDITION
 * Purpose: Manages all identity-related transactions.
 * Security: Uses the 'API' instance which automatically attaches 
 * device fingerprints and handles HttpOnly cookie synchronization.
 */

/**
 * 1. Sends an OTP to the specified target (Email or Phone)
 */
export const sendOTP = async (type, target) => {
  // Fingerprint is automatically added via Axios Interceptor
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
 */
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  
  // 💡 Security Note: Access/Refresh tokens are now handled by the browser.
  // We only return the user data to the AuthContext.
  return response.data;
};

/**
 * 4. Multi-Step Registration (Multipart/Form-Data)
 * Handles high-fidelity files like Liveness Videos and Profile Images.
 */
export const registerUser = async (userData) => {
  let payload;

  if (userData instanceof FormData) {
    payload = userData;
  } else {
    payload = new FormData();
    Object.keys(userData).forEach((key) => {
      // Map frontend keys to backend expectations for liveness checks
      if (key === 'video' || key === 'livenessVideo') {
        payload.append('livenessVideo', userData[key]);
      } else if (userData[key] !== undefined && userData[key] !== null) {
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
 * 5. Identity & Onboarding Status Check
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
 */
export const logout = async () => {
  try {
    // 🛡️ Notifies backend to use res.clearCookie() and clear Redis blacklists
    await API.post("/auth/logout"); 
  } catch (err) {
    console.warn("Logout notification failed; session may already be dead.");
  } finally {
    // 100% Cleanup
    localStorage.removeItem("user");
    
    // 🔥 SECURITY: Reset the memory state of the entire app
    window.location.href = "/login?logout=success";
  }
};

/**
 * 8. Utility: Get Current User Role (Fail-Safe Edition)
 */
export const getCurrentUserRole = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined") return null;
    
    const user = JSON.parse(userStr);
    return user?.role || null;
  } catch (error) {
    console.error("AuthService: Role parsing failed. Clearing corrupted storage.");
    localStorage.removeItem("user");
    return null;
  }
};