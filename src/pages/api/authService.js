import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Ensure this matches your server port
});

export const authService = {
  submitStepOne: (formData) => {
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("businessName", formData.businessName);
    data.append("category", formData.category);
    data.append("city", formData.city);
    if (formData.profilePic) data.append("profilePic", formData.profilePic);
    return API.post("/step-1", data);
  },

  verifyOtp: (userId, phoneOtp, emailOtp) => {
    return API.post("/step-2", { userId, phoneOtp, emailOtp });
  },

  setPassword: (userId, password, confirmPassword) => {
    return API.post("/step-3", { userId, password, confirmPassword });
  },

  uploadIdentity: (userId, formData) => {
    const data = new FormData();
    data.append("userId", userId);
    if (formData.idFront) data.append("idFront", formData.idFront);
    if (formData.idBack) data.append("idBack", formData.idBack);
    if (formData.livePhoto) data.append("livePhoto", formData.livePhoto);
    return API.post("/step-4", data);
  },

  finalizeRegistration: (userId, agreedToTerms) => {
    return API.post("/step-5", { userId, agreedToTerms: true });
  }
};