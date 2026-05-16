import React, { useEffect, useState } from "react";
import { Gift, Star, Loader2, AlertCircle, Zap } from "lucide-react";
import CAPI from "../../../api/customerConfig";

const CustomerLoyalty = () => {
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    CAPI.get("/customer/loyalty")
      .then(res => setLoyalty(res.data?.data || {}))
      .catch(err => setError(err.response?.data?.message || "Failed to load loyalty data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={32} className="animate-spin text-indigo-500" /></div>;
  if (error)   return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <AlertCircle size={40} className="text-rose-400" />
      <p className="text-slate-400">{error}</p>
    </div>
  );

  const points      = loyalty?.points || 0;
  const stamps      = loyalty?.stamps || 0;
  const maxStamps   = loyalty?.stampGoal || 10;
  const tier        = points >= 1000 ? "Gold" : points >= 500 ? "Silver" : "Bronze";
  const tierColors  = { Gold: "from-amber-500 to-yellow-400", Silver: "from-slate-400 to-slate-300", Bronze: "from-orange-600 to-amber-500" };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center">
          <Gift size={22} className="text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Loyalty Points</h2>
          <p className="text-slate-400 text-sm">Your rewards progress</p>
        </div>
      </div>

      {/* Tier card */}
      <div className={`relative bg-gradient-to-br ${tierColors[tier]} rounded-[2rem] p-8 overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative">
          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Your Tier</p>
          <h3 className="text-4xl font-black text-white mb-6">{tier} Member</h3>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-black text-white">{points.toLocaleString()}</span>
            <span className="text-white/70 text-xl font-bold mb-2">pts</span>
          </div>
          <p className="text-white/60 text-sm mt-2">
            {tier === "Gold" ? "Maximum tier reached!" : `${tier === "Silver" ? 1000 - points : 500 - points} points to ${tier === "Bronze" ? "Silver" : "Gold"}`}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap size={18} className="text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-white">{points}</p>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Points</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Star size={18} className="text-amber-400" />
          </div>
          <p className="text-3xl font-black text-white">{stamps}</p>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Stamps</p>
        </div>
      </div>

      {/* Stamp card */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black">Stamp Card</h3>
          <span className="text-slate-400 text-sm font-bold">{stamps}/{maxStamps}</span>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {Array.from({ length: maxStamps }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
              i < stamps
                ? "bg-amber-500 border-amber-400 shadow-lg shadow-amber-500/30"
                : "bg-slate-800 border-slate-700"
            }`}>
              {i < stamps && <Star size={16} className="text-white" fill="white" />}
            </div>
          ))}
        </div>
        <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${Math.min((stamps / maxStamps) * 100, 100)}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-3 text-center">
          {stamps >= maxStamps ? "🎉 Stamp card complete! Claim your reward." : `${maxStamps - stamps} more stamps to complete your card`}
        </p>
      </div>
    </div>
  );
};

export default CustomerLoyalty;
