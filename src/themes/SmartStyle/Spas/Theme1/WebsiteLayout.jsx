import React, { useState } from 'react';
import { 
  Leaf, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Star, CheckCircle2, Waves, Flower2
} from 'lucide-react';

const SpaWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE (Synchronized with global template protocol)
  const data = {
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Zen Retreat",
    slogan: merchantData?.hero?.slogan || "A Sanctuary for the Senses",
    heroTitle: merchantData?.hero?.title || "Elevate the Soul",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1544161515-4ae6ce6ca67d?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "Our Philosophy",
    aboutText: merchantData?.about?.text || "Discover a profound sense of well-being. Our holistic approach combines ancient healing traditions with modern therapeutic techniques to restore balance and harmony.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Rituals (Services) Section
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Deep Tissue Massage", price: "120", description: "Therapeutic pressure to release chronic muscle tension." },
      { title: "Organic Glow Facial", price: "85", description: "Plant-based nutrients for a radiant complexion." }
    ],
    
    // Sanctuary (Gallery) Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 71 888 999",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Gammarth, Tunis",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // Custom Brand SVGs
  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );

  const WebsiteContent = (
    <div className="bg-[#fdfcf9] text-slate-800 font-sans selection:bg-teal-50 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Jost:wght@200;400;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }
      `}</style>
      
      {/* --- ZEN NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-[#fdfcf9]/80 backdrop-blur-xl border-b border-teal-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Leaf className="text-teal-600/40" size={24} strokeWidth={1.5} />
            <span className="text-xl md:text-2xl font-serif italic tracking-wide text-slate-900">{data.name}</span>
          </div>
          <div className="hidden lg:flex gap-12 text-[10px] font-jost uppercase tracking-[0.3em] text-slate-400">
            {data.showAbout && <a href="#philosophy" className="hover:text-teal-700 transition-colors">Philosophy</a>}
            <a href="#rituals" className="hover:text-teal-700 transition-colors">Rituals</a>
            {data.showGallery && <a href="#gallery" className="hover:text-teal-700 transition-colors">Sanctuary</a>}
            <a href="#contact" className="hover:text-teal-700 transition-colors">Location</a>
          </div>
          <button className="bg-teal-900 text-white px-8 py-3 rounded-sm text-[10px] font-jost uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/10">
            Reserve Quietude
          </button>
        </div>
      </nav>

      {/* --- SERENE HERO --- */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={data.heroImage} className="w-full h-full object-cover brightness-[0.8]" alt="Hero" />
           <div className="absolute inset-0 bg-black/20"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf9] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 text-white animate-in fade-in zoom-in duration-1000">
          <Waves className="mx-auto text-white/40 animate-pulse" size={40} strokeWidth={1} />
          <h1 className="text-6xl md:text-[100px] font-serif font-light leading-none tracking-tight">
            {data.heroTitle.split(' ').slice(0, -2).join(' ')} <br/>
            <span className="italic">{data.heroTitle.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="text-lg md:text-xl font-jost font-extralight tracking-[0.1em] text-white/90 max-w-2xl mx-auto">
            {data.slogan}
          </p>
          <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center">
             <button className="bg-white text-teal-950 px-12 py-5 text-[11px] font-jost uppercase tracking-[0.3em] hover:bg-teal-50 transition-all shadow-2xl">
               Book Ritual
             </button>
             <button className="border border-white/30 backdrop-blur-md text-white px-12 py-5 text-[11px] font-jost uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
               The Philosophy
             </button>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      {data.showAbout && (
        <section id="philosophy" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
              <span className="text-teal-600/60 font-jost text-[10px] uppercase tracking-[0.5em]">The Essence</span>
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 italic leading-tight">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-xl font-jost font-light leading-relaxed max-w-xl mx-auto lg:mx-0">{data.aboutText}</p>
              <div className="pt-4">
                <div className="inline-flex items-center gap-4 text-teal-800 font-serif italic text-2xl">
                   <Flower2 size={24} strokeWidth={1} />
                   <span>Holistic Balance</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-6 border border-teal-100 rounded-full scale-90 md:scale-100 animate-[spin_20s_linear_infinite]"></div>
              <img src={data.aboutImage} className="relative z-10 w-full aspect-square object-cover rounded-full shadow-2xl grayscale-[0.2]" alt="Wellness" />
            </div>
          </div>
        </section>
      )}

      {/* --- HOLISTIC RITUALS (SERVICES) --- */}
      <section id="rituals" className="py-32 bg-white rounded-[4rem] shadow-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-6 mb-24">
             <Waves className="mx-auto text-teal-200" size={32} strokeWidth={1.5} />
             <h2 className="text-5xl md:text-8xl font-serif text-slate-900 italic tracking-tighter">Curated Rituals</h2>
          </div>

          <div className="space-y-16">
            {data.services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-teal-50 pb-12 group hover:translate-x-2 transition-transform duration-500">
                <div className="space-y-4 max-w-lg">
                  <h3 className="text-3xl font-serif text-slate-800 group-hover:text-teal-700 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 font-jost font-light leading-relaxed text-sm">{service.description}</p>
                </div>
                <div className="md:text-right shrink-0">
                    <span className="text-3xl font-serif text-teal-900">{service.price} <span className="text-[10px] uppercase font-jost text-slate-300 ml-1">tnd</span></span>
                    <p className="text-[9px] font-jost text-slate-400 uppercase tracking-widest mt-2">Inclusive Treatment</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SANCTUARY GALLERY --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((img, i) => img && (
                <div key={i} className={`overflow-hidden group relative rounded-2xl shadow-lg ${i === 1 ? 'lg:row-span-2' : ''}`}>
                   <img src={img} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" alt="Spa" />
                   <div className="absolute inset-0 bg-teal-950/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]" />
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-teal-950 text-white/90">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24 mb-32">
           <div className="space-y-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                 <Leaf className="text-teal-400/50" size={28} strokeWidth={1.5} />
                 <span className="text-3xl font-serif italic tracking-wide">{data.name}</span>
              </div>
              <p className="text-white/40 max-w-xs mx-auto lg:mx-0 font-jost font-light leading-loose">{data.slogan}</p>
              <div className="flex justify-center lg:justify-start gap-6">
                  {data.contact.socials.instagram && (
                    <a href={`https://instagram.com/${data.contact.socials.instagram}`} target="_blank" rel="noreferrer" className="text-white/30 hover:text-teal-400 transition-colors">
                      <InstagramIcon />
                    </a>
                  )}
                  {data.contact.socials.facebook && (
                    <a href={data.contact.socials.facebook} target="_blank" rel="noreferrer" className="text-white/30 hover:text-teal-400 transition-colors">
                      <FacebookIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-10 text-center lg:text-left border-y lg:border-y-0 lg:border-x border-white/5 py-12 lg:py-0">
              <h4 className="font-jost uppercase tracking-[0.4em] text-[10px] text-teal-400/60">The Sanctuary</h4>
              <div className="space-y-8">
                 <div className="flex items-center gap-4 justify-center lg:justify-start">
                   <MapPin className="text-teal-400/40" size={20} strokeWidth={1.5} />
                   <p className="text-white/70 font-jost font-light uppercase text-[11px] tracking-widest">{data.contact.address}</p>
                 </div>
                 <div className="flex items-center gap-4 justify-center lg:justify-start">
                   <Phone className="text-teal-400/40" size={20} strokeWidth={1.5} />
                   <p className="text-3xl font-serif tracking-widest">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <h4 className="font-jost uppercase tracking-[0.4em] text-[10px] text-teal-400/60 text-center lg:text-right">Opening Rituals</h4>
              <div className="space-y-3">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] font-jost uppercase tracking-widest text-white/20 border-b border-white/5 pb-2">
                        <span>{h.day}</span>
                        <span className={h.isClosed ? 'text-teal-400/60' : 'text-white/80'}>{h.isClosed ? 'Closed' : `${h.open} — ${h.close}`}</span>
                    </div>
                 )) : (
                    <p className="text-white/20 text-[10px] font-jost uppercase italic text-center lg:text-right">Inquire for sessions</p>
                 )}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-jost uppercase tracking-[0.5em] text-white/10">
           <p>© 2026 {data.name} — BOOKISMART TUNISIA</p>
           <p className="flex items-center gap-2">Designed for Quietude <Waves size={10} /></p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#fdfcf9] rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <p className="text-[10px] font-jost font-bold uppercase tracking-widest text-slate-400">
              Quietude Edition: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-jost font-bold uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-slate-100"
          >
            <Maximize size={14} /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-1000`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-teal-950 p-5 rounded-full shadow-2xl hover:bg-teal-900 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default SpaWebsite;