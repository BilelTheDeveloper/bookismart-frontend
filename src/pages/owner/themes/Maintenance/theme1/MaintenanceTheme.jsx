import React from "react";
import { Link } from "react-router-dom";

const MaintenanceTheme = ({ data }) => {
  if (!data) return null;
  const { ownerId, hero, services } = data;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-orange-900/30 to-slate-950/95" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <span className="inline-flex w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-orange-500/20 text-orange-200 border border-orange-300/20">Maintenance</span>
          <h1 className="mt-5 text-5xl md:text-7xl font-black">{hero?.title || "Fast Fixes, Lasting Results"}</h1>
          <p className="mt-4 max-w-2xl text-slate-200/90 text-lg">{hero?.slogan || "Trusted home and office maintenance professionals on schedule."}</p>
          <Link to={`/book/${ownerId?._id}`} className="mt-8"><button className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-orange-600 hover:bg-orange-500 text-white">Book Now</button></Link>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-5">
        {(services || []).filter((s) => s?.active !== false).map((s, i) => <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10"><div className="flex justify-between"><h3 className="font-bold text-xl">{s.title}</h3><span className="text-orange-300 font-black">{s.price}</span></div><p className="text-slate-300/80 mt-2 text-sm">{s.description}</p></div>)}
      </section>
    </div>
  );
};

export default MaintenanceTheme;
