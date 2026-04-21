import React, { useState, useEffect } from "react";
import API from "../../api/config"; // 🛡️ Using the Cookie-Enabled Config
import { 
  ShieldCheck, 
  Search, 
  RefreshCcw, 
  UserCheck, 
  UserX, 
  Eye, 
  ExternalLink,
  AlertCircle,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

/**
 * 🏛️ IDENTITY VERIFICATION HUB
 * Secured via HttpOnly Cookies + AdminGuard.
 */
const IdentityVerify = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  // --- 1. FETCH PENDING REQUESTS ---
  const fetchRequests = async () => {
    try {
      setLoading(true);
      /**
       * The API instance automatically attaches the HttpOnly cookie.
       * The backend 'adminGuard' will verify this cookie against the DB.
       */
      const { data } = await API.get("/admin/verifications/pending");
      setRequests(data.data);
    } catch (err) {
      toast.error("Security Hub: Session expired or Unauthorized.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // --- 2. ADMIN ACTIONS (APPROVE/REJECT) ---
  const handleReview = async (userId, action) => {
    if (action === 'reject' && (!rejectionReason || rejectionReason.length < 10)) {
      toast.error("Detailed reason required (min 10 chars).");
      return;
    }

    try {
      setIsProcessing(true);
      // PATCH request protected by Cookie-based Admin Authentication
      await API.patch(`/admin/verifications/review/${userId}`, {
        action,
        reason: action === 'reject' ? rejectionReason : null
      });
      
      setRequests(requests.filter(u => u._id !== userId));
      setSelectedUser(null);
      setShowRejectInput(false);
      setRejectionReason("");
      toast.success(`Merchant ${action === 'approve' ? 'Authorized' : 'Rejected'} Successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action Interrupted by Security Engine");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col h-screen items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black text-xs uppercase tracking-widest font-sans">Verifying Administrative Clearance...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen font-sans">
      {/* --- STATS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Queue Priority</p>
            <h3 className="text-4xl font-black text-slate-900">{requests.length}</h3>
          </div>
          <div className="bg-indigo-50 p-4 rounded-3xl"><ShieldCheck className="text-indigo-600 w-8 h-8" /></div>
        </motion.div>
      </div>

      {/* --- DATA TABLE --- */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Identity Verification Queue</h2>
          <button 
            onClick={fetchRequests} 
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-2xl text-xs font-black transition-all"
          >
            <RefreshCcw className="w-4 h-4" /> REFRESH
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Identity</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Context</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.length === 0 ? (
                <tr><td colSpan="3" className="p-20 text-center text-slate-400 font-bold italic">No pending dossiers in vault.</td></tr>
              ) : requests.map((user) => (
                <tr key={user._id} className="hover:bg-indigo-50/10 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                        {user.fullName[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{user.fullName}</p>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                      {user.category}
                    </span>
                    <p className="mt-1.5 font-bold text-sm text-slate-700">{user.businessName} • {user.ville}</p>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                    >
                      <Eye className="w-4 h-4" /> EXAMINE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* --- DOSSIER MODAL --- */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                    Reviewing Profile
                  </h3>
                  <p className="text-slate-400 text-[10px] font-mono tracking-widest mt-1">ID: {selectedUser._id}</p>
                </div>
                <button onClick={() => {setSelectedUser(null); setShowRejectInput(false)}} className="p-4 bg-slate-50 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <UserX className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* ID Evidence */}
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">Evidence 01: Government ID</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-md group">
                      <img src={selectedUser.kyc?.idFrontUrl} className="w-full grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in" alt="Front" />
                    </div>
                    <div className="rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-md group">
                      <img src={selectedUser.kyc?.idBackUrl} className="w-full grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in" alt="Back" />
                    </div>
                  </div>
                </div>

                {/* Biometric Evidence */}
                <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">Evidence 02: Liveness Sync</h4>
                  <div className="rounded-[3rem] overflow-hidden bg-black aspect-square md:aspect-video border-[8px] border-slate-50 relative shadow-2xl">
                    <video src={selectedUser.kyc?.livePhotoUrl} controls className="w-full h-full object-cover" />
                    <div className="absolute top-6 left-6 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">SECURE STREAM</div>
                  </div>
                  
                  {showRejectInput ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <label className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Rejection Reason</label>
                      <textarea 
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="State why this dossier was rejected..."
                        className="w-full p-6 bg-rose-50 border-2 border-rose-100 rounded-3xl focus:outline-none focus:border-rose-400 font-bold text-slate-700"
                        rows="4"
                      />
                      <div className="flex gap-4">
                        <button onClick={() => handleReview(selectedUser._id, 'reject')} disabled={isProcessing} className="flex-1 py-4 bg-rose-600 text-white font-black rounded-2xl text-[10px] tracking-widest">CONFIRM REJECTION</button>
                        <button onClick={() => setShowRejectInput(false)} className="px-8 py-4 bg-slate-100 text-slate-900 font-black rounded-2xl text-[10px] tracking-widest">CANCEL</button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex gap-4 pt-10">
                      <button 
                        onClick={() => handleReview(selectedUser._id, 'approve')} 
                        disabled={isProcessing}
                        className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-[2rem] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3"
                      >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <UserCheck />} 
                        {isProcessing ? "PROCESSING..." : "APPROVE MERCHANT"}
                      </button>
                      <button 
                        onClick={() => setShowRejectInput(true)}
                        className="flex-1 py-6 bg-white text-rose-600 border-2 border-rose-100 font-black rounded-[2rem] hover:bg-rose-50 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3"
                      >
                        <UserX /> REJECT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdentityVerify;