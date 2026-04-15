import React, { useState } from 'react';
import { 
  Sparkles, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Star, CheckCircle2 
} from 'lucide-react';

const NailSalonWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE (Synchronized with global template protocol)
  const data = {
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Gloss & Glam",
    slogan: merchantData?.hero?.slogan || "Precision Artistry for Your Fingertips",
    heroTitle: merchantData?.hero?.title || "Spring Glow",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "The Sanctuary",
    aboutText: merchantData?.about?.text || "Step into a world of color and care. We specialize in luxury manicures, long-lasting extensions, and custom nail art designed to reflect your unique style.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1604654894610-df490c81726a?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Signature Gel Mani", price: "45", description: "Long-lasting shine with luxury cuticle care." },
      { title: "Apres Gel-X", price: "90", description: "Perfect length with zero natural nail damage." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 22 123 456",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Ennasr 2, Tunis",
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
    <div className="bg-white text-slate-900 font-sans selection:bg-pink-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Quicksand:wght@300;700&display=swap');
        .font-mont { font-family: 'Montserrat', sans-serif; }
        .font-quick { font-family: 'Quicksand', sans-serif; }
      `}</style>
      
      {/* --- GLOSSY NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-pink-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-xl rotate-12 flex items-center justify-center text-white shadow-lg shadow-pink-100">
                <Sparkles size={20} />
            </div>
            <span className="text-xl font-mont font-black tracking-tighter text-slate-800 uppercase">{data.name}</span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {data.showAbout && <a href="#about" className="hover:text-pink-500 transition-colors">About</a>}
            <a href="#services" className="hover:text-pink-500 transition-colors">Menu</a>
            {data.showGallery && <a href="#gallery" className="hover:text-pink-500 transition-colors">Work</a>}
            <a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a>
          </div>
          <button className="bg-slate-900 hover:bg-pink-500 text-white px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-100">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* --- PREMIUM HERO --- */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 bg-gradient-to-b from-pink-50/40 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                <Star className="text-pink-400" size={12} fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-500">Elite Nail Artistry</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-mont font-black text-slate-900 tracking-tighter leading-[0.85]">
              {data.heroTitle.split(' ')[0]} <br/> 
              <span className="text-pink-400">{data.heroTitle.split(' ').slice(1).join(' ') || "Glow"}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md font-quick font-medium leading-relaxed">
              {data.slogan}
            </p>
            <div className="flex gap-4 pt-4">
               <button className="bg-pink-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-2xl shadow-pink-200 transform hover:scale-105">
                 Reserve Now
               </button>
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-4 bg-pink-100/50 rounded-[4rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
             <img src={data.heroImage} className="relative z-10 w-full h-[600px] object-cover rounded-[3.5rem] shadow-2xl" alt="Hero" />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[500px] lg:h-[600px]">
              <img src={data.aboutImage} className="rounded-[3rem] shadow-2xl w-full h-full object-cover" alt="Studio" />
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
                 <p className="text-4xl font-mont font-black italic">#1</p>
                 <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 mt-2">Tunis Ranking</p>
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px]">Our Story</span>
              <h2 className="text-5xl md:text-7xl font-mont font-black text-slate-900 tracking-tighter leading-none">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-lg leading-relaxed font-quick font-medium">{data.aboutText}</p>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES MENU --- */}
      <section id="services" className="py-32 bg-slate-50 border-y border-pink-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-mont font-black tracking-tighter text-slate-900">The Menu</h2>
            <div className="w-24 h-2 bg-pink-400 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {data.services.map((service, index) => (
              <div key={index} className="flex flex-col gap-3 group border-b border-pink-100 pb-8 hover:border-pink-400 transition-colors">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-mont font-black text-slate-800">{service.title}</h3>
                  <span className="text-2xl font-mont font-black text-pink-500">{service.price} <span className="text-[10px] uppercase opacity-40">tnd</span></span>
                </div>
                <p className="text-slate-400 font-quick font-medium text-sm leading-relaxed italic">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
           <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {data.gallery.map((img, i) => img && (
                <div key={i} className="rounded-3xl overflow-hidden group relative shadow-lg">
                   <img src={img} className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-700" alt="Work" />
                   <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="text-white" size={32} />
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-slate-900 text-white rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-24">
           <div className="space-y-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                 <Sparkles className="text-pink-400" size={24} />
                 <span className="text-3xl font-mont font-black tracking-tighter uppercase leading-none">{data.name}</span>
              </div>
              <p className="text-slate-400 max-w-xs mx-auto lg:mx-0 leading-loose font-quick">{data.slogan}</p>
              <div className="flex justify-center lg:justify-start gap-4">
                  {data.contact.socials.instagram && (
                    <a href={`https://instagram.com/${data.contact.socials.instagram}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 transition-all text-white">
                      <InstagramIcon />
                    </a>
                  )}
                  {data.contact.socials.facebook && (
                    <a href={data.contact.socials.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 transition-all text-white">
                      <FacebookIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-8 text-center lg:text-left">
              <h4 className="font-mont font-black uppercase tracking-widest text-[10px] text-pink-400">Location</h4>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 justify-center lg:justify-start">
                   <MapPin className="text-pink-400" size={20} />
                   <p className="text-slate-300 font-quick font-bold uppercase text-[11px] tracking-widest">{data.contact.address}</p>
                 </div>
                 <div className="flex items-center gap-4 justify-center lg:justify-start">
                   <Phone className="text-pink-400" size={20} />
                   <p className="text-3xl font-mont font-black">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="font-mont font-black uppercase tracking-widest text-[10px] text-pink-400">Open Hours</h4>
              <div className="space-y-3">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">
                        <span>{h.day}</span>
                        <span className={h.isClosed ? 'text-pink-400' : 'text-white'}>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : (
                    <p className="text-slate-500 text-[10px] font-black uppercase italic">Contact for hours</p>
                 )}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[9px] font-black uppercase tracking-[0.4em]">
           <p>© 2026 {data.name} — BOOKISMART TUNISIA</p>
           <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-pink-400 transition-colors">Top ↑</button>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#fafafa] rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ultra Pro Edition: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 transition-all shadow-xl shadow-slate-100"
          >
            <Maximize size={14} /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-slate-900 p-5 rounded-full shadow-2xl hover:bg-pink-500 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default NailSalonWebsite;