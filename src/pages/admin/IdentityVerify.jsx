import React, { useState } from "react";

const IdentityVerify = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample data simulating what will come from your Render Backend
  const [requests] = useState([
    {
      id: "1",
      fullName: "Ahmed Ben Ali",
      businessName: "Vogue Studio",
      category: "Beauty & Barbers",
      ville: "Sousse",
      email: "ahmed@vogue.tn",
      phone: "+216 22 333 444",
      status: "pending",
      submittedAt: "2026-04-19",
      onboardingStep: 5,
      kyc: {
        idFrontUrl: "https://via.placeholder.com/400x250?text=ID+FRONT",
        idBackUrl: "https://via.placeholder.com/400x250?text=ID+BACK",
        livenessVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Sample Video
      }
    }
  ]);

  return (
    <div className="space-y-6">
      {/* --- Header Statistics --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-black uppercase">Pending Reviews</p>
          <p className="text-3xl font-black text-indigo-600">{requests.length}</p>
        </div>
      </div>

      {/* --- Main Table --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">Professional</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">Business</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">Location</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">Date</th>
              <th className="p-6 text-xs font-black text-slate-400 uppercase">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {requests.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-slate-900">{user.fullName}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">
                    {user.category}
                  </span>
                  <p className="mt-1 font-medium text-slate-700">{user.businessName}</p>
                </td>
                <td className="p-6 font-medium text-slate-600">{user.ville}</td>
                <td className="p-6 text-sm text-slate-400">{user.submittedAt}</td>
                <td className="p-6">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                  >
                    SEE DOSSIER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ULTRA PRO DOSSIER MODAL --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Professional Dossier</h3>
                <p className="text-slate-400 text-sm italic">ID: {selectedUser.id}</p>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Left Column: Data Info */}
              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Core Identity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Full Name</p>
                      <p className="font-bold text-slate-900">{selectedUser.fullName}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Phone</p>
                      <p className="font-bold text-slate-900">{selectedUser.phone}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Liveness Biometric (5s Video)</h4>
                  <div className="rounded-[2rem] overflow-hidden border-4 border-slate-100 shadow-sm bg-black aspect-video">
                    <video 
                      src={selectedUser.kyc.livenessVideoUrl} 
                      controls 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic text-center">⚠ Automated video will never be stored in primary DB</p>
                </section>
              </div>

              {/* Right Column: Documents */}
              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">National ID Verification</h4>
                  <div className="space-y-4">
                    <div className="group relative rounded-2xl overflow-hidden border border-slate-100">
                      <img src={selectedUser.kyc.idFrontUrl} alt="ID Front" className="w-full hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 px-3 py-1 bg-white/90 text-[10px] font-black rounded-lg shadow-sm">FRONT</span>
                    </div>
                    <div className="group relative rounded-2xl overflow-hidden border border-slate-100">
                      <img src={selectedUser.kyc.idBackUrl} alt="ID Back" className="w-full hover:scale-105 transition-transform" />
                      <span className="absolute top-2 left-2 px-3 py-1 bg-white/90 text-[10px] font-black rounded-lg shadow-sm">BACK</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Modal Footer: Action Buttons */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button className="flex-1 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all uppercase text-sm">
                Approve Professional
              </button>
              <button className="flex-1 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all uppercase text-sm">
                Reject / Request Re-upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityVerify;