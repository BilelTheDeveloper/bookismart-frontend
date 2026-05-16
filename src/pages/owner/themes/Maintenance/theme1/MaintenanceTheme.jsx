import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Wrench,
  Zap,
  Droplets,
  Home,
  ShieldCheck,
  Star,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG COMPONENTS
 */
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

/**
 * Service icon resolver based on service title keywords
 */
const getServiceIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("electric") || t.includes("wiring") || t.includes("panel"))
    return <Zap size={24} className="text-orange-400" />;
  if (t.includes("plumb") || t.includes("pipe") || t.includes("water") || t.includes("leak"))
    return <Droplets size={24} className="text-orange-400" />;
  if (t.includes("roof") || t.includes("paint") || t.includes("wall") || t.includes("floor") || t.includes("tile"))
    return <Home size={24} className="text-orange-400" />;
  return <Wrench size={24} className="text-orange-400" />;
};

/**
 * MAINTENANCE THEME — FIXFLOW EDITION
 */
const MaintenanceTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustPillars = [
    { label: "Licensed", icon: <ShieldCheck size={18} className="text-orange-400" /> },
    { label: "Insured", icon: <CheckCircle2 size={18} className="text-orange-400" /> },
    { label: "Guaranteed", icon: <Star size={18} className="text-orange-400" /> },
  ];

  const activeServices = (services || []).filter((s) => s?.active !== false);

  return (
    <div className="bg-[#0f172a] text-slate-100 font-sans selection:bg-orange-500/30 overflow-x-hidden">

      {/* ============================================================
          1. STICKY GLASS NAVBAR
      ============================================================ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Wrench size={20} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="block text-base font-black tracking-tight text-white uppercase">
                {ownerId?.businessName || "FixFlow"}
              </span>
              <span className="block text-[9px] font-bold text-orange-400 uppercase tracking-[0.2em]">
                Maintenance & Repair
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-orange-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[1001] bg-[#0f172a] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Wrench size={18} className="text-white" />
                </div>
                <span className="text-lg font-black uppercase text-white">
                  {ownerId?.businessName || "FixFlow"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={30} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="flex items-center justify-between py-5 border-b border-white/5 text-3xl font-black uppercase text-white hover:text-orange-400 transition-colors"
                >
                  {link.name}
                  <ChevronRight size={22} className="text-orange-500" />
                </motion.a>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl uppercase tracking-widest text-sm transition-all"
                >
                  Book a Service
                </button>
              </Link>
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-3 mt-4 py-4 border border-orange-500/30 rounded-xl text-orange-400 font-bold text-sm"
                >
                  <Phone size={16} />
                  {contact.phone}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          2. FULL-SCREEN HERO
      ============================================================ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/85 via-[#0f172a]/60 to-[#0f172a]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Available 24/7 — Emergency Response
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.88] tracking-tighter mb-6 uppercase">
            {hero?.title || (
              <>
                Problems
                <br />
                <span className="text-orange-500">Solved Fast.</span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Professional home repair, plumbing, electrical & handyman services. No job too small — quality guaranteed."}
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl uppercase tracking-[0.15em] text-sm transition-all shadow-2xl shadow-orange-500/25 active:scale-95">
                Book a Service
              </button>
            </Link>
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 px-8 py-5 border border-white/10 hover:border-orange-500/40 rounded-xl text-white font-bold text-sm transition-all hover:bg-white/5"
              >
                <Phone size={18} className="text-orange-400" />
                <span className="tracking-wider">{contact.phone}</span>
              </a>
            )}
          </div>

          {/* Trust Pillars */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {trustPillars.map((pillar) => (
              <div key={pillar.label} className="flex items-center gap-2">
                {pillar.icon}
                <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-300">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </section>

      {/* ============================================================
          3. SERVICES GRID
      ============================================================ */}
      <section id="services" className="py-28 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="inline-block text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mb-4">
              What We Fix
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Our Services
              </h2>
              <p className="text-slate-400 font-medium text-base max-w-xs border-l-2 border-orange-500 pl-4 leading-relaxed">
                Fast response, transparent pricing, done-right guarantee.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          {activeServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  onHoverStart={() => setHoveredService(idx)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`relative group p-7 rounded-2xl border transition-all duration-300 cursor-default ${
                    hoveredService === idx
                      ? "bg-orange-500/5 border-orange-500/50 shadow-xl shadow-orange-500/10"
                      : "bg-white/[0.03] border-white/10 hover:border-orange-500/30"
                  }`}
                >
                  {/* Top row: icon + number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      {getServiceIcon(service.title)}
                    </div>
                    <span className="text-[10px] font-black text-slate-600 tracking-widest">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-black uppercase mb-2 transition-colors duration-300 ${
                      hoveredService === idx ? "text-orange-400" : "text-white"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  {service.description && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>
                  )}

                  {/* Duration + Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    {service.duration && (
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                        <Clock size={12} />
                        <span>{service.duration} min</span>
                      </div>
                    )}
                    <div className="ml-auto text-right">
                      <span className="text-xl font-black text-white">
                        {service.price !== undefined && service.price !== null && service.price !== ""
                          ? `From ${service.price}`
                          : "On Request"}
                      </span>
                      {service.price !== undefined && service.price !== null && service.price !== "" && (
                        <span className="text-orange-500 text-xs font-black ml-1">TND</span>
                      )}
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <AnimatePresence>
                    {hoveredService === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <Link to={`/book/${ownerId?._id}`}>
                          <button className="mt-4 w-full py-3 bg-orange-500 hover:bg-orange-400 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-all">
                            Book This Service
                          </button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-600 text-sm">
              No services listed yet.
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                <Calendar size={16} />
                Schedule a Visit
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. ABOUT SECTION (CONDITIONAL)
      ============================================================ */}
      {about?.show && (
        <section id="about" className="py-28 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image with orange overlay */}
            <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] lg:aspect-auto lg:h-[620px]">
              <img
                src={
                  about.image ||
                  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                }
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Our team at work"
              />
              {/* Orange gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-transparent to-transparent" />
              {/* Corner badge */}
              <div className="absolute bottom-6 left-6 px-5 py-3 bg-[#0f172a]/90 backdrop-blur-sm rounded-xl border border-orange-500/20">
                <p className="text-orange-400 text-[9px] font-black uppercase tracking-[0.3em]">
                  Est. since
                </p>
                <p className="text-white text-2xl font-black leading-none">2010</p>
              </div>
            </div>

            {/* Right: Story + Stats */}
            <div className="space-y-8">
              <div className="w-14 h-1 bg-orange-500" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                {about.title || "Built on Trust. Delivered with Skill."}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {about.text ||
                  "We are a team of licensed, insured, and dedicated maintenance professionals. From emergency plumbing to full electrical installs, we show up on time, work clean, and don't leave until the job is done right."}
              </p>

              {/* Certifications / trust points */}
              <div className="space-y-3">
                {[
                  "Fully licensed & government-certified technicians",
                  "All work backed by a 1-year quality guarantee",
                  "Transparent quotes — no hidden charges",
                  "Same-day and emergency services available",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                {[
                  { value: "14+", label: "Years Active" },
                  { value: "3,200+", label: "Jobs Done" },
                  { value: "12", label: "Cities Covered" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-orange-400 leading-none">{stat.value}</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-orange-500/20">
                  Get a Free Quote
                  <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          5. GALLERY SECTION (CONDITIONAL)
      ============================================================ */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-28 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mb-4">
                Before &amp; After
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase">
                Our Work
              </h2>
              <p className="text-slate-500 mt-4 text-base font-medium max-w-md mx-auto">
                Real jobs. Real results. Every repair tells a story.
              </p>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
              {gallery.images.map((img, i) => {
                const isLarge = i % 5 === 0;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    className={`relative overflow-hidden rounded-2xl bg-slate-800 group ${
                      isLarge ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Work sample ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-black/60 px-2 py-1 rounded">
                        Job #{i + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Gallery fallback images when real gallery is empty but show is true */}
            {gallery.images.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800",
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
                  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
                  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
                  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800",
                  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800",
                ].map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl h-48 bg-slate-800">
                    <img
                      src={src}
                      alt={`Sample work ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================
          6. EMERGENCY CTA STRIP
      ============================================================ */}
      <section className="bg-orange-500 py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <AlertCircle size={18} className="text-white/80" />
              <span className="text-white/80 text-xs font-black uppercase tracking-widest">
                Emergency? Don't Wait.
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              We respond in under 60 minutes.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 px-8 py-4 bg-white text-orange-600 font-black rounded-xl text-sm uppercase tracking-widest hover:bg-orange-50 transition-all shadow-lg"
              >
                <Phone size={18} />
                {contact.phone}
              </a>
            )}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-8 py-4 border-2 border-white text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Book Online
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. FOOTER & CONTACT
      ============================================================ */}
      <footer id="contact" className="bg-[#080d18] pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mb-16">

            {/* Col 1: Brand + Contact */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Wrench size={22} className="text-white" />
                </div>
                <div>
                  <span className="block text-lg font-black text-white uppercase tracking-tight">
                    {ownerId?.businessName || "FixFlow"}
                  </span>
                  <span className="block text-[9px] font-bold text-orange-400 uppercase tracking-[0.25em]">
                    Maintenance & Repair
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Dependable, professional maintenance services for homes and offices. Licensed, insured, and always on time.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Phone size={16} className="text-orange-400" />
                    </div>
                    <span className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">
                      {contact.phone}
                    </span>
                  </a>
                )}
                {contact?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-slate-400" />
                    </div>
                    <span className="text-slate-400 font-medium text-sm leading-relaxed pt-1.5">
                      {contact.address}
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                    aria-label="TikTok"
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Business Hours */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={16} className="text-orange-400" />
                <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">
                  Working Hours
                </h4>
              </div>
              <div className="space-y-3">
                {(businessHours || []).map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2.5 border-b border-white/5"
                  >
                    <span
                      className={`text-sm font-bold ${
                        h.isClosed ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {h.day}
                    </span>
                    {h.isClosed ? (
                      <span className="text-xs font-black text-rose-500 uppercase tracking-widest">
                        Closed
                      </span>
                    ) : (
                      <span className="text-xs font-black text-orange-400 uppercase tracking-wide">
                        {h.open} – {h.close}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Emergency note */}
              <div className="flex items-start gap-2 mt-2 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                <AlertCircle size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Emergency services available <span className="text-orange-400 font-bold">24/7</span> — call us any time.
                </p>
              </div>
            </div>

            {/* Col 3: Booking CTA Box */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden">
              {/* Orange glow accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />

              <Calendar size={36} className="text-orange-400 relative z-10" />
              <h4 className="text-2xl font-black text-white uppercase tracking-tight relative z-10">
                Book a Service
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                Schedule your repair or maintenance visit online in under 60 seconds. We'll confirm within the hour.
              </p>
              <Link to={`/book/${ownerId?._id}`} className="block relative z-10">
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                  Book Appointment Now
                </button>
              </Link>
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 hover:border-orange-500/30 rounded-xl text-slate-400 hover:text-orange-400 text-xs font-bold uppercase tracking-widest transition-all relative z-10"
                >
                  <Phone size={14} />
                  Call Instead
                </a>
              )}
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()}{" "}
              {ownerId?.businessName || "FixFlow"} — All Rights Reserved
            </p>
            <p className="text-slate-700 text-[10px] font-bold uppercase tracking-[0.2em]">
              Powered by{" "}
              <span className="text-orange-500/60">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaintenanceTheme;
