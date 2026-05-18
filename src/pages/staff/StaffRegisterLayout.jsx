import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import SAPI from "../../api/staffConfig";
import StepProfile from "../customer/steps/StepProfile";
import StepOTP from "../customer/steps/StepOTP";
import StepPassword from "../customer/steps/StepPassword";
import StepKYC from "../customer/steps/StepKYC";

const ALL_STEPS = [
  { id: "profile",  label: "Profile",      icon: "01" },
  { id: "otp",      label: "Verification", icon: "02" },
  { id: "password", label: "Password",     icon: "03" },
  { id: "kyc",      label: "Identity",     icon: "04" },
];

const StaffRegisterLayout = () => {
  const { token }             = useParams();
  const navigate              = useNavigate();
  const [info, setInfo]       = useState(null);
  const [stage, setStage]     = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await SAPI.get(`/staff/register/${token}`);
        if (res.data?.alreadyActive) { navigate("/staff/login"); return; }
        if (res.data?.data) {
          setInfo(res.data.data);
          setStage(res.data.data.stage || "profile");
        }
      } catch (err) {
        setError(err.response?.data?.message || "This invitation link is invalid or has expired.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, navigate]);

  const requireKyc   = info?.requireKyc !== false;
  const visibleSteps = requireKyc ? ALL_STEPS : ALL_STEPS.filter(s => s.id !== "kyc");
  const currentIdx   = visibleSteps.findIndex(s => s.id === stage);

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
        <h2 className="text-2xl font-black text-white mb-3">Invalid Invitation</h2>
        <p className="text-slate-400">{error}</p>
        <p className="text-slate-600 text-sm mt-4">Please contact your manager for a new invitation link.</p>
      </div>
    </div>
  );

  if (stage === "submitted") return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} className="text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">
          {requireKyc ? "Profile Under Review" : "Account Ready!"}
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {requireKyc
            ? <>Your identity documents have been submitted. The admin team will verify your profile and notify you by email once approved.</>
            : <>Your staff account is active. You can now log in to the team portal.</>
          }
        </p>
        {!requireKyc && (
          <button
            onClick={() => navigate("/staff/login")}
            className="mt-8 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all"
          >
            Go to Staff Login
          </button>
        )}
        {requireKyc && (
          <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">From</p>
            <p className="text-white font-black">{info?.businessName}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/10 border border-violet-500/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-400 font-black text-xs uppercase tracking-widest">Staff Invitation</span>
          </div>
          <p className="text-violet-400 font-black text-xs uppercase tracking-widest mb-2">
            {info?.businessName}
          </p>
          <h1 className="text-3xl font-black text-white">
            Hi, {info?.fullName?.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Complete your team member registration</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {visibleSteps.map((step, idx) => {
            const isDone   = idx < currentIdx;
            const isActive = idx === currentIdx;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all
                    ${isDone   ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : ""}
                    ${isActive ? "bg-violet-600 text-white shadow-lg shadow-violet-600/40 scale-110" : ""}
                    ${!isDone && !isActive ? "bg-slate-800 text-slate-500 border border-slate-700" : ""}
                  `}>
                    {isDone ? <CheckCircle2 size={18} /> : step.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-violet-400" : isDone ? "text-emerald-400" : "text-slate-600"}`}>
                    {step.label}
                  </span>
                </div>
                {idx < visibleSteps.length - 1 && (
                  <div className={`h-px w-12 mx-2 mb-5 transition-all ${idx < currentIdx ? "bg-emerald-500" : "bg-slate-800"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step content */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
          {stage === "profile"  && (
            <StepProfile
              token={token}
              initialData={info}
              onSuccess={() => setStage("otp")}
              api={SAPI}
              pathBase="/staff/register"
            />
          )}
          {stage === "otp"      && (
            <StepOTP
              token={token}
              email={info?.email}
              onSuccess={() => setStage("password")}
              api={SAPI}
              pathBase="/staff/register"
            />
          )}
          {stage === "password" && (
            <StepPassword
              token={token}
              onSuccess={() => requireKyc ? setStage("kyc") : setStage("submitted")}
              api={SAPI}
              pathBase="/staff/register"
            />
          )}
          {stage === "kyc"      && (
            <StepKYC
              token={token}
              onSuccess={() => setStage("submitted")}
              api={SAPI}
              pathBase="/staff/register"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffRegisterLayout;
