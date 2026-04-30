import React from "react";
import { Link } from "react-router-dom";

const CoachingTutorsTheme = ({ data }) => {
  if (!data) return null;
  const { ownerId, hero, services } = data;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-indigo-900/30 to-slate-950/95" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <span className="inline-flex w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-200 border border-indigo-300/20">Coaching & Tutors</span>
          <h1 className="mt-5 text-5xl md:text-7xl font-black">{hero?.title || "Learn Better, Faster"}</h1>
          <p className="mt-4 max-w-2xl text-slate-200/90 text-lg">{hero?.slogan || "Personalized sessions designed around your goals and pace."}</p>
          <Link to={`/book/${ownerId?._id}`} className="mt-8"><button className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white">Book Now</button></Link>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-5">
        {(services || []).filter((s) => s?.active !== false).map((s, i) => <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10"><div className="flex justify-between"><h3 className="font-bold text-xl">{s.title}</h3><span className="text-indigo-300 font-black">{s.price}</span></div><p className="text-slate-300/80 mt-2 text-sm">{s.description}</p></div>)}
      </section>
    </div>
  );
};

export default CoachingTutorsTheme;
