import React, { useState, useEffect } from "react";
import { 
  Phone, MapPin, Clock, Menu, X
  , Sparkles, Calendar, Heart, Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 💄 LUXE MAKEUP ARTIST TEMPLATE - VOGUE EDITION
 */
const MakeupArtistTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId, name } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Artistry", href: "#services" },
    { name: "The Story", href: "#about" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Connect", href: "#contact" },
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#2D2D2D] font-sans selection:bg-rose-100 overflow-x-hidden">
      
      {/* --- 1. ELEGANT NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-serif italic tracking-widest text-slate-900 leading-none">
              {name || ownerId?.businessName || "Studio"}
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-rose-400 font-bold">Artistry & Glow</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-rose-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-8 py-3 bg-slate-900 hover:bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg">
              Inquire Now
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1001] bg-white p-8 flex flex-col justify-center items-center text-center space-y-8"
          >
            <X size={32} onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 cursor-pointer" />
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-serif italic text-slate-900"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. HERO SECTION (High Fashion Focus) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ 
            backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop'})`,
            filter: 'brightness(0.9)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-black/20" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.6em]">Professional MUA</span>
            <div className="h-[1px] w-12 bg-white" />
          </div>
          <h1 className="text-7xl md:text-[10rem] font-serif italic text-white leading-none mb-8 drop-shadow-2xl">
            {hero.title || "The Signature Glow"}
          </h1>
          <p className="text-lg md:text-xl text-white font-medium mb-12 max-w-2xl mx-auto italic opacity-90">
            {hero.slogan || "Enhancing your natural beauty for life's most precious moments."}
          </p>
          <button className="px-16 py-6 bg-white text-slate-900 font-bold rounded-full uppercase tracking-[0.3em] text-xs transition-all hover:bg-rose-50 hover:scale-105 shadow-2xl">
            View My Portfolio
          </button>
        </motion.div>
      </section>

      {/* --- 3. SERVICES (The Artistry Menu) --- */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Sparkles className="mx-auto text-rose-300 mb-4" size={32} />
            <h2 className="text-5xl md:text-7xl font-serif italic text-slate-900 mb-4">The Artistry</h2>
            <div className="h-1 w-20 bg-rose-200 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
            {services.filter(s => s.active).map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group border-b border-rose-50 pb-10 flex justify-between items-end"
              >
                <div className="space-y-3">
                  <h4 className="text-2xl font-serif text-slate-800 group-hover:text-rose-500 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-400 text-sm max-w-xs italic leading-relaxed">
                    {service.description || "A personalized application designed for your unique features."}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-slate-900 tracking-tighter">
                    {service.price} <small className="text-rose-400 text-[10px] uppercase">TND</small>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT SECTION (Soft & Narrative) --- */}
      {about.show && (
        <section id="about" className="py-32 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-[4rem] relative z-10">
                <img 
                  src={about.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop"} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  alt="Artist"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-rose-200 rounded-[4rem] -z-0 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
            </div>
            <div className="space-y-10">
              <Heart className="text-rose-300" size={40} />
              <h2 className="text-6xl md:text-8xl font-serif italic text-slate-900 leading-[0.8]">
                {about.title || "Beauty with Heart."}
              </h2>
              <p className="text-slate-500 leading-relaxed text-xl font-light italic">
                {about.text || "Every face is a canvas, and every person has a story. I specialize in creating looks that don't just look good in photos, but feel weightless and authentic in person."}
              </p>
              <div className="pt-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-rose-200 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
                    <Calendar size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Reserve Your Date</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- 5. GALLERY (The Portfolio) --- */}
      {gallery.show && (
        <section id="gallery" className="py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <h2 className="text-5xl font-serif italic text-slate-900">The Portfolio</h2>
              <p className="text-[11px] font-bold uppercase tracking-widest text-rose-400 border-b border-rose-200 pb-2">
                Click to explore bridal, editorial, and glam
              </p>
            </div>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {gallery.images.filter(img => img !== "").map((img, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative group overflow-hidden rounded-3xl"
                >
                  <img 
                    src={img} 
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={`Artistry ${i}`} 
                  />
                  <div className="absolute inset-0 bg-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 6. FOOTER --- */}
      <footer id="contact" className="py-32 bg-slate-900 text-white rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          <div className="space-y-8">
            <h4 className="text-4xl font-serif italic mb-8">{name || "Studio"}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-400">
                <MapPin size={18} className="text-rose-400" />
                <p className="text-sm">{contact.address || "Available for travel & studio sessions"}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-rose-400" />
                <p className="text-2xl font-serif italic">{contact.phone}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              {contact.socials?.instagram && (
                <a href={contact.socials.instagram} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose-500 transition-colors">
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact.socials?.facebook && (
                <a href={contact.socials.facebook} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose-500 transition-colors">
                  <FacebookIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose-400">Availability</h5>
            <div className="space-y-3">
              {businessHours.map((h, i) => (
                <div key={i} className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-400">{h.day}</span>
                  <span className={h.isClosed ? 'text-rose-400' : ''}>
                    {h.isClosed ? 'Closed' : `${h.open} - ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] text-slate-900">
            <h4 className="text-3xl font-serif italic mb-4">Start Your Glow.</h4>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">Book a consultation to discuss your look for weddings, events, or shoots.</p>
            <button className="w-full py-5 bg-slate-900 text-white font-bold rounded-full uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all">
              Book Appointment
            </button>
          </div>

        </div>
        
        <div className="mt-32 text-center text-[9px] font-bold uppercase tracking-[0.5em] text-slate-600">
          &copy; 2026 Artistry Portfolio • Powered by Bookiify
        </div>
      </footer>
    </div>
  );
};

export default MakeupArtistTheme;