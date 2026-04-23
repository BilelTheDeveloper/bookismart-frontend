import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Sparkles,
  Heart,
  Camera,
  Calendar,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CUSTOM SVG SOCIAL ICONS
 */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

/**
 * ✨ LUXE NAIL SALON TEMPLATE (2026 EDITION)
 */
const LuxeNailSalon = ({ data }) => {
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
    { name: "The Studio", href: "#about" },
    { name: "Lookbook", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="bg-[#fafaf9] text-[#1c1c1c] font-sans selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      
      {/* --- 1. ELEGANT FLOATING NAV --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${
        isScrolled ? "py-4 bg-white/70 backdrop-blur-2xl border-b border-rose-100 shadow-sm" : "py-10 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center font-serif text-2xl text-rose-400 shadow-inner">
              {ownerId?.businessName?.charAt(0) || "L"}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-widest uppercase text-zinc-900 leading-none">
                {ownerId?.businessName || "Luxe Polish"}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-bold">Nail Artistry</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 hover:text-rose-500 transition-colors">
                {link.name}
              </a>
            ))}
            <button className="px-8 py-3 bg-zinc-900 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:shadow-xl hover:shadow-rose-500/20 active:scale-95">
              Request Appointment
            </button>
          </div>

          <button className="lg:hidden text-zinc-900" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* --- 2. HIGH-FASHION HERO --- */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-8 relative h-full overflow-hidden">
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2 }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop'})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
          <div className="hidden lg:block lg:col-span-4 bg-[#f4f4f2]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl bg-white/40 backdrop-blur-xl p-12 lg:p-20 border border-white/50 rounded-[40px] shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-rose-400" size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500">
                {ownerId?.ville || 'Sfax'} • Premium Studio
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-serif italic mb-8 text-zinc-900 leading-[0.9]">
              {hero.title || "The Art of Detail."}
            </h1>
            <p className="text-lg text-zinc-600 mb-10 leading-relaxed font-medium">
              {hero.slogan || "Elevating nail care into a ritual of luxury. Bespoke designs for the modern visionary."}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-zinc-900 text-white font-black rounded-full uppercase tracking-widest text-xs hover:bg-rose-500 transition-all shadow-xl shadow-zinc-900/10">
                Book Ritual
              </button>
              <button className="px-10 py-5 bg-white border border-zinc-200 text-zinc-900 font-black rounded-full uppercase tracking-widest text-xs hover:border-rose-300 transition-all">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. SERVICES: THE ATELIER --- */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-[11px] font-black text-rose-400 uppercase tracking-[0.6em] mb-4">The Atelier</h2>
            <h3 className="text-5xl lg:text-6xl font-serif italic text-zinc-900">Curated Services</h3>
            <div className="w-12 h-[1px] bg-rose-200 mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.filter(s => s.active).map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-[#fafaf9] rounded-[32px] border border-transparent hover:border-rose-100 hover:bg-white transition-all group"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-400 shadow-sm border border-rose-50 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Heart size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-serif italic text-zinc-900 group-hover:text-rose-500 transition-colors">
                    {service.price}<small className="text-[10px] ml-1 font-sans font-bold uppercase tracking-widest text-rose-400">Tnd</small>
                  </span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-zinc-900 mb-4">{service.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-rose-400 group-hover:gap-4 transition-all">
                  Reserve Now <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT: THE STORY --- */}
      {about.show && (
        <section id="about" className="py-32 bg-[#f4f4f2]">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <img 
                  src={about.image || "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop"} 
                  className="w-full h-full object-cover"
                  alt="Studio"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-100 rounded-full -z-10 blur-3xl opacity-50" />
            </div>
            
            <div className="space-y-10">
              <span className="text-rose-500 font-black text-[10px] uppercase tracking-[0.5em]">The Philosophy</span>
              <h2 className="text-6xl lg:text-7xl font-serif italic text-zinc-900 leading-[1.1]">
                {about.title || "Pure Elegance, Defined."}
              </h2>
              <p className="text-zinc-600 text-xl leading-relaxed italic border-l-2 border-rose-200 pl-8">
                "{about.text || "We believe your hands are your most powerful accessory. In our studio, we blend health-first practices with avant-garde artistry to create something truly unique."}"
              </p>
              <div className="grid grid-cols-2 gap-12 pt-10">
                <div>
                  <h5 className="text-zinc-900 font-bold uppercase text-[10px] tracking-widest mb-4">Health First</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">Medical-grade sterilization and premium toxin-free polishes only.</p>
                </div>
                <div>
                  <h5 className="text-zinc-900 font-bold uppercase text-[10px] tracking-widest mb-4">Artistry</h5>
                  <p className="text-zinc-500 text-xs leading-relaxed">Each set is a hand-painted masterpiece tailored to your vibe.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- 5. GALLERY: THE LOOKBOOK --- */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Camera className="text-rose-400" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Captured Work</span>
                </div>
                <h2 className="text-6xl font-serif italic text-zinc-900">The Lookbook</h2>
              </div>
              <p className="text-zinc-400 font-medium text-sm max-w-xs text-right">
                A collection of our recent bespoke designs and signature styles.
              </p>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.images.map((img, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 0.98 }}
                  className="relative group overflow-hidden rounded-[32px]"
                >
                  <img src={img} className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" alt={`Set ${i}`} />
                  <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-2 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-900">View Detail</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 6. FOOTER: THE CONTACT --- */}
      <footer id="contact" className="bg-zinc-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            <div className="lg:col-span-5 space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center font-serif text-3xl text-rose-400">
                  {ownerId?.businessName?.charAt(0)}
                </div>
                <h4 className="text-3xl font-serif italic">Bookiify Luxury Partner</h4>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-rose-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <p className="text-zinc-400 font-medium text-lg leading-relaxed">{contact.address || "Ennasr II, Tunis"}</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-rose-400 shrink-0">
                    <Phone size={18} />
                  </div>
                  <p className="text-4xl font-serif italic text-white tracking-tight">{contact.phone}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {contact.socials?.instagram && (
                  <a href={contact.socials.instagram} className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-rose-500 hover:border-rose-500 transition-all">
                    <InstagramIcon size={22} />
                  </a>
                )}
                {contact.socials?.tiktok && (
                  <a href={contact.socials.tiktok} className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-rose-500 hover:border-rose-500 transition-all">
                    <TikTokIcon size={22} />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-10">
              <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <Clock size={16} /> Opening Hours
              </h5>
              <div className="space-y-4">
                {businessHours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className={`font-bold tracking-tight ${h.isClosed ? 'text-zinc-600' : 'text-zinc-400'}`}>{h.day}</span>
                    <span className={`font-black uppercase ${h.isClosed ? 'text-rose-500' : 'text-white'}`}>
                      {h.isClosed ? 'Closed' : `${h.open} — ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 p-12 rounded-[40px] space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[80px]" />
              <Calendar className="text-rose-400" size={40} strokeWidth={1.5} />
              <h4 className="text-3xl font-serif italic text-white">Join our guest list.</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Experience the pinnacle of Tunisian nail artistry. Instant confirmation for all online bookings.</p>
              <button className="w-full py-6 bg-rose-500 text-white font-black rounded-full uppercase tracking-widest text-xs hover:bg-rose-400 transition-all shadow-xl shadow-rose-900/20 active:scale-95">
                Secure Your Spot
              </button>
            </div>

          </div>

          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 {ownerId?.businessName} • Digital Curation by Bookiify.tn
            </p>
            <div className="flex gap-8 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
              <span>Privacy Policy</span>
              <span>Terms of Ritual</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuxeNailSalon;