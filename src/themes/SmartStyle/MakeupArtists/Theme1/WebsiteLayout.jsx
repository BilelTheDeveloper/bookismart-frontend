import React, { useState } from 'react';
import { 
  Paintbrush, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Sparkles,
  Camera,
  Heart
} from 'lucide-react';

const MakeupArtistWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default data for Makeup Artist
  const data = merchantData || {
    name: "Pro Visuals",
    slogan: "Unveiling Your Most Radiant Self",
    heroImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1920",
    about: "Specializing in bridal, editorial, and red-carpet glamour. With over 8 years of experience in the beauty industry, I bring a meticulous eye for detail and a passion for artistic expression to every face.",
    services: [
      { name: "Bridal Glamour", price: "350 TND", desc: "Full luxury application, trial session, and touch-up kit." },
      { name: "Editorial / Photo", price: "200 TND", desc: "High-definition makeup for studio lighting and film." },
      { name: "Private Masterclass", price: "150 TND", desc: "Learn professional techniques in a 1-on-1 personalized session." }
    ],
    phone: "+216 55 000 000",
    address: "Berges du Lac, Tunis"
  };

  const WebsiteContent = (
    <div className={`bg-[#050505] text-white font-sans selection:bg-violet-500 overflow-y-scroll scroll-smooth h-full no-scrollbar`} style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;900&display=swap');
          .font-sync { font-family: 'Syncopate', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>
      
      {/* --- MINIMAL NAVBAR --- */}
      <nav className={`${isFullscreen ? 'fixed' : 'sticky'} top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Paintbrush className="text-violet-500" size={20} />
            <span className="text-sm font-sync font-bold tracking-[0.4em] uppercase">{data.name}</span>
          </div>
          <div className="hidden md:flex gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
            <a href="#work" className="hover:text-violet-400 transition-colors">Portfolio</a>
            <a href="#rates" className="hover:text-violet-400 transition-colors">Rates</a>
            <a href="#contact" className="hover:text-violet-400 transition-colors">Contact</a>
          </div>
          <button className="border border-white/20 hover:bg-white hover:text-black px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all">
            Book Session
          </button>
        </div>
      </nav>

      {/* --- EDITORIAL HERO --- */}
      <section className="relative h-screen flex flex-col justify-center px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0 opacity-60">
           <img 
              src={data.heroImage} 
              className="w-full h-full object-cover"
              alt="Model Makeup"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3 text-violet-500">
            <div className="w-12 h-[1px] bg-violet-500"></div>
            <span className="text-[10px] font-sync tracking-[0.5em] uppercase">Artistry & Grace</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-inter font-black uppercase leading-[0.85] tracking-tighter">
            Face <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">Design</span>
          </h1>
          <p className="text-lg text-white/40 max-w-md font-light leading-relaxed">
            {data.slogan}
          </p>
          <div className="pt-6">
            <button className="bg-violet-600 text-white px-10 py-5 rounded-sm font-sync text-[10px] tracking-widest uppercase hover:bg-violet-700 transition-all shadow-2xl shadow-violet-900/20">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* --- SERVICES / RATES --- */}
      <section id="rates" className="py-32 px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-inter font-black uppercase tracking-tighter sticky top-32">Services <br /> & Investment</h2>
          </div>
          <div className="md:w-2/3 space-y-12">
            {data.services.map((service, index) => (
              <div key={index} className="group border-b border-black/5 pb-10 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <span className="text-3xl font-inter font-black italic text-black/10 group-hover:text-violet-500/20 transition-colors">0{index + 1}</span>
                    <span className="text-xl font-bold font-inter">{service.price}</span>
                </div>
                <h3 className="text-2xl font-inter font-black uppercase tracking-tight">{service.name}</h3>
                <p className="text-black/50 font-inter text-sm max-w-xl">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-24 border-t border-white/5 bg-[#050505] text-center px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
            <div className="flex items-center gap-4">
                <Paintbrush className="text-violet-500" />
                <span className="text-xl font-sync font-bold tracking-[0.6em] uppercase">{data.name}</span>
            </div>
            <div className="flex gap-12 text-white/30">
                <Camera size={20} className="hover:text-white cursor-pointer transition-colors" />
                <Phone size={20} className="hover:text-white cursor-pointer transition-colors" />
                <MapPin size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
            <div className="pt-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-sync text-white/20 tracking-widest">
                <p>© 2026 {data.name.toUpperCase()} STUDIO</p>
                <p>POWERED BY BOOKISMART TUNISIA</p>
            </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center z-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Previewing: <span className="text-violet-600">{data.name}</span>
          </p>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl shadow-slate-200"
          >
            <Maximize size={14} /> Full Window Preview
          </button>
        </div>
      )}

      {isFullscreen ? (
        <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-500">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-6 right-6 z-[10000] bg-white/10 hover:bg-violet-600 p-4 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
          >
            <Minimize size={20} />
          </button>
          {WebsiteContent}
        </div>
      ) : (
        <div className="p-10 bg-slate-100 min-h-screen">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-900 h-[80vh] bg-[#050505]">
            {WebsiteContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeupArtistWebsite;