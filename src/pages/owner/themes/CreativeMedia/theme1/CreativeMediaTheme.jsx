import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Mail, Globe } from "lucide-react";

const CreativeMediaTheme = ({ data }) => {
  if (!data) return null;
  const { ownerId, hero, about, services, gallery, contact, businessHours, setupConfig } = data;
  const activeServices = (services || []).filter((s) => s?.active !== false);
  const images = (gallery?.images || []).filter(Boolean);
  const pauses = setupConfig?.pauseWindows || [];
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-violet-900/30 to-slate-950/95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <span className="inline-flex w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-violet-500/20 text-violet-200 border border-violet-300/20">Creative & Media</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-black">{hero?.title || "Create. Capture. Publish."}</h1>
          <p className="mt-4 max-w-2xl text-slate-200/90 text-lg">{hero?.slogan || "From concept to delivery, your story deserves premium production."}</p>
          <Link to={`/book/${ownerId?._id}`} className="mt-8"><button className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-violet-600 hover:bg-violet-500 text-white">Book Now</button></Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10"><p className="text-xs text-slate-400">Max/Day</p><p className="font-black">{setupConfig?.maxCustomersPerDay ?? "N/A"}</p></div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10"><p className="text-xs text-slate-400">Rest</p><p className="font-black">{setupConfig?.restMinutesBetweenConsultations ?? 0} min</p></div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10"><p className="text-xs text-slate-400">City</p><p className="font-black">{setupConfig?.localization?.city || ownerId?.ville || "N/A"}</p></div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10"><p className="text-xs text-slate-400">Timezone</p><p className="font-black">{setupConfig?.localization?.timezone || "UTC"}</p></div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-5">
        {activeServices.map((s, i) => <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10"><div className="flex justify-between"><h3 className="font-bold text-xl">{s.title}</h3><span className="text-violet-300 font-black">{s.price}</span></div><p className="text-slate-300/80 mt-2 text-sm">{s.description}</p></div>)}
      </section>
      {about?.show && <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12"><h2 className="text-3xl font-black">{about?.title || "About"}</h2><p className="mt-2 text-slate-300">{about?.text}</p></section>}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">{images.map((img, i) => <img key={i} src={img} alt="gallery" className="h-40 w-full object-cover rounded-xl border border-white/10" />)}</section>
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-white/10 grid md:grid-cols-2 gap-4 text-sm">
        <p className="flex items-center gap-2"><Phone size={14} /> {contact?.phone || "N/A"}</p>
        <p className="flex items-center gap-2"><Mail size={14} /> {contact?.email || "N/A"}</p>
        <p className="flex items-center gap-2"><MapPin size={14} /> {setupConfig?.localization?.address || contact?.address || "N/A"}</p>
        <p className="flex items-center gap-2"><Globe size={14} /> {setupConfig?.localization?.country || "N/A"} · {setupConfig?.localization?.city || "N/A"}</p>
        <div className="md:col-span-2">{(businessHours || []).map((h) => <p key={h.day} className="flex items-center gap-2"><Clock size={14} /> {h.day}: {h.isClosed ? "Closed" : `${h.open} - ${h.close}`}</p>)}</div>
        <div className="md:col-span-2">{pauses.length ? pauses.map((p, i) => <p key={i} className="text-slate-300">{p.label || "Pause"}: {p.start} - {p.end}</p>) : <p className="text-slate-400">No pause configured.</p>}</div>
      </footer>
    </div>
  );
};

export default CreativeMediaTheme;
