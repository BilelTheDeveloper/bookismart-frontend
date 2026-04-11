import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Camera,
  Heart,
  Star
} from 'lucide-react';

const NailSalonWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default data for Nail Salon
  const data = merchantData || {
    name: "Gloss & Glam",
    slogan: "Precision Artistry for Your Fingertips",
    heroImage: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1920",
    about: "Step into a world of color and care. We specialize in luxury manicures, long-lasting gel extensions, and custom nail art that turns your hands into a masterpiece.",
    services: [
      { name: "Signature Gel Mani", price: "45 TND", desc: "Long-lasting shine with cuticle care and massage." },
      { name: "Apres Gel-X Extensions", price: "90 TND", desc: "Perfect length and shape with zero damage to natural nails." },
      { name: "Custom Nail Art", price: "Starting +15 TND", desc: "Hand-painted designs, charms, and French tips." }
    ],
    phone: "+216 22 123 456",
    address: "Ennasr 2, Tunis"
  };

  const WebsiteContent = (
    <div className={`bg-white text-slate-900 font-sans selection:bg-pink-100 overflow-y-scroll scroll-smooth h-full no-scrollbar`} style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;900&family=Quicksand:wght@300;700&display=swap');
          .font-mont { font-family: 'Montserrat', sans-serif; }
          .font-quick { font-family: 'Quicksand', sans-serif; }
        `}
      </style>
      
      {/* --- GLOSSY NAVBAR --- */}
      <nav className={`${isFullscreen ? 'fixed' : 'sticky'} top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-pink-50`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-lg rotate-12 flex items-center justify-center text-white shadow-pink-200 shadow-lg">
                <Sparkles size={16} />
            </div>
            <span className="text-xl font-mont font-black tracking-tight uppercase text-slate-800">{data.name}</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-pink-500 transition-colors">Our Story</a>
            <a href="#services" className="hover:text-pink-500 transition-colors">Services</a>
            <a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a>
          </div>
          <button className="bg-pink-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:bg-pink-600 transition-all">
            Book Now
          </button>
        </div>
      </nav>

      {/* --- MINIMALIST HERO --- */}
      <section className="relative py-20 px-8 bg-gradient-to-b from-pink-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
             <Star className="text-pink-400" size={12} fill="currentColor" />
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-500">Tunis Best Rated</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-mont font-black text-slate-900 tracking-tighter leading-none">
            {data.name.split(' ')[0]} <span className="text-pink-400">{data.name.split(' ')[1]}</span>
          </h1>
          <p className="max-w-lg text-slate-500 font-quick font-medium text-lg leading-relaxed">
            {data.slogan}
          </p>
          
          <div className="w-full max-w-5xl mt-12 rounded-[3rem] overflow-hidden shadow-2xl relative group">
             <img 
                src={data.heroImage} 
                className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Nail Art Showcase"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
             <div className="absolute bottom-10 left-10 text-white text-left">
                <p className="font-mont font-black uppercase tracking-widest text-xs mb-1">New Collection</p>
                <h2 className="text-3xl font-mont font-bold italic">Spring Glow '26</h2>
             </div>
          </div>
        </div>
      </section>

      {/* --- CLEAN SERVICE LIST --- */}
      <section id="services" className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl font-mont font-black uppercase tracking-tighter shrink-0">Menu</h2>
            <div className="h-[2px] w-full bg-pink-100"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
          {data.services.map((service, index) => (
            <div key={index} className="flex flex-col gap-2 group cursor-pointer">
              <div className="flex justify-between items-baseline border-b border-dashed border-pink-200 pb-2">
                <h3 className="text-lg font-mont font-bold text-slate-800 group-hover:text-pink-500 transition-colors">{service.name}</h3>
                <span className="font-mont font-black text-pink-500">{service.price}</span>
              </div>
              <p className="text-slate-400 font-quick text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 py-20 text-white px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-left space-y-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-pink-400" />
                    <span className="text-2xl font-mont font-black uppercase tracking-tighter">{data.name}</span>
                </div>
                <p className="text-slate-500 font-quick max-w-xs text-sm">Elevating your style, one nail at a time. Visit us for a luxury experience.</p>
            </div>
            
            <div className="flex gap-10">
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-2">Location</p>
                    <p className="text-sm font-quick text-slate-300">{data.address}</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-2">Social</p>
                    <div className="flex gap-4 justify-center">
                        <Camera size={18} className="hover:text-pink-400 cursor-pointer" />
                        <Phone size={18} className="hover:text-pink-400 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
                Bookismart © 2026 — Designed in Tunisia
            </p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center z-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Previewing: <span className="text-pink-500">{data.name}</span>
          </p>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 transition-all"
          >
            <Maximize size={14} /> Full Window Preview
          </button>
        </div>
      )}

      {isFullscreen ? (
        <div className="fixed inset-0 z-[9999] bg-white animate-in zoom-in duration-500">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-6 right-6 z-[10000] bg-slate-900/10 hover:bg-pink-500 p-4 rounded-full text-slate-900 hover:text-white transition-all backdrop-blur-md"
          >
            <Minimize size={20} />
          </button>
          {WebsiteContent}
        </div>
      ) : (
        <div className="p-10 bg-pink-50/30 min-h-screen">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-900 h-[80vh] bg-white">
            {WebsiteContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default NailSalonWebsite;