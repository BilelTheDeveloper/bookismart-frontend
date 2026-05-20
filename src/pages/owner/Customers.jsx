import React, { useEffect, useMemo, useState } from "react";
import {
  Users, Search, UserPlus, Star, Phone, History, Mail,
  MoreHorizontal, ChevronRight, TrendingUp, Award, Shield,
  CheckCircle2, Clock, XCircle, AlertCircle, ShieldCheck, Lock, Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/config";
import AddCustomerModal from "./AddCustomerModal";

/* ─── Status badge config ─── */
const STATUS_CONFIG = {
  invited:      { label: "Invited",      color: "bg-blue-100 text-blue-700",    icon: Clock },
  pending_kyc:  { label: "Verifying",    color: "bg-amber-100 text-amber-700",   icon: AlertCircle },
  under_review: { label: "Under Review", color: "bg-violet-100 text-violet-700", icon: Shield },
  active:       { label: "Active",       color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected:     { label: "Rejected",     color: "bg-rose-100 text-rose-700",     icon: XCircle },
};

const Customers = () => {
  const navigate = useNavigate();
  const [tab, setTab]                     = useState("portal");   // portal | booking
  const [q, setQ]                         = useState("");
  const [portalClients, setPortalClients] = useState([]);
  const [bookingCustomers, setBK]         = useState([]);
  const [loadingPortal, setLoadingPortal] = useState(true);
  const [loadingBK, setLoadingBK]         = useState(true);
  const [showModal, setShowModal]         = useState(false);

  const fetchPortal = () => {
    setLoadingPortal(true);
    API.get("/merchant/customers")
      .then(res => setPortalClients(res.data?.data || []))
      .finally(() => setLoadingPortal(false));
  };

  useEffect(() => {
    fetchPortal();
    API.get("/merchant/insights/customers")
      .then(res => setBK(res.data?.data || []))
      .finally(() => setLoadingBK(false));
  }, []);

  /* Filtered lists */
  const filteredPortal = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return portalClients;
    return portalClients.filter(c =>
      c.fullName?.toLowerCase().includes(s) ||
      c.email?.toLowerCase().includes(s) ||
      c.phone?.toLowerCase().includes(s)
    );
  }, [portalClients, q]);

  const filteredBK = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return bookingCustomers;
    return bookingCustomers.filter(c =>
      String(c.name || "").toLowerCase().includes(s) ||
      String(c.email || "").toLowerCase().includes(s) ||
      String(c.phone || "").toLowerCase().includes(s)
    );
  }, [bookingCustomers, q]);

  /* Stats */
  const activeCount   = portalClients.filter(c => c.status === "active").length;
  const pendingCount  = portalClients.filter(c => c.status === "under_review").length;
  const totalBK       = bookingCustomers.length;
  const vipCount      = bookingCustomers.filter(c => c.status === "VIP").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* ── KPI row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="md:col-span-2 bg-indigo-600 rounded-[2.5rem] p-7 text-white flex items-center justify-between shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Portal Clients</p>
            <h3 className="text-5xl font-black italic">{portalClients.length}</h3>
            <div className="flex items-center gap-2 mt-3 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <CheckCircle2 size={12} /> {activeCount} active
            </div>
          </div>
          <ShieldCheck size={80} className="text-white/10 absolute -right-4 -bottom-4" />
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl"><Award size={28} /></div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Pending Review</p>
            <h3 className="text-2xl font-black text-slate-900">{pendingCount}</h3>
            <p className="text-slate-500 text-[11px] font-bold mt-0.5">Awaiting admin</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl"><Users size={28} /></div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Booking History</p>
            <h3 className="text-2xl font-black text-slate-900">{totalBK}</h3>
            <p className="text-slate-500 text-[11px] font-bold mt-0.5">{vipCount} VIP</p>
          </div>
        </div>
      </div>

      {/* ── Tabs + Search + Add ── */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
          {[["portal", ShieldCheck, "Portal Clients"], ["booking", History, "Booking History"]].map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${
                tab === id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={17} />
          <input
            type="text"
            placeholder="Search by name, phone or email…"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-medium"
          />
        </div>

        {/* Add */}
        {tab === "portal" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-slate-200 whitespace-nowrap"
          >
            <UserPlus size={17} /> Add Client
          </button>
        )}
      </div>

      {/* ── PORTAL CLIENTS TABLE ── */}
      {tab === "portal" && (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          {loadingPortal ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 size={24} className="animate-spin text-indigo-500" />
              <span className="text-slate-400 font-medium text-sm">Loading clients…</span>
            </div>
          ) : filteredPortal.length === 0 ? (
            <div className="text-center py-20">
              <ShieldCheck size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">No portal clients yet</p>
              <p className="text-slate-300 text-sm mt-1">Click "Add Client" to invite your first client.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Client", "Status", "Access", "Joined", "Actions"].map(h => (
                      <th key={h} className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPortal.map(c => {
                    const cfg  = STATUS_CONFIG[c.status] || STATUS_CONFIG.invited;
                    const SIcon = cfg.icon;
                    return (
                      <tr key={c._id} className="group hover:bg-slate-50/50 transition-all">
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-4">
                            {c.profilePicture ? (
                              <img src={c.profilePicture} alt="" className="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-100" />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm">
                                {c.fullName?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{c.fullName}</p>
                              <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1"><Phone size={10} /> {c.phone}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-7 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${cfg.color}`}>
                            <SIcon size={11} /> {cfg.label}
                          </span>
                        </td>

                        <td className="px-7 py-5">
                          <div className="flex flex-wrap gap-1">
                            {c.allowedPages?.length > 0 ? (
                              c.allowedPages.slice(0, 2).map(p => (
                                <span key={p.pageKey} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-md capitalize">
                                  {p.pageKey}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-300 text-xs font-medium">Profile only</span>
                            )}
                            {c.allowedPages?.length > 2 && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-md">+{c.allowedPages.length - 2}</span>
                            )}
                          </div>
                        </td>

                        <td className="px-7 py-5 text-slate-400 text-xs font-medium">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB") : "—"}
                        </td>

                        <td className="px-7 py-5">
                          <div className="flex items-center gap-2">
                            {c.status === "active" && (
                              <button
                                onClick={() => navigate(`/owner/dashboard/customers/${c._id}/access`)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-black transition-all"
                              >
                                <Lock size={12} /> Access
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/owner/dashboard/customers/${c._id}/access`)}
                              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── BOOKING HISTORY TABLE ── */}
      {tab === "booking" && (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          {loadingBK ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 size={24} className="animate-spin text-indigo-500" />
              <span className="text-slate-400 font-medium text-sm">Loading…</span>
            </div>
          ) : filteredBK.length === 0 ? (
            <div className="text-center py-20">
              <Users size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">No booking records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Customer", "Status", "Visits", "Total Spend", "Actions"].map(h => (
                      <th key={h} className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBK.map(cus => (
                    <tr
                      key={cus.customerKey}
                      className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                      onClick={() => navigate(`/owner/dashboard/customers/${encodeURIComponent(cus.customerKey)}`)}
                    >
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-black text-sm border border-slate-200 uppercase">
                            {String(cus.name || "C").charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{cus.name}</p>
                            <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1"><Phone size={10} /> {cus.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-7 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          cus.status === "VIP" ? "bg-amber-100 text-amber-700" :
                          cus.status === "New" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"
                        }`}>{cus.status}</span>
                      </td>
                      <td className="px-7 py-5 text-center">
                        <span className="font-black text-slate-900">{cus.visits}</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Last: {cus.lastVisit}</p>
                      </td>
                      <td className="px-7 py-5">
                        <span className="font-black text-indigo-600">{Number(cus.spend || 0).toFixed(3)} TND</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Lifetime</p>
                      </td>
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-2">
                          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><History size={16} /></button>
                          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Mail size={16} /></button>
                          <button className="p-2.5 text-slate-400 hover:text-slate-900 rounded-xl transition-all"><MoreHorizontal size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black italic">Need more customer insights?</h3>
          <p className="text-slate-400 font-medium mt-1">Export your data to CSV or connect with automated marketing tools.</p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 text-sm uppercase tracking-widest">
          Export Database <ChevronRight size={18} />
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>

      {/* Add client modal */}
      {showModal && (
        <AddCustomerModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); fetchPortal(); }}
        />
      )}
    </div>
  );
};

export default Customers;
