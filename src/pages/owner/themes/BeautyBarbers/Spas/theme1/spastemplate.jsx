import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Leaf,
  Flower2,
  Calendar,
  Sparkles
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
 * 🌿 LUXE SPA & WELLNESS TEMPLATE (2026)
 */
const LuxeSpaTemplate = ({ data }) => {
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
    { name: "Treatments", href: "#services" },
    { name: "Experience", href: "#about" },
    { name: "Sanctuary", href: "#gallery" },
    { name: "Visit Us", href: "#contact" },
  ];

  return (
    <div className="bg-[#faf9f6] text-[#4a4a4a] font-serif selection:bg-teal-100/50 overflow-x-hidden">
      
      {/* --- 1. ELEGANT FLOATING NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${
        isScrolled ? "py-4 bg-white/70 backdrop-blur-md border-b border-stone-200" : "py-10 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="text-teal-700/60" size={24} strokeWidth={1.5} />
            <span className="text-2xl font-light tracking-[0.2em] uppercase text-stone-800">
              {ownerId?.businessName || "Luxe Spa"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-medium uppercase tracking-[0.4em] text-stone-500 hover:text-teal-700 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-8 py-3 bg-stone-800 hover:bg-teal-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all">
              Reserve Experience
            </button>
          </div>

          <button className="md:hidden text-stone-800" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1001] bg-white p-12 flex flex-col items-center justify-center"
          >
            <X size={32} onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-8 cursor-pointer text-stone-400" />
            <div className="flex flex-col gap-10 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-light uppercase tracking-widest text-stone-800"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. SERENE HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-105"
          style={{ 
            backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'})` 
          }}
        >
          <div className="absolute inset-0 bg-stone-900/20" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="text-white/80 animate-pulse" size={30} strokeWidth={1} />
          </div>
          <h1 className="text-5xl md:text-8xl font-extralight mb-8 tracking-[0.15em] text-white">
            {hero.title || "Pure Serenity"}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto italic tracking-wide">
            {hero.slogan || "A sanctuary of peace designed to restore your mind, body, and spirit."}
          </p>
          <button className="px-14 py-6 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-stone-900 transition-all">
            Begin Your Journey
          </button>
        </motion.div>
      </section>

      {/* --- 3. SERVICES (TREATMENTS) --- */}
      <section id="services" className="py-32 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="text-teal-700 text-[11px] font-bold uppercase tracking-[0.5em]">The Wellness Menu</span>
          <h2 className="text-4xl md:text-6xl font-light text-stone-800 tracking-tight">Curated Treatments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {services.filter(s => s.active).map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group border-b border-stone-200 pb-10"
            >
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-xl font-medium text-stone-800 group-hover:text-teal-800 transition-colors">
                  {service.title}
                </h4>
                <span className="text-lg font-light text-stone-500 italic">{service.price} TND</span>
              </div>
              <p className="text-stone-400 font-light leading-relaxed pr-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. ABOUT (EXPERIENCE) --- */}
      {about.show && (
        <section id="about" className="py-32 bg-stone-100">
          <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src={about.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop"} 
                  className="w-full h-full object-cover"
                  alt="Spa Experience"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-teal-800/10 rounded-full blur-3xl" />
            </div>
            
            <div className="w-full lg:w-1/2 space-y-10">
              <Flower2 size={40} className="text-teal-800/30" strokeWidth={1} />
              <h2 className="text-5xl md:text-6xl font-extralight text-stone-800 leading-[1.1]">
                {about.title || "The Art of Stillness"}
              </h2>
              <div className="w-20 h-[1px] bg-stone-300" />
              <p className="text-stone-500 text-xl leading-relaxed font-light italic">
                "{about.text || "Escape the noise of the world. Our sanctuary is crafted to provide a multisensory journey that leaves you rejuvenated and deeply at peace."}"
              </p>
              <div className="flex items-center gap-6 pt-6">
                <div className="text-center">
                  <span className="block text-2xl font-light text-stone-800">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Organic Oils</span>
                </div>
                <div className="w-[1px] h-10 bg-stone-200" />
                <div className="text-center">
                  <span className="block text-2xl font-light text-stone-800">Elite</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Therapists</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- 5. GALLERY (SANCTUARY) --- */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl font-extralight tracking-widest uppercase">The Sanctuary</h2>
              <span className="text-stone-400 text-sm italic font-light">Visual stillness &mdash;</span>
            </div>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {gallery.images.map((img, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 0.98 }}
                  className="overflow-hidden rounded-3xl"
                >
                  <img src={img} className="w-full object-cover" alt={`Gallery ${i}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 6. FOOTER & CONTACT --- */}
      <footer id="contact" className="bg-stone-900 text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
            
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center gap-3">
                <Leaf className="text-teal-500" size={32} />
                <span className="text-3xl font-light tracking-tighter uppercase">{ownerId?.businessName}</span>
              </div>
              <p className="text-stone-400 max-w-sm font-light leading-relaxed">
                Experience the pinnacle of wellness in the heart of {ownerId?.ville || "Tunis"}. Every visit is a step toward your true self.
              </p>
              <div className="flex gap-6">
                {contact.socials?.instagram && (
                  <a href={contact.socials.instagram} className="text-stone-500 hover:text-white transition-colors">
                    <InstagramIcon size={22} />
                  </a>
                )}
                {contact.socials?.facebook && (
                  <a href={contact.socials.facebook} className="text-stone-500 hover:text-white transition-colors">
                    <FacebookIcon size={22} />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-500">Visit Us</h5>
              <div className="space-y-4 font-light text-stone-300">
                <div className="flex gap-3 items-start">
                  <MapPin size={18} className="text-stone-600" />
                  <p>{contact.address || "La Marsa, Tunis"}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone size={18} className="text-stone-600" />
                  <p>{contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-500">Hours</h5>
              <div className="space-y-3 font-light text-sm">
                {businessHours.map((h, i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-stone-500">{h.day}</span>
                    <span className={h.isClosed ? "text-rose-400" : "text-stone-200"}>
                      {h.isClosed ? "Closed" : `${h.open} - ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-600 text-[10px] uppercase tracking-widest font-bold">
              &copy; 2026 {ownerId?.businessName} &bull; Verified by Bookiify
            </p>
            <button className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">
              <Calendar size={14} /> Book a Session
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuxeSpaTemplate;