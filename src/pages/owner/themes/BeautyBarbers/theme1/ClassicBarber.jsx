import React from "react";
import { 
  Phone, 
 
  MapPin, 
  Clock, 
  Check, 
  ChevronRight 
} from "lucide-react";

/**
 * @param {Object} data - This is the "Website" document from your Mongoose Model
 */
const ClassicBarber = ({ data }) => {
  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours } = data;

  return (
    <div className="bg-[#0f1115] text-[#e5e7eb] font-sans selection:bg-amber-500/30">
      
      {/* --- LUXE HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Logic: Use uploaded image or a high-end placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ 
            backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop'})` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0f1115]" />

        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <span className="inline-block px-4 py-1 mb-6 border border-amber-500/50 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
            Est. 2026 • Premium Quality
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
            {hero.title || "The Gentleman's Standard"}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero.slogan || "Experience the art of grooming in an environment designed for the modern man."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-full uppercase tracking-widest text-xs transition-all shadow-2xl shadow-amber-900/20">
              Book Appointment
            </button>
            <button className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black rounded-full uppercase tracking-widest text-xs transition-all border border-white/10">
              View Services
            </button>
          </div>
        </div>

        {/* Floating Socials Sidebar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-amber-500/50">
    
          <div className="w-[1px] h-20 bg-amber-500/20 mx-auto" />
        </div>
      </section>

      {/* --- SERVICES: THE PRICE LIST --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black tracking-tighter text-white mb-2 italic uppercase">Master Services</h2>
          <div className="w-20 h-1 bg-amber-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {services.filter(s => s.active).map((service, idx) => (
            <div key={idx} className="group flex justify-between items-end border-b border-white/5 pb-4 hover:border-amber-500/30 transition-colors">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium">{service.description}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-amber-500">{service.price} <small className="text-[10px]">TND</small></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {about.show && (
        <section className="py-24 bg-[#16191f]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border border-amber-600/20 rounded-2xl group-hover:scale-105 transition-transform" />
              <img 
                src={about.image || "https://images.unsplash.com/photo-1593702275677-f916c8c7c045?q=80&w=2070&auto=format&fit=crop"} 
                alt="Our Story" 
                className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{about.title}</h3>
              <h2 className="text-5xl font-black text-white tracking-tighter leading-none">Crafting Confidence Since Day One.</h2>
              <p className="text-slate-400 leading-relaxed text-lg font-medium">
                {about.text || "Our barbershop is more than just a place for a haircut. It's a sanctuary for the modern gentleman, where traditional techniques meet contemporary style."}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Check size={16} className="text-amber-500" /> Expert Barbers
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Check size={16} className="text-amber-500" /> Premium Products
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER: CONTACT & HOURS --- */}
      <footer className="pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Bookiify <span className="text-amber-600">.</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium max-w-xs">
              Seamlessly booking your next look. Quality grooming delivered through technology.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-full text-amber-500 hover:bg-amber-600 hover:text-white transition-all">
   
              </div>
              <div className="p-3 bg-white/5 rounded-full text-amber-500 hover:bg-amber-600 hover:text-white transition-all">

              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Business Hours</h4>
            <div className="space-y-3">
              {businessHours.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className={`font-bold ${h.isClosed ? 'text-slate-600' : 'text-slate-400'}`}>{h.day}</span>
                  <span className={`font-black ${h.isClosed ? 'text-rose-500' : 'text-white'}`}>
                    {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Visit Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-amber-500 mt-1" size={20} />
                <p className="text-slate-400 text-sm font-medium">{contact.address || "123 Avenue Habib Bourguiba, Tunis"}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-amber-500" size={20} />
                <p className="text-white font-black text-lg">{contact.phone}</p>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
          Powered by Bookiify Engine • &copy; 2026
        </div>
      </footer>
    </div>
  );
};

export default ClassicBarber;