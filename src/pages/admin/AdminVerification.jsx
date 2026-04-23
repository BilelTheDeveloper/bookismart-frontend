import React, { useState, useEffect } from 'react';
import API from "../../api/config";
import { 
  CheckCircle, XCircle, ExternalLink, Clock, 
  ShieldCheck, AlertCircle, Image as ImageIcon, Smartphone,
  Globe, User, Tag, MapPin, ListChecks
} from 'lucide-react';

const AdminVerification = () => {
  const [pendingSites, setPendingSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingSites();
  }, []);

  const fetchPendingSites = async () => {
    try {
      // 🛡️ Hits the route: GET /api/admin/websites/pending
      const res = await API.get('/admin/websites/pending');
      if (res.data.success) {
        setPendingSites(res.data.data);
      }
    } catch (err) {
      console.error("Compliance retrieval failed. Check Admin Guard status.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (siteId, action) => {
    let reason = "";
    if (action === 'reject') {
      reason = prompt("⚠️ REJECTION PROTOCOL: Enter reason for the merchant (Min 10 chars):");
      if (!reason || reason.trim().length < 10) {
        return alert("Validation Failed: A detailed reason is required.");
      }
    }

    setProcessingId(siteId);
    try {
      // 🛡️ Hits the route: PATCH /api/admin/websites/verify/:id
      const res = await API.patch(`/admin/websites/verify/${siteId}`, { 
        action: action, 
        reason: reason 
      });

      if (res.data.success) {
        setPendingSites(prev => prev.filter(s => s._id !== siteId));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Internal Security Error");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Syncing with Central Vault...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans">
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-indigo-600 mb-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Security & Compliance</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Website Deployment</h1>
          <p className="text-slate-500 font-medium mt-2">Review and authorize merchant digital storefronts.</p>
        </div>
        <div className="bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Review</span>
          <span className="text-3xl font-black text-indigo-600">{pendingSites.length}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12">
        {pendingSites.map((site) => (
          <div key={site._id} className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row transition-all hover:border-indigo-300">
            
            {/* LEFT: VISUAL PREVIEW */}
            <div className="lg:w-2/5 bg-slate-50 p-8 border-r border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black text-indigo-600 shadow-sm border border-slate-100 uppercase tracking-widest">
                  {site.templateId}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase">{new Date(site.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="group relative aspect-video rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                  <img src={site.hero?.backgroundImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <p className="text-white text-xs font-black uppercase tracking-widest">Hero Section</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 p-2">
                    <img src={site.about?.image} className="w-full h-full object-cover rounded-[1rem]" alt="About" />
                  </div>
                  <div className="aspect-square bg-indigo-600 rounded-[1.5rem] flex flex-col items-center justify-center text-white gap-2">
                    <ImageIcon size={24} />
                    <span className="text-[10px] font-black">{site.gallery?.images?.filter(i => i !== "").length} Assets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: DATA & ACTIONS */}
            <div className="flex-1 p-10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{site.name}</h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <Tag size={14} className="text-indigo-500" /> {site.category}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <Globe size={14} className="text-indigo-500" /> /{site.slug}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <User size={14} className="text-indigo-500" /> {site.ownerId?.fullName}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://bookiify.com/${site.slug}`, '_blank')}
                    className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>

                {/* SERVICES SNEAK PEEK */}
                <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <ListChecks size={16} className="text-indigo-600" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Offerings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {site.services?.slice(0, 4).map((svc, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200/50">
                        <span className="text-[11px] font-bold text-slate-700 truncate mr-2">{svc.title}</span>
                        <span className="text-[10px] font-black text-indigo-600">{svc.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTION SYSTEM */}
              <div className="flex gap-4">
                <button 
                  disabled={processingId === site._id}
                  onClick={() => handleAction(site._id, 'approve')}
                  className="flex-[2] bg-indigo-600 text-white h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {processingId === site._id ? "Verifying..." : <><CheckCircle size={18} /> Approve & Deploy</>}
                </button>
                
                <button 
                  disabled={processingId === site._id}
                  onClick={() => handleAction(site._id, 'reject')}
                  className="flex-1 bg-white border-2 border-rose-100 text-rose-500 h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {pendingSites.length === 0 && (
        <div className="text-center py-40">
           <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2.5rem] mb-8 shadow-sm border border-slate-100 text-slate-200">
             <AlertCircle size={48} />
           </div>
           <h2 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Queue Clear</h2>
           <p className="text-slate-400 text-sm mt-2 font-medium">All websites are currently active or undergoing revisions.</p>
        </div>
      )}
    </div>
  );
};

export default AdminVerification;