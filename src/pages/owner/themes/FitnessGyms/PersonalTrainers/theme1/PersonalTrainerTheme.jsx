import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  ChevronRight,
  Zap,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// CUSTOM SVG ICONS
// ─────────────────────────────────────────────
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center border border-red-600/30 bg-red-600/5 px-6 py-4 rounded-xl">
    <span className="text-3xl md:text-4xl font-black text-white leading-none">{value}</span>
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mt-1">{label}</span>
  </div>
);

// ─────────────────────────────────────────────
// IRON WILL — PERSONAL TRAINER THEME
// ─────────────────────────────────────────────
const PersonalTrainerTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#services" },
    { name: "Results", href: "#results" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const certifications = ["NASM Certified", "ACE Certified", "CSCS", "Precision Nutrition"];
  const specializations = ["Strength & Power", "Fat Loss", "Hypertrophy", "Athletic Performance"];

  const heroImage =
    hero?.backgroundImage ||
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop";

  const aboutImage =
    about?.image ||
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop";

  const fallbackGallery = [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=2070&auto=format&fit=crop",
  ];

  const galleryImages = gallery?.images?.length > 0 ? gallery.images : fallbackGallery;

  return (
    <div className="bg-black text-white font-sans selection:bg-red-600/30 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/90 backdrop-blur-xl border-b border-red-600/10"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-600/30 skew-x-[-6deg]">
              {ownerId?.businessName?.charAt(0) || "P"}
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              {ownerId?.businessName || "Iron Will"}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-2.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-600/20">
                Train Now
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
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
            className="fixed inset-0 z-[1001] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-black uppercase tracking-tighter text-red-600">
                {ownerId?.businessName || "Iron Will"}
              </span>
              <X
                size={32}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer text-slate-400 hover:text-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-5xl font-black uppercase tracking-tighter text-white border-b border-white/10 pb-5 hover:text-red-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-red-600/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Training
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Red diagonal slash accent */}
        <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden pointer-events-none hidden lg:block">
          <div
            className="absolute top-0 -left-32 h-full w-[140%] bg-red-600/8"
            style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-24 bg-red-600" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-red-600 rotate-90 mt-4 mb-4 whitespace-nowrap">
            No Excuses
          </span>
          <div className="w-px h-24 bg-red-600" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 md:px-16 pb-24 max-w-4xl"
        >
          {/* Credential badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-red-600/40 bg-red-600/5 backdrop-blur-sm">
            <Award size={14} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">
              {data.category || "Personal Trainer"} • {ownerId?.ville || "Elite Coach"}
            </span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-white uppercase mb-10">
            <span className="block">BUILT</span>
            <span className="block text-red-600">DIFFERENT</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed mb-12 border-l-4 border-red-600 pl-5">
            {hero?.slogan ||
              "No shortcuts. No excuses. Just relentless progress and a body that proves your commitment."}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mb-12">
            <StatBadge value="300+" label="Clients" />
            <StatBadge value="5000+" label="Sessions" />
            <StatBadge value="0%" label="Excuses" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl shadow-red-900/50 active:scale-95">
                Start Your Journey
              </button>
            </Link>
            <a href="#services" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest group">
              View Programs
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES / PROGRAMS ── */}
      <section id="services" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                <Zap size={12} />
                Training Programs
              </p>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                The <span className="text-red-600">Arsenal</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base border-l-2 border-red-600 pl-5 max-w-xs">
              Every package engineered for maximum results in minimum time. Customized to your body.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  onHoverStart={() => setHoveredService(idx)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ y: -4 }}
                  className={`relative group border-l-4 border-red-600 bg-[#111111] p-8 transition-all duration-300 ${
                    hoveredService === idx
                      ? "shadow-2xl shadow-red-600/20 bg-[#141414]"
                      : ""
                  }`}
                >
                  {/* Index label */}
                  <span className="text-red-600/30 font-black text-5xl absolute top-6 right-8 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white uppercase group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed pr-16">
                      {service.description}
                    </p>

                    <div className="flex items-end justify-between pt-4 border-t border-white/5">
                      {/* Duration badge */}
                      {service.duration && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-slate-400 text-[10px] font-black uppercase tracking-widest border border-white/10">
                          <Clock size={10} className="text-red-500" />
                          {service.duration} min
                        </span>
                      )}

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-3xl font-black text-white">
                          {service.price}
                        </span>
                        <small className="text-red-500 text-xs font-black ml-1 uppercase tracking-widest">
                          TND
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Hover red glow bottom line */}
                  <div
                    className={`absolute bottom-0 left-0 h-px bg-red-600 transition-all duration-500 ${
                      hoveredService === idx ? "w-full" : "w-0"
                    }`}
                  />
                </motion.div>
              ))}
          </div>

          {/* Book CTA below services */}
          <div className="mt-14 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-14 py-5 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-black uppercase tracking-[0.3em] text-xs transition-all duration-300 active:scale-95">
                Book a Session
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS / TRANSFORMATION ── */}
      <section id="results" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2">
              <Target size={12} />
              Client Transformations
            </p>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              The <span className="text-red-600">Results</span>
            </h2>
            <p className="text-slate-500 mt-6 max-w-xl mx-auto font-medium leading-relaxed">
              These aren't models. These are real clients who showed up, put in the work, and earned every result.
            </p>
          </div>

          {/* Transformation grid using gallery images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.slice(0, 6).map((img, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden bg-zinc-900 ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ minHeight: i === 0 ? "460px" : "220px" }}
                onHoverStart={() => setHoveredGallery(i)}
                onHoverEnd={() => setHoveredGallery(null)}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt={`Result ${i + 1}`}
                />
                {/* Red overlay caption on hover */}
                <AnimatePresence>
                  {hoveredGallery === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-600/80 flex flex-col items-center justify-center gap-2"
                    >
                      <TrendingUp size={32} className="text-white" />
                      <span className="text-white font-black uppercase tracking-[0.4em] text-sm">
                        Results
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / TRAINER PROFILE ── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Trainer photo — full height left column */}
            <div className="relative overflow-hidden min-h-[600px] lg:min-h-full">
              <img
                src={aboutImage}
                className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Trainer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right: info */}
            <div className="space-y-8 py-16 px-0 lg:px-14 flex flex-col justify-center">
              <div className="w-16 h-1 bg-red-600" />

              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em]">
                Trainer Profile
              </p>

              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                {about?.title || "Meet Your Coach"}
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed font-medium italic border-l-4 border-red-600 pl-5">
                "{about?.text ||
                  "I've been in the trenches. I know what it takes to build a body and a mindset that's unbreakable. My mission is to get you there faster, smarter, and without guesswork."}"
              </p>

              {/* Certifications */}
              <div>
                <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                  <Award size={12} className="text-red-500" />
                  Certifications
                </h5>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-4 py-2 border border-red-600/30 text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-600/5"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-4 flex items-center gap-2">
                  <Target size={12} className="text-red-500" />
                  Specializations
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {specializations.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                      <div className="w-1.5 h-1.5 bg-red-600 shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Training philosophy */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">Philosophy</h5>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Every rep, every set, every session has a purpose. Consistency beats intensity.
                  </p>
                </div>
                <div>
                  <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">Approach</h5>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Data-driven programming tailored to your biology, schedule, and goals.
                  </p>
                </div>
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="mt-4 px-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-lg shadow-red-600/20 self-start">
                  Train With Me
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-4">
                  The Lab
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  Inside the <span className="text-red-600">Grind</span>
                </h2>
              </div>
              <p className="text-slate-500 font-medium border-l-2 border-red-600 pl-4 max-w-xs text-sm leading-relaxed">
                This is where ordinary becomes extraordinary. Every session captured, every milestone earned.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden bg-zinc-900 group cursor-pointer ${
                    i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i % 5 === 0 ? "400px" : "190px" }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                    alt={`Gallery ${i + 1}`}
                  />
                  {/* Red aggressive overlay on hover */}
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/30 transition-all duration-500 flex items-center justify-center">
                    <Zap
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer id="contact" className="pt-32 pb-16 bg-[#050505] border-t border-red-600/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* Col 1 — Brand + Contact */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 flex items-center justify-center font-black text-2xl text-white skew-x-[-6deg] shadow-lg shadow-red-600/30">
                {ownerId?.businessName?.charAt(0) || "P"}
              </div>
              <div>
                <h4 className="text-xl font-black uppercase tracking-tighter text-white">
                  {ownerId?.businessName || "Iron Will"}
                </h4>
                <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">
                  Elite Personal Training
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {contact?.address && (
                <div className="flex items-start gap-4">
                  <MapPin className="text-red-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    {contact.address}
                  </p>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-4">
                  <Phone className="text-red-600 shrink-0" size={18} />
                  <p className="text-2xl font-black text-white tracking-wide">
                    {contact.phone}
                  </p>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white rounded-none transition-all duration-300"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white rounded-none transition-all duration-300"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white rounded-none transition-all duration-300"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Business Hours */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3 border-b border-white/5 pb-4">
              <Clock size={14} className="text-red-600" />
              Training Hours
            </h4>
            <div className="space-y-3">
              {businessHours?.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0"
                >
                  <span
                    className={`font-bold uppercase tracking-widest text-[11px] ${
                      h.isClosed ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {h.day}
                  </span>
                  <span
                    className={`font-black text-[11px] uppercase tracking-widest ${
                      h.isClosed ? "text-red-600" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Rest Day" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Booking CTA */}
          <div className="relative bg-red-600/5 border border-red-600/20 p-10 space-y-6 overflow-hidden">
            {/* Decorative slash */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/10"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />

            <div className="flex items-center gap-3">
              <Calendar size={28} className="text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
                Book a Session
              </span>
            </div>

            <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
              Train With<br />
              <span className="text-red-600">Me</span>
            </h4>

            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Stop planning. Start doing. Your first session is the hardest step — book it now.
            </p>

            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.25em] text-xs transition-all active:scale-95 shadow-2xl shadow-red-600/30">
                Train With Me
              </button>
            </Link>

            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Spots Available Now
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-white/5 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Iron Will"} — No Excuses. Just Results.
          </p>
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
            Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalTrainerTheme;
