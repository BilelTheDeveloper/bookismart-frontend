import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Menu, X, Calendar, Star, Shield, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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

const CarDetailingTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;
  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;
  const activeServices = (services || []).filter(s => s?.active !== false);
  const galleryImages = (gallery?.images || []).filter(Boolean);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Packages", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const fallbackImages = [
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="bg-[#000000] text-white font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-black/90 backdrop-blur-xl border-b border-blue-500/20" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/30">
              {ownerId?.businessName?.charAt(0) || "D"}
            </div>
            <span className="text-xl font-black tracking-tight uppercase text-white">
              {ownerId?.businessName || "Shine Detail Co."}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-400 transition-colors">
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg shadow-blue-600/30">
                Book Detail
              </button>
            </Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[1001] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black text-blue-400 uppercase tracking-tight">{ownerId?.businessName || "Shine Detail"}</span>
              <X size={32} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-white border-b border-white/5 pb-4 hover:text-blue-400 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-blue-600/30">
                  Book Your Detail
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black" />
        </div>
        {/* Blue neon glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <span className="inline-block px-5 py-1.5 mb-8 border border-blue-500/40 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] bg-blue-500/5">
            {data.category} • {ownerId?.ville}
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white leading-[0.9]">
            YOUR CAR<br />
            <span className="text-blue-400">DESERVES</span><br />
            PERFECTION
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan || "Premium auto detailing — ceramic coating, paint correction, and showroom-level finishes."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-blue-900/50">
                Book Your Detail
              </button>
            </Link>
            <a href="#services" className="px-10 py-5 border border-white/20 hover:border-blue-400 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all">
              View Packages
            </a>
          </div>
          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {["500+ Cars Detailed", "Ceramic Coated", "5★ Rated", "5-Year Warranty"].map((badge, i) => (
              <div key={i} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 font-bold tracking-wide">
                <CheckCircle size={12} className="inline-block mr-1 text-blue-400" />{badge}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-4">Our Packages</p>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Detailing<br />Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeServices.length > 0 ? activeServices : [
              { title: "Express Wash", description: "Exterior wash, dry, and basic interior vacuum.", price: "30", duration: "60" },
              { title: "Interior Detail", description: "Deep interior clean, steam clean, leather conditioning.", price: "80", duration: "120" },
              { title: "Full Detail", description: "Complete interior + exterior — the full package.", price: "150", duration: "240" },
              { title: "Paint Correction", description: "Single-stage machine polishing to remove swirls and scratches.", price: "250", duration: "480" },
              { title: "Ceramic Coating", description: "Professional-grade 5-year ceramic coating application.", price: "500", duration: "720" },
              { title: "PPF Install", description: "Paint protection film on full hood and front bumper.", price: "400", duration: "360" },
            ]).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, boxShadow: "0 0 30px rgba(37,99,235,0.2)" }}
                className="relative group bg-white/3 border border-white/10 rounded-2xl p-8 transition-all hover:border-blue-500/50 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <Zap size={20} className="text-blue-400" />
                  </div>
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 text-xs">
                    <Clock size={12} className="text-blue-500" />
                    <span>{service.duration} min</span>
                  </div>
                  <span className="text-2xl font-black text-white">{service.price} <small className="text-blue-400 text-xs">TND</small></span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-900/30">
                Book a Package
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative overflow-hidden rounded-3xl group">
              <img
                src={about.image || "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop"}
                alt="Our workshop"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-3">
                  {["IDA Certified", "Insured", "Guaranteed"].map((badge, i) => (
                    <div key={i} className="bg-black/70 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2 text-center">
                      <p className="text-xs font-black text-blue-300">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-1 bg-blue-600" />
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                {about.title || "Perfection Is Our Standard."}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {about.text || "We treat every vehicle as if it were our own. Using only professional-grade products and cutting-edge techniques, we deliver showroom-quality results every single time."}
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[{ num: "500+", label: "Cars Detailed" }, { num: "5★", label: "Google Rating" }, { num: "5yr", label: "Ceramic Warranty" }].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl font-black text-blue-400">{stat.num}</p>
                    <p className="text-gray-600 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="mt-4 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery?.show && (galleryImages.length > 0 || true) && (
        <section id="gallery" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-4">Our Work</p>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">The Results</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(galleryImages.length > 0 ? galleryImages : fallbackImages).map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl bg-zinc-900 ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <div className="relative group h-full min-h-[200px]">
                    <img src={img} alt={`Detail ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Results
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer id="contact" className="pt-24 pb-12 bg-[#030305] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white">
                {ownerId?.businessName?.charAt(0) || "D"}
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">{ownerId?.businessName || "Shine Detail Co."}</h4>
                <p className="text-blue-400 text-xs font-bold tracking-widest">Bookiify Verified</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
                <p className="text-gray-500 text-sm">{contact?.address || "Industrial Zone, Tunis"}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500 shrink-0" />
                <p className="text-white font-black text-lg">{contact?.phone || "+216 XX XXX XXX"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a href={contact.socials.instagram} className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-colors">
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a href={contact.socials.facebook} className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-colors">
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a href={contact.socials.tiktok} className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-colors">
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
              <Clock size={14} className="text-blue-500" /> Business Hours
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className={`font-bold ${h.isClosed ? "text-gray-700" : "text-gray-400"}`}>{h.day}</span>
                  <span className={`font-black text-xs uppercase ${h.isClosed ? "text-rose-500" : "text-blue-300"}`}>
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-3xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Star size={24} className="text-blue-400" />
            </div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tight">Book Your Detail</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Reserve your slot online. We'll handle the rest — every inch, every detail.</p>
            <ul className="space-y-2">
              {["Free inspection included", "Guaranteed satisfaction", "Same-week availability"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-blue-400 shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-900/30">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Shine Detail Co."} • Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CarDetailingTheme;
