import React, { useState } from 'react';
import { 
  Paintbrush, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Sparkles, Star, CheckCircle2 
} from 'lucide-react';

const MakeupArtistWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE - Synchronized with your global schema
  const data = {
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Pro Visuals",
    slogan: merchantData?.hero?.slogan || "Unveiling Your Most Radiant Self",
    heroTitle: merchantData?.hero?.title || "Face Design",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "The Artistry",
    aboutText: merchantData?.about?.text || "Specializing in bridal, editorial, and red-carpet glamour. I bring a meticulous eye for detail and a passion for artistic expression to every face.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Bridal Glamour", price: "350", description: "Full luxury application and trial session." },
      { title: "Editorial Look", price: "200", description: "High-definition makeup for studio lighting." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 55 000 000",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Berges du Lac, Tunis",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // Custom Brand SVGs
  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );

  const WebsiteContent = (
    <div className="bg-[#050505] text-white font-sans selection:bg-violet-500/30 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Inter:wght@300;900&display=swap');
        .font-sync { font-family: 'Syncopate', sans-serif; }
      `}</style>
      
      {/* --- RESPONSIVE NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Paintbrush className="text-violet-500" size={20} />
            <span className="text-[10px] md:text-sm font-sync tracking-[0.4em] uppercase">{data.name}</span>
          </div>
          <div className="hidden lg:flex gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
            {data.showAbout && <a href="#about" className="hover:text-violet-400 transition-colors">Philosophy</a>}
            <a href="#services" className="hover:text-violet-400 transition-colors">Rates</a>
            {data.showGallery && <a href="#gallery" className="hover:text-violet-400 transition-colors">Portfolio</a>}
            <a href="#contact" className="hover:text-violet-400 transition-colors">Contact</a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">
            Book Session
          </button>
        </div>
      </nav>

      {/* --- EDITORIAL HERO --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0">
           <img src={data.heroImage} className="w-full h-full object-cover opacity-50" alt="Hero" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-3 text-violet-500">
            <div className="w-12 h-[1px] bg-violet-500"></div>
            <span className="text-[10px] font-sync tracking-[0.5em] uppercase">Master Artist</span>
          </div>
          <h1 className="text-6xl md:text-[120px] font-black uppercase leading-[0.85] tracking-tighter">
            {data.heroTitle.split(' ')[0]} <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">
              {data.heroTitle.split(' ').slice(1).join(' ') || "Artistry"}
            </span>
          </h1>
          <p className="text-lg text-white/40 max-w-md font-light leading-relaxed">
            {data.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button className="bg-violet-600 text-white px-10 py-5 rounded-sm font-sync text-[9px] tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-2xl shadow-violet-900/40">
               Schedule Session
             </button>
             <a href="#gallery" className="border border-white/10 text-white px-10 py-5 rounded-sm font-sync text-[9px] tracking-widest uppercase hover:bg-white/5 transition-all text-center">
               View Gallery
             </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES / RATES --- */}
      <section id="services" className="py-32 px-6 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-4">
              <span className="text-violet-600 font-bold uppercase tracking-widest text-[10px]">Investment</span>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Services <br/> & Rates</h2>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-12">
            {data.services.map((service, index) => (
              <div key={index} className="group border-b border-black/5 pb-10 flex flex-col gap-4 hover:border-violet-500 transition-colors">
                <div className="flex justify-between items-end">
                    <span className="text-3xl font-black italic text-black/5 group-hover:text-violet-500/20 transition-colors">0{index + 1}</span>
                    <span className="text-2xl font-black text-violet-600">{service.price} <span className="text-[10px] uppercase text-black/30 ml-1">tnd</span></span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
                <p className="text-black/50 text-sm max-w-xl leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6 bg-[#0a0a0a]">
           <div className="max-w-7xl mx-auto text-center mb-20">
              <span className="text-violet-500 font-bold uppercase tracking-widest text-[10px]">The Portfolio</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mt-4">Selected Work</h2>
           </div>
           <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.gallery.map((img, i) => img && (
                <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden group relative shadow-2xl">
                   <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Work" />
                   <div className="absolute inset-0 bg-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="text-white" size={30} />
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32">
           <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3">
                 <Paintbrush className="text-violet-500" size={24} />
                 <span className="text-xl font-sync tracking-[0.4em] uppercase leading-none">{data.name}</span>
              </div>
              <p className="text-white/30 max-w-xs leading-loose text-sm">{data.slogan}</p>
              <div className="flex gap-4">
                  {data.contact.socials.instagram && (
                    <a href={`https://instagram.com/${data.contact.socials.instagram}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-violet-600 transition-all text-white/40 hover:text-white">
                      <InstagramIcon />
                    </a>
                  )}
                  {data.contact.socials.facebook && (
                    <a href={data.contact.socials.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-violet-600 transition-all text-white/40 hover:text-white">
                      <FacebookIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-8 text-center lg:text-left">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-violet-500">Studio Location</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4 justify-center lg:justify-start">
                   <MapPin className="text-violet-500" size={20} />
                   <p className="text-white/60 font-medium uppercase text-[11px] tracking-widest">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4 justify-center lg:justify-start text-2xl font-black">
                   <Phone className="text-violet-500" size={20} />
                   <p>{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-violet-500">Working Hours</h4>
              <div className="space-y-3">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/20 border-b border-white/5 pb-2">
                        <span>{h.day}</span>
                        <span className={h.isClosed ? 'text-violet-400' : 'text-white'}>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : (
                    <p className="text-white/20 text-[10px] font-bold uppercase italic">Contact for availability</p>
                 )}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-sync text-white/10 tracking-[0.4em]">
           <p>© 2026 {data.name.toUpperCase()} STUDIO</p>
           <p>POWERED BY BOOKISMART TUNISIA</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#050505] rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              High-Fidelity Preview: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl shadow-slate-200"
          >
            <Maximize size={14} /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-black p-5 rounded-full shadow-2xl hover:bg-violet-600 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default MakeupArtistWebsite;