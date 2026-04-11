import React, { useState } from 'react';
import { 
  Wind, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Sparkles,
  Camera // Swapped from Instagram to ensure no export errors
} from 'lucide-react';

const HairSalonWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const data = merchantData || {
    name: "Vogue Salon",
    slogan: "Excellence in Hair Artistry & Care",
    heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920",
    about: "Our salon is a sanctuary of beauty and relaxation. Our expert stylists are dedicated to creating the perfect look that reflects your unique personality.",
    services: [
      { name: "Balayage & Color", price: "180 TND", desc: "Hand-painted highlights for a natural, sun-kissed look." },
      { name: "Designer Haircut", price: "65 TND", desc: "Includes luxury wash, scalp massage, and blowout." },
      { name: "Keratin Treatment", price: "250 TND", desc: "Smooth, frizz-free hair that lasts for months." }
    ],
    phone: "+216 71 000 000",
    address: "La Marsa, Tunis"
  };

  const WebsiteContent = (
    <div className={`bg-white text-slate-900 font-serif selection:bg-rose-200 overflow-y-scroll scroll-smooth h-full no-scrollbar`} style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
        `}
      </style>
      
      <nav className={`${isFullscreen ? 'fixed' : 'sticky'} top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-50`}>
        <div className="max-w-7xl mx-auto px-8 h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-400">
                <Wind size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-800">{data.name}</span>
          </div>
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <a href="#services" className="hover:text-rose-400 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-rose-400 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-rose-400 transition-all">
            Book Appointment
          </button>
        </div>
      </nav>

      <section className="relative h-[90vh] flex items-center px-12 overflow-hidden bg-rose-50/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-2 text-rose-400">
                <Sparkles size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Beauty Reimagined</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              {data.name.split(' ')[0]} <br />
              <span className="italic font-normal text-rose-300">{data.name.split(' ')[1] || 'Artistry'}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md font-sans leading-relaxed">
              {data.slogan}
            </p>
            <button className="group flex items-center gap-4 bg-rose-400 text-white pl-8 pr-2 py-2 rounded-full font-sans font-bold hover:bg-slate-900 transition-all shadow-xl shadow-rose-200">
              Start Your Transformation
              <div className="bg-white/20 p-3 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
          <div className="relative hidden md:block">
             <div className="absolute -inset-4 border border-rose-200 rounded-[4rem] rotate-3 translate-x-4"></div>
             <img 
                src={data.heroImage} 
                className="relative z-10 w-full h-[600px] object-cover rounded-[3.5rem] shadow-2xl shadow-rose-100"
                alt="Salon Interior"
             />
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Our Services</h2>
            <div className="w-20 h-1 bg-rose-200 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {data.services.map((service, index) => (
            <div key={index} className="flex justify-between items-start border-b border-rose-100 pb-8 group cursor-default">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-rose-400 transition-colors">{service.name}</h3>
                <p className="text-slate-400 font-sans text-sm italic">{service.desc}</p>
              </div>
              <span className="text-xl font-black text-rose-300">{service.price}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-50 py-24 border-t border-rose-100 text-center px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-2">
                <Wind className="text-rose-300" />
                <span className="text-3xl font-black tracking-tighter">{data.name}</span>
            </div>
            <div className="flex gap-6 text-slate-400">
                <Camera size={20} className="hover:text-rose-400 cursor-pointer" />
                <Phone size={20} className="hover:text-rose-400 cursor-pointer" />
                <MapPin size={20} className="hover:text-rose-400 cursor-pointer" />
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
                Bookismart Tunisia — Beauty Edition
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
            Previewing: <span className="text-rose-400">{data.name}</span>
          </p>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 transition-all"
          >
            <Maximize size={14} /> Full Window Preview
          </button>
        </div>
      )}

      {isFullscreen ? (
        <div className="fixed inset-0 z-[9999] bg-white animate-in fade-in zoom-in duration-500">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-6 right-6 z-[10000] bg-slate-900/5 hover:bg-rose-400 p-4 rounded-full text-slate-900 hover:text-white transition-all backdrop-blur-md"
          >
            <Minimize size={20} />
          </button>
          {WebsiteContent}
        </div>
      ) : (
        <div className="p-10 bg-rose-50/20 min-h-screen">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-900 h-[80vh] bg-white">
            {WebsiteContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default HairSalonWebsite;