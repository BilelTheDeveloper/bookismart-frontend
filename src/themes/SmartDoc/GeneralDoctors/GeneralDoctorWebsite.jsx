import React, { useState } from 'react';
import { 
  UserRound, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Stethoscope, ShieldCheck, 
  CalendarCheck, Info
} from 'lucide-react';

const GeneralDoctorWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE - General Practice Logic
  const data = {
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Family Wellness Clinic",
    slogan: merchantData?.hero?.slogan || "Your Partner in Long-Term Health & Preventive Care",
    heroTitle: merchantData?.hero?.title || "Compassionate Care for Every Generation",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "A Legacy of Healing",
    aboutText: merchantData?.about?.text || "We provide personalized healthcare services ranging from routine check-ups to chronic disease management. Our practice is built on the foundation of trust and patient-centered communication.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section (GP Logic)
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "General Consultation", price: "50", description: "Comprehensive health assessment and medical advice." },
      { title: "Preventive Screening", price: "80", description: "Early detection tests and personalized wellness plans." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 71 000 000",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Avenue Habib Bourguiba, Tunis",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );

  const WebsiteContent = (
    <div className="bg-white text-indigo-950 font-sans selection:bg-emerald-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-indigo-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-2xl shadow-xl shadow-indigo-200">
                <Stethoscope className="text-white" size={22} />
            </div>
            <span className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#services" className="hover:text-emerald-600 transition-colors">Expertise</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <button className="bg-emerald-500 hover:bg-indigo-900 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-100 transform hover:scale-105 active:scale-95">
            Book Visit
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center bg-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
                <ShieldCheck className="text-emerald-500" size={16} />
                <span className="text-indigo-900 font-bold uppercase tracking-widest text-[9px]">Registered Medical Practice</span>
            </div>
            <h1 className="text-5xl md:text-[76px] font-black text-indigo-950 leading-[1.1] tracking-tight">
              {data.heroTitle}
            </h1>
            <p className="text-xl text-indigo-700/70 font-medium leading-relaxed max-w-lg">
              {data.slogan}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <button className="bg-indigo-950 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-2xl shadow-indigo-200">
                 Schedule Consultation
               </button>
               <div className="flex items-center gap-4 px-6 py-5 bg-white rounded-3xl border border-indigo-50">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Phone className="text-emerald-600" size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Emergency Line</p>
                    <p className="text-sm font-black text-indigo-950">{data.contact.phone}</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="relative hidden lg:block animate-in zoom-in duration-1000">
             <div className="absolute -inset-10 bg-emerald-100/50 rounded-full blur-3xl" />
             <img 
               src={data.heroImage} 
               className="relative rounded-[4rem] shadow-3xl w-full h-[600px] object-cover border-[12px] border-white" 
               alt="Doctor" 
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-[2rem] shadow-2xl border border-indigo-50 flex items-center gap-6">
                <div className="bg-indigo-600 p-4 rounded-2xl">
                    <CalendarCheck className="text-white" size={32} />
                </div>
                <div>
                    <p className="text-2xl font-black text-indigo-950">99%</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">On-Time Visits</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="order-2 lg:order-1 relative">
                  <img src={data.aboutImage} className="rounded-[3rem] shadow-2xl w-full aspect-[4/5] object-cover" alt="Medical Office" />
                  <div className="absolute top-10 -left-10 bg-emerald-500 text-white p-6 rounded-3xl shadow-xl hidden md:block">
                     <Info size={24} />
                  </div>
               </div>
               <div className="space-y-8 order-1 lg:order-2">
                  <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs">Medical Philosophy</span>
                  <h2 className="text-4xl md:text-6xl font-black text-indigo-950 leading-tight">{data.aboutTitle}</h2>
                  <p className="text-indigo-700/60 text-lg leading-relaxed font-medium">{data.aboutText}</p>
                  <div className="space-y-4 pt-6">
                     {["Family-Centered Care", "Modern Diagnostic Tools", "Preventive Wellness Plans"].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                           <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                              <ChevronRight className="text-emerald-600 group-hover:text-white" size={14} />
                           </div>
                           <span className="text-indigo-950 font-bold tracking-tight">{item}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 bg-indigo-950 text-white rounded-[4rem] md:rounded-[6rem] mx-4">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-xs">Medical Expertise</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mt-4">Clinical Services</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((service, index) => (
            <div key={index} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start mb-10">
                <h3 className="text-3xl font-black tracking-tight max-w-[200px] leading-none group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                <span className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-xl text-lg font-black italic">
                   {service.price} <span className="text-[10px] uppercase ml-1">tnd</span>
                </span>
              </div>
              <p className="text-indigo-200/50 text-base leading-relaxed mb-8">{service.description}</p>
              <button className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all">
                 Learn More <ChevronRight size={14} className="text-emerald-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <footer id="contact" className="pt-40 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32">
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-100">
                    <Stethoscope className="text-white" size={28} />
                 </div>
                 <span className="text-3xl font-black text-indigo-950 tracking-tight">{data.name}</span>
              </div>
              <p className="text-indigo-400 max-w-xs leading-loose font-medium">{data.slogan}</p>
              <div className="flex gap-4">
                  {data.contact.socials.facebook && (
                    <a href={data.contact.socials.facebook} className="w-12 h-12 rounded-2xl border border-indigo-50 flex items-center justify-center hover:bg-indigo-600 transition-all hover:text-white text-indigo-300">
                        <FacebookIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-indigo-400">Location</h4>
              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <div className="bg-emerald-50 p-3 rounded-xl">
                    <MapPin className="text-emerald-600" size={20} />
                   </div>
                   <p className="text-indigo-950 font-black uppercase text-sm tracking-widest leading-relaxed">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="bg-indigo-50 p-3 rounded-xl">
                    <Phone className="text-indigo-600" size={20} />
                   </div>
                   <p className="text-indigo-950 font-black text-2xl tracking-tighter">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-indigo-400">Consultation Hours</h4>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-indigo-50">
                 <div className="grid grid-cols-1 gap-4">
                    {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                       <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pb-3 border-b border-indigo-100/50">
                           <span className="text-indigo-400">{h.day}</span>
                           <span className="text-indigo-950">{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                       </div>
                    )) : <p className="text-indigo-300 text-[10px] font-black uppercase">Call for availability</p>}
                 </div>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-indigo-50 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-300">© 2026 {data.name} • General Medical Council Registered</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-indigo-50/20 rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-indigo-50 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
              Official Preview: <span className="text-indigo-950">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-indigo-950 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-indigo-100"
          >
            <Maximize size={14} /> View Live
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-indigo-950 text-white p-5 rounded-full shadow-2xl hover:bg-emerald-500 transition-all"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default GeneralDoctorWebsite;