import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Menu, X, Calendar, CheckCircle, Leaf, Shield, Star } from "lucide-react";
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

const CleaningTheme = ({ data }) => {
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
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const fallbackImages = [
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-white/95 backdrop-blur-xl border-b border-sky-100 shadow-sm" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-sky-500/30">
              {ownerId?.businessName?.charAt(0) || "S"}
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
              {ownerId?.businessName || "Sparkle Pro"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-sky-600 transition-colors">
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg shadow-sky-500/30">
                Book Clean
              </button>
            </Link>
          </div>
          <button className="md:hidden text-slate-700" onClick={() => setMobileMenuOpen(true)}>
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
            className="fixed inset-0 z-[1001] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black text-sky-500 uppercase">{ownerId?.businessName || "Sparkle Pro"}</span>
              <X size={32} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer text-slate-400" />
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-4">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-sky-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs">
                  Book Your Clean
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-7xl mx-auto w-full"
        >
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-8 bg-sky-50 border border-sky-200 rounded-full text-sky-600 text-[10px] font-black uppercase tracking-[0.5em]">
              {data.category} • {ownerId?.ville}
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-slate-900 leading-[0.9]">
              YOUR SPACE,<br />
              <span className="text-sky-500">PERFECTLY</span><br />
              CLEAN.
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed max-w-lg">
              {hero?.slogan || "Professional cleaning services using eco-friendly products. Sparkling results, every time."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-sky-500/30">
                  Book Your Clean
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-sky-500" />
                <span className="font-black text-slate-700 text-lg">{contact?.phone || "+216 XX XXX XXX"}</span>
              </div>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["Eco-Friendly Products", "Insured & Bonded", "Same-Day Available", "Satisfaction Guaranteed"].map((b, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-sky-100 rounded-full text-xs font-bold text-slate-600 shadow-sm flex items-center gap-1">
                  <CheckCircle size={12} className="text-sky-500" />{b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-sky-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "5000+", label: "Cleanings Done" },
            { num: "500+", label: "Happy Clients" },
            { num: "100%", label: "Eco Products" },
            { num: "Insured", label: "& Bonded" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-black text-white">{stat.num}</p>
              <p className="text-sky-100 text-xs uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.5em] mb-4">What We Offer</p>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Cleaning<br />Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeServices.length > 0 ? activeServices : [
              { title: "Standard Clean", description: "Regular cleaning of all rooms, dusting, vacuuming and mopping.", price: "60", duration: "120" },
              { title: "Deep Clean", description: "Thorough cleaning of every surface, inside cabinets, behind appliances.", price: "120", duration: "240" },
              { title: "Move In/Out Clean", description: "Complete clean for move-in or move-out — spotless handover.", price: "150", duration: "300" },
              { title: "Office Clean", description: "Professional commercial cleaning tailored to your workspace.", price: "80", duration: "120" },
              { title: "Post-Construction", description: "Dust and debris removal after renovation or construction work.", price: "200", duration: "360" },
              { title: "Airbnb Turnover", description: "Fast, reliable turnover clean between guest stays.", price: "70", duration: "90" },
            ]).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                    <Leaf size={20} className="text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Clock size={12} className="text-sky-500" />
                    <span>{service.duration} min</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{service.price} <small className="text-sky-500 text-xs">TND</small></span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-sky-500/20">
                Book Your Clean
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {about?.show && (
        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="w-16 h-1 bg-sky-500" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                {about.title || "Clean Spaces. Happy Lives."}
              </h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                {about.text || "We're a professional cleaning company committed to eco-friendly products, meticulous attention to detail, and leaving every space spotless. Our insured and bonded team treats your home like our own."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["100% Eco-Friendly", "Fully Insured", "Background-Checked Team", "Satisfaction Guaranteed"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle size={16} className="text-sky-500 shrink-0" />{item}
                  </div>
                ))}
              </div>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-10 py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all">
                  Book Now
                </button>
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={about.image || "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2070&auto=format&fit=crop"}
                alt="Our team"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <p className="text-3xl font-black text-sky-500">5★</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Avg Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery?.show && (galleryImages.length > 0) && (
        <section id="gallery" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">Our Work</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <img src={img} alt={`Clean ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 min-h-[200px]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer id="contact" className="pt-24 pb-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center font-black text-white">
                {ownerId?.businessName?.charAt(0) || "S"}
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase">{ownerId?.businessName || "Sparkle Pro"}</h4>
                <p className="text-sky-400 text-xs font-bold tracking-widest">Bookiify Verified</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-sky-400 mt-1 shrink-0" />
                <p className="text-slate-400 text-sm">{contact?.address || "Tunis, Tunisia"}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-sky-400 shrink-0" />
                <p className="text-white font-black text-lg">{contact?.phone || "+216 XX XXX XXX"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a href={contact.socials.instagram} className="p-3 bg-white/5 rounded-xl hover:bg-sky-500 transition-colors">
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a href={contact.socials.facebook} className="p-3 bg-white/5 rounded-xl hover:bg-sky-500 transition-colors">
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a href={contact.socials.tiktok} className="p-3 bg-white/5 rounded-xl hover:bg-sky-500 transition-colors">
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
              <Clock size={14} className="text-sky-400" /> Availability
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className={`font-bold ${h.isClosed ? "text-slate-600" : "text-slate-400"}`}>{h.day}</span>
                  <span className={`font-black text-xs uppercase ${h.isClosed ? "text-rose-500" : "text-sky-300"}`}>
                    {h.isClosed ? "Unavailable" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sky-500/10 border border-sky-500/20 p-8 rounded-3xl space-y-6">
            <Calendar size={36} className="text-sky-400" />
            <h4 className="text-2xl font-black text-white">Book Your Clean</h4>
            <p className="text-slate-400 text-sm">Schedule in under 30 seconds. We handle the rest.</p>
            <ul className="space-y-2">
              {["Eco-friendly guaranteed", "Insured team", "Satisfaction or re-clean free"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle size={12} className="text-sky-400 shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Sparkle Pro"} • Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CleaningTheme;
