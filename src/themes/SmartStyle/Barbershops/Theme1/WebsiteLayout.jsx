import React, { useState } from 'react';
import { 
  Scissors, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Star, CheckCircle2 
} from 'lucide-react';

// ✅ Changed prop name to 'data' to match your MerchantPublicProfile container
const BarberWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1. MASTER DATA MERGE
  // This logic now correctly pulls from your database structure
  const data = {
    // Falls back to ownerId.businessName if siteTitle isn't set
    name: merchantData?.siteTitle || merchantData?.ownerId?.businessName || "The Classic Cut",
    slogan: merchantData?.hero?.slogan || "Precision Grooming for the Modern Man",
    heroTitle: merchantData?.hero?.title || merchantData?.siteTitle || "Masterful Grooming",
    heroImage: merchantData?.heroImage || merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920",
    aboutTitle: merchantData?.about?.title || "Crafting Confidence",
    aboutText: merchantData?.aboutText || merchantData?.about?.text || "Experience the pinnacle of Tunisian barbering. We combine heritage techniques with modern style to ensure every gentleman leaves looking his best.",
    aboutImage: merchantData?.aboutImage || merchantData?.about?.image || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Executive Haircut", price: "30", description: "Consultation, precision cut, and hot towel finish." },
      { title: "Beard Sculpture", price: "20", description: "Razor lining, trim, and premium oil treatment." }
    ],
    gallery: merchantData?.galleryImages || merchantData?.gallery?.images || [],
    showGallery: merchantData?.showGallery ?? true,
    contact: {
      phone: merchantData?.ownerId?.phone || merchantData?.contact?.phone || "+216 22 000 000",
      address: merchantData?.ownerId?.city || merchantData?.contact?.address || "Tunisia",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // SVG Components for Brands
  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );

  const WebsiteContent = (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-rose-500 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- RESPONSIVE NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 p-2 rounded-lg">
                <Scissors className="text-white" size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            {data.showAbout && <a href="#about" className="hover:text-rose-500 transition-colors">Legacy</a>}
            <a href="#services" className="hover:text-rose-500 transition-colors">Services</a>
            {data.showGallery && <a href="#gallery" className="hover:text-rose-500 transition-colors">Gallery</a>}
            <a href="#contact" className="hover:text-rose-500 transition-colors">Contact</a>
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/40 transform hover:scale-105 active:scale-95">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover opacity-60 grayscale" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="text-rose-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block animate-pulse">Established Professional</span>
          <h1 className="text-5xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {data.heroTitle}
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-medium tracking-wide max-w-2xl mx-auto mb-12">
            {data.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
             <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-rose-600 hover:text-white transition-all transform hover:scale-105">
               Secure Appointment
             </button>
             <button className="border border-white/20 backdrop-blur-md px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
               View Rituals
             </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 bg-rose-500/10 rounded-[3rem]"></div>
              <img src={data.aboutImage} className="relative rounded-[2.5rem] shadow-2xl z-10 w-full h-[600px] object-cover" alt="About" />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <span className="text-rose-600 font-black uppercase tracking-[0.4em] text-xs">The Excellence</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{data.aboutTitle}</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">{data.aboutText}</p>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-4xl font-black text-rose-600 italic">5/5</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Client Rating</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-rose-600 italic">100%</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">Satisfaction</p>
                  </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-rose-500 font-black uppercase tracking-[0.4em] text-xs">Menu of Expertise</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mt-4">Premium Rituals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((service, index) => (
            <div key={index} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-rose-500/50 transition-all group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-rose-500 transition-colors">{service.title}</h3>
                <div className="h-[1px] flex-grow mx-6 bg-white/10 group-hover:bg-rose-500/30"></div>
                <span className="text-2xl font-black text-rose-500">{service.price} <span className="text-[10px] opacity-50 uppercase tracking-tighter ml-1">tnd</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
            <button className="bg-rose-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-rose-700 transition-all shadow-2xl shadow-rose-900/40">
                Book Service Online
            </button>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6 bg-white rounded-[3rem] md:rounded-[5rem]">
           <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.gallery.map((img, i) => img && (
                <div key={i} className="h-80 md:h-[500px] rounded-[2.5rem] overflow-hidden group relative shadow-xl">
                   <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Showcase" />
                   <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <CheckCircle2 className="text-white" size={32} />
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* --- CONTACT & FOOTER --- */}
      <footer id="contact" className="pt-40 pb-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32">
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl">
                    <Scissors className="text-white" size={28} />
                 </div>
                 <span className="text-3xl font-black uppercase tracking-tighter">{data.name}</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-loose font-medium">{data.slogan}</p>
              <div className="flex gap-4">
                  <a href={`https://instagram.com/${data.contact.socials.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose-600 transition-all hover:text-white text-slate-400">
                    <InstagramIcon />
                  </a>
                  <a href={data.contact.socials.facebook} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose-600 transition-all hover:text-white text-slate-400">
                    <FacebookIcon />
                  </a>
              </div>
           </div>
           
           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-rose-500">Our Studio</h4>
              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-rose-600" size={24} />
                   <p className="text-slate-300 font-black uppercase text-sm tracking-widest">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-rose-600" size={24} />
                   <p className="text-slate-300 font-black text-xl">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-rose-500">Availability</h4>
              <div className="grid grid-cols-1 gap-4">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pb-2 border-b border-white/5">
                        <span className="text-slate-500">{h.day}</span>
                        <span>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : (
                   <p className="text-slate-500 text-[10px] uppercase font-black">Hours not specified</p>
                 )}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">© 2026 {data.name} • Professional Grooming Experience</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#0a0a0a] rounded-[2rem] overflow-hidden">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Live Site: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-slate-200"
          >
            <Maximize size={14} /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-black p-5 rounded-full shadow-2xl hover:bg-rose-600 hover:text-white transition-all scale-110 active:scale-95"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default BarberWebsite;