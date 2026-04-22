import React from "react";
import { 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Download, 
  ShieldCheck,
  Plus
} from "lucide-react";

const Billing = () => {
  // Mock data matching your UserSchema.paymentInfo
  const subscription = {
    plan: "Free Trial",
    status: "Active",
    trialEndsAt: "2026-07-15",
    currency: "TND",
    nextBillingDate: "July 15, 2026"
  };

  const history = [
    { id: "TXN-9921", date: "Apr 20, 2026", amount: "0.000", status: "Completed", method: "Trial" },
    { id: "TXN-8842", date: "Mar 20, 2026", amount: "0.000", status: "Completed", method: "Trial" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- TOP SECTION: CURRENT PLAN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Subscription Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/30">
                  Current Plan
                </span>
                <h2 className="text-4xl font-black mt-4 flex items-center gap-3">
                  {subscription.plan} <Zap className="text-amber-400 fill-amber-400" size={28} />
                </h2>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-bold">Next Invoice</p>
                <p className="text-xl font-black">{subscription.nextBillingDate}</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Status</p>
                <p className="text-emerald-400 font-black flex items-center gap-2 mt-1">
                  <CheckCircle2 size={16} /> {subscription.status}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Currency</p>
                <p className="text-white font-black mt-1">{subscription.currency}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Trial Ends In</p>
                <p className="text-white font-black mt-1">84 Days</p>
              </div>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        </div>

        {/* Quick Upgrade Call-to-Action */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-200">
          <div>
            <h3 className="text-2xl font-black leading-tight">Switch to Pro &<br />Scale Faster</h3>
            <p className="text-indigo-100 text-sm mt-3 font-medium opacity-80">
              Get unlimited staff members, advanced analytics, and premium custom themes.
            </p>
          </div>
          <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group">
            Upgrade Now
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* --- MIDDLE SECTION: PAYMENT METHODS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <CreditCard className="text-indigo-600" /> Payment Methods
            </h3>
            <button className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
              <Plus size={14} /> Add New
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 border-dashed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-slate-200 rounded flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                  Card
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 italic underline">No payment method added</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Your trial is currently free.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">Secure Billing</h4>
              <p className="text-xs text-slate-500 font-medium">All transactions are encrypted and processed securely via local Tunisan partners.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: TRANSACTION HISTORY --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Clock className="text-indigo-600" /> Transaction History
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{txn.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-900">{txn.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">{txn.amount} {subscription.currency}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-500">{txn.method}</td>
                  <td className="px-8 py-5 text-sm">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {history.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold italic">No transactions found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;