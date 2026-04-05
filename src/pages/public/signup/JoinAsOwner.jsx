import React, { useState } from "react";
import { Link } from "react-router-dom";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const JoinAsOwner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePic: null,
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    city: "",
    phoneOtp: "",
    emailOtp: "",
    password: "",
    confirmPassword: "",
    idFront: null,
    idBack: null,
    livePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Final Logic for Submission
      console.log("Final Registration Data:", formData);
      setStep(6); // Move to Success Screen
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row pt-20 lg:pt-0">
      
      {/* 🌌 LEFT SIDE: Marketing & Trust */}
      <div className="lg:w-5/12 bg-slate-950 text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30" />
        
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">
            Booki<span className="text-indigo-500">smart</span>
          </span>
        </Link>

        <div className="relative z-10 my-20 lg:my-0">
          <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.3em]">
            {step <= 5 ? `Step ${step} of 5` : "Registration Complete"}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mt-4 leading-tight tracking-tighter">
            {step === 1 && <>Claim Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Smart Shop.</span></>}
            {step === 2 && <>Verify Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Identity.</span></>}
            {step === 3 && <>Secure Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Account.</span></>}
            {step === 4 && <>Verify <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Documents.</span></>}
            {step === 5 && <>Final <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Review.</span></>}
            {step === 6 && <>Welcome to the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ecosystem.</span></>}
          </h1>
          
          <p className="text-slate-400 mt-6 text-lg font-medium leading-relaxed">
            {step === 1 && "Join the first automated service ecosystem in Tunisia. It takes less than 60 seconds to set up your digital storefront."}
            {step >= 2 && step <= 5 && "Complete the security steps to ensure your business remains protected and verified on our platform."}
            {step === 6 && "Your application has been received and is currently being processed by our verification team."}
          </p>

          {step <= 5 && (
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎁</span>
                <div>
                  <h4 className="font-bold text-white">3-Month Free Trial</h4>
                  <p className="text-sm text-slate-500">Full access to all features. No credit card required.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">💳</span>
                <div>
                  <h4 className="font-bold text-white">Flouci Ready</h4>
                  <p className="text-sm text-slate-500">Secure digital payments directly to your wallet.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 text-slate-600 text-xs font-bold uppercase tracking-widest">
          © 2026 TunisiaSmart Ecosystem
        </div>
      </div>

      {/* 📝 RIGHT SIDE: The Form Shell */}
      <div className="lg:w-7/12 flex items-center justify-center p-8 lg:p-20 bg-slate-50">
        <div className="w-full max-w-lg bg-white p-10 lg:p-14 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {step <= 5 ? (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {step === 1 && "Create Your Account"}
                  {step === 2 && "Security Check"}
                  {step === 3 && "Set Password"}
                  {step === 4 && "Identity Check"}
                  {step === 5 && "Review Profile"}
                </h2>
                <p className="text-slate-500 font-medium mt-2">Let's get your business automated.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Dynamic Step Rendering */}
                {step === 1 && <StepOne formData={formData} handleChange={handleChange} />}
                {step === 2 && <StepTwo formData={formData} handleChange={handleChange} />}
                {step === 3 && <StepThree formData={formData} handleChange={handleChange} />}
                {step === 4 && <StepFour formData={formData} setFormData={setFormData} />}
                {step === 5 && <StepFive formData={formData} />}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={() => setStep(step - 1)} 
                      className="flex-1 py-4 border border-slate-200 text-slate-400 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    type="submit" 
                    className="flex-[2] bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm uppercase tracking-widest"
                  >
                    {step === 1 && "Continue to Security 🚀"}
                    {step === 2 && "Verify Codes →"}
                    {step === 3 && "Save Password 🔒"}
                    {step === 4 && "Confirm Identity 🤳"}
                    {step === 5 && "Submit Application ✅"}
                  </button>
                </div>

                {step === 1 && (
                  <p className="text-center text-xs text-slate-400 font-bold mt-4">
                    By joining, you agree to our <span className="text-slate-600 underline cursor-pointer">Terms of Service</span>.
                  </p>
                )}
              </form>
            </>
          ) : (
            /* STEP 6: SUCCESS SCREEN */
            <div className="text-center py-10 transition-all duration-700 animate-in zoom-in">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl shadow-emerald-100">
                ✓
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Application Sent!</h2>
              <p className="text-slate-500 font-medium leading-relaxed px-4">
                Great job, <span className="text-slate-900 font-black">{formData.fullName}</span>! Your business profile is now in the queue.
              </p>
              
              <div className="mt-8 p-6 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 inline-block">
                <p className="text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                  ⏳ Review Time: Maximum 24 Hours
                </p>
              </div>

              <p className="text-slate-400 text-xs mt-10 font-bold uppercase tracking-widest px-10">
                Check your email <br />
                <span className="text-indigo-600">{formData.email}</span> <br />
                for the confirmation link.
              </p>

              <Link 
                to="/" 
                className="mt-12 inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinAsOwner;