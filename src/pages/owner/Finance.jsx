import React from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Banknote, 
  PieChart, 
  History, 
  Download, 
  ExternalLink,
  Plus,
  CreditCard,
  TrendingUp
} from "lucide-react";

const Finance = () => {
  // Mock data reflecting the UserSchema.paymentInfo logic
  const walletData = {
    balance: "1,840.500",
    pending: "320.000",
    currency: "TND",
    lastPayout: "Apr 15, 2026"
  };

  const revenueSplits = [
    { label: "Direct Bookings", value: "70%", amount: "1,288.350", color: "bg-indigo-500" },
    { label: "Online Pre-payments", value: "25%", amount: "460.125", color: "bg-emerald-500" },
    { label: "Other Fees", value: "5%", amount: "92.025", color: "bg-slate-400" },
  ];

  const transactions = [
    { id: "#FIN-1022", customer: "Amine G.", type: "Income", amount: "+85.000", status: "Success", date: "Today, 11:30 AM" },
    { id: "#FIN-1021", customer: "Sarra M.", type: "Income", amount: "+45.000", status: "Success", date: "Today, 09:15 AM" },
    { id: "#PAY-990", customer: "Payout", type: "Withdrawal", amount: "-500.000", status: "Processing", date: "Yesterday" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- 1. WALLET & PRIMARY ACTIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* The Virtual Wallet Card */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Available Balance
                </p>
                <h2 className="text-5xl font-black tracking-tighter">
                  {walletData.balance} <span className="text-xl text-slate-400 font-bold">{walletData.currency}</span>
                </h2>
              </div>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-900/40">
                  <ArrowDownLeft size={18} /> Request Payout
                </button>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm transition-all">
                  <Plus size={18} /> Add Funds
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-end text-right">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Pending Clearances</p>
                <p className="text-2xl font-black text-amber-400 mt-1">+{walletData.pending} TND</p>
                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tighter italic">Locked for 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* Abstract Design Elements */}
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-0 left-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        {/* Secondary Info Card */}
        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem]">
              <Banknote size={28} />
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Last Payout</p>
              <p className="font-black text-slate-900">{walletData.lastPayout}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="font-black text-slate-900">Auto-Payout</h4>
            <p className="text-sm text-slate-500 font-medium mt-1">Every Monday to your Tunisan bank account.</p>
          </div>

          <button className="mt-6 w-full py-4 border border-slate-100 rounded-2xl text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
             Management Settings
          </button>
        </div>
      </div>

      {/* --- 2. REVENUE SPLIT & CHARTING --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Distribution */}
        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
            <PieChart size={22} className="text-indigo-600" /> Revenue Split
          </h3>
          <div className="space-y-6">
            {revenueSplits.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">{item.label}</span>
                  <span className="font-black text-slate-900">{item.value}</span>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                </div>
                <p className="text-[11px] font-black text-indigo-600 text-right">{item.amount} TND</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <History size={22} className="text-indigo-600" /> Recent Financial Activity
            </h3>
            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
              <Download size={20} />
            </button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer/Source</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <td className="px-8 py-5 text-xs font-bold text-slate-400">{txn.id}</td>
                    <td className="px-8 py-5 font-black text-slate-900 text-sm">{txn.customer}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{txn.date}</td>
                    <td className={`px-8 py-5 text-sm font-black ${
                      txn.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>{txn.amount} TND</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- 3. BOTTOM CARDS: TIPS & SECURITY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
        <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 flex items-center gap-6">
          <div className="p-4 bg-white text-indigo-600 rounded-[1.5rem] shadow-sm">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="font-black text-indigo-900">Financial Insight</h4>
            <p className="text-sm text-indigo-700/80 font-medium">Your revenue has increased by 15% this week compared to last. Keep it up!</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl">
               <CreditCard size={24} />
             </div>
             <div>
               <h4 className="font-black text-slate-900 italic underline">Bank Link Status</h4>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mt-1">Verified: BIAT Tunisia • ***4291</p>
             </div>
          </div>
          <ExternalLink size={20} className="text-slate-300 hover:text-indigo-600 cursor-pointer transition-all" />
        </div>
      </div>
    </div>
  );
};

export default Finance;