import React from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  Star, 
  Mail, 
  Phone, 
  History, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

const Customers = () => {
  const customers = [
    { 
      id: "CUS-001", 
      name: "Ahmed Mansour", 
      email: "ahmed.m@email.tn", 
      phone: "+216 22 444 888", 
      visits: 24, 
      spend: "1,240.000", 
      status: "VIP",
      lastVisit: "2 days ago" 
    },
    { 
      id: "CUS-002", 
      name: "Selima Gharbi", 
      email: "selima.g@email.tn", 
      phone: "+216 50 111 222", 
      visits: 8, 
      spend: "420.500", 
      status: "Regular",
      lastVisit: "1 week ago" 
    },
    { 
      id: "CUS-003", 
      name: "Karim Ben Said", 
      email: "karim.bs@email.tn", 
      phone: "+216 98 777 666", 
      visits: 1, 
      spend: "35.000", 
      status: "New",
      lastVisit: "Today" 
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- CRM INSIGHTS BAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex items-center justify-between shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-1">Total Database</p>
            <h3 className="text-4xl font-black italic">1,284</h3>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp size={14} /> +12 this week
            </div>
          </div>
          <Users size={60} className="text-white/10 absolute -right-4 -bottom-4" />
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl">
            <Award size={32} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">VIP Loyalty</p>
            <h3 className="text-2xl font-black text-slate-900">86 <span className="text-sm font-medium text-slate-400 italic">Clients</span></h3>
            <p className="text-slate-500 text-[11px] font-bold mt-1">High retention rate: 94%</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
            <Star size={32} />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Avg. Spend</p>
            <h3 className="text-2xl font-black text-slate-900">58.400 <span className="text-sm font-medium text-slate-400 tracking-tighter">TND</span></h3>
            <p className="text-slate-500 text-[11px] font-bold mt-1">Lifetime Value (LTV) is rising</p>
          </div>
        </div>
      </div>

      {/* --- ACTIONS & SEARCH --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-medium"
          />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-slate-200">
          <UserPlus size={18} /> Add New Client
        </button>
      </div>

      {/* --- CUSTOMER TABLE --- */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visits</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spend</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((cus) => (
                <tr key={cus.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-black text-sm border border-slate-200 uppercase">
                        {cus.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{cus.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs font-bold">
                          <span className="flex items-center gap-1"><Phone size={12} /> {cus.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      cus.status === 'VIP' ? 'bg-amber-100 text-amber-700' : 
                      cus.status === 'New' ? 'bg-indigo-100 text-indigo-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {cus.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-slate-900">{cus.visits}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Last: {cus.lastVisit}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-indigo-600">{cus.spend} TND</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Lifetime</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <History size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black italic">Need more customer insights?</h3>
          <p className="text-slate-400 font-medium mt-1">Export your data to CSV or connect with automated marketing tools.</p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 text-sm uppercase tracking-widest">
          Export Database <ChevronRight size={18} />
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>
    </div>
  );
};

export default Customers;