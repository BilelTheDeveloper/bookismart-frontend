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
  
  // Save the Access Token for the Axios Interceptor to use
  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }
  
  return response.data;
};

/**
 * 4. Finalizes the 5-step registration process.
 * Matches Cloudinary field names: idFront, idBack, livenessVideo
 */
export const registerUser = async (userData) => {
  const formData = new FormData();

  // Append Text Fields
  formData.append("fullName", userData.fullName);
  formData.append("email", userData.email);
  formData.append("phone", userData.phone);
  formData.append("password", userData.password);
  formData.append("businessName", userData.businessName);
  formData.append("category", userData.category);
  formData.append("ville", userData.ville);

  // Append Profile Picture
  if (userData.profilePic) {
    formData.append("profilePic", userData.profilePic);
  }

  // Append KYC Documents (Field names must match backend)
  if (userData.idFront) {
    formData.append("idFront", userData.idFront);
  }
  if (userData.idBack) {
    formData.append("idBack", userData.idBack);
  }

  // Append Liveness Video
  if (userData.livenessVideo) {
    formData.append("livenessVideo", userData.livenessVideo, "liveness.webm");
  }

  // Note: Axios sets 'Content-Type: multipart/form-data' automatically for FormData
  return await API.post("/auth/register", formData);
};

/**
 * 5. Identity Verification Status (For the Redirect Lock)
 */
export const checkOnboardingStatus = async () => {
  return await API.get("/auth/onboarding-status");
};

/**
 * 6. Logout - Wipes the session
 */
export const logout = async () => {
  try {
    // Optional: await API.post("/auth/logout"); 
  } finally {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
};