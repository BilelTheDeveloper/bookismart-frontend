import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import { CheckCircle, XCircle, Eye, ShieldAlert, Clock } from "lucide-react";

const UserVerification = () => {
  const [merchants, setMerchants] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- Mock Data (Replace with your axios.get('/api/admin/pending-kyc') later) ---
  useEffect(() => {
    setMerchants([
      {
        _id: "1",
        fullName: "Ahmed Ben Ali",
        businessName: "Sousse Barbershop",
        email: "ahmed@sousse.tn",
        kyc: {
          idFrontUrl: "https://via.placeholder.com/300x200?text=CIN+Front",
          idBackUrl: "https://via.placeholder.com/300x200?text=CIN+Back",
          livePhotoUrl: "https://via.placeholder.com/300x300?text=Live+Face",
          status: "pending"
        }
      }
    ]);
  }, []);

  const handleAction = (id, status) => {
    console.log(`User ${id} set to ${status}`);
    // Add your API call here to update the user status in MongoDB
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <ShieldAlert size={20} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Verification</h1>
          </div>
          <p className="text-slate-500 font-medium">Review and verify merchant identity documents for TunisiaSmart Ecosystem.</p>
        </header>

        {/* Verification Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Merchant</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Documents</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Check</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {merchants.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <div className="font-black text-slate-900">{user.fullName}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{user.businessName}</div>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedImage(user.kyc.idFrontUrl)}
                        className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => setSelectedImage(user.kyc.idBackUrl)}
                        className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>

                  <td className="p-6">
                    <div 
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setSelectedImage(user.kyc.livePhotoUrl)}
                    >
                      <img src={user.kyc.livePhotoUrl} alt="Live" className="w-full h-full object-cover" />
                    </div>
                  </td>

                  <td className="p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Clock size={12} /> Pending
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAction(user._id, 'rejected')}
                        className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm shadow-rose-100"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleAction(user._id, 'verified')}
                        className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm shadow-emerald-100"
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🖼️ Simple Image Modal Overlay */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} alt="Preview" className="max-w-full max-h-full rounded-3xl shadow-2xl border-4 border-white/10" />
            <p className="absolute bottom-10 text-white font-bold uppercase tracking-widest text-[10px]">Click anywhere to close</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserVerification;