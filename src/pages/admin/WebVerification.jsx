import React, { useState, useEffect } from 'react';
import API from '../api/config'; // Adjust this path to where your API config file is located
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Search, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Filter,
  MoreVertical,
  AlertCircle,
  Loader2
} from 'lucide-react';

const WebVerification = () => {
  const [verifications, setVerifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA FROM BACKEND ---
  // Using the API instance handles the Base URL and Auth headers automatically
  const fetchVerifications = async () => {
    setIsLoading(true);
    try {
      const res = await API.get('/admin/websites/pending');
      setVerifications(res.data);
    } catch (err) {
      console.error("Error fetching verifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  // --- HANDLE APPROVE / REJECT ---
  const handleAction = async (id, newStatus) => {
    try {
      const rejectionReason = newStatus === 'rejected' ? prompt("Enter rejection reason:") : "";
      
      if (newStatus === 'rejected' && rejectionReason === null) return; 

      await API.patch(`/admin/websites/verify/${id}`, {
        status: newStatus,
        rejectionReason
      });

      // Refresh list after action
      fetchVerifications();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Filter logic for the search bar
  const filteredData = verifications.filter(v => 
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-indigo-600" size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Verification Engine</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Website <span className="text-slate-400 font-light">KYC</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Review and authorize merchant website deployments.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search merchants..." 
              className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none transition-all w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={fetchVerifications} className="bg-white border border-slate-200 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            {isLoading ? <Loader2 size={20} className="animate-spin text-indigo-600" /> : <Filter size={20} className="text-slate-600" />}
          </button>
        </div>
      </header>

      {/* --- STATS SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Requests</p>
          <p className="text-3xl font-black text-slate-900">{verifications.length}</p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 text-white">
          <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Global Domain</p>
          <p className="text-3xl font-black italic">Bookify.tn</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Platform Status</p>
          <p className="text-3xl font-black text-emerald-500 flex items-center gap-2">Active <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" /></p>
        </div>
      </div>

      {/* --- VERIFICATION TABLE --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Merchant Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Target URL</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Submission</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? filteredData.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        {item.name?.charAt(0) || "B"}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-slate-300" />
                      <span className="text-sm font-bold text-slate-600">{item.slug}.bookify.tn</span>
                      <a href={`https://${item.slug}.bookify.tn`} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 p-1 hover:text-indigo-600 transition-all">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} />
                      <span className="text-xs font-medium">{new Date(item.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {item.verificationStatus === 'pending' ? (
                      <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                        In Review
                      </span>
                    ) : item.verificationStatus === 'approved' ? (
                      <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        Live
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      {item.verificationStatus === 'pending' ? (
                        <>
                          <button 
                            onClick={() => handleAction(item._id, 'rejected')}
                            className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                            title="Reject Deployment"
                          >
                            <XCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleAction(item._id, 'approved')}
                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                        </>
                      ) : (
                        <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={48} className="text-slate-200 mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                        {isLoading ? "Fetching data..." : "No Pending Verifications"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          <p>Showing {filteredData.length} records</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Prev</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebVerification;