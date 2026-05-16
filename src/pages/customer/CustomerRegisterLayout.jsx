import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import CAPI from "../../api/customerConfig";
import StepOTP from "./steps/StepOTP";
import StepPassword from "./steps/StepPassword";
import StepKYC from "./steps/StepKYC";

const STEPS = [
  { id: "otp",      label: "Verification",       icon: "01" },
  { id: "password", label: "Set Password",        icon: "02" },
  { id: "kyc",      label: "Identity Check",      icon: "03" },
];

const CustomerRegisterLayout = () => {
  const { token }           = useParams();
  const navigate            = useNavigate();
  const [info, setInfo]     = useState(null);
  const [stage, setStage]   = useState("otp"); // otp | password | kyc | submitted
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await CAPI.get(`/customer/register/${token}`);
        if (res.data?.alreadyActive) { navigate("/customer/login"); return; }
        if (res.data?.data) {
          setInfo(res.data.data);
          setStage(res.data.data.stage || "otp");
        }
      } catch (err) {
        setError(err.response?.data?.message || "This registration link is invalid or has expired.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token, navigate]);

  const currentIdx = STEPS.findIndex(s => s.id === stage);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={36} className="animate-spin text-indigo-500" />
        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">Loading Secure Link…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔗</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Link Expired</h2>
        <p className="text-slate-400">{error}</p>
        <p className="text-slate-600 text-sm mt-4">Please contact your service provider for a new invitation.</p>
      </div>
    </div>
  );

  if (stage === "submitted") return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} className="text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Under Review</h2>
        <p className="text-slate-400 leading-relaxed">
          Your identity documents have been submitted successfully.<br />
          <strong className="text-slate-300">{info?.businessName}</strong> will review your profile and notify you by email once approved.
        </p>
        <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Submitted for</p>
          <p className="text-white font-black">{info?.businessName}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-2">
            {info?.businessName} — Client Registration
          </p>
          <h1 className="text-3xl font-black text-white">
            Welcome, {info?.fullName?.split(" ")[0]}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Complete all steps to activate your client account</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((step, idx) => {
            const isDone    = idx < currentIdx;
            const isActive  = idx === currentIdx;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all
                    ${isDone   ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : ""}
                    ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110" : ""}
                    ${!isDone && !isActive ? "bg-slate-800 text-slate-500 border border-slate-700" : ""}
                  `}>
                    {isDone ? <CheckCircle2 size={18} /> : step.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-indigo-400" : isDone ? "text-emerald-400" : "text-slate-600"}`}>
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`h-px w-16 mx-2 mb-5 transition-all ${idx < currentIdx ? "bg-emerald-500" : "bg-slate-800"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
          {stage === "otp"      && <StepOTP      token={token} email={info?.email} onSuccess={() => setStage("password")} />}
          {stage === "password" && <StepPassword token={token} onSuccess={() => setStage("kyc")} />}
          {stage === "kyc"      && <StepKYC      token={token} onSuccess={() => setStage("submitted")} />}
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterLayout;
