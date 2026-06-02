import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Step0AccountType from "./Step0AccountType";
import Step1Global from "./Step1Global";
import Step2OTP from "./Step2OTP";
import Step3Password from "./Step3Password";
import { registerUser } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

const SignupLayout = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    accountType: "",
    organizationName: "",
    branchCount: "",
    teamSize: "",
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    category: "",
    ville: "",
    password: "",
    profilePic: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleRegister = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const data = new FormData();
      data.append("fullName",     formData.fullName);
      data.append("email",        formData.email.trim().toLowerCase());
      data.append("phone",        formData.phone);
      data.append("password",     formData.password);
      data.append("businessName", formData.businessName);
      data.append("category",     formData.category);
      data.append("ville",        formData.ville);
      data.append("accountType",  formData.accountType || "individual");
      if (formData.accountType === "organization") {
        data.append("organizationName", formData.organizationName || formData.businessName);
        if (formData.branchCount) data.append("branchCount", formData.branchCount);
        if (formData.teamSize)    data.append("teamSize",    formData.teamSize);
      }
      if (formData.profilePic) data.append("profilePic", formData.profilePic);

      const response = await registerUser(data);
      const { user } = response.data;

      loginUser(user);
      toast.success(`Welcome, ${user.fullName.split(" ")[0]}! Complete your KYC to unlock all features.`);
      navigate("/owner/dashboard");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 font-sans">

      {/* LEFT BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-slate-900/80 z-10" />
        <div className="relative z-20 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">BOOKIIFY</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-6">
            {t("signup.brandTitle")} <br /><span className="text-indigo-400">{t("signup.brandTitleHighlight")}</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            {t("signup.brandDesc")}
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">{t("signup.freeTrial")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("signup.freeTrialLabel")}</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">{t("signup.noCode")}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t("signup.noCodeLabel")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50 dark:bg-slate-900 relative">

        <div className="w-full max-w-md">

          {/* Progress bar — 4 steps */}
          <div className="mb-12 flex items-center gap-2">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  step <= currentStep ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="transition-all duration-300">
            {currentStep === 0 && (
              <Step0AccountType formData={formData} setFormData={setFormData} onNext={nextStep} />
            )}
            {currentStep === 1 && (
              <Step1Global formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
            )}
            {currentStep === 2 && (
              <Step2OTP formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
            )}
            {currentStep === 3 && (
              <Step3Password
                formData={formData}
                setFormData={setFormData}
                onPrev={prevStep}
                onSubmit={handleRegister}
                submitting={submitting}
                submitError={submitError}
              />
            )}
          </div>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">
            {t("signup.haveAccount")}{" "}
            <a href="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline">{t("signup.signIn")}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;
