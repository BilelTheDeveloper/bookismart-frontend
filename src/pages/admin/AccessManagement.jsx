import React, { useState, useEffect } from "react";
// ✅ Import your central API instance
import API from "../api/config"; 
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Mail, 
  Lock, 
  User,
  Power,
  Edit2,
  Trash2,
  ChevronDown,
  Loader2
} from "lucide-react";

const AccessManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accessLevel: "moderator",
    secretKey: ""
  });

  // --- Backend: Fetch Admins ---
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      // ✅ Added { skipKick: true } to prevent auto-redirecting on error
      const response = await API.get("/admin/access/list", { skipKick: true });
      setAdmins(response.data.admins || []);
    } catch (error) {
      console.error("Error fetching admins:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // --- Backend: Create New Access ---
  const handleCreateAccess = async (e) => {
    e.preventDefault();
    try {
      // ✅ Added { skipKick: true }
      await API.post("/admin/access/grant", formData, { skipKick: true });
      setShowModal(false);
      setFormData({ 
        fullName: "", 
        email: "", 
        password: "", 
        accessLevel: "moderator", 
        secretKey: "" 
      });
      fetchAdmins(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create access");
    }
  };

  // --- Backend: Toggle Active Status ---
  const handleToggleStatus = async (id) => {
    try {
      // ✅ Added { skipKick: true }
      await API.patch(`/admin/access/toggle/${id}`, {}, { skipKick: true });
      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Toggle failed");
    }
  };

  const roleColors = {
    admin: "bg-rose-50 text-rose-600 border-rose-100",
    support: "bg-blue-50 text-blue-600 border-blue-100",
    moderator: "bg-amber-50 text-amber-600 border-amber-100",
  };

  const filteredAdmins = Array.isArray(admins) ? admins.filter(a => 
    a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      {/* 🏁 Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Access Control</h1>
          <p className="text-slate-500 font-medium">Manage system administrators and permission levels.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <UserPlus size={18} />
          <span>Grant New Access</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📊 Stats Overview */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {[
            { label: "Total Admins", value: admins.length.toString().padStart(2, '0'), icon: ShieldCheck, color: "text-indigo-600" },
            { label: "Active Admins", value: admins.filter(a => a.isActive).length.toString().padStart(2, '0'), icon: Power, color: "text-emerald-600" },
            { label: "Inactive", value: admins.filter(a => !a.isActive).length.toString().padStart(2, '0'), icon: Mail, color: "text-rose-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🗂️ Admin List Table */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={40} /></div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User Details</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Level</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                            {admin.fullName ? admin.fullName.charAt(0) : "A"}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{admin.fullName}</p>
                            <p className="text-xs text-slate-400">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${roleColors[admin.accessLevel]}`}>
                          {admin.accessLevel}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${admin.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span className="text-xs font-bold text-slate-600">{admin.isActive ? 'Active' : 'Deactivated'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleToggleStatus(admin._id)}
                            title={admin.isActive ? "Deactivate" : "Activate"}
                            className={`p-2 rounded-lg transition-all border border-transparent ${admin.isActive ? 'hover:bg-rose-50 text-rose-600' : 'hover:bg-emerald-50 text-emerald-600'}`}
                          >
                            <Power size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ➕ Create Access Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-slate-900 mb-2">New System Access</h2>
            <p className="text-slate-400 text-sm font-medium mb-8">Grant permissions to a new team member.</p>
            
            <form onSubmit={handleCreateAccess} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email & Password</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900" 
                      placeholder="Email" 
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900" 
                      placeholder="Password" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Role Level</label>
                  <select 
                    value={formData.accessLevel}
                    onChange={(e) => setFormData({...formData, accessLevel: e.target.value})}
                    className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 font-bold text-sm"
                  >
                    <option value="moderator">moderator</option>
                    <option value="support">support</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Secret Key</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.secretKey}
                      onChange={(e) => setFormData({...formData, secretKey: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900" 
                      placeholder="Optional" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all"
                >
                  Create Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessManagement;