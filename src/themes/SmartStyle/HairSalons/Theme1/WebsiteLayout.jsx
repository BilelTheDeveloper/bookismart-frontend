import React, { useState } from 'react';
import { 
  Wind, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Sparkles, Star, CheckCircle2 
} from 'lucide-react';

const HairSalonWebsite = ({ merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE (Unified naming with Barber template)
  const data = {
    name: merchantData?.name || "Vogue Salon",
    slogan: merchantData?.hero?.slogan || "Excellence in Hair Artistry & Care",
    heroTitle: merchantData?.hero?.title || "Luxury Hair Artistry",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920",
    aboutTitle: merchantData?.about?.title || "Our Essence",
    aboutText: merchantData?.about?.text || "Our salon is a sanctuary of beauty and relaxation. Our expert stylists are dedicated to creating the perfect look that reflects your unique personality.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Balayage & Color", price: "180", description: "Hand-painted highlights for a natural look." },
      { title: "Designer Haircut", price: "65", description: "Includes luxury wash and scalp massage." }
    ],
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    contact: {
      phone: merchantData?.contact?.phone || "+216 71 000 000",
      address: merchantData?.contact?.address || "La Marsa, Tunis",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // Custom Brand SVGs (Prevents Lucide Export Errors)
  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );

  const WebsiteContent = (
    <div className="bg-white text-slate-900 font-serif selection:bg-rose-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- RESPONSIVE NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-rose-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-rose-400 p-2 rounded-full">
                <Wind className="text-white" size={18} />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-800 uppercase">{data.name}</span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            {data.showAbout && <a href="#about" className="hover:text-rose-400 transition-colors">Story</a>}
            <a href="#services" className="hover:text-rose-400 transition-colors">Services</a>
            {data.showGallery && <a href="#gallery" className="hover:text-rose-400 transition-colors">Gallery</a>}
            <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
          </div>
          <button className="bg-slate-900 hover:bg-rose-400 text-white px-6 md:px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-rose-100 transform hover:scale-105">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 bg-rose-50/20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-3 text-rose-400">
                <Sparkles size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Elite Standard</span>
            </div>
            <h1 className="text-6xl md:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tighter">
              {data.heroTitle.split(' ')[0]} <br/> 
              <span className="italic font-light text-rose-300">{data.heroTitle.split(' ').slice(1).join(' ') || "Experience"}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md font-sans leading-relaxed">
              {data.slogan}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button className="bg-rose-400 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-200">
                 Reserve Seat
               </button>
               <button className="border border-slate-200 text-slate-900 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
                 Our Rituals
               </button>
            </div>
          </div>
          <div className="relative hidden lg:block h-[700px]">
             <div className="absolute top-10 right-10 bottom-10 left-10 border border-rose-200 rounded-[4rem] -rotate-3 transition-transform hover:rotate-0 duration-1000"></div>
             <img src={data.heroImage} className="relative z-10 w-full h-full object-cover rounded-[3.5rem] shadow-2xl" alt="Hero" />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1 h-[500px]">
              <img src={data.aboutImage} className="rounded-[3rem] shadow-2xl w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About" />
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2rem] shadow-xl hidden md:block border border-rose-50">
                 <p className="text-5xl font-black text-rose-400">10+</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Award Stylists</p>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <span className="text-rose-400 font-black uppercase tracking-[0.4em] text-xs">Our Heritage</span>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-lg leading-relaxed font-sans">{data.aboutText}</p>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 bg-slate-900 text-white rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-rose-400 font-black uppercase tracking-[0.4em] text-xs">The Menu</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mt-4">Premium Care</h2>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {data.services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-baseline border-b border-white/10 pb-8 group hover:border-rose-400 transition-colors">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight">{service.title}</h3>
                  <p className="text-slate-400 font-sans text-sm italic">{service.description}</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-3xl font-black text-rose-400">{service.price} <span className="text-[10px] uppercase tracking-tighter text-white opacity-40 ml-1">tnd</span></span>
                  <button className="bg-white/5 hover:bg-rose-400 p-3 rounded-full transition-all group-hover:translate-x-2">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      {data.showGallery && (
        <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
           <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {data.gallery.map((img, i) => img && (
                <div key={i} className="rounded-[2rem] overflow-hidden group relative shadow-lg">
                   <img src={img} className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-700" alt="Work" />
                   <div className="absolute inset-0 bg-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="text-white" size={40} />
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-slate-50 border-t border-rose-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20 text-center md:text-left">
           <div className="space-y-8 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-900 p-2 rounded-xl"><Wind className="text-white" size={24} /></div>
                 <span className="text-3xl font-black tracking-tighter uppercase">{data.name}</span>
              </div>
              <p className="text-slate-400 max-w-xs leading-loose font-sans">{data.slogan}</p>
              <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-rose-400 hover:text-white transition-all text-slate-400"><InstagramIcon /></a>
                  <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-rose-400 hover:text-white transition-all text-slate-400"><FacebookIcon /></a>
              </div>
           </div>
           
           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-rose-400">Visit Us</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4 justify-center md:justify-start">
                   <MapPin className="text-rose-400" size={20} />
                   <p className="text-slate-600 font-bold font-sans">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4 justify-center md:justify-start">
                   <Phone className="text-rose-400" size={20} />
                   <p className="text-slate-900 font-black text-xl">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-rose-400">Opening Hours</h4>
              <div className="space-y-3">
                 {data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-rose-50 pb-2">
                        <span>{h.day}</span>
                        <span className={h.isClosed ? 'text-rose-300' : 'text-slate-900'}>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
           <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 {data.name} — Powered by Bookismart</p>
           <button onClick={() => window.scrollTo(0,0)} className="text-[10px] font-bold uppercase tracking-widest hover:text-rose-400">Back to top ↑</button>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#fafafa]">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              High-Fidelity Preview: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 transition-all shadow-xl shadow-slate-200"
          >
            <Maximize size={14} /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-slate-900 p-5 rounded-full shadow-2xl hover:bg-rose-400 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default HairSalonWebsite;