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
 * CRITICAL FIX: Ensure field names match the Joi Validator and Multer Routes.
 */
export const registerUser = async (userData) => {
  const formData = new FormData();

  // --- TEXT FIELDS (Must match Joi Validator exactly) ---
  formData.append("fullName", userData.fullName);
  formData.append("email", userData.email);
  formData.append("phone", userData.phone);
  formData.append("password", userData.password);
  formData.append("businessName", userData.businessName);
  formData.append("category", userData.category);
  formData.append("ville", userData.ville);

  // --- FILE FIELDS (Must match upload.fields in authRoutes.js) ---
  if (userData.idFront) {
    formData.append("idFront", userData.idFront);
  }
  if (userData.idBack) {
    formData.append("idBack", userData.idBack);
  }
  if (userData.livenessVideo) {
    // Ensuring the blob is correctly named for the server
    formData.append("livenessVideo", userData.livenessVideo, "liveness.webm");
  }

  // Debugging: View the payload in the console before sending
  console.log("🚀 Submitting Registration Payload...");

  return await API.post("/auth/register", formData);
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