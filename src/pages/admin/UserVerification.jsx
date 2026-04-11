import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import { CheckCircle, XCircle, Eye, ShieldAlert, Clock, User, Mail, Phone, MapPin, Briefcase, Calendar, X } from "lucide-react";
import axios from "axios";

const UserVerification = () => {
  const [merchants, setMerchants] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for the Full Dossier
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";

  // 📡 Fetch Pending Merchants
  const fetchPendingKYC = async () => {
    try {
      setLoading(true);
      // Fixed URL to match your backend route prefix
      const res = await axios.get(`${API_URL}/api/admin/user-verification/pending`);
      setMerchants(res.data);
    } catch (err) {
      console.error("Error fetching KYC data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingKYC();
  }, []);

  // ✅ ❌ Handle Approve/Reject
  const handleAction = async (id, status) => {
    try {
      // Fixed URL to match your backend route prefix
      await axios.patch(`${API_URL}/api/admin/user-verification/verify/${id}`, { status });
      setSelectedUser(null); // Close dossier if open
      fetchPendingKYC();
      console.log(`User ${id} successfully set to ${status}`);
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  /**
   * 🖼️ CLOUDINARY UPDATE:
   * This helper now detects if the path is a Cloudinary URL or a local file.
   * Cloudinary URLs start with "http", so we return them as-is.
   */
  const getImgUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path; // Return Cloudinary URL directly
    return `${API_URL}/${path.replace(/\\/g, '/')}`; // Fallback for local legacy files
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <ShieldAlert size={20} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Verification</h1>
          </div>
          <p className="text-slate-500 font-medium">Review and verify merchant identity documents for Bookismart.</p>
        </header>

        {loading ? (
          <div className="flex justify-center p-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
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
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100">
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-slate-900">{user.fullName}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{user.businessName}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedImage(getImgUrl(user.kyc.idFrontUrl))}
                          className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400"
                          title="View ID Front"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setSelectedImage(getImgUrl(user.kyc.idBackUrl))}
                          className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400"
                          title="View ID Back"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>

                    <td className="p-6">
                      <div 
                          className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden cursor-pointer hover:scale-110 transition-transform bg-slate-200"
                          onClick={() => setSelectedImage(getImgUrl(user.kyc.livePhotoUrl))}
                      >
                        <img src={getImgUrl(user.kyc.livePhotoUrl)} alt="Live" className="w-full h-full object-cover" />
                      </div>
                    </td>

                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <Clock size={12} /> {user.kyc.status}
                      </span>
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
                        >
                          Open Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {merchants.length === 0 && !loading && (
              <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                No pending verifications 🍹
              </div>
            )}
          </div>
        )}

        {/* 🖼️ Document Image Preview Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} alt="Preview" className="max-w-full max-h-full rounded-3xl shadow-2xl border-4 border-white/10" />
          </div>
        )}

        {/* 📂 Full User Dossier Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Merchant Dossier</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <img 
                  src={getImgUrl(selectedUser.profilePicUrl)} 
                  className="w-24 h-24 rounded-3xl object-cover shadow-lg border-2 border-white"
                  alt="Profile"
                />
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{selectedUser.fullName}</h3>
                  <p className="text-indigo-600 font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Briefcase size={14}/> {selectedUser.businessName} • {selectedUser.category}
                  </p>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</label>
                  <div className="flex items-center gap-2 text-slate-900 font-bold"><Mail size={16} className="text-slate-400"/> {selectedUser.email}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number</label>
                  <div className="flex items-center gap-2 text-slate-900 font-bold"><Phone size={16} className="text-slate-400"/> {selectedUser.phone}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location</label>
                  <div className="flex items-center gap-2 text-slate-900 font-bold"><MapPin size={16} className="text-slate-400"/> {selectedUser.ville}, Tunisia</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Joined Date</label>
                  <div className="flex items-center gap-2 text-slate-900 font-bold"><Calendar size={16} className="text-slate-400"/> {new Date(selectedUser.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Document Previews in Dossier */}
              <div className="mb-10">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Verification Documents</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="cursor-pointer group" onClick={() => setSelectedImage(getImgUrl(selectedUser.kyc.idFrontUrl))}>
                    <p className="text-[8px] font-bold text-slate-400 mb-2 text-center uppercase">CIN Front</p>
                    <img src={getImgUrl(selectedUser.kyc.idFrontUrl)} className="rounded-xl border group-hover:border-indigo-500 transition-colors" alt="Front" />
                  </div>
                  <div className="cursor-pointer group" onClick={() => setSelectedImage(getImgUrl(selectedUser.kyc.idBackUrl))}>
                    <p className="text-[8px] font-bold text-slate-400 mb-2 text-center uppercase">CIN Back</p>
                    <img src={getImgUrl(selectedUser.kyc.idBackUrl)} className="rounded-xl border group-hover:border-indigo-500 transition-colors" alt="Back" />
                  </div>
                  <div className="cursor-pointer group" onClick={() => setSelectedImage(getImgUrl(selectedUser.kyc.livePhotoUrl))}>
                    <p className="text-[8px] font-bold text-slate-400 mb-2 text-center uppercase">Live Selfie</p>
                    <img src={getImgUrl(selectedUser.kyc.livePhotoUrl)} className="rounded-xl border group-hover:border-indigo-500 transition-colors" alt="Selfie" />
                  </div>
                </div>
              </div>

              {/* Action Buttons in Dossier */}
              <div className="flex gap-4 sticky bottom-0 bg-white pt-6 border-t border-slate-100">
                <button 
                  onClick={() => handleAction(selectedUser._id, 'rejected')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-50 text-rose-600 font-black uppercase text-xs tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                >
                  <XCircle size={18} /> Reject Merchant
                </button>
                <button 
                  onClick={() => handleAction(selectedUser._id, 'verified')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                >
                  <CheckCircle size={18} /> Approve Merchant
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserVerification;