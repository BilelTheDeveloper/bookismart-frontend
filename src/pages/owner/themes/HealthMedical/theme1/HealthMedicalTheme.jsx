import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const HealthMedicalTheme = ({ data }) => {
  if (!data) return null;
  const { ownerId, hero, about, services, gallery, contact, businessHours } = data;
  const activeServices = (services || []).filter((s) => s?.active !== false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop"})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-900/30 to-slate-950/95" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <span className="inline-flex w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-500/20 text-blue-200 border border-blue-300/20">Health & Medical</span>
          <h1 className="mt-5 text-5xl md:text-7xl font-black">{hero?.title || "Care You Can Trust"}</h1>
          <p className="mt-4 max-w-2xl text-slate-200/90 text-lg">{hero?.slogan || "Modern healthcare booking with human-centered service."}</p>
          <Link to={`/book/${ownerId?._id}`} className="mt-8">
            <button className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white">Book Now</button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-5">
        {activeServices.map((s, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between"><h3 className="font-bold text-xl">{s.title}</h3><span className="text-blue-300 font-black">{s.price}</span></div>
            <p className="text-slate-300/80 mt-2 text-sm">{s.description}</p>
          </div>
        ))}
      </section>

      {about?.show && <section className="max-w-6xl mx-auto px-6 pb-16"><h2 className="text-3xl font-black">{about?.title || "About"}</h2><p className="mt-3 text-slate-300">{about?.text}</p></section>}
      {gallery?.show && <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">{(gallery?.images || []).filter(Boolean).map((img, i) => <img key={i} src={img} alt="gallery" className="h-40 w-full object-cover rounded-xl border border-white/10" />)}</section>}

      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4 text-sm text-slate-300">
          <p className="flex items-center gap-2"><Phone size={14} /> {contact?.phone || "N/A"}</p>
          <p className="flex items-center gap-2"><MapPin size={14} /> {contact?.address || ownerId?.ville || "N/A"}</p>
          <div>{(businessHours || []).slice(0, 2).map((h) => <p key={h.day} className="flex items-center gap-2"><Clock size={14} /> {h.day}: {h.isClosed ? "Closed" : `${h.open} - ${h.close}`}</p>)}</div>
        </div>
      </footer>
    </div>
  );
};

export default HealthMedicalTheme;
