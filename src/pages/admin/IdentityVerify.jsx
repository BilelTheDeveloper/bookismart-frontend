import React, { useState, useEffect } from "react";
import axios from "axios";

const IdentityVerify = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- 1. FETCH PENDING REQUESTS FROM BACKEND ---
  const fetchRequests = async () => {
    try {
      setLoading(true);
      // Assuming you have an endpoint that returns users with accountStatus: 'review'
      const response = await axios.get("https://bookismart-backend.onrender.com/api/admin/pending-reviews");
      setRequests(response.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
      // Fallback for testing if endpoint doesn't exist yet
      setRequests([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // --- 2. ADMIN ACTIONS: APPROVE / REJECT ---
  const handleReview = async (userId, action) => {
    const reason = action === 'reject' ? prompt("Enter reason for rejection:") : null;
    if (action === 'reject' && !reason) return;

    try {
      setIsProcessing(true);
      await axios.patch(`https://bookismart-backend.onrender.com/api/auth/review-user/${userId}`, {
        action,
        reason
      });
      
      // Update UI: Remove the user from the list
      setRequests(requests.filter(u => u._id !== userId));
      setSelectedUser(null);
      alert(`User ${action}ed successfully!`);
    } catch (err) {
      alert("Action failed. Check console.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Header Statistics --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-tighter">Queue Priority</p>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-black text-slate-900">{requests.length}</p>
            <p className="text-indigo-600 font-bold mb-1 text-sm italic">Pending Dossiers</p>
          </div>
        </div>
      </div>

      {/* --- Main Table --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Identity Verification Queue</h2>
          <button onClick={fetchRequests} className="text-xs font-bold text-indigo-600 hover:rotate-180 transition-all duration-500">
            REFRESH LIST ↻
          </button>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Context</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">City</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {requests.length === 0 ? (
              <tr><td colSpan="5" className="p-20 text-center text-slate-400 italic">No pending dossiers found. Good job!</td></tr>
            ) : requests.map((user) => (
              <tr key={user._id} className="hover:bg-indigo-50/20 transition-colors group">
                <td className="p-6">
                  <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.fullName}</p>
                  <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-tighter">
                    {user.category}
                  </span>
                  <p className="mt-1.5 font-bold text-sm text-slate-700">{user.businessName}</p>
                </td>
                <td className="p-6 font-bold text-sm text-slate-600">{user.ville}</td>
                <td className="p-6 text-xs text-slate-400 font-mono">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-indigo-600 hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
                  >
                    EXAMINE DOSSIER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ULTRA PRO DOSSIER MODAL --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            
            {/* Modal Header */}
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-white to-slate-50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></span>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Verification Dossier</h3>
                </div>
                <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Reference Object ID: {selectedUser._id}</p>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="w-14 h-14 rounded-full bg-slate-100 text-slate-900 hover:bg-rose-500 hover:text-white flex items-center justify-center font-black transition-all rotate-0 hover:rotate-90 text-xl shadow-inner"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white">
              
              {/* Left Column: Data Info */}
              <div className="space-y-10">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-indigo-200"></span> 1. Merchant Identity
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Official Full Name</p>
                      <p className="font-black text-slate-900 text-lg">{selectedUser.fullName}</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Direct Contact</p>
                      <p className="font-black text-slate-900 text-lg">{selectedUser.phone}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-indigo-200"></span> 2. Liveness Biometric Check
                  </h4>
                  <div className="rounded-[2.5rem] overflow-hidden border-[6px] border-slate-100 shadow-2xl bg-black aspect-video relative group">
                    <video 
                      src={selectedUser.kyc?.livePhotoUrl} 
                      controls 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black animate-pulse">LIVE CAPTURE</div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center font-medium italic">
                    The biometric scan must match the National ID photo below.
                  </p>
                </section>
              </div>

              {/* Right Column: Documents */}
              <div className="space-y-10">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-indigo-200"></span> 3. Government Issued ID
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-100 shadow-md">
                      <img src={selectedUser.kyc?.idFrontUrl} alt="ID Front" className="w-full hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
                      <span className="absolute bottom-4 left-4 px-4 py-1.5 bg-slate-900/90 backdrop-blur text-white text-[9px] font-black rounded-full shadow-lg tracking-widest">FRONT CARD</span>
                    </div>
                    <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-100 shadow-md">
                      <img src={selectedUser.kyc?.idBackUrl} alt="ID Back" className="w-full hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
                      <span className="absolute bottom-4 left-4 px-4 py-1.5 bg-slate-900/90 backdrop-blur text-white text-[9px] font-black rounded-full shadow-lg tracking-widest">BACK CARD</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Modal Footer: Action Buttons */}
            <div className="p-10 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex gap-6">
              <button 
                onClick={() => handleReview(selectedUser._id, 'approve')}
                disabled={isProcessing}
                className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
              >
                {isProcessing ? "COMMITTING TO BLOCKCHAIN..." : "VALIDATE & APPROVE MERCHANT"}
              </button>
              <button 
                onClick={() => handleReview(selectedUser._id, 'reject')}
                disabled={isProcessing}
                className="flex-1 py-5 bg-white text-rose-600 border-2 border-rose-100 font-black rounded-[1.5rem] hover:bg-rose-50 transition-all uppercase text-xs tracking-widest"
              >
                REJECT APPLICATION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityVerify;