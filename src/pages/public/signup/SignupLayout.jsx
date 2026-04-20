import React, { useState } from "react";
import Step1Global from "./Step1Global";
import Step2OTP from "./Step2OTP";
import Step3Password from "./Step3Password";
import Step4KYC from "./Step4KYC";
import Step5Submit from "./Step5Submit";

const SignupLayout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // --- Step 1 & 3 Data ---
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    category: "",
    ville: "",
    password: "",
    
    // --- Step 4 KYC Files (Flattened for Auth Service Sync) ---
    // These must be null initially so we can check if they exist before appending
    idFront: null,
    idBack: null,
    livenessVideo: null,
  });

  // Navigation Logic
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="flex min-h-screen bg-white">
      {/* --- LEFT SIDE: THE BRANDING --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center p-12">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-slate-900/80 z-10" />

        <div className="relative z-20 max-w-lg text-white">
          <h1 className="text-6xl font-black leading-tight mb-6">
            Grow your business <br />
            <span className="text-indigo-400">smarter.</span>
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed">
            Join the 1,000+ Tunisian professionals using Bookiify to automate their bookings and scale their revenue.
          </p>
          
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-3xl font-bold">90 Days</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Free Trial</p>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <p className="text-3xl font-bold">No-Code</p>
              <p className="text-slate-400 text-sm uppercase tracking-widest">Setup</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE ACTION ZONE --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-12 flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`h-2 w-8 rounded-full transition-all duration-500 ${
                  step <= currentStep ? "bg-indigo-600" : "bg-slate-200"
                }`} />
                {step < 5 && <div className="w-2" />}
              </div>
            ))}
          </div>

          {/* Step Dynamic Rendering */}
          <div className="transition-all duration-300">
            {currentStep === 1 && (
              <Step1Global formData={formData} setFormData={setFormData} onNext={nextStep} />
            )}
            {currentStep === 2 && (
              <Step2OTP formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
            )}
            {currentStep === 3 && (
              <Step3Password formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
            )}
            {currentStep === 4 && (
              <Step4KYC formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />
            )}
            {currentStep === 5 && (
              <Step5Submit formData={formData} onPrev={prevStep} />
            )}
          </div>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account? <a href="/login" className="text-indigo-600 font-bold hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;