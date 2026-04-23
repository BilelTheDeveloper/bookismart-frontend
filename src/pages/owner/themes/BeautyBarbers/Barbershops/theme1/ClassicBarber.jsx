import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Menu, 
  X, 
  ChevronRight,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CUSTOM SVG COMPONENTS (Lucide Replacements)
 */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

/**
 * 💈 CLASSIC BARBER TEMPLATE - ULTRA EDITION (2026)
 */
const ClassicBarber = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Location", href: "#contact" },
  ];

  return (
    <div className="bg-[#0a0c10] text-[#e5e7eb] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* --- 1. PREMIUM GLASS NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-lg shadow-amber-600/20">
              {ownerId?.businessName?.charAt(0) || "B"}
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white">
              {ownerId?.businessName || "Classic Barber"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95">
              Book Now
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[1001] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <X size={32} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter italic border-b border-white/10 pb-4 text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. LUXE HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop'})` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0c10]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <span className="inline-block px-5 py-1.5 mb-8 border border-amber-500/50 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] bg-amber-500/5">
            {data.category} • {ownerId?.ville}
          </span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-white leading-[0.9]">
            {hero.title || "Elite Grooming"}
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 font-medium mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            {hero.slogan || "Redefining the classic barbershop experience for the modern gentleman."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto px-12 py-6 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-amber-900/40">
              Schedule Visit
            </button>
            <div className="flex items-center gap-4 text-white/60">
              <Phone size={18} className="text-amber-500" />
              <span className="font-bold tracking-widest">{contact.phone}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- 3. SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4">The Menu</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
                Master Services
              </h3>
            </div>
            <p className="text-slate-500 font-medium text-lg border-l-2 border-amber-600 pl-6 mb-2">
              Every cut includes a consultation and premium finish.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
            {services.filter(s => s.active).map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="group flex justify-between items-start border-b border-white/5 pb-8 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-600 font-black text-sm italic">0{idx + 1}</span>
                    <h4 className="text-2xl font-black text-white group-hover:text-amber-500 transition-colors uppercase">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-slate-500 font-medium pl-8">{service.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white whitespace-nowrap">{service.price} <small className="text-amber-500 text-xs">TND</small></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT SECTION --- */}
      {about.show && (
        <section id="about" className="py-32 bg-[#0d0f14]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group overflow-hidden rounded-3xl">
              <img 
                src={about.image || "https://images.unsplash.com/photo-1599351431247-f509403c73f8?q=80&w=1974&auto=format&fit=crop"} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                alt="Workshop"
              />
              <div className="absolute inset-0 bg-amber-600/10 mix-blend-overlay" />
            </div>
            <div className="space-y-8">
              <div className="w-16 h-1 bg-amber-600" />
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
                {about.title || "Old School Soul."}
              </h2>
              <p className="text-slate-400 leading-relaxed text-xl font-medium italic">
                "{about.text || "We don't just cut hair; we craft identities. Our shop is a sanctuary where heritage techniques meet the needs of the 21st-century man."}"
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h5 className="text-white font-black uppercase text-xs tracking-widest mb-2">Expertise</h5>
                  <p className="text-slate-500 text-sm">Our barbers are master-certified with over 10+ years experience.</p>
                </div>
                <div>
                  <h5 className="text-white font-black uppercase text-xs tracking-widest mb-2">Philosophy</h5>
                  <p className="text-slate-500 text-sm">Meticulous attention to detail on every single strand.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- 5. GALLERY SECTION --- */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">The Gallery</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.images.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl bg-zinc-900 ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img 
                    src={img} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    alt={`Work ${i}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 6. FOOTER & CONTACT --- */}
      <footer id="contact" className="pt-32 pb-16 bg-[#07080a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          <div className="space-y-10">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black italic">B</div>
              <h4 className="text-2xl font-black tracking-tighter uppercase italic">Bookiify Verified</h4>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-amber-500 shrink-0" />
                <p className="text-slate-400 font-medium">{contact.address || "Main Street, Tunis"}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-amber-500 shrink-0" />
                <p className="text-2xl font-black text-white">{contact.phone}</p>
              </div>
            </div>
            <div className="flex gap-4">
              {contact.socials?.instagram && (
                <a href={contact.socials.instagram} className="p-4 bg-white/5 rounded-full hover:bg-amber-600 transition-colors text-white">
                  <InstagramIcon size={20} />
                </a>
              )}
              {contact.socials?.facebook && (
                <a href={contact.socials.facebook} className="p-4 bg-white/5 rounded-full hover:bg-amber-600 transition-colors text-white">
                  <FacebookIcon size={20} />
                </a>
              )}
              {contact.socials?.tiktok && (
                <a href={contact.socials.tiktok} className="p-4 bg-white/5 rounded-full hover:bg-amber-600 transition-colors text-white">
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={16} className="text-amber-500" /> Opening Hours
            </h4>
            <div className="space-y-4">
              {businessHours.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className={`font-bold ${h.isClosed ? 'text-slate-600' : 'text-slate-400'}`}>{h.day}</span>
                  <span className={`font-black uppercase ${h.isClosed ? 'text-rose-500' : 'text-white'}`}>
                    {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-600/5 border border-amber-600/20 p-10 rounded-3xl space-y-6">
            <Calendar className="text-amber-500" size={40} />
            <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Ready to cut?</h4>
            <p className="text-slate-400 font-medium">Skip the wait. Book your spot online in less than 30 seconds.</p>
            <button className="w-full py-5 bg-amber-600 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-amber-600/20">
              Book Appointment Now
            </button>
          </div>

        </div>

        <div className="mt-32 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Classic Barber"} • Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClassicBarber;