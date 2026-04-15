import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { 
  Eye, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Glasses, ShieldCheck, 
  Layers, Search
} from 'lucide-react';

const OpticianWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  // 1. MASTER DATA MERGE - Optical & Vision Logic
  const data = {
    slug: merchantData?.slug || "optician", // Needed for booking route
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Visionary Optics",
    slogan: merchantData?.hero?.slogan || "Precision Eye Exams & Designer Eyewear Collections",
    heroTitle: merchantData?.hero?.title || "See The World In High Definition",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "Clarity Since Day One",
    aboutText: merchantData?.about?.text || "We combine state-of-the-art diagnostic technology with a curated selection of global eyewear brands. Our certified optometrists ensure your prescription is perfect, while our stylists find the frame that fits your identity.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section (Optical Logic)
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Comprehensive Eye Exam", price: "40", description: "Digital retina mapping and precision vision testing." },
      { title: "Contact Lens Fitting", price: "35", description: "Assessment for daily, monthly, or specialty lenses." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 73 000 000",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Sousse, Tunisia",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // Helper to handle booking navigation
  const handleBooking = () => {
    navigate(`/book/${data.slug}`);
  };

  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );

  const WebsiteContent = (
    <div className="bg-[#fcfcfc] text-slate-900 font-sans selection:bg-azure-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- PRECISION NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Eye className="text-white" size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <a href="#about" className="hover:text-blue-600 transition-colors">Legacy</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-blue-600 transition-colors">Showcase</a>
          </div>
          <button 
            onClick={handleBooking}
            className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Book Eye Test
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.heroImage} className="w-full h-full object-cover" alt="Optical Hero" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 md:px-24 max-w-4xl">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-[1px] w-12 bg-blue-600"></div>
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Official Optometrists</span>
          </div>
          <h1 className="text-5xl md:text-[90px] font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
            {data.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl mb-12">
            {data.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <button 
               onClick={handleBooking}
               className="bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-blue-200"
             >
               Discover Collection
             </button>
             <a href="#services" className="bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all text-center">
               View Services
             </a>
          </div>
        </div>
        {/* Floating Abstract Optical Element */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[40px] border-blue-600/5 rounded-full hidden lg:block"></div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img src={data.aboutImage} className="rounded-[2rem] shadow-2xl relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-1000" alt="About" />
              <div className="absolute -bottom-10 -right-10 bg-slate-900 text-white p-10 rounded-[2rem] hidden md:block">
                 <Glasses size={40} className="mb-4 text-blue-400" />
                 <p className="text-2xl font-black">20+</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Designer Brands</p>
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Visual Integrity</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-lg leading-relaxed">{data.aboutText}</p>
              <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
                 </div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400">Trusted by 5k+ Clients</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
              <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs">Expert Care</span>
              <h2 className="text-5xl md:text-7xl font-black mt-4">Optical Precision</h2>
          </div>
          <p className="text-slate-400 font-medium max-w-xs text-right hidden md:block">Modern diagnostics combined with a passion for visual health.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((service, index) => (
            <div key={index} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-blue-600 transition-all">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:scale-105 transition-transform">{service.title}</h3>
                <button 
                  onClick={handleBooking}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <Search size={20} className="text-blue-400 group-hover:text-white" />
                </button>
              </div>
              <p className="text-slate-400 group-hover:text-white/80 leading-relaxed mb-8">{service.description}</p>
              <span className="text-3xl font-black text-blue-400 group-hover:text-white">{service.price} <span className="text-xs uppercase opacity-60">tnd</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* --- GALLERY/BRAND SHOWCASE --- */}
      {data.showGallery && data.gallery.length > 0 && (
        <section id="gallery" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {data.gallery.map((img, i) => img && (
                 <div key={i} className={`rounded-3xl overflow-hidden relative group ${i % 3 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Showcase" />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER & CONTACT --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-24">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-600 p-2.5 rounded-lg">
                    <Eye className="text-white" size={24} />
                 </div>
                 <span className="text-2xl font-black tracking-tight uppercase">{data.name}</span>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium">{data.slogan}</p>
              <div className="flex gap-4">
                  {data.contact.socials.instagram && (
                    <a href={`#`} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                        <InstagramIcon />
                    </a>
                  )}
              </div>
           </div>
           
           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-600">The Studio</h4>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-slate-300" size={24} />
                   <p className="text-slate-900 font-bold text-sm tracking-widest leading-relaxed uppercase">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-blue-600" size={24} />
                   <p className="text-slate-900 font-black text-2xl tracking-tighter">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-blue-600">Availability</h4>
              <div className="grid grid-cols-1 gap-3">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">{h.day}</span>
                        <span className={h.isClosed ? "text-rose-500" : "text-slate-900"}>{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : <p className="text-slate-300 text-[10px] font-black uppercase">Appointment only</p>}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">© 2026 {data.name} • Precision Vision Group</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#fcfcfc] rounded-[2rem] overflow-hidden shadow-2xl">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              HD Preview: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
          >
            <Maximize size={14} className="inline mr-2" /> Full View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-white text-black p-4 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white transition-all"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default OpticianWebsite;