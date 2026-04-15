import React, { useState } from 'react';
import { 
  Stethoscope, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, ShieldCheck, HeartPulse, Activity
} from 'lucide-react';

const DentistWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE - Clinical Context
  const data = {
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Elite Dental Care",
    slogan: merchantData?.hero?.slogan || "Advanced Dentistry with a Human Touch",
    heroTitle: merchantData?.hero?.title || "Radiant Smiles, Redefined",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "Expert Clinical Care",
    aboutText: merchantData?.about?.text || "Our mission is to provide comprehensive, high-quality dental care using the latest technology in a comfortable and stress-free environment.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section (Dental Logic)
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Cosmetic Whitening", price: "450", description: "Professional grade laser whitening for a brilliant smile." },
      { title: "Dental Implants", price: "1200", description: "Permanent, natural-looking tooth replacement solutions." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 71 000 000",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Tunis Medical Center",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const WebsiteContent = (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-cyan-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- CLINICAL NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-600 p-2.5 rounded-xl shadow-lg shadow-cyan-600/20">
                <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {data.showAbout && <a href="#about" className="hover:text-cyan-600 transition-colors">Practice</a>}
            <a href="#services" className="hover:text-cyan-600 transition-colors">Treatments</a>
            {data.showGallery && <a href="#gallery" className="hover:text-cyan-600 transition-colors">Results</a>}
            <a href="#contact" className="hover:text-cyan-600 transition-colors">Location</a>
          </div>
          <button className="bg-slate-900 hover:bg-cyan-600 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 transform hover:scale-105">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 md:px-24 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-cyan-600" size={16} />
            <span className="text-cyan-700 font-black uppercase tracking-[0.3em] text-[10px]">Certified Dental Surgeons</span>
          </div>
          <h1 className="text-5xl md:text-[85px] font-black text-slate-900 leading-[0.95] mb-8 animate-in fade-in slide-in-from-left-12 duration-1000">
            {data.heroTitle}
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-xl mb-12 border-l-4 border-cyan-500 pl-6">
            {data.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <button className="bg-cyan-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-cyan-200">
               New Patient Portal
             </button>
             <a href="#services" className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all text-center">
               Our Specializations
             </a>
          </div>
        </div>
      </section>

      {/* --- PRACTICE/ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="inline-block bg-cyan-50 text-cyan-600 px-4 py-2 rounded-lg font-black uppercase tracking-widest text-[10px]">Superior Standards</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-lg leading-relaxed">{data.aboutText}</p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Sterilization", val: "A+ Grade" },
                  { label: "Technology", val: "Modern AI" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <p className="text-2xl font-black text-cyan-600">{stat.val}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-1 tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50" />
              <img src={data.aboutImage} className="relative rounded-[3rem] shadow-2xl z-10 w-full aspect-square object-cover" alt="Clinic" />
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES/TREATMENTS SECTION --- */}
      <section id="services" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
                <span className="text-cyan-600 font-black uppercase tracking-[0.4em] text-xs">Care Spectrum</span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 mt-4">Oral Wellness</h2>
            </div>
            <p className="text-slate-400 font-medium max-w-xs text-right hidden md:block">Transparent pricing for premium healthcare services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-100/50 transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <HeartPulse className="text-cyan-600 group-hover:text-white" size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{service.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <span className="text-lg font-black text-cyan-600">{service.price} <span className="text-[10px] uppercase ml-1">tnd</span></span>
                    <button className="text-slate-300 group-hover:text-cyan-600 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {data.gallery.map((img, i) => img && (
                  <div key={i} className="break-inside-avoid rounded-[2rem] overflow-hidden group relative shadow-lg">
                     <img src={img} className="w-full object-cover group-hover:scale-105 transition-all duration-700" alt="Clinic Gallery" />
                     <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-900 p-2.5 rounded-xl">
                    <Activity className="text-white" size={24} />
                 </div>
                 <span className="text-2xl font-black tracking-tight">{data.name}</span>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium">{data.slogan}</p>
              <div className="flex gap-4">
                  {data.contact.socials.instagram && (
                    <a href={`https://instagram.com/${data.contact.socials.instagram}`} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all text-slate-400">
                        <InstagramIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-cyan-600">Headquarters</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-slate-300" size={20} />
                   <p className="text-slate-600 font-bold text-sm leading-snug">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-cyan-600" size={20} />
                   <p className="text-slate-900 font-black text-xl">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-cyan-400 mb-6">Clinical Hours</h4>
              <div className="space-y-4">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-80">
                        <span className="text-cyan-400/60">{h.day}</span>
                        <span>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : <p className="text-cyan-400/40 text-[10px] font-black uppercase">Schedule TBD</p>}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2026 {data.name} • Clinical Excellence Group</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-slate-50 rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Live Preview: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-600 transition-all"
          >
            <Maximize size={14} /> Fullscreen
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-black p-5 rounded-full shadow-2xl hover:bg-cyan-600 hover:text-white transition-all"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default DentistWebsite;