import React, { useState } from 'react';
import { 
  Flower2, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Camera,
  Leaf,
  Waves
} from 'lucide-react';

const SpaWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default data for Spa
  const data = merchantData || {
    name: "Zen Retreat",
    slogan: "A Sanctuary for the Senses",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ae6ce6ca67d?q=80&w=1920",
    about: "Discover a profound sense of well-being. Our holistic approach combines ancient healing traditions with modern therapeutic techniques to restore balance to your body and mind.",
    services: [
      { name: "Deep Tissue Massage", price: "120 TND", desc: "Therapeutic pressure to release chronic muscle tension." },
      { name: "Organic Glow Facial", price: "85 TND", desc: "Plant-based nutrients for a radiant, healthy complexion." },
      { name: "Hot Stone Therapy", price: "140 TND", desc: "Volcanic stones used to melt away stress and anxiety." }
    ],
    phone: "+216 71 888 999",
    address: "Gammarth, Tunis"
  };

  const WebsiteContent = (
    <div className={`bg-[#fdfcf9] text-slate-800 font-sans selection:bg-teal-100 overflow-y-scroll scroll-smooth h-full no-scrollbar`} style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Jost:wght@200;400;700&display=swap');
          .font-serif { font-family: 'Cormorant Garamond', serif; }
          .font-jost { font-family: 'Jost', sans-serif; }
        `}
      </style>
      
      {/* --- ZEN NAVBAR --- */}
      <nav className={`${isFullscreen ? 'fixed' : 'sticky'} top-0 w-full z-50 bg-[#fdfcf9]/80 backdrop-blur-md border-b border-teal-50/50`}>
        <div className="max-w-7xl mx-auto px-10 h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Leaf className="text-teal-600/50" size={24} strokeWidth={1.5} />
            <span className="text-2xl font-serif italic tracking-wide text-slate-900">{data.name}</span>
          </div>
          <div className="hidden md:flex gap-12 text-[11px] font-jost font-normal uppercase tracking-[0.3em] text-slate-400">
            <a href="#philosophy" className="hover:text-teal-600 transition-colors">Philosophy</a>
            <a href="#rituals" className="hover:text-teal-600 transition-colors">Rituals</a>
            <a href="#location" className="hover:text-teal-600 transition-colors">Contact</a>
          </div>
          <button className="bg-teal-900/90 text-white px-10 py-3 rounded-sm text-[10px] font-jost uppercase tracking-widest hover:bg-teal-950 transition-all shadow-xl shadow-teal-900/10">
            Reserve Quietude
          </button>
        </div>
      </nav>

      {/* --- SERENE HERO --- */}
      <section className="relative h-screen flex items-center justify-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
              src={data.heroImage} 
              className="w-full h-full object-cover brightness-[0.85]"
              alt="Zen Interior"
           />
           <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-8 text-white animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex justify-center">
            <Waves className="text-white/60 animate-pulse" size={32} strokeWidth={1} />
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-light leading-none tracking-tight">
            Elevate <br /> <span className="italic">the Soul</span>
          </h1>
          <p className="text-xl font-jost font-extralight tracking-wide text-white/90">
            {data.slogan}
          </p>
          <div className="pt-8">
            <button className="border border-white/40 hover:bg-white hover:text-teal-950 px-12 py-4 text-[11px] font-jost uppercase tracking-[0.4em] transition-all backdrop-blur-sm">
              Explore Our Rituals
            </button>
          </div>
        </div>
      </section>

      {/* --- HOLISTIC RITUALS (SERVICES) --- */}
      <section id="rituals" className="py-32 px-8 bg-[#fdfcf9]">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <span className="text-teal-600/60 font-jost text-[10px] uppercase tracking-[0.5em]">Curated Wellness</span>
             <h2 className="text-5xl font-serif text-slate-900 italic">Holistic Rituals</h2>
          </div>

          <div className="space-y-16">
            {data.services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-teal-100 pb-12 group">
                <div className="space-y-3 max-w-lg">
                  <h3 className="text-3xl font-serif text-slate-800 group-hover:text-teal-700 transition-colors">{service.name}</h3>
                  <p className="text-slate-500 font-jost font-light leading-relaxed">{service.desc}</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-serif text-teal-800">{service.price}</span>
                    <p className="text-[9px] font-jost text-slate-400 uppercase tracking-widest mt-1">Inclusive of VAT</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-teal-950 py-24 text-white/80 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div className="space-y-6">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Flower2 size={24} className="text-teal-400/50" />
                    <span className="text-2xl font-serif italic text-white">{data.name}</span>
                </div>
                <p className="font-jost font-light text-sm leading-relaxed text-white/50">{data.about}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-4 border-x border-white/5">
                <p className="text-[10px] font-jost uppercase tracking-[0.4em]">Connect</p>
                <div className="flex gap-8">
                    <Camera size={20} className="hover:text-teal-400 cursor-pointer" />
                    <Phone size={20} className="hover:text-teal-400 cursor-pointer" />
                    <MapPin size={20} className="hover:text-teal-400 cursor-pointer" />
                </div>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center space-y-2">
                <p className="text-[10px] font-jost uppercase tracking-[0.3em] text-white/30">Based in Tunisia</p>
                <p className="font-serif text-lg">{data.address}</p>
                <p className="font-jost text-[10px] text-teal-400/50 uppercase tracking-[0.2em] pt-4">Bookismart Admin © 2026</p>
            </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center z-50 shadow-sm">
          <p className="text-[10px] font-jost font-bold uppercase tracking-widest text-slate-400">
            Previewing: <span className="text-teal-700">{data.name}</span>
          </p>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-jost font-bold uppercase tracking-widest hover:bg-teal-800 transition-all"
          >
            <Maximize size={14} /> Full Window Preview
          </button>
        </div>
      )}

      {isFullscreen ? (
        <div className="fixed inset-0 z-[9999] bg-[#fdfcf9] animate-in fade-in duration-700">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-6 right-6 z-[10000] bg-teal-950/10 hover:bg-teal-900 p-4 rounded-full text-slate-900 hover:text-white transition-all backdrop-blur-md"
          >
            <Minimize size={20} />
          </button>
          {WebsiteContent}
        </div>
      ) : (
        <div className="p-10 bg-teal-50/20 min-h-screen">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-900 h-[80vh] bg-[#fdfcf9]">
            {WebsiteContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaWebsite;