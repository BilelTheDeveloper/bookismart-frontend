import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  RefreshCcw, 
  LogOut, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { logout } from "../../../services/authService";
import { motion } from "framer-motion";

const OnboardingStatus = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Reload the page to trigger the App.js logic/user check again
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30"
          >
            <Clock className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Identity Under <span className="text-indigo-400">Review</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-md mx-auto">
            Our compliance team is currently verifying your KYC documents. This usually takes less than 24 hours.
          </p>
        </div>

        {/* Status Steps */}
        <div className="space-y-4 mb-10">
          <StatusCard 
            icon={FileCheck} 
            title="Application Submitted" 
            desc="We have received your professional credentials."
            completed
          />
          <StatusCard 
            icon={ShieldCheck} 
            title="KYC Verification" 
            desc="Checking ID validity and liveness video..."
            loading
          />
          <StatusCard 
            icon={ExternalLink} 
            title="Final Approval" 
            desc="Granting access to the Bookiify Dashboard."
            pending
          />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleRefresh}
            className="flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            CHECK STATUS
          </button>
          
          <button 
            onClick={logout}
            className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-black rounded-2xl border border-white/10 transition-all active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            SIGN OUT
          </button>
        </div>

        {/* Support Footer */}
        <p className="text-center mt-8 text-slate-500 text-sm font-bold tracking-tight">
          Need help? Contact <span className="text-indigo-400 cursor-pointer hover:underline">support@bookiify.com</span>
        </p>
      </motion.div>
    </div>
  );
};

// Sub-component for the Status Cards
const StatusCard = ({ icon: Icon, title, desc, completed, loading, pending }) => (
  <div className={`flex items-center gap-5 p-5 rounded-[1.5rem] border transition-all ${
    completed ? "bg-emerald-500/5 border-emerald-500/20" : 
    loading ? "bg-indigo-500/5 border-indigo-500/30" : 
    "bg-white/5 border-white/5 opacity-50"
  }`}>
    <div className={`p-3 rounded-xl ${
      completed ? "bg-emerald-500 text-white" : 
      loading ? "bg-indigo-500 text-white animate-pulse" : 
      "bg-slate-700 text-slate-400"
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    
    <div className="flex-1 text-left">
      <h3 className={`font-black text-sm uppercase tracking-widest ${
        completed ? "text-emerald-400" : 
        loading ? "text-indigo-400" : "text-slate-500"
      }`}>
        {title}
      </h3>
      <p className="text-slate-400 text-xs font-medium">{desc}</p>
    </div>

    {completed && <div className="bg-emerald-500/20 p-1 rounded-full"><ChevronRight className="w-4 h-4 text-emerald-500" /></div>}
  </div>
);

export default OnboardingStatus;