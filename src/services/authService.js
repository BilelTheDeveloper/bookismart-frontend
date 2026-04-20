import API from "../api/config";

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
 */
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  
  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }
  
  return response.data;
};

/**
 * 4. Finalizes the 5-step registration process.
 * ADVANCED FIX: Detects if data is already FormData or needs packaging.
 */
export const registerUser = async (userData) => {
  let payload;

  // If Step5Submit already sent a FormData instance, use it directly
  if (userData instanceof FormData) {
    payload = userData;
  } else {
    // Fallback for standard object data
    payload = new FormData();
    Object.keys(userData).forEach((key) => {
      // Map 'video' from state to 'livenessVideo' for the backend
      if (key === 'video') {
        payload.append('livenessVideo', userData[key]);
      } else {
        payload.append(key, userData[key]);
      }
    });
  }

  console.log("🚀 Submitting Secure Multipart Payload to Cloudinary...");

  // IMPORTANT: We do NOT set 'Content-Type' manually. 
  // Let the browser set it with the correct boundary.
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
 * 6. Logout
 */
export const logout = async () => {
  try {
    // Optional: await API.post("/auth/logout"); 
  } finally {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
};