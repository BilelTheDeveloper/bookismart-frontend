import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Scissors,
  Zap,
  Calendar,
  ArrowRight
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
 * ✂️ HAUTE HAIR STUDIO - EDITORIAL EDITION (2026)
 */
const HairSalonTemplate = ({ data }) => {
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
    { name: "The Menu", href: "#services" },
    { name: "Philosophy", href: "#about" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Studio", href: "#contact" },
  ];

  return (
    <div className="bg-[#0f0f0f] text-white font-sans selection:bg-indigo-500 overflow-x-hidden">
      
      {/* --- 1. NEON BORDER NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-black/90 backdrop-blur-xl border-b border-indigo-500/20" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black tracking-tighter uppercase italic leading-none border-l-4 border-indigo-600 pl-3">
              {ownerId?.businessName || "Haute Hair"}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all transform hover:-rotate-2">
              Book Appointment
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[1001] bg-indigo-600 p-12 flex flex-col justify-center"
          >
            <X size={40} onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10 cursor-pointer" />
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-6xl font-black uppercase italic tracking-tighter hover:pl-6 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. EDITORIAL HERO --- */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-black/50 lg:hidden" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-10 w-full">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-indigo-500">
                <Scissors size={24} />
                <span className="text-xs font-black uppercase tracking-[0.5em]">{data.category}</span>
              </div>
              <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase italic">
                {hero.title || "Sculpted Style"}
              </h1>
              <p className="text-xl text-zinc-400 font-medium max-w-lg leading-relaxed">
                {hero.slogan || "Breaking the boundaries of conventional hair design with avant-garde techniques."}
              </p>
              <div className="flex flex-wrap gap-6 pt-6">
                <button className="px-10 py-5 bg-indigo-600 text-white font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-colors">
                  View Stylists
                </button>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest">{contact.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. SERVICES (GRID SYSTEM) --- */}
      <section id="services" className="py-32 px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
            <h2 className="text-xs font-black text-indigo-500 uppercase tracking-[0.6em] mb-6">Service Menu</h2>
            <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-8">Professional <br/>Artistry</h3>
            <p className="text-zinc-500 text-lg leading-relaxed mb-10">We specialize in color transformations, precision cutting, and red-carpet styling.</p>
            <div className="p-8 bg-zinc-900 border-l-4 border-indigo-600">
              <Zap className="text-indigo-500 mb-4" />
              <p className="text-sm font-bold leading-relaxed italic text-zinc-300">"Hair is the only accessory you never take off. We make sure it's couture."</p>
            </div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.filter(s => s.active).map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-zinc-900/50 border border-white/5 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-5xl font-black text-zinc-800 group-hover:text-indigo-900 transition-colors">0{idx + 1}</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{service.price} <small className="text-indigo-500 font-bold">TND</small></p>
                  </div>
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-indigo-400 transition-colors">{service.title}</h4>
                <p className="text-zinc-500 font-medium line-clamp-2">{service.description}</p>
                <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                     Book Now <ArrowRight size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT (STORY) --- */}
      {about.show && (
        <section id="about" className="py-32 relative bg-indigo-600 overflow-hidden">
            <div className="absolute top-0 right-0 text-[20rem] font-black text-black/5 leading-none select-none tracking-tighter">
                STYLE
            </div>
            <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                    <img 
                        src={about.image || "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"} 
                        className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                        alt="Stylist"
                    />
                    <div className="absolute -bottom-10 -left-10 bg-white text-black p-10 hidden md:block">
                        <p className="text-4xl font-black italic tracking-tighter">Est. 2026</p>
                    </div>
                </div>
                <div className="space-y-10 relative z-10">
                    <h2 className="text-7xl font-black uppercase italic leading-[0.9] tracking-tighter">
                        {about.title || "The Vision Behind The Blade."}
                    </h2>
                    <p className="text-white text-2xl font-light leading-relaxed">
                        {about.text || "We don't follow trends; we create them. Our studio is a laboratory for color, shape, and texture."}
                    </p>
                    <button className="px-12 py-5 bg-black text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                        Our Story
                    </button>
                </div>
            </div>
        </section>
      )}

      {/* --- 5. GALLERY (BRUTALIST) --- */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-black">
          <div className="max-w-[1600px] mx-auto px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <h2 className="text-8xl font-black uppercase italic tracking-tighter leading-none">Lookbook</h2>
                <p className="max-w-xs text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em] text-right">Selected works from our master stylists &mdash; 2026 Edition</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.images.slice(0, 6).map((img, i) => (
                <div key={i} className={`group relative overflow-hidden bg-zinc-900 aspect-[3/4] ${i === 1 ? 'md:mt-20' : ''} ${i === 2 ? 'md:mt-40' : ''}`}>
                  <img 
                    src={img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    alt={`Look ${i}`} 
                  />
                  <div className="absolute bottom-0 left-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform">
                    <span className="bg-indigo-600 text-white px-4 py-2 font-black text-[10px] uppercase tracking-widest">View Concept</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 6. FOOTER --- */}
      <footer id="contact" className="pt-32 pb-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
            
            <div className="lg:col-span-5 space-y-12">
                <h4 className="text-7xl font-black italic uppercase tracking-tighter leading-none border-b-8 border-indigo-600 pb-6 w-fit">
                    Stay <br/>Sharp.
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">Location</h5>
                        <p className="text-xl text-zinc-300 font-medium">{contact.address || "Design District, Tunis"}</p>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">Contact</h5>
                        <p className="text-xl text-zinc-300 font-medium">{contact.phone}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {[
                        { icon: <InstagramIcon />, link: contact.socials?.instagram },
                        { icon: <FacebookIcon />, link: contact.socials?.facebook },
                        { icon: <TikTokIcon />, link: contact.socials?.tiktok },
                    ].filter(s => s.link).map((social, idx) => (
                        <a key={idx} href={social.link} className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <h5 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600">Opening Hours</h5>
                <div className="space-y-4">
                    {businessHours.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="font-bold text-zinc-500 uppercase tracking-widest text-[10px]">{h.day}</span>
                            <span className={`font-black ${h.isClosed ? 'text-rose-600' : 'text-white'}`}>
                                {h.isClosed ? 'CLOSED' : `${h.open} - ${h.close}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="p-12 bg-indigo-600 text-white rounded-tr-[5rem]">
                    <Calendar className="mb-8" size={48} strokeWidth={2.5} />
                    <h4 className="text-4xl font-black uppercase italic tracking-tighter mb-6">Immediate <br/>Booking</h4>
                    <p className="text-indigo-100 font-medium mb-10">We currently have limited availability for this week. Secure your chair now.</p>
                    <button className="w-full py-6 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-colors">
                        Reserve Now
                    </button>
                </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
              &copy; 2026 {ownerId?.businessName} • Digital Architecture by Bookiify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HairSalonTemplate;