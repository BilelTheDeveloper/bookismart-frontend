import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { 
  Activity, Clock, MapPin, Phone, ChevronRight, 
  Maximize, Minimize, Zap, Dumbbell, 
  Dna, Award, PlayCircle
} from 'lucide-react';

const PhysioWebsite = ({ data: merchantData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  // 1. MASTER DATA MERGE - Physical Therapy & Rehab Logic
  const data = {
    slug: merchantData?.slug || "physio", // Needed for booking route
    name: merchantData?.ownerId?.businessName || merchantData?.hero?.title || "Kinetic Rehab Center",
    slogan: merchantData?.hero?.slogan || "Evidence-Based Therapy to Restore Your Movement",
    heroTitle: merchantData?.hero?.title || "Reclaim Your Active Lifestyle",
    heroImage: merchantData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920",
    
    // About Section
    aboutTitle: merchantData?.about?.title || "Movement is Medicine",
    aboutText: merchantData?.about?.text || "We specialize in musculoskeletal recovery, sports injury rehabilitation, and chronic pain management. Our approach combines manual therapy with personalized exercise programming to get you back to peak performance.",
    aboutImage: merchantData?.about?.image || "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800",
    showAbout: merchantData?.about?.show ?? true,
    
    // Services Section (Physio Logic)
    services: merchantData?.services?.length > 0 ? merchantData.services : [
      { title: "Sports Rehabilitation", price: "70", description: "Targeted recovery for athletes and active individuals." },
      { title: "Manual Therapy", price: "60", description: "Hands-on techniques to improve joint and soft tissue mobility." }
    ],
    
    // Gallery Section
    gallery: merchantData?.gallery?.images || [],
    showGallery: merchantData?.gallery?.show ?? true,
    
    // Contact & Footer
    contact: {
      phone: merchantData?.contact?.phone || merchantData?.ownerId?.phone || "+216 22 000 000",
      address: merchantData?.contact?.address || merchantData?.ownerId?.city || "Ennasr, Tunis",
      socials: merchantData?.contact?.socials || {}
    },
    hours: merchantData?.businessHours || []
  };

  // Helper to handle booking navigation
  const handleBooking = () => {
    navigate(`/book/${data.slug}`);
  };

  const WebsiteContent = (
    <div className="bg-[#f8fafc] text-slate-900 font-sans selection:bg-lime-100 overflow-y-auto h-full no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* --- KINETIC NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg rotate-3 shadow-lg shadow-slate-200">
                <Activity className="text-lime-400" size={22} />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
              {data.name}
            </span>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <a href="#about" className="hover:text-lime-500 transition-colors">Philosophy</a>
            <a href="#services" className="hover:text-lime-500 transition-colors">Treatments</a>
            <a href="#contact" className="hover:text-lime-500 transition-colors">Location</a>
          </div>
          <button 
            onClick={handleBooking}
            className="bg-lime-400 hover:bg-slate-900 hover:text-white text-slate-900 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-lime-100"
          >
            Start Recovery
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex items-center gap-3 bg-slate-100 w-fit px-4 py-1.5 rounded-full">
                <Zap className="text-lime-500 fill-lime-500" size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Peak Performance Center</span>
            </div>
            <h1 className="text-6xl md:text-[95px] font-black text-slate-900 leading-[0.85] tracking-tighter">
              {data.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-lime-500" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              {data.slogan}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
               <button 
                 onClick={handleBooking}
                 className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-lime-400 hover:text-slate-900 transition-all shadow-2xl shadow-slate-200"
               >
                 Book Consultation
               </button>
               <button className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-lime-400 transition-all">
                    <PlayCircle size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Our Methodology</span>
               </button>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-lime-100 rounded-full blur-[100px] opacity-50" />
             <img src={data.heroImage} className="relative rounded-[3rem] shadow-3xl w-full h-[650px] object-cover z-10" alt="Physio" />
             <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-slate-100">
                <p className="text-4xl font-black text-slate-900">12k+</p>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Successful Sessions</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT/PHILOSOPHY SECTION --- */}
      {data.showAbout && (
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src={data.aboutImage} className="rounded-[2rem] h-80 w-full object-cover" alt="Therapy" />
                  <div className="bg-lime-400 rounded-[2rem] flex flex-col items-center justify-center text-slate-900 p-8">
                      <Award size={48} className="mb-4" />
                      <p className="text-center font-black uppercase text-xs tracking-widest leading-tight">Board Certified Specialist</p>
                  </div>
               </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <span className="text-lime-500 font-black uppercase tracking-[0.4em] text-xs underline decoration-2 underline-offset-8">The Approach</span>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">{data.aboutTitle}</h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">{data.aboutText}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                 {[
                   { icon: <Dna />, label: "Personalized Biomechanics" },
                   { icon: <Dumbbell />, label: "Functional Recovery" }
                 ].map((box, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                      <div className="text-lime-500">{box.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{box.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
             <span className="text-lime-400 font-black uppercase tracking-[0.4em] text-xs">Specializations</span>
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter mt-4 italic uppercase">Programs</h2>
          </div>
          <button 
            onClick={handleBooking}
            className="border border-white/20 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
             View All Treatments
          </button>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1">
          {data.services.map((service, index) => (
            <div 
              key={index} 
              onClick={handleBooking}
              className="group p-12 border border-white/5 hover:bg-white transition-all duration-500 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-black text-lime-400 group-hover:text-slate-400 opacity-50 italic">0{index + 1}</span>
                <span className="text-2xl font-black group-hover:text-slate-900">{service.price} <span className="text-[10px] uppercase">tnd</span></span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:text-slate-900 group-hover:translate-x-4 transition-all mb-4">{service.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-600 leading-relaxed max-w-md">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <footer id="contact" className="pt-32 pb-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 mb-24">
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="bg-slate-900 p-2.5 rounded-lg rotate-3">
                    <Activity className="text-lime-400" size={24} />
                 </div>
                 <span className="text-2xl font-black tracking-tighter italic uppercase">{data.name}</span>
              </div>
              <p className="text-slate-400 max-w-xs leading-loose font-medium">{data.slogan}</p>
           </div>
           
           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-slate-300">The Lab</h4>
              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-lime-500" size={24} />
                   <p className="text-slate-900 font-black uppercase text-sm tracking-widest leading-relaxed">{data.contact.address}</p>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-lime-500" size={24} />
                   <p className="text-slate-900 font-black text-2xl tracking-tighter">{data.contact.phone}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-slate-300">Session Times</h4>
              <div className="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-3xl">
                 {data.hours.length > 0 ? data.hours.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">{h.day}</span>
                        <span className="text-slate-900 font-bold">{h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}</span>
                    </div>
                 )) : <p className="text-slate-300 text-[10px] font-black uppercase">Schedule online</p>}
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">© 2026 {data.name} • Performance Science Studio</p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="relative h-full bg-[#f8fafc] rounded-[2rem] overflow-hidden shadow-2xl">
      {!isFullscreen && (
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center relative z-[60]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Performance Preview: <span className="text-slate-900">{data.name}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-lime-400 hover:text-slate-900 transition-all"
          >
            <Maximize size={14} className="inline mr-2" /> Live View
          </button>
        </div>
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-[9999]' : 'h-full'} animate-in fade-in duration-700`}>
        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="fixed top-8 right-8 z-[10000] bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-lime-400 hover:text-slate-900 transition-all"
          >
            <Minimize size={24} />
          </button>
        )}
        {WebsiteContent}
      </div>
    </div>
  );
};

export default PhysioWebsite;