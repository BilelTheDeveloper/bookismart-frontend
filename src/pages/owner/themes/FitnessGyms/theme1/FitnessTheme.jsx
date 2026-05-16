import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Check, Menu, X, ChevronRight, Calendar, Zap, Users, Trophy, Flame } from "lucide-react";
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

const FitnessTheme = ({ data }) => {
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
    { name: "Programs", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Location", href: "#contact" },
  ];

  const metrics = [
    { label: "Active Members", value: "500+", icon: <Users size={22} className="text-emerald-400" /> },
    { label: "Training Programs", value: "10+", icon: <Zap size={22} className="text-emerald-400" /> },
    { label: "Expert Coaches", value: "15+", icon: <Trophy size={22} className="text-emerald-400" /> },
    { label: "Client Rating", value: "5 ★", icon: <Flame size={22} className="text-emerald-400" /> },
  ];

  const intensityLabel = (idx) => {
    const levels = ["Beginner", "Moderate", "Intense", "Elite", "Extreme"];
    return levels[idx % levels.length];
  };

  const intensityColor = (idx) => {
    const colors = [
      "text-sky-400 bg-sky-400/10 border-sky-400/30",
      "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      "text-orange-400 bg-orange-400/10 border-orange-400/30",
      "text-red-400 bg-red-400/10 border-red-400/30",
      "text-rose-500 bg-rose-500/10 border-rose-500/30",
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="bg-[#080b10] text-[#e2e8f0] font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-black/85 backdrop-blur-xl border-b border-white/5"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-lg shadow-emerald-500/30">
              {ownerId?.businessName?.charAt(0) || "F"}
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              {ownerId?.businessName || "FitCore Gym"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                Join Now
              </button>
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[1001] bg-[#080b10] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <X size={32} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer text-white" />
            </div>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter border-b border-white/10 pb-4 text-white hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="mt-4 w-full py-5 bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20">
                  Join Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[#080b10]" />
          {/* Diagonal stripe overlay for athletic feel */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-6xl"
        >
          <span className="inline-block px-5 py-1.5 mb-8 border border-emerald-500/50 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.5em] bg-emerald-500/5">
            {data.category || "Fitness & Gyms"} • {ownerId?.ville || "Your City"}
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black mb-6 tracking-tighter text-white leading-[0.85] uppercase">
            {hero?.title || "Train Harder"}
          </h1>
          <div className="w-32 h-1.5 bg-emerald-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg md:text-2xl text-slate-300 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            {hero?.slogan || "Pushing limits. Breaking records. Building legends."}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-emerald-900/40 active:scale-95">
                Start Training
              </button>
            </Link>
            <a href="#services" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-bold tracking-widest text-xs uppercase">
              View Programs <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* ── METRIC STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <div className="max-w-7xl mx-auto px-6 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
              {metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-5 bg-[#080b10]/80 backdrop-blur-sm">
                  {m.icon}
                  <div>
                    <p className="text-2xl font-black text-white leading-none">{m.value}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES / PROGRAMS ── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-4">
                Our Programs
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Elite Training
              </h3>
            </div>
            <p className="text-slate-500 font-medium max-w-xs text-right">
              Every program is engineered for maximum performance and real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services
              ?.filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative bg-white/3 border border-white/8 rounded-2xl p-8 overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
                >
                  {/* background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    {/* Top row: number + intensity badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-emerald-500 font-black text-sm italic">
                        0{idx + 1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${intensityColor(idx)}`}
                      >
                        {intensityLabel(idx)}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Bottom row: duration + price */}
                    <div className="flex items-end justify-between pt-6 border-t border-white/5">
                      {service.duration && (
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock size={14} className="text-emerald-500" />
                          <span className="text-xs font-black uppercase tracking-widest">
                            {service.duration} min
                          </span>
                        </div>
                      )}
                      <div className="text-right ml-auto">
                        <span className="text-3xl font-black text-white">
                          {service.price}{" "}
                          <small className="text-emerald-400 text-xs">TND</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CTA below services */}
          <div className="mt-16 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 border border-emerald-500/50 text-emerald-400 font-black uppercase tracking-widest text-xs rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300">
                Book a Session
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#0c1018]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image column */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
                  }
                  className="w-full h-[560px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt="About our gym"
                />
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-6 bg-emerald-500 rounded-2xl p-6 shadow-2xl shadow-emerald-500/30">
                <p className="text-5xl font-black text-white leading-none">10+</p>
                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mt-1">Years of Excellence</p>
              </div>
            </div>

            {/* Text column */}
            <div className="space-y-8 lg:pl-8">
              <div className="w-16 h-1.5 bg-emerald-500 rounded-full" />
              <h2 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">
                Who We Are
              </h2>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                {about.title || "Forged in Iron."}
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg font-medium italic">
                "{about.text || "We believe every person has an athlete inside. Our mission is to bring it out through world-class training, expert coaching, and a community that pushes you beyond limits."}"
              </p>

              {/* Mini stats row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                {[
                  { value: "2K+", label: "Clients Trained" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "15+", label: "Expert Coaches" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black text-emerald-400">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                {[
                  "State-of-the-art equipment",
                  "Certified personal trainers",
                  "Flexible scheduling & online booking",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-emerald-400" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {gallery?.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#080b10]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-4">
                Visual Journey
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                The Arena
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {gallery.images.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl bg-zinc-900 ${
                    i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter hover:brightness-110"
                    alt={`Gym ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ENERGIZER BANNER ── */}
      <section className="py-20 bg-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-100 mb-2">Limited Spots Available</p>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Your transformation<br />starts today.
            </h3>
          </div>
          <Link to={`/book/${ownerId?._id}`}>
            <button className="shrink-0 px-12 py-6 bg-white text-emerald-600 font-black rounded-xl uppercase tracking-widest text-xs shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all active:scale-95">
              Book a Session
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="pt-32 pb-16 bg-[#05070a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* Column 1: Brand + Contact */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
                {ownerId?.businessName?.charAt(0) || "F"}
              </div>
              <div>
                <h4 className="text-lg font-black tracking-tight text-white uppercase">
                  {ownerId?.businessName || "FitCore Gym"}
                </h4>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Bookiify Verified</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <p className="text-slate-400 font-medium leading-relaxed">
                  {contact?.address || "Main Street, Your City"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-emerald-400 shrink-0" size={18} />
                <p className="text-2xl font-black text-white">{contact?.phone || "+216 XX XXX XXX"}</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  className="p-4 bg-white/5 rounded-full hover:bg-emerald-500 transition-colors text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon size={20} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  className="p-4 bg-white/5 rounded-full hover:bg-emerald-500 transition-colors text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon size={20} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  className="p-4 bg-white/5 rounded-full hover:bg-emerald-500 transition-colors text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="space-y-10">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={16} className="text-emerald-400" /> Opening Hours
            </h4>
            <div className="space-y-3">
              {businessHours?.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/5 pb-3"
                >
                  <span className={`font-bold ${h.isClosed ? "text-slate-600" : "text-slate-400"}`}>
                    {h.day}
                  </span>
                  <span
                    className={`font-black uppercase text-xs tracking-wider ${
                      h.isClosed ? "text-rose-500" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Booking CTA */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-10 rounded-3xl space-y-6">
            <Calendar className="text-emerald-400" size={40} />
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
              Ready to push your limits?
            </h4>
            <p className="text-slate-400 font-medium leading-relaxed">
              Reserve your spot in seconds. No waiting, no hassle — just results.
            </p>
            <ul className="space-y-2">
              {["Flexible time slots", "Expert coaching included", "Cancel anytime"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-5 bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 mt-2">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-32 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "FitCore Gym"} &bull; Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FitnessTheme;
