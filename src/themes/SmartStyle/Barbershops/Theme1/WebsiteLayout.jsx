import React, { useState } from 'react';
import { 
  Scissors, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize
} from 'lucide-react';

const BarberWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE (Setup Form Data + Defaults)
  const data = {
    name: merchantData?.name || "The Classic Cut",
    slogan: merchantData?.slogan || "Precision Grooming for the Modern Man",
    about: merchantData?.about || "Experience the pinnacle of Tunisian barbering. We combine heritage techniques with modern style to ensure every gentleman leaves looking his best.",
    showAbout: merchantData?.showAbout ?? true,
    heroImage: merchantData?.heroImage || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920",
    contact: {
      phone: merchantData?.contact?.phone || "+216 22 000 000",
      address: merchantData?.contact?.address || "Hammam-Lif, Ben Arous",
      hours: merchantData?.contact?.hours || "Mon - Sat: 9AM - 8PM"
    },
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { name: "Executive Haircut", price: "30 TND", desc: "Consultation, precision cut, and hot towel finish." },
      { name: "Beard Sculpture", price: "20 TND", desc: "Razor lining, trim, and premium oil treatment." }
    ],
    gallery: merchantData?.gallery || [],
    showGallery: merchantData?.showGallery ?? true
  };

  // --- THE CORE WEBSITE CONTENT ---
  const WebsiteContent = (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-rose-500 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- RESPONSIVE NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scissors className="text-rose-500" size={28} />
            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            {data.showAbout && <a href="#about" className="hover:text-rose-500 transition-colors">Legacy</a>}
            <a href="#services" className="hover:text-rose-500 transition-colors">Rituals</a>
            {data.showGallery && <a href="#gallery" className="hover:text-rose-500 transition-colors">Showcase</a>}
            <a href="#contact" className="hover:text-rose-500 transition-colors">Location</a>
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/20">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover opacity-50 grayscale" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {data.name.split(' ')[0]} <br/> 
            <span className="text-rose-500 italic">{data.name.split(' ')[1] || "Studio"}</span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 font-medium tracking-wide max-w-2xl mx-auto mb-12">
            {data.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
             <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
               Reserve Your Seat
             </button>
             <button className="border border-white/20 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
               View Menu
             </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION (DYNAMIC) --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-rose-500/10 rounded-[3rem] group-hover:bg-rose-500/20 transition-all"></div>
              <img src={data.heroImage} className="relative rounded-[2.5rem] shadow-2xl z-10 w-full h-[500px] object-cover" alt="About" />
            </div>
            <div className="space-y-8">
              <span className="text-rose-500 font-black uppercase tracking-[0.4em] text-xs">Our Legacy</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Crafting Confidence Since 2016</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{data.about}</p>
              <div className="flex gap-10 pt-4">
                 <div>
                   <p className="text-4xl font-black text-rose-500 italic">2.5k+</p>
                   <p className="text-[10px] font-black uppercase text-slate-400 mt-1">Happy Clients</p>
                 </div>
                 <div className="w-[1px] bg-slate-100 h-12"></div>
                 <div>
                   <p className="text-4xl font-black text-rose-500 italic">10+</p>
                   <p className="text-[10px] font-black uppercase text-slate-400 mt-1">Master Barbers</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-rose-500 font-black uppercase tracking-[0.4em] text-xs">Menu de Service</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Premium Cuts</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm uppercase tracking-widest font-bold leading-loose">
            High-performance grooming tailored to your facial structure and lifestyle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[2rem]">
          {data.services.map((service, index) => (
            <div key={index} className="bg-[#0d0d0d] p-12 hover:bg-rose-900/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-rose-500 group-hover:h-full transition-all duration-500"></div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-rose-500 transition-colors">{service.name}</h3>
                <span className="text-2xl font-black text-rose-500">{service.price}</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm max-w-xs">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- GALLERY SECTION (DYNAMIC) --- */}
      {data.showGallery && (
        <section id="gallery" className="py-32 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.gallery.map((img, i) => img && (
                <div key={i} className="h-80 md:h-[450px] rounded-[2rem] overflow-hidden group relative">
                   <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={`Work ${i}`} />
                   <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20">
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <Scissors className="text-rose-500" size={32} />
                 <span className="text-3xl font-black uppercase tracking-tighter">{data.name}</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-loose">{data.slogan}</p>
           </div>
           
           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-xs text-rose-500">Find Us</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-slate-600" size={20} />
                   <p className="text-slate-400 font-bold">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-slate-600" size={20} />
                   <p className="text-slate-400 font-bold">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-xs text-rose-500">Working Hours</h4>
              <div className="flex items-start gap-4">
                 <Clock className="text-slate-600" size={20} />
                 <p className="text-slate-400 font-bold leading-loose">{data.contact.hours}</p>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
           <p className="text-[10px] font-black uppercase tracking-widest">© 2026 {data.name} - Built with Bookismart</p>
           <p className="text-[10px] font-black uppercase tracking-widest">Hammam-Lif, Tunisia</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#0a0a0a]">
      {/* 🚀 TOP NAVIGATION PANEL (Dashboard UI) */}
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Previewing: <span className="text-slate-900">{data.name}</span>
          </p>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-slate-200"
          >
            <Maximize size={14} /> Full Window Preview
          </button>
        </div>
      )}

      {/* Website Render */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-black p-4 rounded-full shadow-2xl hover:bg-rose-500 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>

      {!isFullscreen && (
        <button 
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-10 right-10 bg-rose-600 text-white p-5 rounded-2xl shadow-2xl shadow-rose-900/40 hover:scale-110 active:scale-95 transition-all z-40"
        >
          <Maximize size={24} />
        </button>
      )}
    </div>
  );
};

export default BarberWebsite;